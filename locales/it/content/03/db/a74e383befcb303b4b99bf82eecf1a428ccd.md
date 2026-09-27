# Introduzione

Quando si usa la [ricorsione][exercism-recursion] sugli enumerabili (liste, bitstring, stringhe), ci sono spesso due aspetti da considerare:

- quanta memoria serve per conservare la traccia delle chiamate ricorsive
- come costruire la soluzione in modo efficiente

Per affrontare questi aspetti si può usare un _accumulatore_.

Un accumulatore è una variabile che viene passata insieme ai dati. Serve a trasmettere lo stato attuale dell'esecuzione della funzione, di chiamata in chiamata, fino a raggiungere il _caso base_. Nel caso base, l'accumulatore viene usato per restituire il valore finale della chiamata ricorsiva.

Gli accumulatori dovrebbero essere inizializzati da chi scrive la funzione, non da chi la usa. Per ottenere questo, dichiara due funzioni: una funzione pubblica che prende come argomenti solo i dati necessari e inizializza l'accumulatore, ed una funzione privata che prende anche un accumulatore. In Elixir, è uno schema comune anteporre `do_` al nome della funzione privata.

```elixir
# Count the length of a list without an accumulator
def count([]), do: 0
def count([_head | tail]), do: 1 + count(tail)

# Count the length of a list with an accumulator
def count(list), do: do_count(list, 0)

defp do_count([], count), do: count
defp do_count([_head | tail], count), do: do_count(tail, count + 1)
```

L'uso di un accumulatore permette di trasformare le funzioni ricorsive in funzioni _ricorsive in coda_. Una funzione è ricorsiva in coda se l'_ultima_ cosa eseguita dalla funzione è una chiamata a se stessa.

[exercism-recursion]: https://exercism.org/tracks/elixir/concepts/recursion
