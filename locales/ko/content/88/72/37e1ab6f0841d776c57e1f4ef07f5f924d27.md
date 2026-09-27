# 소개

`Types` 개념에서는 다음과 같은 걸 배웠어요.

- Julia의 타입은 계층 구조를 이뤄요.
- 모든 타입에는 상위 타입이 있어요.
- `Any`는 계층 구조의 맨 위에 있고, 자기 자신의 상위 타입이에요.
- 타입은 하위 타입을 _가질 수도_ 있고, 하위 타입을 가진 타입을 `abstract types`라고 불러요.
- 하위 타입이 없는 타입(트리에서 잎에 해당하는 노드)은 `concrete types`라고 불러요.
- `Char`나 `Int64`처럼 더 이상 나눌 수 없는 타입은 `primitive types`라고 불러요.

이렇게 단순한 형태의 추상과 구체 패턴을 따르는 건 `primitive` 타입뿐이에요.

원시 타입이 아닌 타입의 예로는 `Vector`나 `Set` 같은 컬렉션이 있어요.

```julia-repl
julia> isprimitivetype(Int)
true

julia> isprimitivetype(Vector)
false
```

_무엇을 모아 놓은 걸까요?_

각 Vector(또는 Set)는 어떤 하나로 통일된 타입의 원소를 모아 놓은 컬렉션이에요. 이 타입은 중괄호 `{ }` 안에 _매개변수_로 지정할 수도 있고, 생략해서 타입 추론이 알아내도록 할 수도 있어요.

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

이런 `parametric types`는 `generic programming`의 한 형태예요. 현대의 많은 언어에도 대체로 이에 해당하는 기능이 있지만, 세부적인 부분에서는 차이가 많아요.

## 매개변수 복합 타입

여러 가지 필드 타입을 다룰 수 있을 만큼 유연한(제네릭한) 복합 타입을 만들고 싶을 때가 있어요.

이럴 때는 정의에 더미 타입을 하나 넣으면 돼요. 이 더미 타입은 보통 `T`라고 불러요.

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

물론 이 방식은 필드에 컬렉션을 넣을 때도 똑같이 잘 동작해요.

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
