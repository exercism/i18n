# À propos

Le concept [SIMD][SIMD] a présenté les valeurs à virgule flottante empaquetées : plusieurs nombres réunis dans un seul registre `xmm`, sur lesquels on opère voie par voie et en parallèle.
Les mêmes registres `xmm` peuvent aussi contenir des _entiers_ empaquetés.

## Syntaxe

L'essentiel du modèle SIMD pour la virgule flottante se transpose tel quel aux entiers empaquetés :

- Un registre de 128 bits est divisé en voies
- Les instructions agissent en parallèle sur les voies situées à la même position
- Les opérandes en mémoire suivent les mêmes règles d'alignement sur 16 octets

La syntaxe, elle, est légèrement différente :

1. Un _préfixe_ `p` pour indiquer que l'instruction opère sur des données _empaquetées_.
2. L'opération effectuée, portant le même nom que son équivalent non-SIMD (aussi appelé _scalaire_) (par exemple `add`, `mul`, etc.).
3. Un suffixe pour indiquer la taille de chaque voie.

Les entiers empaquetés ont quatre tailles de voie, chacune avec son propre suffixe :

| largeur de voie | octets | voies dans 128 bits | suffixe |
|------------|-------|-------------------|--------|
| _byte_       | 1     | 16                | b      |
| _word_       | 2     | 8                 | w      |
| _dword_      | 4     | 4                 | d      |
| _qword_      | 8     | 2                 | q      |

Par exemple :

| instruction | signification                              |
|-------------|--------------------------------------|
| `paddb`     | `add` empaqueté, voies de 8 bits (16 voies) |
| `paddw`     | `add` empaqueté, voies de 16 bits (8 voies) |
| `paddd`     | `add` empaqueté, voies de 32 bits (4 voies) |
| `paddq`     | `add` empaqueté, voies de 64 bits (2 voies) |

Certaines instructions prennent en entrée des voies d'une taille donnée, mais produisent en sortie des voies d'une autre taille.
Elles suivent la même convention générale, mais avec _deux_ suffixes de taille.
Le premier indique la taille de la voie d'entrée, le second celle de la voie de sortie :

| instruction  | signification                                           |
|--------------|---------------------------------------------------|
| `pmovsxwd`   | `movsx` empaqueté, des voies de 16 bits vers les voies de 32 bits |
| `pmuldq`     | `mul` empaqueté, des voies de 32 bits vers les voies de 64 bits   |

## Déplacements en mémoire

Deux instructions nommées d'après les entiers copient 128 bits entre un registre `xmm` et la mémoire :

| instruction | description                                             |
|-------------|---------------------------------------------------------|
| `movdqa`    | copie des entiers empaquetés depuis ou vers un emplacement _aligné_   |
| `movdqu`    | copie des entiers empaquetés depuis ou vers un emplacement _non aligné_ |

Elles se comportent comme `movaps` et `movups` : `movdqa` déclenche une erreur sur une adresse mal alignée, tandis que `movdqu` accepte n'importe laquelle.
Toutes les quatre copient 128 bits sans les interpréter.
La paire nommée d'après les entiers s'utilise avec des données entières par convention, non par obligation.

~~~~exercism/note
Ici, `dq` signifie `double-qword`, c'est-à-dire 128 bits (16 octets).
~~~~

## Addition et soustraction

L'addition et la soustraction suivent la règle de nommage :

```x86asm
paddb xmm0, xmm1 ; 16 lanes: each  8-bit, xmm0 += xmm1
paddw xmm2, xmm3 ;  8 lanes: each 16-bit, xmm2 += xmm3

psubd xmm4, xmm5 ;  4 lanes: each 32-bit, xmm4 -= xmm5
psubq xmm6, xmm7 ;  2 lanes: each 64-bit, xmm6 -= xmm7
```

Il n'existe pas de forme distincte pour les nombres signés et non signés.
En complément à deux, l'addition et la soustraction produisent les mêmes bits, que les voies soient lues comme signées ou non signées, si bien qu'une seule instruction sert pour les deux.
C'est à toi d'interpréter le résultat, exactement comme avec les instructions scalaires `add` et `sub`.

