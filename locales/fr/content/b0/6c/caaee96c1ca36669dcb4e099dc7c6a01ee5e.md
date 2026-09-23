# Introduction

Une instruction peut avoir l'air d'une action indivisible alors qu'elle n'en est rien.
Prenons l'exemple de l'ajout de cinq à une valeur en mémoire :

```x86asm
add qword [rel counter], 5
```

En réalité, le processeur n'a aucun moyen d'ajouter directement à la mémoire.
Il décompose cette instruction en trois étapes plus petites, appelées **micro-opérations** :

1. **lire** la valeur actuelle depuis la mémoire ;
2. **modifier** cette valeur dans un registre, en y ajoutant cinq ;
3. **écrire** le résultat en retour.

```x86asm
mov rax, qword [rel counter] ; 1. load the current value
add rax, 5                   ; 2. add five
mov qword [rel counter], rax ; 3. store the result back
```

C'est un schéma courant appelé **read-modify-write (RMW)**.

À noter que la lecture (ou _load_) et l'écriture (ou _store_) sont deux événements distincts, ce qui laisse une fenêtre de temps entre les deux.
En général on ne s'en aperçoit pas, car sur un seul cœur chaque instruction est garantie de produire la totalité de son effet avant la suivante.
Cette fenêtre est donc invisible, et `add` se comporte comme une seule unité.

Pourtant, les processeurs modernes ont rarement un seul cœur, et les applications s'exécutent souvent sur plusieurs cœurs à la fois, sans qu'aucun ordre ne soit imposé entre eux.
Lorsque plusieurs cœurs s'exécutent au même instant, un autre cœur peut lire ou écrire `counter` à l'intérieur de cette fenêtre, après la lecture de ce cœur et avant son écriture.
Deux _threads_ chargent alors la même ancienne valeur, y ajoutent chacun cinq, puis écrivent chacun leur résultat.
Deux additions ont bien eu lieu, mais la valeur n'a augmenté que de cinq.
Une mise à jour a été perdue en silence.

C'est une **course de données**, un problème courant dans le code multi-_threads_.

Toutes les valeurs ne sont pas exposées de cette façon.
Chaque _thread_ possède ses propres registres et sa propre pile, si bien qu'une valeur contenue dans un registre, ou une variable locale sur la pile d'un _thread_, appartient en exclusivité à ce _thread_ et ne peut pas entrer en course.
Seule la mémoire que les _threads_ partagent, comme `counter` ci-dessus, doit être protégée.

x86-64 propose un ensemble d'instructions pour résoudre ce problème, en rendant une instruction indivisible.
Elle se comporte comme une seule unité, non seulement pour le cœur qui la traite, mais aussi pour tous les autres cœurs.
Une opération qui reste d'un seul bloc, qu'aucun autre cœur ne peut scinder, est dite **atomique**.

~~~~exercism/note
On appelle souvent multi-_threads_ les applications qui s'exécutent sur plusieurs cœurs.
Mais un **_thread_** n'est pas la même chose qu'un cœur.
Deux _threads_ peuvent s'exécuter simultanément sur le même cœur, en s'entrelaçant, ou en parallèle sur des cœurs différents.

Des _threads_ entrelacés peuvent déjà entrer en course lors d'un read-modify-write s'il est découpé en plusieurs instructions, car le système d'exploitation peut changer de _thread_ entre deux instructions.
En revanche, la fenêtre à l'intérieur d'une _seule_ instruction n'est exposée que par du vrai parallélisme.
Comme le système d'exploitation ne change de _thread_ qu'entre les instructions, jamais à l'intérieur d'une instruction, une instruction isolée est intrinsèquement sûre sur un seul cœur.

C'est l'atomicité véritable entre _plusieurs_ cœurs que fournissent les instructions ci-dessous.
~~~~

## Échange atomique

L'instruction `xchg` échange deux opérandes.
L'opérande de destination prend la valeur qu'avait l'opérande source, tandis que l'opérande source prend la valeur qu'avait l'opérande de destination.
Conceptuellement, on peut le voir comme deux instructions `mov` qui se produisent en même temps.

Comme toujours, on peut l'utiliser avec deux opérandes de registre, ou avec un opérande mémoire et un opérande de registre :

```x86asm
mov  eax, 1
xchg dword [rdi], eax ; [rdi] = 1, eax = the old value of [rdi]
mov ecx, 2
mov edx, 3
xchg edx, ecx         ; edx = 2, ecx = 3
```

