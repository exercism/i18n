# Suggerimenti

## Generale

- Leggi qualcosa sulle stringhe nella [documentazione ufficiale del tipo stringa][string-type-documentation].
- Dai un'occhiata alle [_funzioni per le stringhe_][string-functions] disponibili per scoprire le operazioni integrate sulle stringhe.

## 1. Ottenere la prima lettera del nome

- Esiste una [funzione integrata][string-substr] per ottenere il primo carattere di una stringa.
- Esistono diverse [funzioni integrate][string-trim] per rimuovere gli spazi bianchi all'inizio, alla fine, o sia all'inizio che alla fine di una stringa.

## 2. Formattare la prima lettera come iniziale

- Esiste una [funzione integrata][string-upcase] per convertire tutti i caratteri di una stringa nella loro variante maiuscola.
- Esiste un [operatore][concat-operator] che concatena due stringhe.

## 3. Dividere il nome completo in nome e cognome

- Esiste una [funzione integrata][string-explode] che divide una stringa in base a un'altra stringa.
- I primi elementi di un array si possono assegnare a delle variabili tramite il pattern matching sull'array.

## 4. Inserire le iniziali dentro il cuore

- Esiste una sintassi speciale per [espandere le variabili][string-variables] all'interno di una stringa.
- Esiste una sintassi speciale per scrivere [stringhe multilinea][heredoc-syntax] senza dover fare l'escape dei caratteri di nuova riga.

[string-type-documentation]: https://www.php.net/manual/en/language.types.string.php
[string-functions]: https://www.php.net/manual/en/ref.strings.php 
[string-substr]: https://www.php.net/manual/en/function.substr.php 
[string-trim]: https://www.php.net/manual/en/function.trim.php 
[string-upcase]: https://www.php.net/manual/en/function.strtoupper.php
[string-explode]: https://www.php.net/manual/en/function.explode.php
[string-variables]: https://www.php.net/manual/en/language.types.string.php#language.types.string.parsing 
[concat-operator]: https://www.php.net/manual/en/language.operators.string.php
[heredoc-syntax]: https://www.php.net/manual/en/language.types.string.php#language.types.string.syntax.heredoc
