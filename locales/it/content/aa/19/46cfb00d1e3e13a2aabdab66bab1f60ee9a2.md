# Istruzioni

Il tuo compito è implementare un algoritmo di ricerca binaria.

Un algoritmo di ricerca binaria trova un elemento in un array dividendolo ripetutamente a metà e tenendo solo la metà che contiene l'elemento che stiamo cercando.
Ci permette di restringere rapidamente le possibili posizioni del nostro elemento finché non lo troviamo, o finché non abbiamo eliminato tutte le posizioni possibili.

~~~~exercism/caution
La ricerca binaria funziona solo quando un array è stato ordinato.
~~~~

L'algoritmo funziona così:

- Trova l'elemento centrale di un array *ordinato* e confrontalo con l'elemento che stiamo cercando.
- Se l'elemento centrale è il nostro elemento, abbiamo finito!
- Se l'elemento centrale è maggiore del nostro elemento, possiamo eliminare quell'elemento e tutti gli elementi **dopo** di esso.
- Se l'elemento centrale è minore del nostro elemento, possiamo eliminare quell'elemento e tutti gli elementi **prima** di esso.
- Se ogni elemento dell'array è stato eliminato, allora l'elemento non è presente nell'array.
- Altrimenti, ripeti il processo sulla parte dell'array che non è stata eliminata.

Ecco un esempio:

Diciamo che stiamo cercando il numero 23 nel seguente array ordinato: `[4, 8, 12, 16, 23, 28, 32]`.

- Iniziamo confrontando 23 con l'elemento centrale, 16.
- Dato che 23 è maggiore di 16, possiamo eliminare la metà sinistra dell'array, e ci rimane `[23, 28, 32]`.
- Confrontiamo poi 23 con il nuovo elemento centrale, 28.
- Dato che 23 è minore di 28, possiamo eliminare la metà destra dell'array: `[23]`.
- Abbiamo trovato il nostro elemento.
