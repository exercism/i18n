# Einführung

Ein algebraischer Datentyp (ADT) repräsentiert eine feste Anzahl benannter Fälle.
Jeder Wert eines ADT entspricht genau einem der benannten Fälle.

Ein ADT wird mit dem Schlüsselwort `data` definiert, wobei die Fälle durch Pipe-Zeichen (`|`) getrennt werden.
Wenn kein Fall Daten zugeordnet hat, ähnelt der ADT dem, was andere Sprachen üblicherweise als _Aufzählung_ (oder _Enum_) bezeichnen.

```haskell
data Season
  = Spring
  | Summer
  | Autumn
  | Winter
```

Jedem Fall eines ADT können optional Daten zugeordnet sein, und verschiedene Fälle können verschiedene Datentypen haben. Wenn einem Fall Daten zugeordnet sind, ist ein Konstruktor erforderlich.

```haskell
data Number
  = NInt Int      --'NInt' is the constructor for an Int Number.
  | NFloat Float  --'NFloat' is the constructor for an Float Number.
  | Invalid       --'Invalid' does not have data associated to it.
```

Einen Wert für einen bestimmten Fall erstellst du, indem du seinen Namen angibst (z. B. `NInt 22`).
Da Fallnamen einfach Konstruktorfunktionen sind, kannst du zugeordnete Daten als reguläres Funktionsargument übergeben.

ADTs haben _strukturelle Gleichheit_, das heißt, zwei Werte für denselben Fall mit denselben (optionalen) Daten sind äquivalent.

Du kannst zwar `if/else`-Ausdrücke verwenden, um mit ADTs zu arbeiten, aber der empfohlene Weg ist das Pattern Matching mit der _case_-Anweisung:

```haskell
add1 :: Number -> String
add1 number =
    case number of
      NInt    i -> show (i + 1)
      NFloat  f -> show (f + 1.0)
      Invalid   -> error "Invalid input"
```
