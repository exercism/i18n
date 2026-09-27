# Hinweise

Die Einleitung enthält das meiste, was du für diese Übung brauchst.
Du kannst Aufgabe 5 (Darstellung) auch schon früher erledigen, um dir die Visualisierung zu erleichtern. Sei aber vorsichtig und berücksichtige die verschiedenen möglichen Punktwerte.

## 1. Definiere das Exercism-Logo `Matrix`

- Sei kreativ! Du kannst aber auch einfach aus der Aufgabenstellung kopieren und einfügen.

## 2. Definiere Funktionen, die das Logo die Stirn runzeln lassen

- Denk daran, dass Funktionen, die auf `!` enden, den Eingabewert verändern (an Ort und Stelle), während andere das nicht tun.
- Du kannst `frown!` durch die Zuweisung bestimmter Elemente umsetzen oder (weniger effizient) durch das Vertauschen zweier Zeilen.
- `frown` wird `frown!` sehr ähnlich sein, nur dass es eine `copy` der Eingabematrix zurückgibt.

## 3. Setze eine Stickerwand zusammen

- Verwende deine Funktion `frown()`.
- Die Funktionen `vcat()` und `hcat()` oder ihre Entsprechungen sind hier deine Freunde.
- Beachte, dass es eine Zeile mit `1`s (d. h. `X`s) gibt, die die obere Hälfte von der unteren Hälfte trennt.
- Du kannst die Funktion `ones()` bei Bedarf verwenden, aber sei vorsichtig mit ihrer Form.

## 4. Wandle Punkte in die Pixelanzahl pro Spalte um

- Broadcasting ist eine großartige Möglichkeit, das prägnant zu erledigen.
- Für das Broadcasting brauchst du einen *Zeilen*-Vektor mit den Punktanzahlen der Spalten.
- Um einen Vektor mit den Punktanzahlen der Spalten zu erhalten, kannst du eine Funktion auf die `Matrix` anwenden und dabei `dims` angeben.

## 5. Stelle eine Punktmatrix dar

- Die Punkte (z. B. `1`, `2` usw.) und `0`s müssen in `"X"` bzw. `" "` geändert werden.
- Die Verwendung von `eachrow()` für eine innere Schleife kann hier nützlich sein, ist aber nicht notwendig.
- Die Funktion `join()` kann ebenfalls helfen, alles prägnanter zu machen, und lässt sich sogar broadcasten.