Ces instructions **rebouclent** en cas de dépassement, comme leurs équivalents scalaires.
Une voie de 8 bits contient des valeurs modulo 256 ; ainsi, un `paddb` de `200 + 100` produit `300 - 256 = 44`, en écartant les bits qui ne rentrent pas.

Remarque que ces bits excédentaires ne se propagent pas vers la voie suivante.
Chaque voie est traitée indépendamment des autres, même si elles partagent le même registre.

## Addition et soustraction avec saturation

Le SIMD entier ajoute une opération que le SIMD en virgule flottante ne possède pas : l'addition et la soustraction [avec saturation][saturation], qui _saturent_ au lieu de reboucler.
Un résultat supérieur à la plage de la voie devient la plus grande valeur que la voie peut contenir ; un résultat inférieur à cette plage devient la plus petite.

Les formes avec saturation insèrent `s` (signé) ou `us` (non signé) avant le suffixe de taille :

| instruction | signification                                    |
|-------------|--------------------------------------------|
| `paddsb`    | `add`, avec saturation, voies signées de 8 bits      |
| `paddusb`   | `add`, avec saturation, voies non signées de 8 bits    |
| `psubsw`    | `sub`, avec saturation, voies signées de 16 bits     |
| `psubusw`   | `sub`, avec saturation, voies non signées de 16 bits   |

La plage de saturation correspond à toute la plage représentable pour un entier de la taille et du signe correspondants.
Pour un _byte_ :

- Les _bytes_ non signés saturent à `[0, 255]` : un `paddusb` de `200 + 100` donne `255`, et un `psubusb` de `5 - 10` donne `0`.
- Les _bytes_ signés saturent à `[-128, 127]` : un `paddsb` de `100 + 50` donne `127`.

La saturation importe lorsqu'une voie contient une quantité bornée, comme un canal de pixel ou un échantillon audio.
Le rebouclage rendrait sombre un pixel trop lumineux, tandis que la saturation le maintient à sa luminosité maximale, ce qui est le résultat souhaité.

~~~~exercism/note
Les additions et soustractions avec saturation n'existent que pour les voies _byte_ et _word_, pas pour les _dword_ ou les _qword_.
~~~~

## Multiplication

Multiplier deux valeurs de N bits peut produire un résultat de 2N bits, mais la voie de destination ne fait que N bits de large.
Les opérations SIMD résolvent ce problème en précisant quelle moitié du produit conserver : les N bits de poids faible ou les N bits de poids fort.

Pour les voies de 16 bits, trois instructions sont utilisées :

| instruction | signification                                                       |
|-------------|---------------------------------------------------------------|
| `pmullw`    | `mul`, voies de 16 bits, conserve les 16 bits de poids faible de chaque produit     |
| `pmulhw`    | `mul`, voies de 16 bits, conserve les 16 bits de poids fort, opérandes signées   |
| `pmulhuw`   | `mul`, voies de 16 bits, conserve les 16 bits de poids fort, opérandes non signées |

Les 16 bits de poids faible d'un produit sont les mêmes, que les opérandes soient lues comme signées ou non signées ; il n'existe donc qu'un seul `pmullw`.

Les 16 bits de poids fort, en revanche, varient selon que le résultat est signé ou non.
C'est pourquoi la multiplication de la moitié haute a des formes distinctes pour la multiplication signée et non signée :

1. `pmulhw`, pour la multiplication signée.
2. `pmulhuw`, avec un `u` supplémentaire, pour la multiplication non signée.

Remarque la syntaxe :

1. Un `p`, pour indiquer un entier empaqueté.
2. L'opération effectuée, `mul`.
3. Un `h`, pour indiquer que les bits supérieurs (« high ») du résultat sont sélectionnés.
4. Un `u` facultatif si le résultat doit être interprété comme non signé (c'est-à-dire qu'il n'est pas étendu en signe).
5. Enfin, le suffixe de taille `w`, pour indiquer qu'il s'agit d'une opération _word_ (16 bits).

La multiplication empaquetée pour les _words_ suit exactement la règle ci-dessus.
La multiplication pour les _dwords_ (32 bits) suit aussi la règle, mais il n'existe que la variante qui sélectionne la moitié basse : `pmulld`.

Il n'existe pas de variante de la multiplication _dword_ qui sélectionne les bits de poids fort.
En revanche, il existe des variantes qui _élargissent_ la multiplication, en stockant le produit complet de 64 bits des voies _d'indice pair_ (c'est-à-dire les voies aux positions 0 et 2) :

