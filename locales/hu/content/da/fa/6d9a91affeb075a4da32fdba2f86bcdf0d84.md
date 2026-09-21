# Bevezetés

Egy korábbi fogalomnál szó volt róla, hogy a helyi címkék és a függvények is csupán címek egy végrehajtható kódot tartalmazó szakaszban, mint például a `section .text`.

Valójában a függvényekkel ugyanúgy bánhatunk, mint bármely memóriacímmel: betölthetők regiszterekbe, átadhatók és memóriában tárolhatók.
Az is lehetséges, hogy a `call` vagy a `jmp` utasítással átadjuk a végrehajtást egy regiszterben vagy memóriában tárolt függvénynek:

```x86asm
section .text
sum_op:
    lea rax, [rdi + rsi] ; loads the sum rdi + rsi into rax
    ret

apply_sum:
    lea rax, [rel sum_op]
    jmp rax   ; tail call
```

Az olyan függvénycímet, amelyet értékként adunk át, **thunknak** nevezzük.
A thunkok az assemblyben a **magasabb rendű programozás** építőkövei: olyan kód, amely más kódon működik.

## A kód mint adat

A függvénycímeket memóriában is tárolhatjuk, és később elővehetjük őket:

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

A `save_op` a kapott függvénycímet a `cached_fn`-be írja.
Az érték a `save_op` visszatérése után is megmarad, így az `apply_op` későbbi hívása arra a címre ugrik, amelyet legutóbb tároltak.
Ez lehetővé teszi, hogy futásidőben megváltoztassuk, melyik függvényt hívja meg az `apply_op`.

## Diszpécsertáblák

Ha a függvénycímeket egy tömbben tároljuk, akkor egy index alapján különböző függvényeket választhatunk ki, amely index akár egy futásidejű feltételtől is függhet.
Ezt nevezzük **diszpécsertáblának**:

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

## Állapottal rendelkező thunkok

Egy olyan thunk, amely a hívások között egy tartós memóriaterületet olvas vagy frissít, a korábbiaktól függően másképp viselkedhet.
Az eredménye nem csak az argumentumaitól függhet.

Például egy _számláló_, amely átvesz egy függvényt, és meghívja azt az aktuális számlálóértékkel, minden alkalommal növelve a számlálót:

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

A `tick` meghívja a kapott függvényt úgy, hogy az aktuális számlálóértéket adja át argumentumként, majd növeli a számlálót.
Így az első `tick(square)` hívás a `square(0)`-t hívja meg, a következő `tick(square)` a `square(1)`-et, az azt követő a `square(2)`-t, és így tovább.

Egy másik példa a _késleltetett számítás_:

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

A `delay` átvesz egy függvényt és egy értéket, eltárolja őket, majd visszaadja az `invoke`-ot.
Amikor az `invoke`-ot meghívják, lefuttatja az eltárolt függvényt a mentett argumentummal.

A magasabb szintű nyelvekben gyakori minták közül sok, például a visszahívások, a virtuális metódusok, a generátorok, a currying, a függvénykompozíció és még sok más, a tartós állapottal párosított thunkokra épül.
