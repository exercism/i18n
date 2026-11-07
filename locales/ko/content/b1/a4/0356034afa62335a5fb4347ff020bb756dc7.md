# 개요

이진 숫자는 궁극적으로 CPU나 RAM의 트랜지스터, 그리고 각 트랜지스터가 "켜짐"인지 "꺼짐"인지에 직접 대응해요.

흔히 "bit-twiddling"이라고 부르는 저수준 조작은 시스템 언어에서 특히 중요해요.

Julia 같은 고수준 언어는 보통 이런 세부 사항 대부분을 추상화해요.
하지만 기본 언어에서 다양한 비트 수준 연산을 [사용할 수 있어요][bitwise].

***참고:*** REPL에서 사람이 읽을 수 있는 이진 출력을 보려면, 아래 예제 거의 모두를 [`bitstring()`][bitstring] 함수로 감싸야 해요.
그러면 시각적으로 산만해져서, 이 함수가 들어간 부분은 대부분 빼버렸어요.

## 비트 시프트 연산

정수 타입은 부호가 있든 없든 1과 0의 문자열로 나타낼 수 있어요.

```julia-repl
julia> bitstring(UInt8(5))
"00000101"
```

비트 시프트는 모든 것을 지정한 위치 수만큼 왼쪽이나 오른쪽으로 옮길 뿐이에요.
`UInt` 타입에서는 한쪽 끝에서 비트가 빠져나가고, 다른 쪽 끝은 0으로 채워져요:

```julia-repl
julia> ux::UInt8 = 5
5

julia> bitstring(ux)
"00000101"

julia> ux << 2 # left by 2
"00010100"

julia> ux >> 1 # right by 1
"00000010"
```

왼쪽 시프트는 할 때마다 값을 두 배로 만들고, 오른쪽 시프트는 절반으로 만들어요(버림이 적용돼요).
이 점은 십진수 표현에서 더 분명하게 드러나요:

```julia-repl
julia> 3 << 2
12

julia> 24 >> 3
3
```

이런 비트 시프트는 "제대로 된" 산술 연산보다 훨씬 빠르기 때문에, 저수준 코딩에서 아주 인기 있는 기법이에요.

부호 있는 정수에서는 조금 더 조심해야 해요.

왼쪽 시프트는 비교적 간단해요:

```julia-repl
julia> sx = Int8(5)
5

julia> sx # positive integer
"00000101"

julia> sx << 2
"00010100"

julia> -sx # negative integer
"11111011"

julia> -sx << 2
"11101100"
```

따라서 양수 부호 있는 정수의 왼쪽 시프트는 부호 없는 정수와 같아요.

음수 값은 [2의 보수][2complement] 형태로 저장되는데, 이는 가장 왼쪽 비트가 1이라는 뜻이에요.
왼쪽 시프트에는 문제가 없지만, 오른쪽 시프트를 할 때 가장 왼쪽 비트는 어떻게 채울까요?

```julia-repl
julia> sx >> 2 # simple for positive values!
"00000001"

julia> -sx # negative integer
"11111011"

julia> -sx >> 2 # pad with repeated sign bit
"11111110"

julia> -sx >>> 2 # pad with 0
"00111110"
```

`>>` 연산자는 [산술 시프트][arithmetic]를 수행해서 부호 비트를 보존해요.

`>>>` 연산자는 [논리 시프트][logical]를 수행해서, 마치 부호 없는 수인 것처럼 0으로 채워요.

그래도 뭔가 부족한 느낌이 든다면, [`bitrotate()`][bitrotate] 함수도 있어요.

## 비트 논리 연산

이전 개념에서 `&&`(and), `||`(or), `!`(not) 연산자가 불리언 값과 함께 쓰인다는 것을 봤어요.

두 정수의 비트를 비교하기 위한 대응 연산자로 `&`(bitwise and), `|`(bitwise or), `~`(물결표, bitwise not)가 있어요.

```julia-repl
julia> 0b1011 & 0b0010 # bit is 1 in both numbers
"00000010"

julia> 0b1011 | 0b0010 # bit is 1 in at least one number
"00001011"

julia> ~0b1011 # flip all bits
"11110100"

julia> xor(0b1011, 0b0010) # bit is 1 in exactly one number, not both
"00001001"
```

여기서 `xor()`는 [배타적 논리합][xor]으로, 함수로 사용돼요(다른 표기는 아래를 참고해요).

덧붙이자면, `&`와 `|` 연산자는 불리언과도 함께 사용할 수 있어요.
`&&`와 `||`와 달리, 이때는 표현식의 모든 부분이 평가돼요: 단축 평가가 없어요.


## 그 밖의 기호

Julia는 수학을 사랑하고, 수학자들은 이해하기 어려운 기호를 사랑하기 때문에, 가지고 놀 기호가 더 많아요.

```julia-repl
julia> 0b1011 ⊻ 0b0010 # xor() in infix notation
"00001001"

julia> 0b1011 ⊼ 0b0010 # not and
"11111101"

julia> 0b1011 ⊽ 0b0010 # not or
"11110100"
```

Julia를 인식하는 편집기에서는 각각 `\xor`, `\nand`, `\nor`를 입력하고 탭을 눌러 넣어요.

이 기호들은 대학 수학을 배운 사람들 사이에서도 잘 알려져 있지 않아요(이 개념의 저자도 전에 본 적이 없었어요).
이것들을 쓰고 싶다면, 코드 리뷰를 부탁할 상대를 잘 골라야 해요!


[bitwise]: https://docs.julialang.org/en/v1/manual/mathematical-operations/#Bitwise-Operators
[bitstring]: https://docs.julialang.org/en/v1/base/numbers/#Base.bitstring
[xor]: https://en.wikipedia.org/wiki/Exclusive_or
[2complement]: https://en.wikipedia.org/wiki/Two%27s_complement
[arithmetic]: https://en.wikipedia.org/wiki/Arithmetic_shift
[logical]: https://en.wikipedia.org/wiki/Logical_shift
[bitrotate]: https://docs.julialang.org/en/v1/base/math/#Base.bitrotate
