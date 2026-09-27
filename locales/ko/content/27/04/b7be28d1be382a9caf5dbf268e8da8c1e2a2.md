# 소개

기본적으로 두 가지 종류의 루프가 있어요:

1. 조건이 만족될 때까지 반복해요.
2. 컬렉션의 원소를 반복해요.

둘 다 Julia에서 가능하지만, 두 번째가 더 흔할 수 있어요.

## `while` 루프

루프를 도는 횟수를 미리 알 수 없는 열린 문제라면, Julia에는 `while` 루프가 있어요.

기본 형태는 아주 간단해요:

```julia
while condition
    do_something()
end
```

이 경우 프로그램은 `condition`이 더 이상 `true`가 아닐 때까지 계속 루프를 돌아요.

루프를 일찍 빠져나가는 방법은 두 가지예요:

- `break`는 루프를 빠져나가게 하고, 실행은 루프의 `end` 다음 줄부터 이어져요.
- `return x`는 현재 함수의 실행을 멈추고, 반환값 `x`를 호출한 곳으로 돌려줘요.

이런 선택지가 있으면 `while true ... end`로 "무한" 루프를 만들고, 루프 본문 안에서 멈출 조건을 찾아 `break`나 `return`을 실행하는 방식이 편리할 때도 있어요.

## 컬렉션 반복하기

가장 간단한 예는 범위를 반복하는 거예요.

어떤 일을 열 번 하고 싶다면:

```julia
for n in 1:10
    do_something(n)
end
```

현재 반복이 어떤 조건을 만족하지 못하면, `continue`로 곧바로 다음 반복으로 건너뛸 수 있어요:

```julia
for n in 1:10
    if is_useless(n)
        continue
    end
    
    # we decided this iteration could be useful
    do_something_slow(n)
end
```

더 짧은 형태로는 `if` 블록을 `is_useless(n) && continue`로 대신할 수 있어요.

다른 여러 컬렉션 유형도 반복할 수 있어요: 배열의 원소, 문자열의 문자, 딕셔너리의 키...

지금까지의 예는 `1:10` 범위를 반복하는데, 여기서는 값이 루프 인덱스이기도 해요.

더 일반적으로는 값뿐만 아니라 인덱스도 필요할 수 있어요.
이럴 때는 `eachindex()` 함수를 사용해요. 예를 들어 `for i in eachindex(my_array) ... end`처럼요.

## 컴프리헨션

명시적인 루프를 작성하는 일은 많은 전통적인 언어에서보다 Julia에서 덜 흔한 편이에요. 더 간결한 방법이 여러 가지 있기 때문이죠.

특히 흔한 상황은 다른 컬렉션(벡터, 문자열, 집합... 여러 가능성이 있어요)의 원소로 새로운 벡터를 만들어야 할 때예요.

Python의 리스트 컴프리헨션을 좋아한다면, Julia에서도 비슷한 문법을 쓸 수 있다는 사실이 반가울 거예요.

핵심은 벡터 안에 아주 간결한 루프를 만드는 거예요.

가장 간단한 문법은 `result = [f(x) for x in some_collection]` 형태예요.

전통적인 루프로 쓰면 이렇게 될 거예요:

```julia
result = []
for x in some_collection
    push!(result, f(x))
end
```

선택 사항으로, 컬렉션에서 조건에 맞는 원소만 고르도록 끝에 조건을 추가할 수 있어요:

```julia-repl
# multiples of 3
julia> [n^2 for n in 1:10 if n%3 == 0]
3-element Vector{Int64}:
  9
 36
 81
```
