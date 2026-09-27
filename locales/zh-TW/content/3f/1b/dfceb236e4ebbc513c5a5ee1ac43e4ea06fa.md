# 關於

## 配對

一個[`Pair`][pair]就只是把兩個項目結合在一起。
而這兩個項目則被取了個很有想像力的名字：`first`和`second`。

可以用`=>`運算子或`Pair()`建構函式來建立。

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

## 字典

由配對組成的`Vector`就跟其他陣列沒兩樣：有序、型別一致，而且在記憶體中是連續儲存的。

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

一個[`Dict`][dict]表面上跟它很像，但它的儲存方式改成了能用鍵快速取出資料的做法，也就是所謂的「雜湊表」，即使項目數量變得很大也一樣。

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

在其他語言裡，跟`Dict`非常類似的東西可能叫做 dictionary（Python）、Hash（Ruby）或 HashMap（Java）。

對配對來說，不論是單獨存在還是放在 Vector 裡，兩個組成部分的型別幾乎沒什麼限制。

要在`Dict`裡成為有效的項目，這個`Pair`必須是`key => value`配對，而且`key`必須是「可雜湊」的。
最重要的是，這表示`key`必須是_不可變的_，所以`Char`、`Int`、`String`、`Symbol`和`Tuple`都沒問題，但`Vector`就不行。

如果可變的鍵對你很重要，有個獨立但少見許多的[`IdDict`][iddict]型別可以做到這件事。
關於`Dict`型別的另外幾種變體，請參閱[手冊][dict]。

### 修改字典

項目可以新增（使用新的鍵）或覆寫（使用既有的鍵）。

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

要移除項目，請使用`delete!()`函式；如果鍵存在，它就會修改這個 Dict，否則就默默什麼都不做。

```julia-repl
julia> delete!(pd, 'd')
Dict{Char, Int64} with 3 entries:
  'a' => 42
  'c' => 3
  'b' => 2
```

### 檢查鍵或值是否存在

有幾種做法。
要檢查某個鍵，可以用`haskey()`函式：

```julia-repl
julia> haskey(pd, 'b')
true
```

或者，也可以搜尋鍵或值：

```julia-repl
julia> 'b' in keys(pd)
true

julia> 43 in values(pd)
false

julia> 42 ∈ values(pd)
true
```

即使資料量很大，這個做法依然很有效率，因為`keys()`和`values()`函式各自都會回傳一個內建快速搜尋演算法的疊代器。


[pair]: https://docs.julialang.org/en/v1/base/collections/#Core.Pair
[dict]: https://docs.julialang.org/en/v1/base/collections/#Dictionaries
[iddict]: https://docs.julialang.org/en/v1/base/collections/#Base.IdDict
