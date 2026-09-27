# Anleitung

Eine Freundin von dir lernt gerade, Killer Sudokus zu lösen (Regeln unten), kommt aber nicht damit zurecht, herauszufinden, welche Ziffern in einen Käfig gehören.
Sie bittet dich um Hilfe: Schreib ein kleines Programm, das alle gültigen Kombinationen für einen gegebenen Käfig auflistet, zusammen mit allen Einschränkungen, die den Käfig betreffen.

Damit die Ausgabe deines Programms gut lesbar ist, müssen die zurückgegebenen Kombinationen sortiert sein.

## Regeln für Killer Sudoku

- Es gelten die [Standard-Sudoku-Regeln][sudoku-rules].
- Die Ziffern in einem Käfig, der meist durch eine gepunktete Linie markiert ist, ergeben zusammen die kleine Zahl, die in der Ecke des Käfigs steht.
- Eine Ziffer darf in einem Käfig nur einmal vorkommen.

Eine ausführlichere Erklärung findest du in [dieser Anleitung][killer-guide].

## Beispiel 1: Käfig mit nur einer möglichen Kombination

In einem Käfig mit drei Ziffern und der Summe 7 gibt es nur eine gültige Kombination: 124.

- 1 + 2 + 4 = 7
- Jede andere Kombination, die zusammen 7 ergibt, z. B. 232, würde gegen die Regel verstoßen, dass sich Ziffern innerhalb eines Käfigs nicht wiederholen dürfen.

![Sudoku-Raster mit drei Killer-Käfigen, die als zusammengehörig markiert sind.
Der erste Killer-Käfig liegt im 3×3-Block in der oberen linken Ecke des Rasters.
Die mittlere Spalte dieses Blocks bildet den Käfig, mit folgenden Zellen von oben nach unten: Die erste Zelle enthält eine 1 und eine Bleistiftnotiz 7, die auf eine Käfigsumme von 7 hinweist, die zweite Zelle enthält eine 2, die dritte Zelle enthält eine 5.
Die Zahlen sind rot hervorgehoben, um einen Fehler anzuzeigen.
Der zweite Killer-Käfig liegt im mittleren 3×3-Block des Rasters.
Die mittlere Spalte dieses Blocks bildet den Käfig, mit folgenden Zellen von oben nach unten: Die erste Zelle enthält eine 1 und eine Bleistiftnotiz 7, die auf eine Käfigsumme von 7 hinweist, die zweite Zelle enthält eine 2, die dritte Zelle enthält eine 4.
Keine der Zahlen in diesem Käfig ist hervorgehoben und enthält daher keinen Fehler.
Der dritte Killer-Käfig zieht sich um die äußere Ecke des mittleren 3×3-Blocks des Rasters.
Er besteht aus den folgenden drei Zellen: Die obere linke Zelle des Käfigs enthält eine 2, rot hervorgehoben, und eine Käfigsumme von 7.
Die obere rechte Zelle des Käfigs enthält eine 3.
Die untere rechte Zelle des Käfigs enthält eine 2, rot hervorgehoben. Alle anderen Zellen sind leer.][one-solution-img]

## Beispiel 2: Käfig mit mehreren Kombinationen

In einem Käfig mit zwei Ziffern und der Summe 10 gibt es 4 mögliche Kombinationen:

- 19
- 28
- 37
- 46

![Sudoku-Raster, alle Felder leer außer der mittleren Spalte, Spalte 5, in der 8 Reihen gefüllt sind.
Jeweils zwei aufeinanderfolgende Reihen bilden einen Killer-Käfig und sind als zusammengehörig markiert.
Von oben nach unten: Die erste Gruppe ist eine Zelle mit dem Wert 1 und einer Bleistiftnotiz, die eine Käfigsumme von 10 anzeigt, und eine Zelle mit dem Wert 9.
Die zweite Gruppe ist eine Zelle mit dem Wert 2 und einer Bleistiftnotiz 10 und eine Zelle mit dem Wert 8.
Die dritte Gruppe ist eine Zelle mit dem Wert 3 und einer Bleistiftnotiz 10 und eine Zelle mit dem Wert 7.
Die vierte Gruppe ist eine Zelle mit dem Wert 4 und einer Bleistiftnotiz 10 und eine Zelle mit dem Wert 6.
Die letzte Zelle in der Spalte ist leer.][four-solutions-img]

## Beispiel 3: Eingeschränkter Käfig mit mehreren Kombinationen

In einem Käfig mit zwei Ziffern und der Summe 10, bei dem die Spalte bereits eine 1 und eine 4 enthält, gibt es 2 mögliche Kombinationen:

- 28
- 37

19 und 46 sind wegen der 1 und der 4 in der Spalte nach den Standard-Sudoku-Regeln nicht möglich.

![Sudoku-Raster, alle Felder leer außer der mittleren Spalte, Spalte 5, in der 8 Reihen gefüllt sind.
Die erste Reihe enthält eine 4, die zweite ist leer, und die dritte enthält eine 1.
Die 1 ist rot hervorgehoben, um einen Fehler anzuzeigen.
Die letzten 6 Reihen der Spalte bilden Killer-Käfige aus jeweils zwei Zellen.
Von oben nach unten: Die erste Gruppe ist eine Zelle mit dem Wert 2 und einer Bleistiftnotiz, die eine Käfigsumme von 10 anzeigt, und eine Zelle mit dem Wert 8.
Die zweite Gruppe ist eine Zelle mit dem Wert 3 und einer Bleistiftnotiz 10 und eine Zelle mit dem Wert 7.
Die dritte Gruppe ist eine Zelle mit dem Wert 1, rot hervorgehoben, und einer Bleistiftnotiz 10 und eine Zelle mit dem Wert 9.][not-possible-img]

## Probier es selbst aus

Wenn du dich an einem zugänglichen Killer Sudoku versuchen möchtest, kannst du [dieses Rätsel][clover-puzzle] von Clover ausprobieren, das [Mark Goodliffe am 21. Juni 2021 bei Cracking The Cryptic][goodliffe-video] vorgestellt hat.

Killer Sudokus in unterschiedlichen Schwierigkeitsgraden findest du außerdem in zahlreichen Zeitungen sowie in Sudoku-Apps, Büchern und auf Websites.

## Bildnachweis

Die Screenshots oben wurden mit [F-Puzzles.com](https://www.f-puzzles.com/) erstellt, einem Tool zum Erstellen von Puzzles von Eric Fox.

[sudoku-rules]: https://masteringsudoku.com/sudoku-rules-beginners/
[killer-guide]: https://masteringsudoku.com/killer-sudoku/
[one-solution-img]: https://assets.exercism.org/images/exercises/killer-sudoku-helper/example1.png
[four-solutions-img]: https://assets.exercism.org/images/exercises/killer-sudoku-helper/example2.png
[not-possible-img]: https://assets.exercism.org/images/exercises/killer-sudoku-helper/example3.png
[clover-puzzle]: https://app.crackingthecryptic.com/sudoku/HqTBn3Pr6R
[goodliffe-video]: https://youtu.be/c_NjEbFEeW0?t=1180
