# Suggerimenti

## Generale

## 1. Compra un'auto radiocomandata nuova di zecca

- [Questa pagina mostra come creare una nuova istanza di una classe][creating-objects].

## 2. Mostra la distanza percorsa

- Tieni traccia della distanza percorsa in un [campo][fields].
- Considera quale visibilità usare per il campo (deve essere usato all'esterno della classe?).
- Considera di usare l'[interpolazione di stringhe][string-interpolation] per formattare la stringa da restituire.

## 3. Mostra la percentuale della batteria

- Tieni traccia della carica iniziale della batteria in un [campo][fields].
- Inizializza il campo a un valore specifico che corrisponde alla carica iniziale prevista della batteria.
- Considera quale visibilità usare per il campo (deve essere usato all'esterno della classe?).
- Considera di usare l'[interpolazione di stringhe][string-interpolation] per formattare la stringa da restituire.

## 4. Aggiorna il numero di metri percorsi quando guidi

- Aggiorna il campo che rappresenta la distanza percorsa.

## 5. Aggiorna la percentuale della batteria quando guidi

- Aggiorna il campo che rappresenta la percentuale della batteria.

## 6. Impedisci di guidare quando la batteria è scarica

- Aggiungi un'istruzione condizionale per aggiornare solo la distanza e la batteria se la batteria non è già scarica.
- Aggiungi un'istruzione condizionale per mostrare il messaggio di batteria scarica se la batteria è scarica.

[creating-objects]: https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/classes#creating-objects
[fields]: https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/fields
[string-interpolation]: https://christianfindlay.com/2019/10/04/c-string-interpolation/
