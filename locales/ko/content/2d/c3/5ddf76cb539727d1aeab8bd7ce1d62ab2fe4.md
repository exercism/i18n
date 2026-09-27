# 소개

Julia 트랙 전체에서는 풀이를 작은 라이브러리처럼 다루게 돼요. 즉, 함수와 타입 등을 정의하고, 그것을 테스트 스위트로 검사하는 방식이에요.
그래서 가장 첫 번째 개념으로 이름 있는 함수를 소개해요.

Julia는 동적이면서 타입을 엄격하게 다루는 프로그래밍 언어예요.
프로그래밍 스타일은 주로 함수형이지만, Haskell 같은 언어보다 훨씬 유연해요.

## 변수와 할당

변수는 미리 선언할 필요가 없어요.
알맞은 이름에 값을 할당하기만 하면 돼요:

```julia-repl
julia> myvar = 42  # an integer
42

julia> name = "Maria"  # strings are surrounded by double-quotes ""
"Maria"
```

## 상수

값이 프로그램 전체에서 필요하지만 바뀌지는 않을 것으로 예상된다면, 상수로 표시하는 게 좋아요.

할당 앞에 `const` 키워드를 붙이면, 컴파일러가 변수일 때보다 더 효율적인 코드를 만들 수 있어요.

상수는 코딩 중 실수를 막아 주는 데도 도움이 돼요.
실수로 `const` 값을 바꾸려고 하면 경고가 나와요:

```julia-repl
julia> const answer = 42
42

julia> answer = 24
WARNING: redefinition of constant Main.answer. This may fail, cause incorrect answers, or produce other errors.
24
```

`const`는 함수 *바깥*에서만 선언할 수 있다는 점에 주의해요.
보통 `*.jl` 파일 위쪽, 함수 정의보다 앞에 둬요.

## 산술 연산자

다른 여러 언어와 같아요:

```julia
2 + 3  # 5 (addition)
2 - 3  # -1 (subtraction)
2 * 3  # 6 (multiplication)
8 / 2  # 4.0 (division with floating-point result)
8 % 3  # 2 (remainder)
```

## 함수

Julia에서 이름 있는 함수를 정의하는 방법은 크게 두 가지예요:

1. `function` 키워드 사용하기

    ```julia
    function muladd(x, y, z)
        x * y + z
    end
    ```

    가독성을 위해 4칸 들여쓰기를 관례로 쓰지만, 컴파일러는 들여쓰기를 신경 쓰지 않아요.
    `end` 키워드는 꼭 필요해요.

    `return x * y + z`라고 쓸 수도 있다는 점을 기억해요.
    하지만 Julia 함수는 항상 마지막으로 평가된 표현식을 반환하기 때문에 `return` 키워드는 선택 사항이에요.
    많은 프로그래머는 의도를 더 분명히 드러내려고 `return`을 붙이는 걸 선호해요.

2. "할당 형식" 사용하기

    ```julia
    muladd(x, y, z) = x * y + z
    ```

    주로 간결한 단일 표현식 함수를 만들 때 써요.

    할당 형식에서는 `return` 키워드를 *절대* 쓰지 않아요.

두 형식은 완전히 같고 쓰는 방법도 똑같으니, 더 읽기 쉬운 쪽을 고르면 돼요.

함수를 호출할 때는 함수 이름을 쓰고, 각 매개변수에 해당하는 인자를 넘겨요:

```julia
# invoking a function
muladd(10, 5, 1)

# and of course you can invoke a function within the body of another function:
square_plus_one(x) = muladd(x, x, 1)
```

## 이름 규칙

여러 언어가 그렇듯 Julia에서도 이름(변수, 함수, 여러 가지 것들의 이름)은 문자로 시작해야 하고, 그 뒤에는 문자와 숫자, 밑줄을 자유롭게 조합할 수 있어요.

관례적으로 변수, 상수, 함수 이름은 *소문자*로 쓰고, 밑줄은 적당한 선에서 최소한으로만 써요.