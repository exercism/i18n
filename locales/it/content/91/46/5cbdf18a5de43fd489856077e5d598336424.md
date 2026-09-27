# Consigli

## Generale

- È possibile, ma non obbligatorio, risolvere ogni compito con una sola istruzione all'interno del corpo della funzione.


## 1. Determina se una carta è presente

- La carta è presente [nel][ref-match] mazzo?

## 2. Trova la posizione di una carta

- La carta è nel mazzo?
- Se sì, in [quale][ref-which] posizione?
- Si ha la garanzia che tutte le carte sono diverse, il che rende il compito più semplice.
- Restituisci la posizione oppure `-1`.
  - Vedi il [concetto Conditionals][concept-conditionals] per vari modi di diramare se qualcosa è `TRUE` o `FALSE`.
  - Se usi [`if_else`][ref-if_else] (l'approccio più moderno, ma non davvero necessario qui), sappi che è rigoroso sul fatto che entrambi i rami restituiscano lo stesso tipo di risultato. Potresti dover restituire esplicitamente un singolo elemento, invece di un vettore che potrebbe essere vuoto.
  - Per ottenere il primo elemento di un vettore, basta aggiungere `[1]` dopo qualsiasi cosa che restituisca un vettore.

## 3. Determina se ogni carta è pari

- L'operatore modulo è `%%`.
- `x` è pari se `x %% 2 == 0`.
- [Tutte][ref-all] le carte soddisfano questo criterio?

## 4. Verifica se il mazzo contiene una carta con valore dispari

- Una carta è dispari se non è pari, quindi vedi il compito precedente.
- C'è [qualche][ref-any] carta che soddisfa questo criterio?

## 5. Ottieni la prima carta dispari dal mazzo

- C'è una carta dispari nel mazzo?
- Se sì, restituisci la prima _carta_ (non la posizione).

## 6. Determina la posizione della prima carta pari

- C'è una carta pari nel mazzo?
- Se sì, restituisci la _posizione_ della prima carta pari.

[ref-match]: https://www.rdocumentation.org/packages/base/versions/3.6.2/topics/match
[ref-which]: https://www.rdocumentation.org/packages/base/versions/3.3.0/topics/which
[concept-conditionals]: https://exercism.org/tracks/r/concepts/conditionals
[ref-all]: https://www.rdocumentation.org/packages/base/versions/3.3.0/topics/all
[ref-any]: https://www.rdocumentation.org/packages/base/versions/3.3.0/topics/any
[ref-if_else]: https://dplyr.tidyverse.org/reference/if_else.html
