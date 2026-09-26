# Dicas

## 1. Oriente o robô
- A ordem em que você realiza as operações é importante.
- Há várias maneiras de converter um vetor de vetores em uma matriz.
- Algumas ideias que podem ajudar a montar a matriz: compreensões, laços `for`, [`hcat`][hcat-ref], [`reshape`][reshape-ref], [`stack`][stack-ref], etc...

## 2. Rotacione o robô
- Veja a Introdução para saber como rotacionar uma matriz.
- Basta uma multiplicação simples de matrizes.

## 3. Verifique se a orientação está correta
- Lembre-se: é a *segunda* coluna da matriz que indica a orientação.
- Isso pode ser verificado com um produto escalar.
- Pode ser útil normalizar os vetores.
- Em caso de discrepâncias de ponto flutuante, a orientação só precisa ser [aproximadamente][isapprox-ref] igual a algo em torno de `~1e-7`.
- A identidade a seguir pode ser útil: `x⋅y = ||x||*||y||cos(θ)`, em que [`||x|| = norm(x)`][norm-ref] 

## 4. Coordenadas do corpo do robô
- Isso é bem direto, mas as operações elemento a elemento são importantes.
- Lembre-se de que a matriz de orientação pode ser vista como três vetores de posição a partir da origem.

[hcat-ref]: https://docs.julialang.org/en/v1/base/arrays/#Base.hcat
[reshape-ref]: https://docs.julialang.org/en/v1/base/arrays/#Base.reshape
[stack-ref]: https://docs.julialang.org/en/v1/base/arrays/#Base.stack
[isapprox-ref]: https://docs.julialang.org/en/v1/base/math/#Base.isapprox
[norm-ref]: https://docs.julialang.org/en/v1/stdlib/LinearAlgebra/#LinearAlgebra.norm