Lorsqu'un opérande mémoire est utilisé, `xchg` est _toujours_ atomique.

~~~~exercism/caution
`xchg` est automatiquement atomique lorsque l'un des opérandes est un emplacement mémoire.
Cela signifie aussi que l'opération est bien plus lente dans cette situation.

Si tu n'as pas besoin d'atomicité, effectue l'échange via un registre libre, avec de simples instructions `mov`.
~~~~

## Le préfixe `lock`

En x86-64, le moyen le plus courant de rendre une instruction atomique est d'ajouter le préfixe `lock`.
Il fusionne la lecture, la modification et l'écriture en une seule étape indivisible.
Le cœur détient donc la mémoire en exclusivité pendant toute l'opération, si bien qu'aucun autre cœur ne peut lire ou écrire à cet emplacement entre-temps.

```x86asm
lock add qword [rel counter], 5 ; the read, the modify, and the write are one step
```

`lock` ne fonctionne que si la destination est en mémoire, et uniquement sur les instructions qui lisent, modifient puis écrivent cette mémoire :

1. les opérations arithmétiques, comme `add`, `sub`, `inc`, `dec`, `neg` ;
2. les opérations bit à bit, comme `and`, `or`, `xor`, `not` ;
3. les opérations sur les bits `bts`, `btr`, `btc` ;
4. quelques autres instructions dédiées, comme `xadd` et `cmpxchg`, décrites ci-dessous.

~~~~exercism/caution
Détenir un emplacement en exclusivité et en écarter tous les autres cœurs n'est pas gratuit.
Une opération préfixée par `lock` est nettement plus lente que sa forme simple, et plus lente encore lorsque plusieurs cœurs se disputent le même emplacement.

Ce préfixe doit être réservé à la mémoire susceptible d'être modifiée par plusieurs _threads_.
Évite de l'utiliser si la mémoire n'est pas partagée ou si elle n'est jamais que lue.
~~~~

## Échange et addition

Un simple `lock add` met la mémoire à jour, mais jette l'ancienne valeur.
Or c'est souvent cette ancienne valeur que l'on veut, par exemple pour attribuer à chaque _thread_ un numéro de ticket distinct.

L'instruction `xadd` (`x` pour échange) renvoie la valeur précédente tout en effectuant l'addition.
Elle écrit la somme dans la destination et laisse la valeur d'origine de la destination dans le registre source.

```x86asm
mov  rax, 1
lock xadd qword [rdi], rax ; [rdi] = [rdi] + rax = [rdi] + 1
                           ; rax = the old value of [rdi]
```

Avec le préfixe `lock`, il s'agit d'un **fetch-and-add** atomique.
Exécuté par de nombreux _threads_ sur le même compteur, chaque appel renvoie une ancienne valeur différente.

Comme avec `lock add`, le compteur finit exactement au nombre d'appels.
Mais contrairement à `lock add`, chaque valeur intermédiaire est renvoyée elle aussi, une à chaque appelant.

## Comparaison et échange

`xadd` additionne et `xchg` écrase, mais ni l'un ni l'autre ne permet de faire dépendre la nouvelle valeur de la valeur actuelle, et de ne l'appliquer que si rien n'a changé entre-temps.
C'est cette mise à jour conditionnelle que fournit `cmpxchg`, la comparaison et l'échange, la plus générale de ces primitives.

`cmpxchg dest, src` utilise `rax` comme accumulateur implicite et le compare à `dest` :

- Si `dest == rax`, alors `dest = src` et `ZF = 1`.
- Si `dest != rax`, alors `rax = dest` et `ZF = 0`.

À noter que `dest` n'est mis à jour que s'il est égal à la valeur attendue, préalablement chargée dans `rax`.
Cette égalité garantit que `dest` contient toujours la valeur à partir de laquelle la nouvelle a été calculée : une mise à jour fondée sur une lecture obsolète n'est donc jamais appliquée.
Cela fait de `cmpxchg` la brique de base d'une mise à jour atomique, aussi appelée **compare-and-swap (CAS)** :

```x86asm
    mov rax, qword [rdi]          ; rax = the value we expect to find
.retry:
    lea rcx, [rax + 10]           ; rcx = the new value we want to install
    lock cmpxchg qword [rdi], rcx ; if [rdi] still equals rax, store rcx and set ZF
                                  ; otherwise reload rax with the current value, clear ZF
    jnz  .retry                   ; ZF is cleared, so another thread won the race. Recompute and retry
```

