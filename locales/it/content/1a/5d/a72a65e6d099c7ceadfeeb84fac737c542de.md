# Suggerimenti

## Generale

- Il conteggio degli uccelli per giorno è memorizzato in un [campo][fields] chiamato `birdsPerDay`.
- Il conteggio degli uccelli per giorno è un array che contiene esattamente 7 numeri interi.

## 1. Controlla quali erano i conteggi la settimana scorsa

- Poiché questo metodo _non_ dipende dal conteggio della settimana corrente, è definito come [metodo `static`][static-members].
- Ci sono [diversi modi per definire un array][single-dimensional-arrays].

## 2. Controlla quanti uccelli sono arrivati oggi

- Ricorda che i conteggi sono ordinati per giorno dal più vecchio al più recente, con l'ultimo elemento che rappresenta oggi.
- Si può accedere all'ultimo elemento usando il suo indice (fisso), ricordandosi di iniziare a contare da zero, oppure calcolando il suo indice con la [dimensione dell'array][array-length].

## 3. Incrementa il conteggio di oggi

- Imposta l'elemento che rappresenta il conteggio di oggi al conteggio di oggi più 1.

## 4. Controlla se c'è stato un giorno senza uccelli in visita

- La classe `Array` ha un [metodo integrato][array-indexof] che restituisce il primo indice in cui si trova l'elemento, oppure -1 se non è stato trovato alcun elemento corrispondente.

## 5. Calcola il numero di uccelli in visita nei primi giorni

- Si può usare una variabile per tenere il conteggio del numero di uccelli in visita.
- Si può iterare sull'array usando un [ciclo `for`][for-statement].
- La variabile può essere aggiornata all'interno del ciclo.
- Ricorda: gli array sono indicizzati a partire da `0`.

## 6. Calcola il numero di giorni intensi

- Si può usare una variabile per tenere il numero di giorni intensi.
- Si può iterare sull'array usando un [ciclo `foreach`][array-foreach].
- La variabile può essere aggiornata all'interno del ciclo.
- All'interno del ciclo si può usare un'[istruzione condizionale][if-statement].

[array-foreach]: https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/arrays/using-foreach-with-arrays
[single-dimensional-arrays]: https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/arrays/single-dimensional-arrays
[fields]: https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/fields
[static-members]: https://www.oreilly.com/library/view/programming-c/0596001177/ch04s03.html
[array-indexof]: https://docs.microsoft.com/en-us/dotnet/api/system.array.indexof
[if-statement]: https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/if-else
[array-length]: https://docs.microsoft.com/en-us/dotnet/api/system.array.length
[for-statement]: https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/for
