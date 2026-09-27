# Einführung

`Complex numbers` sind nicht kompliziert.
Sie brauchen nur einen weniger beunruhigenden Namen.

Sie sind so nützlich, besonders in Technik und Wissenschaft, dass Julia komplexe Zahlen als Standardzahlentypen neben Ganzzahlen und Gleitkommazahlen integriert hat.

## Grundlagen

Ein `complex`-Wert in Julia ist im Wesentlichen ein Paar von Zahlen: meistens, aber nicht immer, Gleitkommazahlen.
Diese werden aus unglücklichen historischen Gründen „Realteil“ und „Imaginärteil“ genannt.
Konzentriere dich am besten wieder auf die zugrunde liegende Einfachheit und nicht auf die seltsamen Namen.

Um komplexe Zahlen aus zwei reellen Zahlen zu erzeugen, hängst du einfach das Suffix `im` an den Imaginärteil an.

```julia-repl
julia> z = 1.2 + 3.4im
1.2 + 3.4im

julia> typeof(z)
ComplexF64 (alias for Complex{Float64})

julia> zi = 1 + 2im
1 + 2im

julia> typeof(zi)
Complex{Int64}
```

Daher gibt es verschiedene `Complex`-Typen, die vom entsprechenden Ganzzahl- oder Gleitkommatyp abgeleitet sind.

Um eine komplexe Zahl aus reellen Variablen zu erzeugen, funktioniert die obige Syntax nicht.
Wenn du `a + bim` schreibst, denkt der Parser, `bim` sei ein (nicht existierender) Variablenname.

`b*im` zu schreiben ist möglich, aber die bevorzugte Methode verwendet die Funktion `complex()`, die die Multiplikation und Addition umgeht.

```julia-repl
julia> a = 1.2; b = 3.4; complex(a, b)
1.2 + 3.4im
```

Um einzeln auf die Teile einer komplexen Zahl zuzugreifen:

```julia-repl
julia> z = 1.2 + 3.4im
1.2 + 3.4im

julia> real(z)
1.2

julia> imag(z)
3.4
```

Oder zusammen:

```julia-repl
julia> reim(z)
(1.2, 3.4)
```

Jeder der beiden Teile kann null sein, und Mathematiker sprechen dann vielleicht davon, die Zahl sei „vollständig reell“ oder „rein imaginär“.
In Julia ist sie aber trotzdem eine komplexe Zahl.

```julia-repl
julia> zr = 1.2 + 0im
1.2 + 0.0im

julia> typeof(zr)
ComplexF64 (alias for Complex{Float64})

julia> zi = 3.4im
0.0 + 3.4im

julia> typeof(zi)
ComplexF64 (alias for Complex{Float64})
```

Vielleicht hast du schon gehört, dass `i` (oder `j`) die Quadratwurzel aus -1 ist.

Vorerst bedeutet das nur, dass der Imaginärteil _per Definition_ die folgende Gleichung erfüllt:

```julia-repl
julia> 1im * 1im == -1
true
```

Das ist eine einfache Idee, aber sie führt zu interessanten Konsequenzen.

## Arithmetik

Alle üblichen mathematischen `operators` und elementaren Funktionen, die mit Gleitkommazahlen und Ganzzahlen verwendet werden, funktionieren auch mit komplexen Zahlen. Eine kleine Auswahl:

```julia-repl
julia> z1 = 1.5 + 2im
1.5 + 2.0im

julia> z2 = 2 + 1.5im
2.0 + 1.5im

julia> z1 + z2  # addition
3.5 + 3.5im

julia> z1 * z2  # multiplication
0.0 + 6.25im

julia> z1 / z2  # division
0.96 + 0.28im

julia> z1^2  # exponentiation
-1.75 + 6.0im

julia> 2^z1  # another exponentiation
0.5188946835878313 + 2.7804223253571183im
```

## Funktionen

Es gibt mehrere Funktionen, die zusätzlich zu `real()` und `imag()` für komplexe Zahlen besonders relevant sind.

