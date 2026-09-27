# Dicas

## 1. Orienta o robô
- A ordem pela qual realizas as operações é importante.
- Há várias formas de converter um vetor de vetores numa matriz.
- Algumas ideias que podem ajudar a construir a matriz: compreensões, ciclos for, [`hcat`][hcat-ref], [`reshape`][reshape-ref], [`stack`][stack-ref], etc...

## 2. Roda o robô
- Consulta a Introdução para saberes como rodar uma matriz.
- Basta uma simples multiplicação de matrizes.

## 3. Verifica se a orientação está correta
- Lembra-te de que é a *segunda* coluna da matriz que indica a orientação.
- Podes verificar isto com um produto escalar.
- Pode ser útil normalizar os vetores.
- No caso de haver discrepâncias de vírgula flutuante, a orientação só precisa de ser [aproximadamente][isapprox-ref] igual a cerca de `~1e-7`.
- A seguinte identidade pode ser útil: `x⋅y = ||x||*||y||cos(θ)` em que [`||x|| = norm(x)`][norm-ref] 

## 4. Coordenadas do corpo do robô
- Isto é muito simples, mas as operações elemento a elemento são importantes.
- Lembra-te de que a matriz de orientação pode ser vista como três vetores de posição a partir da origem.

[hcat-ref]: https://docs.julialang.org/en/v1/base/arrays/#Base.hcat
[reshape-ref]: https://docs.julialang.org/en/v1/base/arrays/#Base.reshape
[stack-ref]: https://docs.julialang.org/en/v1/base/arrays/#Base.stack
[isapprox-ref]: https://docs.julialang.org/en/v1/base/math/#Base.isapprox
[norm-ref]: https://docs.julialang.org/en/v1/stdlib/LinearAlgebra/#LinearAlgebra.norm
