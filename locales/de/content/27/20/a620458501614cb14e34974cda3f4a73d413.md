# Hinweise

## 1. Den Roboter ausrichten
- Die Reihenfolge, in der du die Operationen ausführst, ist wichtig.
- Es gibt mehrere Möglichkeiten, einen Vektor von Vektoren in eine Matrix umzuwandeln.
- Ein paar Ideen, die beim Erstellen der Matrix helfen können: Comprehensions, for-Schleifen, [`hcat`][hcat-ref], [`reshape`][reshape-ref], [`stack`][stack-ref] usw. ...

## 2. Den Roboter drehen
- Wie du eine Matrix drehst, steht in der Einführung.
- Eine einfache Matrixmultiplikation ist alles, was du brauchst.

## 3. Die korrekte Ausrichtung prüfen
- Denk daran: Es ist die *zweite* Spalte der Matrix, die die Ausrichtung angibt.
- Das lässt sich mit einem Skalarprodukt prüfen.
- Es kann hilfreich sein, die Vektoren zu normalisieren.
- Bei Abweichungen durch Gleitkommazahlen muss die Ausrichtung nur [näherungsweise][isapprox-ref] gleich etwa `~1e-7` sein.
- Die folgende Identität könnte hilfreich sein: `x⋅y = ||x||*||y||cos(θ)`, wobei [`||x|| = norm(x)`][norm-ref]

## 4. Die Koordinaten des Roboterkörpers
- Das ist sehr einfach, aber elementweise Operationen sind wichtig.
- Denk daran, dass man die Ausrichtungsmatrix als drei Ortsvektoren vom Ursprung aus sehen kann.

[hcat-ref]: https://docs.julialang.org/en/v1/base/arrays/#Base.hcat
[reshape-ref]: https://docs.julialang.org/en/v1/base/arrays/#Base.reshape
[stack-ref]: https://docs.julialang.org/en/v1/base/arrays/#Base.stack
[isapprox-ref]: https://docs.julialang.org/en/v1/base/math/#Base.isapprox
[norm-ref]: https://docs.julialang.org/en/v1/stdlib/LinearAlgebra/#LinearAlgebra.norm
