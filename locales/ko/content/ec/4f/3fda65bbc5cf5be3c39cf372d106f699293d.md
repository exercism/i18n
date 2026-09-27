# 개요

[`Types` 개념][types]에서 우리는 다음을 배웠어요.

- Julia의 타입은 계층 구조를 이뤄요.
- 각 타입에는 상위 타입이 있어요.
- `Any`는 계층 구조의 꼭대기에 있고, 자기 자신의 상위 타입이에요.
- 타입은 하위 타입을 _가질 수도_ 있고, 하위 타입을 가지는 타입을 [`abstract types`][abstract]라고 해요.
- 하위 타입이 없는 타입(트리의 잎 노드)은 [`concrete types`][concrete]라고 해요.
- `Char`나 `Int64`처럼 더 이상 나눌 수 없는 타입은 [`primitive types`][primitive]라고 해요.

추상과 구체 패턴을 단순한 형태로 따르는 것은 `primitive` 타입뿐이에요.

원시적이지 않은 타입의 한 예로 `Vector`나 `Set` 같은 컬렉션이 있어요.

```julia-repl
julia> isprimitivetype(Int)
true

julia> isprimitivetype(Vector)
false
```

_무엇의 컬렉션일까요?_

각 Vector(또는 Set)는 동일한 타입의 원소로 이루어진 컬렉션이에요. 이 타입은 중괄호 `{ }` 안에 _매개변수_로 지정할 수도 있고, 생략해서 타입 추론이 알아내도록 할 수도 있어요.

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

이 [`parametric types`][parametric]는 [`generic programming`][generic]의 한 형태이고, 많은 현대 언어에 대략 이에 상응하는 기능이 있어요. 세부 사항에는 많은 차이가 있지만요.

## 매개변수화된 복합 타입

때로는 여러 가지 필드 타입을 다룰 수 있을 만큼 유연한(제네릭한) 복합 타입을 만들고 싶을 때가 있어요.

정의에 더미 타입을 넣으면 되는데, 보통 `T`라고 불러요.

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

당연히 이 방식은 필드에 컬렉션을 넣어도 잘 동작해요.

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
