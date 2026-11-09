# Pistas

## 1. Orienta el robot
- El orden en que realizas las operaciones es importante.
- Hay varias formas de convertir un vector de vectores en una matriz.
- Algunas ideas que pueden ayudarte a crear la matriz: comprensiones, bucles `for`, [`hcat`][hcat-ref], [`reshape`][reshape-ref], [`stack`][stack-ref], etc.

## 2. Rota el robot
- Consulta la Introducción para saber cómo rotar una matriz.
- Basta con una simple multiplicación de matrices.

## 3. Verifica la orientación correcta
- Recuerda que es la *segunda* columna de la matriz la que indica la orientación.
- Esto se puede verificar con un producto punto.
- Puede ser útil normalizar los vectores.
- En caso de discrepancias de punto flotante, la orientación solo necesita ser [aproximadamente][isapprox-ref] igual a alrededor de `~1e-7`.
- La siguiente identidad podría ser útil: `x⋅y = ||x||*||y||cos(θ)` donde [`||x|| = norm(x)`][norm-ref] 

## 4. Coordenadas del cuerpo del robot
- Esto es muy sencillo, pero las operaciones elemento a elemento son importantes.
- Recuerda que la matriz de orientación se puede ver como tres vectores de posición desde el origen.

[hcat-ref]: https://docs.julialang.org/en/v1/base/arrays/#Base.hcat
[reshape-ref]: https://docs.julialang.org/en/v1/base/arrays/#Base.reshape
[stack-ref]: https://docs.julialang.org/en/v1/base/arrays/#Base.stack
[isapprox-ref]: https://docs.julialang.org/en/v1/base/math/#Base.isapprox
[norm-ref]: https://docs.julialang.org/en/v1/stdlib/LinearAlgebra/#LinearAlgebra.norm
