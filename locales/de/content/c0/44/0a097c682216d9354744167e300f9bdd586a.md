# Einführung

„Statistik“ ist ein großes und komplexes Thema mit vielen Facetten.

Einige davon wurden im Konzept [`Randomness`][randomness] angesprochen, das ein eigenes, aber verwandtes Thema ist.

In ihrer einfachsten Form kann Statistik Wege bieten, eine iterierbare Sammlung von Daten in einem einzigen Wert zusammenzufassen.
Wer neu in Julia ist, mag überrascht sein, wie wenige Funktionen standardmäßig in die Sprache eingebaut sind:

- [`sum`][sum], um Zahlen zu addieren.
- [`min`][min] und [`max`][max], um die Extremwerte der übergebenen Parameter zu erhalten.
- [`extrema`][extrema], um das Tupel (min, max) eines iterierbaren Objekts zu erhalten.
- [`length`][length], um alle Werte zu zählen.
- [`count`][count], um nur die Werte zu zählen, die ein bestimmtes Kriterium erfüllen.

```julia-repl
julia> v = collect(1:0.2:3)
11-element Vector{Float64}:
 1.0
 1.2
 ... # display truncated
 3.0

julia> mean(v)
2.0

julia> extrema(v)
(1.0, 3.0)

julia> length(v)
11

julia> min('g', 'a', 'c')
'a': ASCII/Unicode U+0061 (category Ll: Letter, lowercase)

julia> count(isodd, 1:5)  # 1, 3, and 5 are odd
3
```

Diese begrenzte Auswahl an Funktionen ist eine bewusste Entscheidung, um die Basis von Julia schlank zu halten, indem weitere Funktionen in eine Kette anderer Module und Pakete ausgelagert werden.

## Das Modul `Statistics`

Als Teil der Standardbibliothek ist [`Statistics`][statistics] wahrscheinlich schon vorinstalliert. Du musst also nur `using Statistics` an den Anfang des Programms schreiben, um es in den Namensraum zu holen.

Dieses Modul enthält die nächste Stufe gängiger Funktionen, die wahrscheinlich von einem Teil der Programmierer häufig verwendet werden.

Viele der Funktionen in `Statistics` setzen etwas Hintergrundwissen zum Thema voraus.
Die einfachsten Beispiele sind:

- [`mean`][mean], das viele den Durchschnitt nennen würden (gleiches Ergebnis wie `sum / length`).
- [`median`][median], der mittlere Wert nach dem Sortieren.
- [`std`][std], die [Standardabweichung][stddev]: ein Maß dafür, wie weit die Werte streuen.
- [`var`][var], die Varianz: das Quadrat von `std`, das sich in der Regel schneller berechnen lässt.

Jede Funktion hat meist verschiedene Optionen, und es gibt _viel_ mehr Funktionen. Schau dir also die [Dokumentation][statistics] an, wenn du mehr wissen möchtest.

## Andere Pakete

Wie du vielleicht erwartest, ist Statistik ein großer Anwendungsbereich für Julia, und es gibt viele verfügbare Pakete für spezialisiertere Arbeit.

Die Gruppe JuliaStats pflegt freundlicherweise eine [Online-Liste][juliastats].

[statistics]: https://docs.julialang.org/en/v1/stdlib/Statistics/
[randomness]: https://exercism.org/tracks/julia/concepts/randomness
[sum]: https://docs.julialang.org/en/v1/base/collections/#Base.sum
[min]: https://docs.julialang.org/en/v1/base/math/#Base.min
[max]: https://docs.julialang.org/en/v1/base/math/#Base.max
[extrema]: https://docs.julialang.org/en/v1/base/collections/#Base.extrema
[length]: https://docs.julialang.org/en/v1/base/collections/#Base.length
[count]: https://docs.julialang.org/en/v1/base/collections/#Base.count
[mean]: https://docs.julialang.org/en/v1/stdlib/Statistics/#Statistics.mean
[median]: https://docs.julialang.org/en/v1/stdlib/Statistics/#Statistics.median
[std]: https://docs.julialang.org/en/v1/stdlib/Statistics/#Statistics.std
[var]: https://docs.julialang.org/en/v1/stdlib/Statistics/#Statistics.var
[stddev]: https://en.wikipedia.org/wiki/Standard_deviation
[juliastats]: https://juliapackages.com/u/juliastats
