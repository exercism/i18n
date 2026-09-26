# 关于

在[`Types`概念][types]中，我们了解到：

- Julia 中的类型构成一个层级结构。
- 每个类型都有一个超类型。
- `Any`位于这个层级结构的最顶端，并且它自己的超类型就是它自己。
- 类型_可以_有子类型，有子类型的类型称为[`abstract types`][abstract]。
- 没有子类型的类型（也就是树上的叶节点）称为[`concrete types`][concrete]。
- 不可再分的类型，比如`Char`或`Int64`，称为[`primitive types`][primitive]。

只有`primitive`类型才会以这种简单形式遵循“抽象与具体”的模式。

不属于原始类型的例子之一是集合，比如`Vector`或`Set`。

```julia-repl
julia> isprimitivetype(Int)
true

julia> isprimitivetype(Vector)
false
```

_是什么的集合？_

每个 Vector（或 Set）都是由一组元素构成的集合，这些元素具有某种统一的类型。这个类型既可以用花括号`{ }`中的_类型参数_指定，也可以省略，交给类型推断去确定。

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

这些[`parametric types`][parametric]是[`generic programming`][generic]的一种形式，许多现代语言都有大致等价的概念，只是在细节上有不少差异。

## 参数化复合类型

有时我们希望创建一种足够灵活（也就是足够通用）的复合类型，以便处理不同的字段类型。

在定义中使用一个占位类型就可以做到，通常把它命名为`T`。

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

当然，这种方式同样适用于字段中存放集合的情况：

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
