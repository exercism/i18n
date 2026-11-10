# Introducción

La «estadística» es un tema amplio y complejo, con muchos aspectos.

Algunos de esos aspectos se mencionaron en el concepto [`Randomness`][randomness], que es un tema aparte pero relacionado.

En su forma más simple, la estadística puede consistir en maneras de resumir una colección iterable de datos en un único valor.
Si recién empiezas con Julia, quizá te sorprenda lo pocas funciones que trae el lenguaje de forma predeterminada:

- [`sum`][sum], para sumar números.
- [`min`][min] y [`max`][max], para obtener los valores extremos de los parámetros dados.
- [`extrema`][extrema], para obtener la tupla (min, max) de un iterable.
- [`length`][length], para contar todos los valores.
- [`count`][count], para contar solo los valores que cumplen algún criterio.

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

Este conjunto limitado de funciones es una decisión deliberada para minimizar el crecimiento innecesario de la base de Julia, al mover otras funciones a una cascada de módulos y paquetes adicionales.

## El módulo `Statistics`

Como parte de la biblioteca estándar, es probable que [`Statistics`][statistics] ya esté preinstalado, así que solo necesitas agregar `using Statistics` al inicio del programa para incorporarlo al espacio de nombres.

Este módulo contiene el siguiente nivel de funciones comunes, que probablemente use con frecuencia un subconjunto de programadores.

Muchas de las funciones de `Statistics` suponen cierta base en el tema.
Los ejemplos más simples incluyen:

- [`mean`][mean], que muchas personas llamarían el promedio (el mismo resultado que `sum / length`).
- [`median`][median], el valor de en medio después de ordenar.
- [`std`][std], la [desviación estándar][stddev]: una medida de qué tan dispersos están los valores.
- [`var`][var], la varianza: el cuadrado de `std`, que por lo general es más rápido de calcular.

Cada función suele tener varias opciones, y hay _muchas_ más funciones, así que consulta la [documentación][statistics] si te interesa.

## Otros paquetes

Como podrías imaginar, la estadística es un gran caso de uso para Julia, y hay muchos paquetes disponibles para dar soporte a trabajos más especializados.

El grupo JuliaStats mantiene amablemente una [lista en línea][juliastats].

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
