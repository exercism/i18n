# Hinweise

## Allgemein

- Die vorherigen Konzepte [structs][], [maps][] und [methods][] sind hier nützlich.


## 1. Teilnehmende erfassen

- Das Konzept [type definition][] erklärt, wie du einen neuen Typ definierst.
- Mit `make()` erstellst du eine neue Instanz vom Typ `map`.
- Um einen Wert zur Map hinzuzufügen, erzeugst du mit `struct{}{}` eine Instanz des leeren `struct{}`.

## 2. Teilnehmende prüfen

- Wenn ein Element in der Map ist, enthält das Set diesen Wert.
- Mit der [two value assignment][] kannst du prüfen, ob eine Map einen Eintrag enthält.

## 3. Teilnehmende vergleichen

- Zwei Sets sind gleich, wenn alle Werte des einen Sets auch im anderen enthalten sind.
- Mit `range` kannst du alle Elemente des Sets prüfen.

[maps]: https://exercism.org/tracks/go/concepts/maps
[methods]: https://exercism.org/tracks/go/concepts/methods
[structs]: https://exercism.org/tracks/go/concepts/structs
[two value assignment]: https://go.dev/tour/moretypes/22
[type definition]: https://exercism.org/tracks/go/concepts/type-definitions
