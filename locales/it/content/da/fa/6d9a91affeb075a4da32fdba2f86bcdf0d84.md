# Introduzione

In un concetto precedente si è visto che sia le etichette locali sia le funzioni sono solo indirizzi in una sezione che contiene codice eseguibile, come `section .text`.

In realtà, le funzioni si possono manipolare esattamente come qualsiasi indirizzo di memoria: si possono caricare nei registri, passare in giro e memorizzare in memoria.
È anche possibile usare `call` o `jmp` per trasferire l'esecuzione a una funzione memorizzata in un registro o in memoria:

```x86asm
section .text
sum_op:
    lea rax, [rdi + rsi] ; loads the sum rdi + rsi into rax
    ret

apply_sum:
    lea rax, [rel sum_op]
    jmp rax   ; tail call
```

Un indirizzo di funzione che viene passato in giro come un valore si chiama **thunk**.
I thunk sono un elemento costitutivo della **programmazione di ordine superiore** in assembly: codice che opera su altro codice.

## Il codice come dato

Gli indirizzi delle funzioni si possono anche memorizzare in memoria e recuperare più tardi:

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

`save_op` scrive l'indirizzo della funzione che riceve in `cached_fn`.
Il valore rimane in memoria dopo che `save_op` ha restituito il controllo, quindi qualsiasi chiamata successiva a `apply_op` fa un tail-jump all'indirizzo memorizzato per ultimo.
Questo permette di cambiare, durante l'esecuzione, quale funzione chiama `apply_op`.

## Tabelle di dispatch

Memorizzare gli indirizzi delle funzioni in un array permette di selezionare funzioni diverse in base a un indice, che può dipendere da una condizione valutata durante l'esecuzione.
Questa si chiama **tabella di dispatch**:

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

## Thunk con stato

Un thunk che legge o aggiorna una memoria persistente tra una chiamata e l'altra può comportarsi diversamente a seconda di ciò che è successo prima.
Il suo risultato può dipendere da qualcosa in più dei suoi soli argomenti.

Per esempio, un _contatore_ che prende una funzione e la chiama con il conteggio attuale, incrementando il conteggio ogni volta:

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

`tick` chiama la funzione ricevuta passando il conteggio attuale come argomento, poi incrementa il conteggio.
Quindi una prima chiamata `tick(square)` chiama `square(0)`, la chiamata successiva `tick(square)` chiama `square(1)`, poi `square(2)`, e così via.

Un altro esempio è una _computazione ritardata_:

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

`delay` prende una funzione e un valore, li memorizza e restituisce `invoke`.
Quando viene chiamata `invoke`, questa esegue la funzione catturata con l'argomento salvato.

Molti dei pattern comuni nei linguaggi di livello superiore, come callback, metodi virtuali, generatori, currying, composizione di funzioni e molti altri, si basano su thunk abbinati a uno stato persistente.