- `conj()` dreht einfach das Vorzeichen des Imaginärteils einer komplexen Zahl um (_von + nach - oder umgekehrt_).
    - Aufgrund der Funktionsweise der komplexen Multiplikation ist das nützlicher, als du vielleicht denkst.
- `abs(<complex number>)` gibt garantiert eine reelle Zahl ohne Imaginärteil zurück.
- `abs2(<complex number>)` gibt das Quadrat von `abs(<complex number>)` zurück: schneller zu berechnen als `abs()` und oft genau das, was eine Berechnung braucht.
- `angle(<complex number>)` gibt den Phasenwinkel im Bogenmaß zurück.

```julia-repl
julia> z1
1.5 + 2.0im

julia> conj(z1)
1.5 - 2.0im

julia> abs(z1)
2.5

julia> abs2(z1)
6.25

julia> angle(z1)
0.9272952180016122
```
Eine teilweise Erklärung für mathematisch Interessierte:

- Die Darstellung `(real, imag)` von `z1` verwendet faktisch kartesische Koordinaten in der komplexen Ebene.
- Dieselbe komplexe Zahl kann in der Schreibweise `(r, θ)` mit Polarkoordinaten dargestellt werden.
- Dabei sind `r` und `θ` durch `abs(z1)` bzw. `angle(z1)` gegeben.

Hier ein Beispiel mit einigen Konstanten:

```julia-repl
julia> euler = exp(1im * π)
-1.0 + 1.2246467991473532e-16im

julia> real(euler)
-1.0

julia> round(imag(euler), digits=15)  # round to 15 decimal places
0.0
```

Die polare Schreibweise `(r, θ)` ist so nützlich, dass es eingebaute Funktionen `cis` (kurz für `cos(x) + isin(x)`) und `cispi` (kurz für `cos(πx) + isin(πx)`) gibt, die helfen, sie effizienter zu konstruieren.

Der Nutzen der Polarform zeigt sich in Eulers eleganter Formel `ℯ^(iθ) = cos(θ) + isin(θ) = x + iy`, wobei `|x + iy| = 1` gilt.
Mit `|x + iy| = r` erhalten wir die allgemeinere Polarform `r * ℯ^(iθ) = r * (cos(θ) + isin(θ)) = x + iy`.
Beachte, dass besonders die Exponentialform kompakt und leicht zu handhaben ist.

```julia-repl
julia> exp(1im * π) ≈ cis(π) ≈ cispi(1)
true
```

Die obige ungefähre Gleichheit liegt daran, dass die Funktionen `cis` und `cispi` schönere numerische Ergebnisse liefern können, besonders `cispi` bei Argumenten, die beliebige Vielfache von π sind (z. B. im Bogenmaß!).

```julia-repl
julia> cis(π)
-1.0 + 0.0im

julia> cispi(1)
-1.0 + 0.0im

julia> θ = π/2;
julia> exp(im*θ)
6.123233995736766e-17 + 1.0im

julia> cis(θ)
6.123233995736766e-17 + 1.0im

julia> cispi(θ / π)  # θ/π == 1/2
0.0 + 1.0im
```

Übrigens macht das komplexe Zahlen sehr nützlich für Rotationen und radiale Verschiebungen in 2D.

Für Rotationen kannst du die komplexe Zahl `z = x + iy` mit einer einfachen Multiplikation um einen Winkel `θ` um den Ursprung drehen: `z * ℯ^(iθ)`.
Beachte, dass `x` und `y` hier einfach die üblichen Koordinaten in der reellen zweidimensionalen kartesischen Ebene sind. Ein positiver Winkel ergibt eine Drehung *gegen den Uhrzeigersinn*, ein negativer Winkel eine Drehung *im Uhrzeigersinn*.

Ebenso einfach lässt sich eine radiale Verschiebung `Δr` erzeugen, indem du sie zum Betrag `r` einer komplexen Zahl in Polarform addierst (z. B. `z = r * ℯ^(iθ)` -> `z' = (r + Δr) * ℯ^(iθ)`).
Beachte, dass der Winkelanteil gleich bleibt und nur der Betrag `r` variiert wird, wie erwartet.
