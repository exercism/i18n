# 簡介

在`Types`概念中，我們學到了：

- Julia 的型別會構成一個階層。
- 每個型別都有超型別。
- `Any`位於階層的最頂端，而且它自己的超型別就是它自己。
- 型別_可能_會有子型別，有子型別的型別稱為`abstract types`。
- 沒有子型別的型別（也就是樹狀結構中的葉節點）稱為`concrete types`。
- 無法再切分的型別，例如`Char`或`Int64`，稱為`primitive types`。

只有`primitive`型別會以這種簡單的形式，遵循抽象與具體的模式。

有些型別並非原始型別，集合就是其中一個例子，例如`Vector`或`Set`。

```julia-repl
julia> isprimitivetype(Int)
true

julia> isprimitivetype(Vector)
false
```

_什麼東西的集合？_

每個 Vector（或 Set）都是某種一致型別的元素的集合，這個型別可以用大括號`{ }`裡的_參數_指定，也可以省略，交由型別推論自行判斷。

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

這些`parametric types`是`generic programming`的一種形式，許多現代語言也有大致等效的東西，只是細節上有不少差異。

## 參數化複合型別

有時候，我們會想建立一個夠有彈性（泛型）的複合型別，來處理不同的欄位型別。

這可以透過在定義中使用一個佔位型別來達成，通常叫做`T`。

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

當然，這個做法也適用於欄位裡放集合的情況：

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
