# Hinweise

## Allgemein

- Jede dieser Aufgaben wählt eine von drei Antworten, also ist jede ein `if` mit einem `elsif` und einem `else`.
- Stelle die anspruchsvollste Frage zuerst. Wenn `score >= 5` vor `score >= 8` abgefragt wird, kann die zweite nie erreicht werden.

## 1. Das Urteil

- Drei Bereiche, also zwei Fragen: acht oder mehr, dann fünf oder mehr, dann der Rest.

## 2. Welche Gruppe?

- Von unten nach oben zu arbeiten ist am einfachsten: zuerst unter 13, dann unter 16, dann der Rest.
- „Von 13 bis 15“ und „unter 16“ beschreiben dieselben Teilnehmer. Die zweite braucht nur einen Vergleich statt zwei.

## 3. Wann wiederkommen

- `=` vergleicht zwei Strings: `if group = "Juniors" then`.
- Schreibe die Gruppennamen genau so, wie Aufgabe 2 sie zurückgibt, einschließlich der Großschreibung.

## 4. Was man auf das Blatt schreibt

- Der erste Fall braucht zwei Dinge gleichzeitig, also verbinde sie mit `and`: `if score >= 8 and sings then`.
- Der zweite Fall wird nur erreicht, wenn der erste bereits fehlgeschlagen ist, also braucht er nicht erneut nach dem Singen zu fragen.
