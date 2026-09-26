# 概要

## ペア

[`Pair`][pair]は、2つの要素を組み合わせただけのものです。
その2つの要素は、粋なことに`first`と`second`と呼ばれます。

作成するには、`=>`演算子か`Pair()`コンストラクターを使います。

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

## `Dict`

ペアの`Vector`は、他の配列と同じです。順序があり、型が揃っていて、メモリ上に連続して格納されます。

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

[`Dict`][dict]も一見するとよく似ていますが、格納の仕組みが異なり、キーから素早く取り出せるようになっています。この仕組みは「ハッシュテーブル」と呼ばれ、エントリーの数が多くなっても高速に動作します。

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

他の言語では、`Dict`とよく似たものが辞書（Python）、ハッシュ（Ruby）、ハッシュマップ（Java）などと呼ばれています。

ペアは、単体でも`Vector`の中でも、それぞれの要素の型にほとんど制約がありません。

`Dict`で有効であるためには、`Pair`が`key => value`のペアである必要があり、`key`は「ハッシュ可能」でなければなりません。
最も重要なのは、`key`が_イミュータブル_であることです。つまり、`Char`、`Int`、`String`、`Symbol`、`Tuple`は問題ありませんが、`Vector`は使えません。

どうしてもミュータブルなキーを使いたい場合は、別の、あまり一般的ではない[`IdDict`][iddict]型を使う方法があります。
`Dict`型の他のバリアントについては、[マニュアル][dict]を参照してください。

### `Dict`の変更

エントリーは、新しいキーを使えば追加でき、既存のキーを使えば上書きできます。

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

エントリーを削除するには、`delete!()`関数を使います。この関数は、キーが存在すれば`Dict`を変更し、存在しなければ何もせずに終わります。

```julia-repl
julia> delete!(pd, 'd')
Dict{Char, Int64} with 3 entries:
  'a' => 42
  'c' => 3
  'b' => 2
```

### キーや値が存在するか確認する

いくつかの方法があります。
キーを確認するには、`haskey()`関数があります。

```julia-repl
julia> haskey(pd, 'b')
true
```

あるいは、キーまたは値のどちらかを検索することもできます。

```julia-repl
julia> 'b' in keys(pd)
true

julia> 43 in values(pd)
false

julia> 42 ∈ values(pd)
true
```

この方法は、規模が大きくなっても効率的です。`keys()`関数と`values()`関数はそれぞれ、高速な検索アルゴリズムを持つイテレーターを返すからです。


[pair]: https://docs.julialang.org/en/v1/base/collections/#Core.Pair
[dict]: https://docs.julialang.org/en/v1/base/collections/#Dictionaries
[iddict]: https://docs.julialang.org/en/v1/base/collections/#Base.IdDict
