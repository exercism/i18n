# Hinweise

## 1. Eigene Typen definieren

Abstrakte Typen und Typvererbung wurden im Konzept [Zusammengesetzte Typen][composite] behandelt.

## 2. Ermittle den Namen des Haustiers

- Für Dogs und Cats ist das trivial, aber für die Tests der Fallback-Methoden hilfreich.

## 3. Definiere, was passiert, wenn Katzen und Hunde aufeinandertreffen

- Wie viele Kombinationen von Begegnungen zwischen Katze und Hund gibt es?
- Denk daran, dass eine Katze auf einen Hund anders reagiert als ein Hund auf eine Katze.
- Wir brauchen die Antwort des ersten Arguments: `a` in `meet(a, b)`.

## 4. Definiere eine Begegnung zwischen zwei Entitäten

- Der Rückgabewert ist ein längerer String als bei `meet()`.
- Verwende für `encounter()` nur eine einzige Methode.
- Beim Zusammensetzen eines Rückgabewerts hilft dir die [String-Interpolation][interpolation].

## 5. Definiere eine Fallback-Reaktion für Begegnungen zwischen Haustieren

- Das zweite Argument ist jetzt ein anderes `Pet` als `Cat` oder `Dog`, füge also eine `meet`-Methode hinzu.
- Abstrakte Parametertypen zu deklarieren oder sie über parametrische Methoden einzuschränken, sind zwei Wege, das zu erreichen.

## 6. Definiere einen Fallback, falls ein Haustier auf etwas trifft, das es nicht kennt

- Das zweite Argument kann jetzt beliebig sein.

## 7. Definiere einen generischen Fallback

- Beide Argumente können jetzt beliebig sein.
- Am Ende der Übung hast du 7 Methoden für `meet`.

[composite]: https://exercism.org/tracks/julia/concepts/composite-types
[interpolation]: https://docs.julialang.org/en/v1/manual/strings/#string-interpolation