Cette **boucle de réessai** est le cœur des mises à jour sans verrou.
La fenêtre entre la lecture et la comparaison-échange est précisément le moment où un autre _thread_ peut s'interposer, et `cmpxchg` le détecte en refusant d'écrire une valeur calculée à partir d'une lecture obsolète.

## Ordonnancement mémoire

Toutes les opérations vues jusqu'ici ne touchaient qu'un seul emplacement.
Quand des _threads_ se coordonnent via plusieurs emplacements, une nouvelle question surgit : dans quel ordre les écritures d'un _thread_ deviennent-elles visibles pour un autre ?
Les règles qui répondent à cette question constituent l'**ordonnancement mémoire** du processeur.

Le concept sur le code sans branchement a introduit l'idée qu'un cœur moderne ne progresse pas dans les instructions une à la fois.
Il en garde beaucoup en vol en même temps et prend de l'avance quand il le peut.
Une écriture peut donc devenir visible pour les autres cœurs plus tard que ne le suggère le programme, alors que les instructions qui la suivent ont déjà été exécutées.

x86-64 applique un **ordonnancement mémoire fort** entre les lectures et les écritures ordinaires, si bien que, sur chaque cœur :

1. une lecture n'est jamais réordonnée après une lecture ultérieure ;
2. une écriture n'est jamais réordonnée après une écriture ultérieure ;
3. une lecture n'est jamais réordonnée après une écriture ultérieure.

Le seul réordonnancement possible est celui d'une écriture qui semble s'achever après une lecture ultérieure d'une adresse _différente_.

Une instruction préfixée par `lock`, ou un `xchg` avec un opérande mémoire, constitue une barrière complète : rien ne semble la franchir, dans un sens comme dans l'autre.
C'est pourquoi ils suffisent à garantir un ordre complet dans la plupart des situations.

## Attente active et `pause`

Les instructions qui positionnent un drapeau tout en renvoyant son état précédent sont appelées **test-and-set**.
Elles peuvent servir de base à un **verrou tournant**, qui garantit à un cœur un accès exclusif à une partie du code.

Voici l'algorithme général, qui utilise l'instruction `xchg` avec un drapeau binaire :

1. Le drapeau commence à `0`.
2. Pour acquérir le verrou, un cœur échange la valeur du drapeau avec `1`.
3. Si la valeur renvoyée est `1`, cela signifie que le verrou est _détenu_ par un autre cœur.
   Le cœur courant attend alors et essaie à nouveau d'acquérir le verrou.
4. Si la valeur renvoyée est `0`, cela signifie que le verrou était libre.
   `xchg` vient de le passer à `1`, et les autres cœurs attendront que ce cœur le libère.
5. Une fois que le cœur courant a terminé son travail, remettre le drapeau à `0` libère le verrou.

```x86asm
acquire:
    mov  eax, 1
    xchg dword [rdi], eax ; try to take the lock; eax = its old value
    test eax, eax
    jnz  .held            ; old value was 1: someone else holds it
    ret                   ; old value was 0: the lock is ours
.held:
    pause                 ; wait before trying again
    jmp  acquire
```

Dans la boucle d'attente, l'instruction `pause` ne change rien à ce que calcule le code.
Elle indique au processeur qu'il s'agit d'une attente active.
Le processeur peut alors réduire sa consommation d'énergie sur le _thread_ en attente et céder la place à un _thread_ frère qui partage le même cœur.
Une boucle d'attente active sans `pause` reste correcte, mais elle gaspille des ressources.

Une fois son travail terminé, le _thread_ peut libérer le verrou par une simple écriture de `0` avec `mov`.
Un simple `mov` suffit, car en x86-64 les lectures et les écritures ne sont jamais réordonnées après une écriture ultérieure.
On dit d'une écriture qui ne dépasse jamais les accès qui la précèdent qu'elle a un **ordonnancement de libération**, et sur x86 toute écriture ordinaire en bénéficie.

~~~~exercism/note
N'importe quelle instruction qui teste et positionne de façon atomique un emplacement mémoire peut servir à un verrou tournant.
Par exemple, `lock bts` peut remplacer `xchg` pour positionner un bit précis tout en vérifiant s'il était déjà positionné.

À noter que les drapeaux, comme le `CF` modifié par `bts`, font partie de `rflags`, un registre.
Ils sont donc propres à chaque _thread_.
~~~~
