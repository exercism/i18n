# Introduction

Dans un concept précédent, on a mentionné que les étiquettes locales comme les fonctions ne sont que des adresses dans une section de code exécutable, telle que `section .text`.

En fait, les fonctions se manipulent comme n'importe quelle adresse mémoire : on peut les charger dans des registres, les transmettre et les stocker en mémoire.
Il est également possible d'utiliser `call` ou `jmp` pour transférer l'exécution vers une fonction stockée dans un registre ou en mémoire :

```x86asm
section .text
sum_op:
    lea rax, [rdi + rsi] ; loads the sum rdi + rsi into rax
    ret

apply_sum:
    lea rax, [rel sum_op]
    jmp rax   ; tail call
```

Une adresse de fonction que l'on transmet comme une valeur s'appelle un **thunk**.
Les thunks sont une brique de base de la **programmation d'ordre supérieur** en assembleur : du code qui manipule d'autres portions de code.

## Le code comme donnée

On peut aussi stocker des adresses de fonction en mémoire pour les récupérer plus tard :

```x86asm
section .bss
    cached_fn resq 1

section .text
save_op:
    mov qword [rel cached_fn], rdi
    ret

apply_op:
    ; arguments are already set up according to the ABI
    jmp qword [rel cached_fn] ; tail call
```

`save_op` écrit dans `cached_fn` l'adresse de fonction qu'elle reçoit.
Cette valeur persiste après le retour de `save_op`, si bien que tout appel ultérieur à `apply_op` effectue un saut terminal vers l'adresse qui a été stockée en dernier.
Il devient ainsi possible de changer la fonction que `apply_op` invoque à l'exécution.

## Tables de dispatch

Stocker des adresses de fonction dans un tableau permet de sélectionner différentes fonctions selon un certain indice, qui peut dépendre d'une condition à l'exécution.
C'est ce qu'on appelle une **table de dispatch** :

```x86asm
section .data
    dispatch_table dq add_op, sub_op, mul_op

section .text
dispatch:
    ; this function takes two arguments in rdi and rsi, and an index in rdx
    ; it then applies the function corresponding to the index in rdx to the arguments
    lea rax, [rel dispatch_table]
    jmp qword [rax + 8*rdx]   ; tail-call the function address for the index
```

## Thunks à état

Un thunk qui lit ou met à jour une mémoire persistante entre les appels peut se comporter différemment selon ce qui s'est produit avant.
Son résultat peut dépendre de bien plus que de ses seuls arguments.

Par exemple, un _compteur_ qui prend une fonction, l'invoque avec la valeur courante du compteur et incrémente celle-ci à chaque appel :

```x86asm
section .data
    count dq 0

section .text
tick:
    mov rax, rdi               ; saves the function address
    mov rdi, [rel count]       ; loads the current count as the function's argument
    inc qword [rel count]      ; advances the count
    jmp rax                    ; tail-calls the function
```

`tick` invoque la fonction donnée en lui passant la valeur courante du compteur comme argument, puis incrémente le compteur.
Ainsi, un premier appel `tick(square)` invoque `square(0)`, l'appel suivant `tick(square)` invoque `square(1)`, puis `square(2)`, et ainsi de suite.

Un autre exemple serait un _calcul différé_ :

```x86asm
section .bss
    captured_fn resq 1
    argument resq 1

section .text
delay:
    mov qword [rel captured_fn], rdi ; saves the function
    mov qword [rel argument], rsi    ; saves the argument
    lea rax, [rel invoke]            ; returns the `invoke` function
    ret

invoke:
    mov rdi, qword [rel argument]    ; loads the saved argument into `rdi`
    jmp qword [rel captured_fn]      ; tail-calls the saved function
```

`delay` prend une fonction et une valeur, les stocke, puis renvoie `invoke`.
Quand `invoke` est appelée, elle exécute la fonction capturée avec l'argument sauvegardé.

Beaucoup des motifs courants dans les langages de haut niveau, comme les fonctions de rappel, les méthodes virtuelles, les générateurs, la curryfication, la composition de fonctions et bien d'autres, reposent sur des thunks associés à un état persistant.
