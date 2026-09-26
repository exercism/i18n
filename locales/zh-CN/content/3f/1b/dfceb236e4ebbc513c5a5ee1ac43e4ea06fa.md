# 关于

## Pairs

一个[`Pair`][pair]不过就是把两项内容组合在一起。
这两项内容则被冠以 `first` 和 `second` 这样富有想象力的名字。

你可以用 `=>` 运算符或 `Pair()` 构造函数来创建它们。

```julia-repl
julia> p1 = "k" => 2
"k" => 2

julia> p2 = Pair("k", 2)
"k" => 2

# Both forms of syntax give the same result
julia> p1 == p2
true

# Each component has its own separate type
julia> dump(p1)
Pair{String, Int64}
  first: String "k"
  second: Int64 2

# Get a component using dot syntax
julia> p1.first
"k"

julia> p1.second
2
```

## Dicts

由 Pair 组成的 `Vector` 和任何其他数组一样：有序、类型一致，并且在内存中连续存储。

```julia-repl
julia> pv = ['a' => 1, 'b' => 2, 'c' => 3]
3-element Vector{Pair{Char, Int64}}:
 'a' => 1
 'b' => 2
 'c' => 3

# Each pair is a single entry
julia> length(pv)
3
```

一个[`Dict`][dict]表面上与之相似，但它的存储方式经过专门实现，可以按键快速取值，这种结构被称为“哈希表”，即使条目数量变得很大也是如此。

```julia-repl
julia> pd = Dict('a' => 1, 'b' => 2, 'c' => 3)  # or Dict(pv) gives same result
Dict{Char, Int64} with 3 entries:
  'a' => 1
  'c' => 3
  'b' => 2

julia> pd['b']
2

# Key must exist
julia> pd['d']
ERROR: KeyError: key 'd' not found

# Generators are accepted in the constructor (and note the unordered output)
julia> Dict(x => x^2 for x in 1:5)
Dict{Int64, Int64} with 5 entries:
  5 => 25
  4 => 16
  2 => 4
  3 => 9
  1 => 1

julia> Dict(x => 1 / x for x in 1:5)
Dict{Int64, Float64} with 5 entries:
  5 => 0.2
  4 => 0.25
  2 => 0.5
  3 => 0.333333
  1 => 1.0
  ```

在其他语言中，与 `Dict` 非常相似的东西可能叫作字典（Python）、Hash（Ruby）或 HashMap（Java）。

对于 Pair 而言，无论是单独使用还是放在 Vector 中，对每个组成部分的类型都几乎没有限制。

要在 `Dict` 中有效，这个 `Pair` 必须是一个 `key => value` 键值对，其中 `key` 必须是“可哈希的”。
最重要的是，这意味着 `key` 必须是*不可变的*，所以 `Char`、`Int`、`String`、`Symbol` 和`Tuple`都可以，但不允许使用 `Vector`。

如果可变键对你很重要，还有一种独立但少见得多的[`IdDict`][iddict]类型可以做到这一点。
关于 `Dict` 类型的其他几种变体，参见[手册][dict]。

### 修改 Dict

条目可以用新的键添加，也可以用已有的键覆盖。

```julia-repl
julia> pd
Dict{Char, Int64} with 3 entries:
  'a' => 1
  'c' => 3
  'b' => 2

# Add
julia> pd['d'] = 4
4

# Overwrite
julia> pd['a'] = 42
42

julia> pd
Dict{Char, Int64} with 4 entries:
  'a' => 42
  'c' => 3
  'd' => 4
  'b' => 2
```

要删除条目，请使用 `delete!()` 函数：如果该键存在，它会修改 Dict，否则什么也不做，也不会报错。

```julia-repl
julia> delete!(pd, 'd')
Dict{Char, Int64} with 3 entries:
  'a' => 42
  'c' => 3
  'b' => 2
```

### 检查键或值是否存在

方式有多种。
要检查某个键，可以用 `haskey()` 函数：

```julia-repl
julia> haskey(pd, 'b')
true
```

另一种办法是搜索键或值：

```julia-repl
julia> 'b' in keys(pd)
true

julia> 43 in values(pd)
false

julia> 42 ∈ values(pd)
true
```

这种做法的效率不会随规模下降，因为 `keys()` 和 `values()` 函数各自返回一个带有快速查找算法的迭代器。


[pair]: https://docs.julialang.org/en/v1/base/collections/#Core.Pair
[dict]: https://docs.julialang.org/en/v1/base/collections/#Dictionaries
[iddict]: https://docs.julialang.org/en/v1/base/collections/#Base.IdDict
