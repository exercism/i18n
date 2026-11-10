# はじめに

`Types`のコンセプトでは、次のことを学びました。

- Juliaの型は階層をなしています。
- それぞれの型にはスーパータイプがあります。
- `Any`は階層の最上位にあり、それ自身が自分のスーパータイプです。
- 型はサブタイプを_持つことがあり_、サブタイプを持つ型は`abstract types`と呼ばれます。
- サブタイプを持たない型（ツリーの葉ノード）は`concrete types`と呼ばれます。
- `Char`や`Int64`のように、これ以上分割できない型は`primitive types`と呼ばれます。

この抽象と具象のパターンを単純な形で当てはめられるのは、`primitive`な型だけです。

プリミティブでない型の例としては、`Vector`や`Set`のようなコレクションがあります。

```julia-repl
julia> isprimitivetype(Int)
true

julia> isprimitivetype(Vector)
false
```

_何のコレクションでしょう？_

それぞれのVector（またはSet）は、ある統一された型を持つ要素のコレクションです。その型は、波括弧`{ }`の中に_パラメータ_として指定することも、省略して型推論に決めさせることもできます。

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

これらの`parametric types`は`generic programming`の一種で、多くの現代的な言語にも、広く似た仕組みがあります。細かな点では多くの違いがありますが。

## パラメトリック複合型

複合型を、さまざまなフィールドの型を扱えるほど柔軟（ジェネリック）にしたいことがあります。

これは、定義の中にダミーの型を使うことで実現できます。ふつうは`T`と名付けられます。

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
