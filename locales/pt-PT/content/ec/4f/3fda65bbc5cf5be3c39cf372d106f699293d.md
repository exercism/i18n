# Sobre

No [conceito `Types`][types], aprendemos que:

- Os tipos em Julia formam uma hierarquia.
- Cada tipo tem um supertipo.
- O `Any` está no topo da hierarquia e é o seu próprio supertipo.
- Os tipos _podem_ ter subtipos, e os que têm são chamados [`abstract types`][abstract].
- Os tipos sem subtipos (nós folha da árvore) são chamados [`concrete types`][concrete].
- Os tipos indivisíveis, como `Char` ou `Int64`, são chamados [`primitive types`][primitive].

Apenas os tipos `primitive` seguem o padrão abstrato versus concreto na sua forma simples.

Um exemplo de tipos que não são primitivos são as coleções, como `Vector` ou `Set`.

```julia-repl
julia> isprimitivetype(Int)
true

julia> isprimitivetype(Vector)
false
```

_Uma coleção de quê?_

Cada Vector (ou Set) é uma coleção de elementos com um tipo uniforme, que pode ser especificado com um _parâmetro_ entre chavetas `{ }`, ou omitido para a inferência de tipos o determinar.

```julia-repl
julia> v = [1, 2, 3]
3-element Vector{Int64}:
 1
 2
 3

julia> v8 = Vector{Int8}([2, 4, 6])
3-element Vector{Int8}:
 2
 4
 6
```

Estes [`parametric types`][parametric] são uma forma de [`generic programming`][generic], e muitas linguagens modernas têm algo amplamente equivalente, ainda que com muitas diferenças nos detalhes.

## Tipos compostos paramétricos

Por vezes queremos criar um tipo composto suficientemente flexível (genérico) para lidar com diferentes tipos de campos.

Isso pode conseguir-se com um tipo fictício na definição, habitualmente chamado `T`.

```julia-repl
julia> struct Point{T}
               x::T
               y::T
       end

# high definition version

julia> real_point = Point(7.3, 4.2)
Point{Float64}(7.3, 4.2)

julia> typeof(real_point)
Point{Float64}

# low definition version

julia> int8point = Point{Int8}(17, 23)
Point{Int8}(17, 23)

julia> typeof(int8point)
Point{Int8}

julia> Point(Int8(17), Int8(23))
Point{Int8}(17, 23)
```

Naturalmente, esta abordagem também funciona com coleções nos campos:

```julia-repl
julia> struct Record{T}
           data::Vector{T}
           comment::String
       end

julia> rec = Record{Float64}([1.3, 5.2], "some data")
Record{Float64}([1.3, 5.2], "some data")

julia> rec.data
2-element Vector{Float64}:
 1.3
 5.2

julia> rec2 = Record{Int32}([3, 5], "more data")
Record{Int32}(Int32[3, 5], "more data")

julia> rec2.data
2-element Vector{Int32}:
 3
 5
```

[types]: https://exercism.org/tracks/julia/concepts/types
[parametric]: https://docs.julialang.org/en/v1/manual/types/#Parametric-Types
[generic]: https://en.wikipedia.org/wiki/Generic_programming
[primitive]: https://docs.julialang.org/en/v1/manual/types/#Primitive-Types
[types]: "https://docs.julialang.org/en/v1/manual/types/"
[isa]: https://docs.julialang.org/en/v1/base/base/#Core.isa
[abstract]: https://docs.julialang.org/en/v1/base/base/#abstract%20type
[concrete]: https://docs.julialang.org/en/v1/manual/types/#Type-Declarations
