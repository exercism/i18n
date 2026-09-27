# Introduzione

L'intero track di Julia ti richiederà di trattare la soluzione come delle piccole librerie: devi definire funzioni, tipi ecc. che verranno poi verificati da una suite di test.
Per questo motivo, introdurremo le funzioni con nome come primissimo concetto.

Julia è un linguaggio di programmazione dinamico e fortemente tipizzato.
Lo stile di programmazione è principalmente funzionale, anche se con più flessibilità rispetto a linguaggi come Haskell.

## Variabili e assegnazione

Non c'è bisogno di dichiarare una variabile in anticipo.
Basta assegnare un valore a un nome adatto:

```julia-repl
julia> myvar = 42  # an integer
42

julia> name = "Maria"  # strings are surrounded by double-quotes ""
"Maria"
```

## Costanti

Se un valore deve essere disponibile in tutto il programma ma non si prevede che cambi, è meglio contrassegnarlo come costante.

Anteporre la parola chiave `const` a un'assegnazione permette al compilatore di generare codice più efficiente di quanto sia possibile con una variabile.

Le costanti ti aiutano anche a proteggerti dagli errori di programmazione.
Se provi a modificare per sbaglio il valore `const`, riceverai un avviso:

```julia-repl
julia> const answer = 42
42

julia> answer = 24
WARNING: redefinition of constant Main.answer. This may fail, cause incorrect answers, or produce other errors.
24
```

Nota che una `const` può essere dichiarata solo *fuori* da qualsiasi funzione.
Di solito si trova vicino all'inizio del file `*.jl`, prima delle definizioni delle funzioni.

## Operatori aritmetici

Sono gli stessi di molti altri linguaggi:

```julia
2 + 3  # 5 (addition)
2 - 3  # -1 (subtraction)
2 * 3  # 6 (multiplication)
8 / 2  # 4.0 (division with floating-point result)
8 % 3  # 2 (remainder)
```

## Funzioni

Ci sono due modi comuni per definire una funzione con nome in Julia:

1. Usando la parola chiave `function`

    ```julia
    function muladd(x, y, z)
        x * y + z
    end
    ```

    L'indentazione di 4 spazi è convenzionale per la leggibilità, ma il compilatore la ignora.
    La parola chiave `end` è essenziale.

    Nota che avremmo potuto scrivere `return x * y + z`.
    Tuttavia, le funzioni di Julia restituiscono sempre l'ultima espressione valutata, quindi la parola chiave `return` è facoltativa.
    Molti programmatori preferiscono includerla per rendere più esplicite le proprie intenzioni.

2. Usando la «forma di assegnazione»

    ```julia
    muladd(x, y, z) = x * y + z
    ```

    Si usa più comunemente per creare funzioni concise a espressione singola.

    Nella forma di assegnazione la parola chiave `return` non viene *mai* usata.

Le due forme sono equivalenti e si usano esattamente allo stesso modo, quindi scegli quella che risulta più leggibile.

Per chiamare una funzione si specifica il suo nome e si passano gli argomenti per ciascuno dei parametri della funzione:

```julia
# invoking a function
muladd(10, 5, 1)

# and of course you can invoke a function within the body of another function:
square_plus_one(x) = muladd(x, x, 1)
```

## Convenzioni di denominazione

Come molti linguaggi, Julia richiede che i nomi (di variabili, funzioni e molte altre cose) inizino con una lettera, seguita da una qualsiasi combinazione di lettere, cifre e underscore.

Per convenzione, i nomi di variabili, costanti e funzioni sono in *minuscolo*, con gli underscore ridotti a un minimo ragionevole.