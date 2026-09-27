# Suggerimenti

## Generale

- Ciascuno di questi sceglie una tra tre risposte, quindi ognuno è un `if` con un `elsif` e un `else`.
- Chiedi prima la domanda più impegnativa. Se si chiede `score >= 5` prima di `score >= 8`, la seconda non può mai essere raggiunta.

## 1. Il verdetto

- Tre fasce, quindi due domande: otto o più, poi cinque o più, poi tutto il resto.

## 2. In quale gruppo?

- È più semplice procedere per gradi verso l'alto: prima sotto i 13, poi sotto i 16, poi il resto.
- «Da 13 a 15» e «sotto i 16» descrivono gli stessi artisti, e il secondo è un confronto solo invece di due.

## 3. Quando tornare

- `=` confronta due stringhe: `if group = "Juniors" then`.
- Scrivi i nomi dei gruppi esattamente come li restituisce il compito 2, lettere maiuscole comprese.

## 4. Cosa scrivere sul foglio

- Il primo caso richiede due cose insieme, quindi uniscile con `and`: `if score >= 8 and sings then`.
- Al secondo caso si arriva solo quando il primo è già fallito, quindi non deve chiedere di nuovo se canta.
