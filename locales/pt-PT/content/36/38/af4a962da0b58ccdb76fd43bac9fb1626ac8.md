# Introdução

A "Estatística" é um tema vasto e complexo, com muitos aspetos.

Alguns desses aspetos foram abordados no conceito [`Randomness`][randomness], que é um tema separado, mas relacionado.

Na sua forma mais simples, a estatística pode envolver formas de resumir uma coleção iterável de dados num único valor.
Quem está a começar com a Julia pode ficar surpreso com o quão poucas funções a linguagem traz incorporadas por defeito:

- [`sum`][sum], para somar números.
- [`min`][min] e [`max`][max], para obter os valores extremos dos parâmetros indicados.
- [`extrema`][extrema], para obter o tuplo (min, max) de um iterável.
- [`length`][length], para contar todos os valores.
- [`count`][count], para contar apenas os valores que cumprem um determinado critério.

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

Este conjunto limitado de funções é uma decisão deliberada para minimizar o inchaço da Julia base, passando outras funções para uma cascata de outros módulos e pacotes.

## O módulo `Statistics`

Como faz parte da biblioteca padrão, é provável que o [`Statistics`][statistics] já esteja instalado; basta acrescentar `using Statistics` no início do programa para o colocar no namespace.

Este módulo contém o nível seguinte de funções comuns, que provavelmente serão muito usadas por um subconjunto de programadores.

Muitas das funções de `Statistics` pressupõem alguns conhecimentos de base sobre o tema.
Os exemplos mais simples incluem:

- [`mean`][mean], aquilo a que muitas pessoas chamam a média (o mesmo resultado que `sum / length`).
- [`median`][median], o valor central depois de ordenar os dados.
- [`std`][std], o [desvio padrão][stddev]: uma medida de quão dispersos estão os valores.
- [`var`][var], a variância: o quadrado de `std`, que em geral é mais rápida de calcular.

Cada função tende a ter várias opções, e há _muitas_ mais funções, por isso consulta a [documentação][statistics] se tiveres interesse.

## Outros pacotes

Como seria de esperar, a estatística é um grande caso de uso da Julia, e há muitos pacotes disponíveis para apoiar trabalho mais especializado.

O grupo JuliaStats mantém uma [lista online][juliastats] muito útil.

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
