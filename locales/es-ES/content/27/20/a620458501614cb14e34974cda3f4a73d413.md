# Consejos

## 1. Orienta el robot
- El orden en el que realizas las operaciones es importante.
- Hay varias formas de convertir un vector de vectores en una matriz.
- Algunas ideas que pueden ayudarte a construir la matriz: comprensiones, bucles `for`, [`hcat`][hcat-ref], [`reshape`][reshape-ref], [`stack`][stack-ref], etc...

## 2. Gira el robot
- Consulta la introducción para saber cómo girar una matriz.
- Basta con una simple multiplicación de matrices.

## 3. Comprueba que la orientación es correcta
- Recuerda: es la *segunda* columna de la matriz la que indica la orientación.
- Puedes comprobarlo con un producto escalar.
- Puede que te resulte útil normalizar los vectores.
- En caso de discrepancias de coma flotante, la orientación solo tiene que ser [aproximadamente][isapprox-ref] igual a `~1e-7`.
- La siguiente identidad podría ayudarte: `x⋅y = ||x||*||y||cos(θ)` donde [`||x|| = norm(x)`][norm-ref]

## 4. Coordenadas del cuerpo del robot
- Esto es muy sencillo, pero las operaciones elemento a elemento son importantes.
- Recuerda que la matriz de orientación se puede ver como tres vectores de posición desde el origen.

[hcat-ref]: https://docs.julialang.org/en/v1/base/arrays/#Base.hcat
[reshape-ref]: https://docs.julialang.org/en/v1/base/arrays/#Base.reshape
[stack-ref]: https://docs.julialang.org/en/v1/base/arrays/#Base.stack
[isapprox-ref]: https://docs.julialang.org/en/v1/base/math/#Base.isapprox
[norm-ref]: https://docs.julialang.org/en/v1/stdlib/LinearAlgebra/#LinearAlgebra.norm
