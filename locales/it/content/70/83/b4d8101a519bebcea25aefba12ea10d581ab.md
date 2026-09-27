# Suggerimenti

## Generale

- Per questi esercizi ti serviranno le [espressioni condizionali][concept-conditionals].

## 1. Confrontare i caratteri

- I caratteri si possono confrontare con funzioni come `char-greaterp`, `char-lessp` e `char=`.

## 2. Determinare la «dimensione» del carattere

- Common Lisp ha due funzioni per determinare se un carattere è maiuscolo o minuscolo: `upper-case-p` e `lower-case-p`.
- Un carattere può non essere né maiuscolo né minuscolo.

## 3. Cambiare la «dimensione» del carattere

- Common Lisp ha due funzioni per cambiare il caso di un carattere: `char-upcase` e `char-downcase`.

## 4. Determinare il «tipo» di un carattere

- Common Lisp ha una funzione di predicato `alpha-char-p` per stabilire se un carattere è alfabetico.
- Common Lisp ha una funzione di predicato `digit-char-p` per stabilire se un carattere è numerico.
- Puoi usare `char=` per stabilire se due caratteri sono uguali.
- Il carattere spazio si scrive #\Space in Common Lisp.
- Il carattere di nuova riga si scrive #\Newline in Common Lisp.

[concept-conditionals]: /tracks/common-lisp/concepts/conditionals
