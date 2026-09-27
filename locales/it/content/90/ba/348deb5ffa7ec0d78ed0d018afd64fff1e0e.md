# Suggerimenti

## 1. Individua quale applicazione ha emesso un log

- La parola chiave `range` può essere usata per iterare sulle rune di una determinata stringa.
- Le rune si possono confrontare tra loro con una condizionale `if`.
- Un carattere racchiuso tra apici singoli è una `rune` in Go.

## 2. Correggi i log corrotti

- La concatenazione di stringhe può essere usata per costruire la riga di log modificata runa per runa.
- Perché quella concatenazione funzioni, potrebbe essere necessario convertire prima ogni `rune` in una stringa.
- Puoi convertire una runa `r` in `string` con `string(r)`.

## 3. Determina se un log può essere visualizzato

- Le rune possono occupare 1, 2, 3 o 4 byte, quindi la funzione predefinita `len` potrebbe non riflettere con precisione il numero di caratteri di una stringa.
