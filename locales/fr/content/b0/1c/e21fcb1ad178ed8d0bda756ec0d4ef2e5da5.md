# Introduction

Dans le concept `Types`, on a appris que :

- Les types en Julia forment une hiérarchie.
- Chaque type a un supertype.
- `Any` est au sommet de la hiérarchie et est son propre supertype.
- Les types _peuvent_ avoir des sous-types, et ceux qui en ont sont appelés `abstract types`.
- Les types sans sous-types (les nœuds feuilles de l'arbre) sont appelés `concrete types`.
- Les types indivisibles, comme `Char` ou `Int64`, sont appelés `primitive types`.

Seuls les types `primitive` suivent le schéma abstrait/concret sous sa forme simple.

Les collections, comme `Vector` ou `Set`, sont un exemple de types qui ne sont pas primitifs.

```julia-repl
julia> isprimitivetype(Int)
true

julia> isprimitivetype(Vector)
false
```

_Une collection de quoi ?_

Chaque Vector (ou Set) est une collection d'éléments d'un type uniforme, que l'on peut soit préciser avec un _paramètre_ entre accolades `{ }`, soit omettre et laisser l'inférence de types le déterminer.

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

Ces `parametric types` sont une forme de `generic programming`, et de nombreux langages modernes ont quelque chose d'à peu près équivalent, même si les détails diffèrent beaucoup.

## Types composites paramétriques

Il arrive que l'on veuille créer un type composite suffisamment souple (générique) pour gérer différents types de champs.

On peut y parvenir avec un type fictif dans la définition, généralement appelé `T`.

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

Naturellement, cette approche fonctionne aussi avec des collections dans les champs :

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
