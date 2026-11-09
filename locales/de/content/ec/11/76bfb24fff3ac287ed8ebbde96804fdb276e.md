# Einführung

`Complex numbers` sind nicht kompliziert.
Sie brauchen nur einen weniger alarmierenden Namen.

Sie sind so nützlich, besonders in Technik und Wissenschaft, dass R [komplexe Zahlen][web-complex] neben integer, double, logical, character und raw zu den standardmäßigen [atomaren Typen][ref-atomic] zählt.

## Grundlagen

Eine `complex`-Zahl in R ist ein einzelner Wert.
In der Praxis kann man sie sich jedoch als ein Paar von Zahlen vorstellen.
Diese werden aus unglücklichen historischen Gründen der „Realteil“ und der „Imaginärteil“ genannt.
Auch hier gilt: Am besten konzentrierst du dich auf die zugrunde liegende Einfachheit und nicht auf die seltsamen Namen.

Um komplexe Zahlen aus zwei reellen Zahlen zu erzeugen, hängst du einfach das Suffix `i` an den Imaginärteil an.

```r
2+3i
#> [1] 2+3i

typeof(2+3i)
#> [1] "complex"
```

Um aus reellen Variablen eine komplexe Zahl zu erzeugen, funktioniert die obige Syntax nicht.
Wenn du `r + imi` schreibst, denkt der Parser, `imi` sei ein (nicht existierender) Variablenname.

Multipliziere den Imaginärteil entweder mit `1i` oder verwende die Funktion [`complex()`][ref-complex]:

```r
r <- 2
im <- 3

r + im * 1i
#> [1] 2+3i

# must include the `real` and `imaginary` keywords
complex(real = r, imaginary = im)
#> [1] 2+3i
```

Du fragst dich vielleicht, warum `i` und nicht `j`?

Die meisten Ingenieure bevorzugen `j`.
Die meisten Naturwissenschaftler und Mathematiker bevorzugen die mathematische Schreibweise `i` für _imaginär_, aber diese Schreibweise steht im Konflikt mit der Verwendung von `i` für _Strom_ in der Elektrotechnik.

R entschied sich für `i`, Python für `j`, und Julia umging den Streit, indem es `im` wählte.
Sei vorsichtig, wenn du zwischen [MINT][wiki-STEM]-Programmiersprachen wechselst.

Um auf die einzelnen Bestandteile einer komplexen Zahl zuzugreifen:

```r
z <- 2+3i

Re(z)  # real part
#> [1] 2

Im(z)  # imaginary part
#> [1] 3
```

Jeder der beiden Teile kann null sein, und Mathematiker sprechen dann vielleicht davon, dass die Zahl „rein reell“ oder „rein imaginär“ ist.
In R ist sie trotzdem immer noch eine komplexe Zahl.

```r
1.2 + 0i
#> [1] 1.2+0i

typeof(1.2 + 0i)
#> [1] "complex"

2i
#> [1] 0+2i

typeof(2i)
#> [1] "complex"
```

Du hast vielleicht schon gehört, dass „`i` (oder `j`) die Quadratwurzel aus -1 ist“.

Vorerst bedeutet das nur, dass der Imaginärteil _per Definition_ die folgende Gleichung erfüllt:

```r
1i * 1i == -1  # more precisely, 1i * 1i == -1 + 0i
#> [1] TRUE
```

Das ist eine einfache Idee, aber sie hat interessante Konsequenzen.

## Arithmetik

Die meisten der [`operators`][ref-operators], die mit Gleitkommazahlen und Ganzzahlen verwendet werden, funktionieren auch mit komplexen Zahlen:

```r
z1 = 1.5 + 2i
z2 = 2 + 1.5i

z1 + z2  # addition
#> [1] 3.5+3.5i

z1 * z2  # multiplication
#> [1] 0+6.25i

z1 / z2  # division
#> [1] 0.96+0.28i

z1^2  # exponentiation
#> [1] -1.75+6i

2^z1  # another exponentiation
#> [1] 0.518895+2.780422i
```

Die Regeln für die Multiplikation und Division komplexer Zahlen zu erklären, würde den Rahmen dieses Konzepts sprengen (_und du wirst diese Operationen wahrscheinlich nicht sehr oft „von Hand“ ausführen müssen_).

Jede [mathematische][web-math-complex] oder [elektrotechnische][web-engineering-complex] Einführung in komplexe Zahlen behandelt das, falls du tiefer in das Thema einsteigen möchtest.

Alternativ hat Exercism eine Praxisübung [`Complex Numbers`][exercise-complex-numbers], in der du eine Klasse für komplexe Zahlen mit diesen Operationen von Grund auf implementieren kannst.

Ganzzahlige Division ist bei komplexen Zahlen im Allgemeinen ___nicht___ möglich, deshalb schlagen die Operatoren `%/%` und `%%` für den komplexen Zahlentyp fehl.

## Funktionen

Die meisten mathematischen Funktionen funktionieren mit komplexen Eingabewerten.

Wenn du jedoch reelle Eingabewerte übergibst und eine komplexe Ausgabe erwartest, funktioniert das normalerweise nicht.

```r
sqrt(z1)
#> [1] 1.414214+0.707107i

sqrt(-1)  # fails!
#> Warning in sqrt(-1) : NaNs produced
#> [1] NaN

sqrt(-1 + 0i)  # succeeds with complex input
#> [1] 0+1i

sin(z1)
#> [1] 3.752771+0.256554i
```

Neben `Re()` und `Im()` gibt es noch einige Funktionen, die für komplexe Zahlen besonders relevant sind.

- `Conj()` dreht einfach das Vorzeichen des Imaginärteils einer komplexen Zahl um (_von + nach - oder umgekehrt_).
  - Wegen der Funktionsweise der komplexen Multiplikation ist das nützlicher, als du vielleicht denkst.
- `abs(<complex number>)` gibt garantiert eine reelle Zahl ohne Imaginärteil zurück (ihren „Betrag“), und `Mod(<complex number>)` ist ein Synonym.
- `Arg(<complex number>)` gibt den Phasenwinkel im Bogenmaß zurück.

```r
z1
#> [1] 1.5+2i

abs(z1)
#> [1] 2.5

Mod(z1)  # same as previous
#> [1] 2.5

Conj(z1)  # flip sign
#> [1] 1.5-2i

Arg(z1)
#> [1] 0.9272952
```

[web-complex]: https://www.cfm.brown.edu/people/dobrush/am33/R/intro/complex0.html
[ref-atomic]: https://cran.r-project.org/doc/manuals/r-release/R-lang.html#Vectors
[ref-complex]: https://www.rdocumentation.org/packages/base/versions/3.3.0/topics/complex
[web-math-complex]: https://www.nagwa.com/en/videos/143121736364/
[web-engineering-complex]: https://www.khanacademy.org/science/electrical-engineering/ee-circuit-analysis-topic/ee-ac-analysis/v/ee-complex-numbers
[ref-operators]: https://stat.ethz.ch/R-manual/R-devel/library/base/html/Syntax.html
[wiki-STEM]: https://en.wikipedia.org/wiki/Science,_technology,_engineering,_and_mathematics
[exercise-complex-numbers]: https://exercism.org/tracks/r/exercises/complex-numbers
