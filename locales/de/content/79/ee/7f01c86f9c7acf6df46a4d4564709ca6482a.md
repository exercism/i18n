# Einführung

Ein `vector` in R ist eine Sammlung von Werten desselben `mode`: `numeric`, `character`, usw. Wenn man gemischte Eingaben übergibt, wandelt R sie stillschweigend in einen gemeinsamen Typ um, meist character, was zu unerwarteten Ergebnissen führen kann.

## Vektoren erstellen

Wenn du alle Werte bereits hast, verwende `c()` (kurz für „concatenate“ oder „combine“):

```R
x <- 10
v <- c(4, 7, x)
```

Die `c()`-Funktion ist sehr flexibel, und Eingaben können andere Vektoren und Bereiche enthalten.
`c()` nimmt jede Anzahl und Vielfalt von Eingaben und flacht sie zu einem einzigen Vektor ab.

## Bereiche

Für einen Bereich aufeinanderfolgender Werte (aufsteigend oder absteigend) kannst du die `:`-Notation verwenden.

```R
v <- 1:5 # equivalent to c(1, 2, 3, 4, 5)
w <- 10:7 # c(10, 9, 8, 7)
```

## Auf Vektorelemente zugreifen

Wie in vielen Sprachen können wir den Index in eckigen Klammern verwenden:

```R
> v <- 4:7
> v[2]
[1] 5
> v[2:4]
[1] 5 6 7
```

Aber Vorsicht: ***R verwendet standardmäßig eine 1-basierte Indexierung***.

Das ist üblich für wissenschaftliche Sprachen (Fortran, Matlab, Julia), unterscheidet sich aber von der nullbasierten Indexierung in C und seinen vielen Nachfolgern.

Bereiche können verwendet werden, wie im obigen Beispiel, aber auch in der sehr flexiblen `c()`-Funktion:

```R
v <- c(4, 7, 10)
w <- c(2, v[2:3], 11) # c(2, 7, 10, 11)
```

`vectors` (wie die meisten Dinge in R) können als veränderbar behandelt werden, wobei man mit ähnlich flexibler Syntax in einzelne oder mehrere Elemente schreiben kann:

```R
> v <- 1:10
> v[2] <- 42
> v[4:6] <- c(11, 12, 13)
> v
 [1]  1 42  3 11 12 13  7  8  9 10
```

## Negative Indizes

Programmierer, die andere Sprachen kennen, könnten vermuten, dass `v[-1]` ein Weg ist, auf das letzte Element in einem Vektor zuzugreifen.
Falsch!

Negative Indizes sind tatsächlich ein Weg, ein Element zu ***entfernen*** und einen kürzeren Vektor zurückzugeben:

```R
> v <- c(2, 4, 6)
> v[-2]
[1] 2 6  # second element gone
```
