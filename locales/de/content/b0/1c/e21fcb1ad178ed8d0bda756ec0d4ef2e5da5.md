# Einführung

Im Konzept `Types` haben wir gelernt, dass:

- Typen in Julia eine Hierarchie bilden.
- Jeder Typ einen Supertyp hat.
- `Any` an der Spitze der Hierarchie steht und sein eigener Supertyp ist.
- Typen _Untertypen_ haben _können_, und diejenigen, die welche haben, `abstract types` heißen.
- Typen ohne Untertypen (die Blätter im Baum) `concrete types` heißen.
- Unteilbare Typen wie `Char` oder `Int64` `primitive types` heißen.

Nur `primitive` Typen folgen in ihrer einfachen Form dem Muster von abstrakt und konkret.

Ein Beispiel für Typen, die nicht primitiv sind, sind Sammlungen wie `Vector` oder `Set`.

```julia-repl
julia> isprimitivetype(Int)
true

julia> isprimitivetype(Vector)
false
```

_Eine Sammlung wovon?_

Jeder Vector (oder Set) ist eine Sammlung von Elementen mit einem einheitlichen Typ. Dieser kann entweder mit einem _Parameter_ in geschweiften Klammern `{ }` angegeben oder weggelassen werden, damit die Typinferenz ihn bestimmt.

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

Diese `parametric types` sind eine Form von `generic programming`, und viele moderne Sprachen haben etwas grob Gleichwertiges, wenn auch mit vielen Unterschieden im Detail.

## Parametrische zusammengesetzte Typen

Manchmal möchten wir einen zusammengesetzten Typ erstellen, der flexibel (generisch) genug ist, um mit verschiedenen Feldtypen umzugehen.

Das lässt sich mit einem Dummy-Typ in der Definition erreichen, der üblicherweise `T` heißt.

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

Natürlich funktioniert dieser Ansatz auch mit Sammlungen in Feldern:

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
