# Részletesen

A [`Types` fogalomban][types] megtanultuk, hogy:

- A Julia típusai hierarchiát alkotnak.
- Minden típusnak van egy szupertípusa.
- A `Any` a hierarchia csúcsán áll, és a saját szupertípusa.
- A típusoknak _lehet_ altípusuk, és amelyeknek van, azokat [`abstract types`][abstract] néven említjük.
- Az altípus nélküli típusokat (a fa levélcsomópontjait) [`concrete types`][concrete] néven említjük.
- Az oszthatatlan típusokat, például a `Char`-t vagy az `Int64`-et, [`primitive types`][primitive] néven említjük.

Csak a `primitive` típusok követik az absztrakt kontra konkrét felosztást a maga legegyszerűbb formájában.

A nem primitív típusok egyik példája a gyűjtemények, például a `Vector` vagy a `Set`.

```julia-repl
julia> isprimitivetype(Int)
true

julia> isprimitivetype(Vector)
false
```

_Minek a gyűjteménye?_

Minden `Vector` (vagy `Set`) valamilyen egységes típusú elemek gyűjteménye. Ezt vagy megadjuk egy _paraméterrel_ a `{ }` kapcsos zárójelben, vagy elhagyjuk, és akkor a típuskövetkeztetés dönti el.

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

Ezek a [`parametric types`][parametric] a [`generic programming`][generic] egy formája, és sok modern nyelvben van valami nagyjából egyenértékű, igaz, a részletekben sok az eltérés.

## Paraméteres összetett típusok

Néha olyan összetett típust akarunk létrehozni, amely elég rugalmas (generikus) ahhoz, hogy különböző mezőtípusokat kezeljen.

Ezt úgy érhetjük el, hogy a definícióban egy dummy típust használunk, amelyet általában `T`-nek nevezünk.

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

Természetesen ez a megközelítés a mezőkben lévő gyűjteményekkel is működik:

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
