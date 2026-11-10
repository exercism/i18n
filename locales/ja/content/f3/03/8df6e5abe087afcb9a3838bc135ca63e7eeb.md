# 概要

[`Types`コンセプト][types]では、次のことを学びました。

- Juliaの型は階層を成しています。
- それぞれの型にはスーパータイプがあります。
- `Any`は階層の頂点にあり、スーパータイプは`Any`自身です。
- 型はサブタイプを_持つこともあります_。サブタイプを持つ型は[`abstract types`][abstract]と呼ばれます。
- サブタイプを持たない型（ツリーの葉ノード）は[`concrete types`][concrete]と呼ばれます。
- `Char`や`Int64`のように、それ以上分割できない型は[`primitive types`][primitive]と呼ばれます。

抽象と具象というパターンがそのままの形で当てはまるのは、`primitive`型だけです。

プリミティブ型ではない型の例としては、`Vector`や`Set`のようなコレクションがあります。

```julia-repl
julia> isprimitivetype(Int)
true

julia> isprimitivetype(Vector)
false
```

_これは何のコレクションなのでしょうか？_

それぞれのVector（Setも同様）は、ある共通の型を持つ要素のコレクションです。その型は、波括弧（`{ }`）の中に_パラメーター_として指定するか、省略して型推論に決めさせることもできます。

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

こうした[`parametric types`][parametric]は[`generic programming`][generic]の一種です。多くの現代的な言語にも、細部は大きく異なるものの、おおむね同じような仕組みがあります。

## パラメトリックな複合型

複合型を、フィールドの型が違っても扱えるくらい柔軟（ジェネリック）にしたい場合があります。

これは、定義にダミーの型を入れることで実現できます。慣習的に`T`と呼ばれます。

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

もちろん、この方法はフィールドにコレクションがある場合にも使えます。

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
