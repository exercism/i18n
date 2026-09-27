# Introduzione

Esistono sostanzialmente due tipi di ciclo:

1. Iterare finché una condizione non è soddisfatta.
2. Iterare sugli elementi di una collezione.

Entrambi sono possibili in Julia, anche se il secondo è forse più comune.

## Il ciclo `while`

Per i problemi aperti, in cui non si sa in anticipo quante volte si dovrà ripetere il ciclo, Julia offre il ciclo `while`.

La forma di base è piuttosto semplice:

```julia
while condition
    do_something()
end
```

In questo caso, il programma continuerà a ripetere il ciclo finché `condition` non è più `true`.

Ci sono due modi per uscire dal ciclo in anticipo:

- Un `break` fa terminare il ciclo, e l'esecuzione riprende dalla riga successiva all'`end` del ciclo.
- Un `return x` interrompe l'esecuzione della funzione corrente, restituendo il valore `x` al codice chiamante.

Con queste opzioni a disposizione, a volte può essere comodo creare un ciclo «infinito» con `while true ... end`, per poi affidarsi a una condizione di arresto trovata all'interno del corpo del ciclo per attivare un `break` o un `return`.

## Iterare su una collezione

L'esempio più semplice è iterare su un intervallo.

Se vogliamo fare qualcosa 10 volte:

```julia
for n in 1:10
    do_something(n)
end
```

Se l'iterazione corrente non soddisfa una certa condizione, è possibile saltare subito all'iterazione successiva con un `continue`:

```julia
for n in 1:10
    if is_useless(n)
        continue
    end
    
    # we decided this iteration could be useful
    do_something_slow(n)
end
```

In forma più breve, il blocco `if` potrebbe essere sostituito da `is_useless(n) && continue`.

Si può iterare su molti altri tipi di collezione: elementi di un array, caratteri di una stringa, chiavi di un dizionario...

Gli esempi visti finora iterano sull'intervallo `1:10`, in cui il valore è anche l'indice del ciclo.

Più in generale, può servire l'indice e non solo il valore.
Per questo si usa la funzione `eachindex()`, ad esempio `for i in eachindex(my_array) ... end`.

## Comprensioni

Scrivere cicli espliciti tende a essere meno comune in Julia che in molti linguaggi tradizionali, perché ci sono varie opzioni più concise.

Un caso particolarmente comune è quando dobbiamo costruire un nuovo vettore dagli elementi di un'altra collezione (vettore, stringa, insieme... ci sono molte possibilità).

Chi apprezza le comprensioni di liste in Python sarà felice di sapere che Julia può usare una sintassi simile.

L'essenza di tutto questo è impostare un ciclo molto compatto all'interno di un vettore.

La sintassi più semplice ha la forma `result = [f(x) for x in some_collection]`.

Con un ciclo tradizionale, si potrebbe scrivere:

```julia
result = []
for x in some_collection
    push!(result, f(x))
end
```

Facoltativamente, si può aggiungere una condizione alla fine, per selezionare solo gli elementi corrispondenti della collezione:

```julia-repl
# multiples of 3
julia> [n^2 for n in 1:10 if n%3 == 0]
3-element Vector{Int64}:
  9
 36
 81
```
