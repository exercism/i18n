# À propos

Les chiffres binaires correspondent en dernier ressort directement aux transistors de ton processeur ou de ta mémoire RAM, et à l'état « allumé » ou « éteint » de chacun d'eux.

La manipulation de bas niveau, familièrement appelée « bit-twiddling », est particulièrement importante dans les langages système.

Les langages de haut niveau comme Julia masquent généralement la plupart de ces détails. Cependant, tout un éventail d'opérations au niveau des bits est [disponible][bitwise] dans le langage de base.

***Remarque :*** pour voir une sortie binaire lisible par un humain dans le REPL, presque tous les exemples ci-dessous doivent être enveloppés dans une fonction [`bitstring()`][bitstring]. Cela distrait visuellement, c'est pourquoi la plupart des occurrences de cette fonction ont été retirées.

## Opérations de décalage de bits

Les types entiers, signés ou non signés, peuvent être représentés par une suite de 1 et de 0.

```julia-repl
julia> bitstring(UInt8(5))
"00000101"
```

Les décalages de bits se contentent de tout déplacer vers la gauche ou vers la droite d'un certain nombre de positions. Avec les types `UInt`, certains bits tombent d'un côté et l'autre côté est complété par des zéros :

```julia-repl
julia> ux::UInt8 = 5
5

julia> bitstring(ux)
"00000101"

julia> ux << 2 # left by 2
"00010100"

julia> ux >> 1 # right by 1
"00000010"
```

Chaque décalage à gauche double la valeur et chaque décalage à droite la divise par deux (sous réserve de troncature). C'est plus évident en représentation décimale :

```julia-repl
julia> 3 << 2
12

julia> 24 >> 3
3
```

Ce type de décalage de bits est bien plus rapide que l'arithmétique « classique », ce qui rend la technique très populaire dans le code de bas niveau.

Avec les entiers signés, il faut être un peu plus prudent.

Les décalages à gauche sont relativement simples :

```julia-repl
julia> sx = Int8(5)
5

julia> sx # positive integer
"00000101"

julia> sx << 2
"00010100"

julia> -sx # negative integer
"11111011"

julia> -sx << 2
"11101100"
```

Décaler vers la gauche un entier signé positif revient donc au même que pour un entier non signé.

Les valeurs négatives sont stockées en [complément à deux][2complement], ce qui signifie que le bit le plus à gauche vaut 1. Aucun problème pour un décalage à gauche, mais lors d'un décalage à droite, comment compléter les bits les plus à gauche ?

```julia-repl
julia> sx >> 2 # simple for positive values!
"00000001"

julia> -sx # negative integer
"11111011"

julia> -sx >> 2 # pad with repeated sign bit
"11111110"

julia> -sx >>> 2 # pad with 0
"00111110"
```

L'opérateur `>>` effectue un [décalage arithmétique][arithmetic], qui préserve le bit de signe.

L'opérateur `>>>` effectue un [décalage logique][logical], en complétant avec des zéros comme si le nombre n'était pas signé.

Si cela te semble encore incomplet, il existe aussi une fonction [`bitrotate()`][bitrotate].

## Logique bit à bit

Nous avons vu dans un concept précédent que les opérateurs `&&` (et), `||` (ou) et `!` (pas) s'utilisent avec des valeurs booléennes.

Il existe des opérateurs équivalents `&` (et bit à bit), `|` (ou bit à bit) et `~` (un tilde, non bit à bit) pour comparer les bits de deux entiers.

```julia-repl
julia> 0b1011 & 0b0010 # bit is 1 in both numbers
"00000010"

julia> 0b1011 | 0b0010 # bit is 1 in at least one number
"00001011"

julia> ~0b1011 # flip all bits
"11110100"

julia> xor(0b1011, 0b0010) # bit is 1 in exactly one number, not both
"00001001"
```

Ici, `xor()` est le [ou exclusif][xor], utilisé comme une fonction (voir plus bas pour une notation alternative).

Accessoirement, les opérateurs `&` et `|` peuvent aussi s'utiliser avec des booléens. Contrairement à `&&` et `||`, toutes les parties de l'expression sont alors évaluées : il n'y a pas de court-circuit.


## Autres symboles

Julia adore les mathématiques, et les mathématiciens adorent les symboles cryptiques ; nous avons donc d'autres symboles avec lesquels jouer.

```julia-repl
julia> 0b1011 ⊻ 0b0010 # xor() in infix notation
"00001001"

julia> 0b1011 ⊼ 0b0010 # not and
"11111101"

julia> 0b1011 ⊽ 0b0010 # not or
"11110100"
```

Dans les éditeurs qui connaissent Julia, on les saisit avec `\xor`, `\nand` et `\nor`, suivis d'une tabulation dans chaque cas.

Ces symboles ne sont pas très connus, même parmi les personnes qui ont fait des études supérieures de mathématiques (l'auteur de ce concept ne les avait jamais vus auparavant). Si tu veux les utiliser, fais attention à qui tu demandes de relire ton code !


[bitwise]: https://docs.julialang.org/en/v1/manual/mathematical-operations/#Bitwise-Operators
[bitstring]: https://docs.julialang.org/en/v1/base/numbers/#Base.bitstring
[xor]: https://en.wikipedia.org/wiki/Exclusive_or
[2complement]: https://en.wikipedia.org/wiki/Two%27s_complement
[arithmetic]: https://en.wikipedia.org/wiki/Arithmetic_shift
[logical]: https://en.wikipedia.org/wiki/Logical_shift
[bitrotate]: https://docs.julialang.org/en/v1/base/math/#Base.bitrotate
