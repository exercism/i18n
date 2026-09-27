# 자세히 알아보기

## Pair

[`Pair`][pair]는 그냥 두 항목을 하나로 묶은 거예요.
그 두 항목은 각각 `first`와 `second`라는 이름이 붙어요.

`=>` 연산자나 `Pair()` 생성자로 만들 수 있어요.

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

## Dict

Pair로 이루어진 `Vector`는 다른 배열과 똑같아요. 순서가 있고, 타입이 모두 같고, 메모리에 연속해서 저장돼요.

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

[`Dict`][dict]는 겉보기에는 비슷하지만, 저장 방식이 달라서 키로 값을 빠르게 찾을 수 있어요. 항목 수가 아주 많아져도 마찬가지죠. 이런 구조를 "해시 테이블"이라고 해요.

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

다른 언어에서는 `Dict`와 아주 비슷한 것을 딕셔너리(Python), 해시(Ruby), 해시맵(Java)이라고 불러요.

Pair는 단독으로 쓰든 `Vector` 안에 넣든, 각 구성 요소의 타입에 거의 제약이 없어요.

`Dict`에서 쓰려면 `Pair`가 `key => value` 쌍이어야 하고, `key`는 "해시 가능"해야 해요.
가장 중요한 점은 `key`가 _불변_이어야 한다는 거예요. 따라서 `Char`, `Int`, `String`, `Symbol`, `Tuple`은 모두 괜찮지만 `Vector`는 안 돼요.

가변 키가 꼭 필요하다면, 그런 걸 허용하는 별도의 [`IdDict`][iddict] 타입이 있어요. 다만 훨씬 덜 쓰이는 타입이에요.
`Dict` 타입의 여러 변형은 [매뉴얼][dict]을 참고해요.

### Dict 수정하기

항목은 새로운 키로 추가하거나, 이미 있는 키로 덮어쓸 수 있어요.

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

항목을 지우려면 `delete!()` 함수를 사용해요. 키가 있으면 Dict가 바뀌고, 없으면 아무 일도 일어나지 않아요.

```julia-repl
julia> delete!(pd, 'd')
Dict{Char, Int64} with 3 entries:
  'a' => 42
  'c' => 3
  'b' => 2
```

### 키나 값이 있는지 확인하기

방법은 여러 가지예요.
키를 확인하려면 `haskey()` 함수를 써요.

```julia-repl
julia> haskey(pd, 'b')
true
```

또는 키나 값 쪽에서 직접 찾을 수도 있어요.

```julia-repl
julia> 'b' in keys(pd)
true

julia> 43 in values(pd)
false

julia> 42 ∈ values(pd)
true
```

데이터가 많아져도 이 방법은 여전히 효율적이에요. `keys()`와 `values()` 함수가 각각 빠른 검색 알고리즘을 가진 이터레이터를 반환하기 때문이에요.


[pair]: https://docs.julialang.org/en/v1/base/collections/#Core.Pair
[dict]: https://docs.julialang.org/en/v1/base/collections/#Dictionaries
[iddict]: https://docs.julialang.org/en/v1/base/collections/#Base.IdDict
