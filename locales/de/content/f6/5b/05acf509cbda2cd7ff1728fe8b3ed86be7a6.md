# Anleitung

Verarbeite einfache mathematische Textaufgaben und gib das Ergebnis als Ganzzahl zurück.

## Iteration 0: Zahlen

Aufgaben ohne Operationen ergeben einfach die angegebene Zahl.

> What is 5?

Ergibt 5.

## Iteration 1: Addition

Addiere zwei Zahlen.

> What is 5 plus 13?

Ergibt 18.

Geh auch mit großen Zahlen und negativen Zahlen um.

## Iteration 2: Subtraktion, Multiplikation und Division

Jetzt führst du die anderen drei Operationen aus.

> What is 7 minus 5?

2

> What is 6 multiplied by 4?

24

> What is 25 divided by 5?

5

## Iteration 3: Mehrere Operationen

Verarbeite mehrere Operationen nacheinander.

Da diese Aufgaben in Worten formuliert sind, werte den Ausdruck von
links nach rechts aus und _ignoriere dabei die übliche Reihenfolge der Operationen._

> What is 5 plus 13 plus 6?

24

> What is 3 plus 2 multiplied by 3?

15  (also nicht 9)

## Iteration 4: Fehler

Der Parser sollte Folgendes ablehnen:

* Nicht unterstützte Operationen („What is 52 cubed?")
* Nicht-mathematische Fragen („Who is the President of the United States")
* Textaufgaben mit ungültiger Syntax („What is 1 plus plus 2?")

## Bonus: Potenzen

Wenn du Lust hast, behandle auch Potenzen.

> What is 2 raised to the 5th power?

32
