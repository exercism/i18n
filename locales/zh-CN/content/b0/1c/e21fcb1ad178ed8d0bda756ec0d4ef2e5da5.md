# 简介

在`Types`概念中，我们了解到：

- Julia 中的类型构成一个层级结构。
- 每个类型都有一个超类型。
- `Any`位于层级结构的最顶端，它本身就是自己的超类型。
- 类型_可以_有子类型，有子类型的类型称为`abstract types`。
- 没有子类型的类型（树上的叶节点）称为`concrete types`。
- 不可再分的类型，例如`Char`或`Int64`，称为`primitive types`。

只有`primitive`类型以最简单的形式遵循抽象与具体的模式。

不是原始类型的类型，一个例子就是集合，例如`Vector`或`Set`。

```julia-repl
julia> isprimitivetype(Int)
true

julia> isprimitivetype(Vector)
false
```

_什么的集合？_

每个`Vector`（或`Set`）都是元素的集合，其中的元素具有某种统一的类型。这个类型可以用花括号`{ }`中的_形参_来指定，也可以省略，交给类型推断去确定。

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

这些`parametric types`是`generic programming`的一种形式。许多现代语言都有大致等价的东西，只是细节上有许多差异。

## 参数化复合类型

有时，我们希望创建的复合类型足够灵活（通用），能够处理不同的字段类型。

在定义中使用一个占位类型就能做到这一点，这个占位类型通常称为`T`。

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

自然，这种做法对字段中的集合也同样适用：

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
