# Hinweise

## Allgemein

- Für diese Übungen brauchst du [bedingte Ausdrücke][concept-conditionals].

## 1. Zeichen vergleichen

- Zeichen lassen sich mit Funktionen wie `char-greaterp`, `char-lessp` und `char=` vergleichen.

## 2. Die „Größe“ eines Zeichens bestimmen

- Common Lisp hat zwei Funktionen, um festzustellen, ob ein Zeichen groß- oder kleingeschrieben ist: `upper-case-p` und `lower-case-p`.
- Ein Zeichen kann weder groß- noch kleingeschrieben sein.

## 3. Die „Größe“ eines Zeichens ändern

- Common Lisp hat zwei Funktionen, um die Groß- und Kleinschreibung eines Zeichens zu ändern: `char-upcase` und `char-downcase`.

## 4. Den „Typ“ eines Zeichens bestimmen

- Common Lisp hat eine Prädikatfunktion `alpha-char-p`, mit der du feststellen kannst, ob es sich um ein alphabetisches Zeichen handelt.
- Common Lisp hat eine Prädikatfunktion `digit-char-p`, mit der du feststellen kannst, ob es sich um ein numerisches Zeichen handelt.
- Mit `char=` kannst du feststellen, ob zwei Zeichen gleich sind.
- Das Leerzeichen wird in Common Lisp als #\Space geschrieben.
- Das Zeilenumbruchzeichen wird in Common Lisp als #\Newline geschrieben.

[concept-conditionals]: /tracks/common-lisp/concepts/conditionals
