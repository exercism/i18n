# Approfondimento

La riduzione è l'applicazione ripetuta di una funzione a ciascun elemento di una sequenza, accumulando in qualche modo i risultati.
La funzione applicata prende due parametri: il valore accumulato corrente e l'elemento da elaborare.
Deve restituire il nuovo valore accumulato.

In alcuni linguaggi di programmazione questo processo viene chiamato accumulate o fold.

In Common Lisp il processo si realizza con la funzione `reduce`.
Nella sua forma più semplice si presenta così:

`(reduce #'function-to-apply sequence :initial-value value)`

Nota che viene fornito un valore iniziale: sarà il «valore accumulato corrente» che viene passato alla funzione quando si elabora il primo elemento.

Ecco un esempio che somma tra loro i numeri della lista partendo da un valore iniziale di 10:

`(reduce #'+ '(1 2 3 4) :initial-value 10) ; => 20`

Nota che se la sequenza è vuota la funzione non viene mai chiamata e la forma dà come risultato il valore iniziale.

## Specificare o meno il valore iniziale

L'argomento `:initial-value` non è obbligatorio e `reduce` si comporta in modo diverso a seconda che sia stato fornito e che la sequenza contenga elementi.

1. Se il valore iniziale non viene fornito e la sequenza ha più di un elemento, la funzione viene chiamata la prima volta con i primi due elementi della sequenza.
2. Se il valore iniziale non viene fornito e la sequenza ha un solo elemento, la forma dà come risultato quell'elemento e la funzione non viene chiamata.
3. Se il valore iniziale viene fornito e la sequenza è vuota, la forma dà come risultato il valore iniziale e la funzione non viene chiamata.
4. Se il valore iniziale non viene fornito e la sequenza è vuota, la funzione viene chiamata con *zero* argomenti.

L'ultimo caso è uno di quelli che possono trarre in inganno.
Di solito è facile fornire un valore iniziale, così che il programma non arrivi mai a questo strano caso.

## Altri argomenti keyword

`reduce` accetta altri argomenti keyword che possono essere utili in alcuni casi.

* `:start` e `:end`: specificano indici nella sequenza che fanno lavorare `reduce` su una sottosequenza. Il loro valore predefinito è `0` e `nil`, rispettivamente, cioè l'inizio e la fine della sequenza.
* `:from-end`: se questo booleano generalizzato si valuta vero, la riduzione avverrà da destra a sinistra invece di lavorare da sinistra a destra.
* `:key`: specifica una funzione da chiamare su ciascun elemento *prima* che venga passato alla funzione di riduzione. Questa funzione *non* viene applicata al valore specificato come `:initial-value`.

Alcuni esempi:

```lisp
(reduce #'+ '(1 2 3 4 5 6 7 8 9 10) 
        :start 2 :end 5)               ; => 12 (only adds 3, 4, 5)
(reduce #'cons '(1 2 3))               ; => ((1 . 2) . 3)
(reduce #'cons '(1 2 3) :from-end t)   ; => (1 2 . 3)
(reduce #'+ '((1) (2) (3)) :key #'car) ; => 6
```
