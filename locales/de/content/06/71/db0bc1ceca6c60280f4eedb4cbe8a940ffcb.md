# Über

Binärziffern entsprechen letztlich direkt den Transistoren in deiner CPU oder deinem RAM und der Frage, ob jeder von ihnen „an“ oder „aus“ ist.

Die Manipulation auf niedriger Ebene, informell auch „Bit-Twiddling“ genannt, ist besonders in Systemsprachen wichtig.

Hochsprachen wie Julia abstrahieren die meisten dieser Details meist weg. Allerdings steht in der Basissprache eine ganze Reihe von Operationen auf Bit-Ebene [zur Verfügung][bitwise].

***Hinweis:*** Um im REPL eine menschenlesbare Binärausgabe zu sehen, müssen fast alle Beispiele unten in eine `bitstring()`-Funktion eingepackt werden. Das stört optisch, deshalb wurden die meisten Vorkommen dieser Funktion herausgenommen.

## Bitverschiebungen

Ganzzahltypen, ob mit oder ohne Vorzeichen, lassen sich als eine Folge von Einsen und Nullen darstellen.

```julia-repl
julia> bitstring(UInt8(5))
"00000101"
```

Bei einer Bitverschiebung wird einfach alles um eine bestimmte Anzahl von Stellen nach links oder rechts verschoben. Bei `UInt`-Typen fallen an einem Ende einige Bits heraus, und das andere Ende wird mit Nullen aufgefüllt:

```julia-repl
julia> ux::UInt8 = 5
5

julia> bitstring(ux)
"00000101"

julia> ux << 2 # left by 2
"00010100"

julia> ux >> 1 # right by 1
"00000010"
```

Jede Verschiebung nach links verdoppelt den Wert, jede nach rechts halbiert ihn (wobei Reste abgeschnitten werden). In der Dezimaldarstellung sieht man das deutlicher:

```julia-repl
julia> 3 << 2
12

julia> 24 >> 3
3
```

Solche Bitverschiebungen sind deutlich schneller als die „richtige“ Arithmetik, weshalb diese Technik in der Low-Level-Programmierung sehr beliebt ist.

Bei Ganzzahlen mit Vorzeichen müssen wir etwas vorsichtiger sein.

Verschiebungen nach links sind relativ einfach:

```julia-repl
julia> sx = Int8(5)
5

julia> sx # positive integer
"00000101"

julia> sx << 2
"00010100"

julia> -sx # negative integer
"11111011"

julia> -sx << 2
"11101100"
```

Das Verschieben positiver Ganzzahlen mit Vorzeichen nach links ist also dasselbe wie bei Ganzzahlen ohne Vorzeichen.

Negative Werte werden im [Zweierkomplement][2complement] gespeichert, das heißt, das äußerst linke Bit ist 1. Für eine Verschiebung nach links ist das kein Problem, aber wie füllen wir beim Verschieben nach rechts die linken Bits auf?

```julia-repl
julia> sx >> 2 # simple for positive values!
"00000001"

julia> -sx # negative integer
"11111011"

julia> -sx >> 2 # pad with repeated sign bit
"11111110"

julia> -sx >>> 2 # pad with 0
"00111110"
```

Der Operator `>>` führt eine [arithmetische Verschiebung][arithmetic] aus und behält dabei das Vorzeichenbit bei.

Der Operator `>>>` führt eine [logische Verschiebung][logical] aus und füllt mit Nullen auf, als wäre die Zahl ohne Vorzeichen.

Wenn das immer noch unvollständig wirkt, gibt es außerdem eine [`bitrotate()`][bitrotate]-Funktion.

## Bitweise Logik

In einem früheren Konzept haben wir gesehen, dass die Operatoren `&&` (und), `||` (oder) und `!` (nicht) mit booleschen Werten verwendet werden.

Es gibt entsprechende Operatoren `&` (bitweises Und), `|` (bitweises Oder) und `~` (eine Tilde, bitweises Nicht), um die Bits zweier Ganzzahlen zu vergleichen.

```julia-repl
julia> 0b1011 & 0b0010 # bit is 1 in both numbers
"00000010"

julia> 0b1011 | 0b0010 # bit is 1 in at least one number
"00001011"

julia> ~0b1011 # flip all bits
"11110100"

julia> xor(0b1011, 0b0010) # bit is 1 in exactly one number, not both
"00001001"
```

Hier ist `xor()` das [exklusive Oder][xor], verwendet als Funktion (eine alternative Schreibweise findest du weiter unten).

Übrigens lassen sich die Operatoren `&` und `|` auch mit booleschen Werten verwenden. Anders als bei `&&` und `||` werden dann alle Teile des Ausdrucks ausgewertet: Es gibt keine Kurzschlussauswertung.


## Weitere Symbole

Julia liebt Mathematik, und Mathematiker lieben kryptische Symbole, deshalb gibt es hier noch mehr Symbole zum Ausprobieren.

```julia-repl
julia> 0b1011 ⊻ 0b0010 # xor() in infix notation
"00001001"

julia> 0b1011 ⊼ 0b0010 # not and
"11111101"

julia> 0b1011 ⊽ 0b0010 # not or
"11110100"
```

In Julia-kundigen Editoren tippst du sie als `\xor`, `\nand` und `\nor` ein und drückst danach jeweils die Tabulatortaste.

Diese Symbole sind wenig bekannt, selbst unter Leuten, die Mathematik studiert haben (der Autor dieses Konzepts hatte sie noch nie zuvor gesehen). Wenn du sie verwenden willst, überleg dir gut, wen du bittest, deinen Code zu prüfen!


[bitwise]: https://docs.julialang.org/en/v1/manual/mathematical-operations/#Bitwise-Operators
[bitstring]: https://docs.julialang.org/en/v1/base/numbers/#Base.bitstring
[xor]: https://en.wikipedia.org/wiki/Exclusive_or
[2complement]: https://en.wikipedia.org/wiki/Two%27s_complement
[arithmetic]: https://en.wikipedia.org/wiki/Arithmetic_shift
[logical]: https://en.wikipedia.org/wiki/Logical_shift
[bitrotate]: https://docs.julialang.org/en/v1/base/math/#Base.bitrotate