| instruction | signification                                                                          |
|-------------|----------------------------------------------------------------------------------|
| `pmuludq`   | multiplie les éléments 32 bits d'indice pair, non signés, en 2 produits complets de 64 bits |
| `pmuldq`    | multiplie les éléments 32 bits d'indice pair, signés, en 2 produits complets de 64 bits   |

Remarque que la syntaxe utilise `dq`, éventuellement précédé d'un `u` pour la multiplication non signée.
C'est parce que ces instructions prennent des voies `dword` en entrée et produisent des voies `qword` en sortie.

## Division

Il n'existe pas de division entière empaquetée.
Le code qui en a besoin convertit les valeurs en virgule flottante, divise, puis reconvertit.

## Élargissement des entiers

Il existe des équivalents empaquetés de `movsx` et `movzx`.
Ils suivent la même syntaxe que celle mentionnée plus haut pour les instructions dont la taille de voie d'entrée diffère de celle de la sortie :

```x86asm
pmovsxwd xmm0, xmm1   ; 4 words -> 4 dwords, sign-extended
pmovzxbw xmm0, xmm1   ; 8 bytes -> 8 words, zero-extended
```

Remarque que le nombre de voies est déterminé par la largeur la plus grande (celle de la sortie).
L'instruction lit ce nombre de voies dans la partie basse de la source.
C'est la même sémantique que celle que l'on a déjà vue pour les instructions `cvt` empaquetées entre flottants simple et double précision.

## Conversion entre entiers et flottants

Il existe des instructions pour convertir entre des entiers signés de 32 bits et des voies en virgule flottante.
Elles suivent la syntaxe habituelle des instructions `cvt` et `cvtt`, mais au lieu de `si`, un entier empaqueté est représenté par `dq` :

```x86asm
cvtdq2ps xmm0, xmm1 ; convert 32-bit signed integers in xmm1 to 32-bit floats in xmm0
cvtdq2pd xmm2, xmm3 ; convert 32-bit signed integers in xmm3 to 64-bit floats in xmm2
cvtps2dq xmm4, xmm5 ; convert 32-bit floats in xmm5 to 32-bit signed integers in xmm4
```

~~~~exercism/caution
Les instructions qui utilisent `pi` pour représenter des entiers empaquetés écrivent dans les registres `mmx` historiques et sont de fait obsolètes sur x86-64.
Préfère les formes `dq`, qui utilisent les registres `xmm`.
~~~~

Les mêmes remarques que celles faites pour la conversion scalaire entre nombres à virgule flottante et entiers s'appliquent ici.
Les nombres à virgule flottante sont arrondis selon un registre spécial appelé MXCSR, dont on ne peut pas présumer le mode à l'entrée d'une fonction.
Il existe une variante `cvtt` (avec un `t` supplémentaire) qui tronque toujours le résultat.

Il est aussi possible d'utiliser `round` pour mettre les valeurs à virgule flottante empaquetées dans un état connu avant de convertir.
La valeur de contrôle de `round` est la même que pour le `round` scalaire, et la syntaxe est également la même pour les valeurs à virgule flottante empaquetées :

```x86asm
roundps xmm0, xmm1, 1 ; xmm0 = floor(xmm1), packed 32-bit floats
roundpd xmm2, xmm3, 2 ; xmm2 = ceil(xmm3), packed 64-bit floats
```

~~~~exercism/note
Une référence complète pour chaque instruction mentionnée ici est disponible dans la [référence des instructions x86][instruction-reference].

[instruction-reference]: https://www.felixcloutier.com/x86/
~~~~

[simd]: https://exercism.org/tracks/x86-64-assembly/concepts/simd
[saturation]: https://en.wikipedia.org/wiki/Saturation_arithmetic
