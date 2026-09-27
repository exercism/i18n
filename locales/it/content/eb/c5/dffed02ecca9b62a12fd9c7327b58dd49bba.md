# Istruzioni

Implementa le operazioni di base sugli array.

Nei linguaggi funzionali, le operazioni sugli array come `length`, `map` e `reduce` sono molto comuni.
Implementa una serie di operazioni di base sugli array, senza usare le funzioni esistenti.

Il numero preciso e i nomi delle operazioni da implementare dipenderà dal track, per evitare conflitti con i nomi già esistenti, ma le operazioni generali che implementerai includono:

- `append` (_dati due array, aggiungi tutti gli elementi del secondo array alla fine del primo array_);
- `concatenate` (_data una serie di array, combina tutti gli elementi di tutti gli array in un unico array appiattito_);
- `filter` (_dati un predicato e un array, restituisci l'array di tutti gli elementi per cui `predicate(item)` è True_);
- `length` (_dato un array, restituisci il numero totale di elementi che contiene_);
- `map` (_date una funzione e un array, restituisci l'array dei risultati dell'applicazione di `function(item)` a tutti gli elementi_);
- `foldl` (_date una funzione, un array e un accumulatore iniziale, piega (riduci) ogni elemento nell'accumulatore da sinistra_);
- `foldr` (_date una funzione, un array e un accumulatore iniziale, piega (riduci) ogni elemento nell'accumulatore da destra_);
- `reverse` (_dato un array, restituisci un array con tutti gli elementi originali, ma in ordine inverso_).

Nota: l'ordine in cui gli argomenti vengono passati alle funzioni fold (`foldl`, `foldr`) è significativo.
