# Intestazione fittizia

## Libreria di funzioni

Questo è il primo esercizio in cui la soluzione che scriviamo non è uno script «main». Stiamo scrivendo una libreria che verrà caricata con «source» in altri script, che richiameranno le nostre funzioni.

### I nameref di Bash

Questo esercizio richiede l'uso di variabili `nameref`. Per questo serve una versione di bash almeno 4.0. Se usi il bash predefinito su MacOS, dovrai installare un'altra versione: vedi [Installare Bash](https://exercism.io/tracks/bash/installation)

I nameref sono un modo per passare una variabile a una funzione _per riferimento_. In questo modo, la variabile può essere modificata all'interno della funzione e il valore aggiornato è disponibile nello scope chiamante. Ecco un esempio:
```bash
prependElements() {
    local -n __array=$1
    shift
    __array=( "$@" "${__array[@]}" )
}

my_array=( a b c )
echo "before: ${my_array[*]}"    # => before: a b c

prependElements my_array d e f
echo "after: ${my_array[*]}"     # => after: d e f a b c
```
