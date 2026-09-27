# Suggerimenti

## 1. Definisci i tipi personalizzati

I tipi astratti e l'ereditarietà dei tipi sono stati affrontati nel concetto [Tipi composti][composite].

## 2. Ottieni il nome dell'animale domestico.

- È banale per Dog e Cat, ma è utile per i test dei metodi di fallback.

## 3. Definisci cosa succede quando cani e gatti si incontrano

- Quante combinazioni esistono per gli incontri tra gatto e cane?
- Ricorda che un gatto che incontra un cane reagisce in modo diverso da un cane che incontra un gatto.
- Ci serve la risposta del primo argomento: `a` in `meet(a, b)`.

## 4. Definisci un incontro tra due entità.

- Il valore restituito è una stringa più lunga rispetto a `meet()`.
- Usa un solo metodo per `encounter()`.
- L'[interpolazione di stringhe][interpolation] ti è d'aiuto quando componi un valore restituito.

## 5. Definisci una reazione di fallback per gli incontri tra animali domestici

- Ora il secondo argomento è un `Pet` diverso da `Cat` o `Dog`, quindi aggiungi un metodo `meet`.
- Dichiarare tipi di parametro astratti oppure vincolarli tramite metodi parametrici sono due modi per ottenere questo risultato.

## 6. Definisci un fallback se un animale domestico incontra qualcosa che non conosce

- Ora il secondo argomento può essere qualsiasi cosa.

## 7. Definisci un fallback generico

- Ora entrambi gli argomenti possono essere qualsiasi cosa.
- Alla fine dell'esercizio avrai 7 metodi per `meet`.

[composite]: https://exercism.org/tracks/julia/concepts/composite-types
[interpolation]: https://docs.julialang.org/en/v1/manual/strings/#string-interpolation
