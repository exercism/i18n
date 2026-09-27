# Einführung

In einem früheren Konzept war davon die Rede, dass sowohl lokale Labels als auch Funktionen einfach Adressen in einem Abschnitt mit ausführbarem Code sind, etwa `section .text`.

Tatsächlich lassen sich Funktionen genauso behandeln wie jede andere Speicheradresse: Sie können in Register geladen, weitergegeben und im Speicher abgelegt werden.
Es ist außerdem möglich, mit `call` oder `jmp` die Ausführung an eine Funktion zu übergeben, die in einem Register oder im Speicher liegt:

```x86asm
section .text
sum_op:
    lea rax, [rdi + rsi] ; loads the sum rdi + rsi into rax
    ret

apply_sum:
    lea rax, [rel sum_op]
    jmp rax   ; tail call
```

Eine Funktionsadresse, die als Wert weitergegeben wird, nennt man einen **Thunk**.
Thunks sind ein Baustein der **Programmierung höherer Ordnung** in Assembler: Code, der mit anderem Code arbeitet.

## Code als Daten

Funktionsadressen lassen sich auch im Speicher ablegen und später wieder abrufen:

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

`save_op` schreibt die Funktionsadresse, die es erhält, in `cached_fn`.
Der Wert bleibt erhalten, nachdem `save_op` zurückgekehrt ist, sodass jeder spätere Aufruf von `apply_op` per Tail-Call zu der Adresse springt, die zuletzt gespeichert wurde.
Dadurch lässt sich zur Laufzeit ändern, welche Funktion `apply_op` aufruft.

## Dispatch-Tabellen

Werden Funktionsadressen in einem Array abgelegt, lassen sich verschiedene Funktionen anhand eines Index auswählen, der auch von einer Bedingung zur Laufzeit abhängen kann.
Das nennt man eine **Dispatch-Tabelle**:

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

## Zustandsbehaftete Thunks

Ein Thunk, der zwischen Aufrufen einen persistenten Speicher liest oder verändert, kann sich je nachdem, was zuvor passiert ist, anders verhalten.
Sein Ergebnis kann von mehr abhängen als nur von seinen Argumenten.

Zum Beispiel ein _Zähler_, der eine Funktion entgegennimmt und sie mit dem aktuellen Zählerstand aufruft, wobei er den Zähler nach jedem Aufruf erhöht:

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

`tick` ruft die übergebene Funktion mit dem aktuellen Zählerstand als Argument auf und erhöht anschließend den Zähler.
Ein erster Aufruf `tick(square)` ruft also `square(0)` auf, der nächste Aufruf `tick(square)` ruft `square(1)` auf, der darauffolgende `square(2)` und so weiter.

Ein weiteres Beispiel wäre eine _verzögerte Berechnung_:

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

`delay` nimmt eine Funktion und einen Wert entgegen, speichert beide und gibt `invoke` zurück.
Wenn `invoke` aufgerufen wird, führt es die eingefangene Funktion mit dem gespeicherten Argument aus.

Viele der Muster, die in höheren Programmiersprachen üblich sind, wie Callbacks, virtuelle Methoden, Generatoren, Currying und Funktionskomposition, bauen auf Thunks in Kombination mit persistentem Zustand auf.
