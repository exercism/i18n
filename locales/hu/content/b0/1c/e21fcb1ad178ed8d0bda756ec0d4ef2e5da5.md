# Bevezetés

A `Types` fogalomban megtanultuk, hogy:

- A Julia típusai hierarchiát alkotnak.
- Minden típusnak van szupertípusa.
- A `Any` a hierarchia csúcsán van, és a saját szupertípusa.
- A típusoknak _lehetnek_ altípusaik, és azokat, amelyeknek van, `abstract types`-nak nevezzük.
- Azokat a típusokat, amelyeknek nincs altípusuk (a fa levélcsomópontjai), `concrete types`-nak nevezzük.
- Az olyan oszthatatlan típusokat, mint a `Char` vagy az `Int64`, `primitive types`-nak nevezzük.

Csak a `primitive` típusok követik az absztrakt és konkrét minta egyszerű formáját.

A nem primitív típusok egyik példája a gyűjtemények, például a `Vector` vagy a `Set`.

```julia-repl
julia> isprimitivetype(Int)
true

julia> isprimitivetype(Vector)
false
```

_Minek a gyűjteménye?_

Minden Vector (vagy Set) valamilyen egységes típusú elemek gyűjteménye; a típust vagy egy _paraméter_ adja meg kapcsos zárójelben `{ }`, vagy elhagyható, hogy a típuskövetkeztetés meghatározza.

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

Ezek a `parametric types` a `generic programming` egyik formája, és sok modern nyelvben van valami nagyjából egyenértékű, bár a részletek sokban eltérnek.

## Paraméteres összetett típusok

Néha olyan összetett típust szeretnénk létrehozni, amely elég rugalmas (generikus) ahhoz, hogy különböző mezőtípusokat kezeljen.

Ez egy dummy típussal érhető el a definícióban, amelyet általában `T`-nek nevezünk.

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

Természetesen ez a megközelítés mezőkben lévő gyűjteményekkel is működik:

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
