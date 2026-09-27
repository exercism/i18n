# 關於

在[`Types`][types]概念中，我們學到：

- Julia 的型別會形成階層架構。
- 每個型別都有超型別。
- `Any` 位於階層的最頂端，而且是它自己的超型別。
- 型別_可能_有子型別，有子型別的型別稱為[`abstract types`][abstract]。
- 沒有子型別的型別（樹狀結構中的葉節點）稱為[`concrete types`][concrete]。
- 不可分割的型別，例如 `Char` 或 `Int64`，稱為[`primitive types`][primitive]。

只有 `primitive` 型別以簡單的形式遵循抽象與具體的模式。

非基本型別的型別中，有一類是集合，例如 `Vector` 或 `Set`。

```julia-repl
julia> isprimitivetype(Int)
true

julia> isprimitivetype(Vector)
false
```

_什麼東西的集合？_

每個 Vector（或 Set）都是型別一致的元素集合，其型別可以用大括號`{ }`中的_參數_指定，也可以省略，交由型別推斷決定。

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

這些[`parametric types`][parametric]是[`generic programming`][generic]的一種形式，許多現代語言都有大致對等的機制，只是細節上有不少差異。

## 參數化複合型別

有時候，我們會想建立一個彈性（泛用）足夠的複合型別，以便處理不同的欄位型別。

這可以在定義中使用一個佔位型別來達成，通常稱為 `T`。

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

這個做法自然也適用於欄位中的集合：

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
