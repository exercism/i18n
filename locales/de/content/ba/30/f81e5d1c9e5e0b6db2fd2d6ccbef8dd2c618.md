# Hinweise

## Allgemeines

- Zeichen in Factor sind Ganzzahlen (Unicode-Codepoints), daher funktionieren die
  numerischen Vergleiche `<`, `>`, `=` direkt.
- Prädikate und die Umwandlung von Groß- und Kleinschreibung findest du in
  [`unicode`][unicode].
- Die Symbole, die du zurückgibst (`less`, `big`, `alpha`, ...), müssen vor der
  Verwendung deklariert werden; fasse sie mit `SYMBOLS: ... ;` zusammen.

## 1. Vergleiche zwei Zeichen

- Verwende `<` und `>` aus [`math`][math].
- Umschließe die drei Fälle mit `cond` aus [`combinators`][combinators].

## 2. Bestimme die Größe

- `LETTER?` ist das Prädikat für Großbuchstaben, `letter?` das für
  Kleinbuchstaben.

## 3. Ändere die Größe

- `ch>upper` und `ch>lower` sind die Konverter für einzelne Zeichen
  (auf String-Ebene gibt es auch `>upper`/`>lower`, aber du hast hier ein
  einzelnes Zeichen).

## 4. Bestimme den Typ

- Die Reihenfolge ist in deinem `cond` wichtig. `Letter?` passt auf Groß- *oder*
  Kleinbuchstaben, sollte also vor jedem Test laufen, der auf eine bestimmte
  Schreibweise abzielt.

[unicode]: https://docs.factorcode.org/content/vocab-unicode.html
[math]: https://docs.factorcode.org/content/vocab-math.html
[combinators]: https://docs.factorcode.org/content/vocab-combinators.html
