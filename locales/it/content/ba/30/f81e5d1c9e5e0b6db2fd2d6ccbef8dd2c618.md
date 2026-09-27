# Suggerimenti

## Generale

- In Factor i caratteri sono interi (punti di codice Unicode), quindi gli operatori numerici `<`, `>`, `=` funzionano direttamente.
- I predicati e la conversione tra maiuscole e minuscole si trovano in [`unicode`][unicode].
- I simboli che restituisci (`less`, `big`, `alpha`, ...) vanno dichiarati prima dell'uso: raggruppali con `SYMBOLS: ... ;`.

## 1. Confrontare due caratteri

- Usa `<` e `>` da [`math`][math].
- Racchiudi i tre casi con `cond` da [`combinators`][combinators].

## 2. Determinare la dimensione

- `LETTER?` è il predicato per le maiuscole, `letter?` quello per le minuscole.

## 3. Cambiare la dimensione

- `ch>upper` e `ch>lower` sono i convertitori per singolo carattere (esistono anche `>upper`/`>lower` a livello di stringa, ma qui hai un solo carattere).

## 4. Determinare il tipo

- L'ordine conta nel tuo `cond`. `Letter?` corrisponde sia alle maiuscole *o* sia alle minuscole, quindi deve essere eseguito prima di qualsiasi controllo specifico per maiuscole o minuscole.

[unicode]: https://docs.factorcode.org/content/vocab-unicode.html
[math]: https://docs.factorcode.org/content/vocab-math.html
[combinators]: https://docs.factorcode.org/content/vocab-combinators.html
