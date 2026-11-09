# 소개

`Complex numbers`는 복잡하지 않아요.
그저 조금 덜 무서운 이름이 필요할 뿐이에요.

공학과 과학 분야에서 특히 유용하기 때문에, R에서는 [복소수][web-complex]를 integer, double, logical, character, raw와 함께 표준 [원자 타입][ref-atomic]으로 포함하고 있어요.

## 기초

R에서 `complex` 수는 하나의 값이에요.
하지만 실제로 쓸 때는 두 수의 쌍으로 생각할 수 있어요.
이 둘은 안타까운 역사적 이유 때문에 "실수부"와 "허수부"라고 불려요.
다시 말하지만, 이상한 이름보다는 바탕에 있는 단순함에 집중하는 게 좋아요.

두 실수로 복소수를 만들려면, 허수부에 접미사 `i`를 붙이기만 하면 돼요.

```r
2+3i
#> [1] 2+3i

typeof(2+3i)
#> [1] "complex"
```

실수 변수로 복소수를 만들려면 위 문법은 통하지 않아요.
`r + imi`라고 쓰면 파서가 `imi`를 (존재하지 않는) 변수 이름으로 착각해요.

허수부에 `1i`를 곱하거나 [`complex()`][ref-complex] 함수를 사용해요.

```r
r <- 2
im <- 3

r + im * 1i
#> [1] 2+3i

# must include the `real` and `imaginary` keywords
complex(real = r, imaginary = im)
#> [1] 2+3i
```

왜 `j`가 아니라 `i`인지 궁금할 수 있어요.

대부분의 엔지니어는 `j`를 선호해요.
대부분의 과학자와 수학자는 _허수_를 뜻하는 수학 표기법 `i`를 선호하지만, 그 표기법은 전기 공학에서 _전류_를 뜻하는 `i`의 사용과 충돌해요.

R은 `i`를, Python은 `j`를 택했고, Julia는 `im`을 택해 논란을 피했어요.
[STEM][wiki-STEM] 분야의 프로그래밍 언어 사이를 오갈 때는 주의해요.

복소수의 각 부분에 개별적으로 접근하려면:

```r
z <- 2+3i

Re(z)  # real part
#> [1] 2

Im(z)  # imaginary part
#> [1] 3
```

어느 한쪽 부분이 0일 수도 있고, 그러면 수학자들은 그 수를 "완전히 실수" 또는 "완전히 허수"라고 말하기도 해요.
하지만 R에서는 여전히 복소수예요.

```r
1.2 + 0i
#> [1] 1.2+0i

typeof(1.2 + 0i)
#> [1] "complex"

2i
#> [1] 0+2i

typeof(2i)
#> [1] "complex"
```

"`i`(또는 `j`)가 -1의 제곱근이다"라는 말을 들어 봤을지도 몰라요.

지금은, 이 말이 허수부가 _정의상_ 다음 등식을 만족한다는 뜻일 뿐이에요:

```r
1i * 1i == -1  # more precisely, 1i * 1i == -1 + 0i
#> [1] TRUE
```

단순한 생각이지만, 흥미로운 결과로 이어져요.

## 산술

실수와 정수에 쓰이는 [`operators`][ref-operators] 대부분은 복소수에도 쓸 수 있어요:

```r
z1 = 1.5 + 2i
z2 = 2 + 1.5i

z1 + z2  # addition
#> [1] 3.5+3.5i

z1 * z2  # multiplication
#> [1] 0+6.25i

z1 / z2  # division
#> [1] 0.96+0.28i

z1^2  # exponentiation
#> [1] -1.75+6i

2^z1  # another exponentiation
#> [1] 0.518895+2.780422i
```

복소수의 곱셈과 나눗셈 규칙을 설명하는 것은 이 개념의 범위를 벗어나요(_그리고 그런 연산을 "손으로" 직접 할 일도 거의 없을 거예요_).

복소수에 관한 [수학][web-math-complex] 또는 [전기 공학][web-engineering-complex] 입문서를 보면 이 내용을 다루니, 주제를 더 깊이 파고들고 싶다면 참고해요.

또는 Exercism에는 이런 연산을 처음부터 직접 구현해 볼 수 있는 [`Complex Numbers`][exercise-complex-numbers] 연습 문제가 있어요.

정수 나눗셈은 일반적으로 복소수에서 ___불가능___하기 때문에, `%/%`와 `%%` 연산자는 복소수 타입에서 실패해요.

## 함수

대부분의 수학 함수는 복소수 입력에서도 동작해요.

하지만 실수 입력을 주고 복소수 출력을 기대하는 것은 보통 통하지 않아요.

```r
sqrt(z1)
#> [1] 1.414214+0.707107i

sqrt(-1)  # fails!
#> Warning in sqrt(-1) : NaNs produced
#> [1] NaN

sqrt(-1 + 0i)  # succeeds with complex input
#> [1] 0+1i

sin(z1)
#> [1] 3.752771+0.256554i
```

`Re()`와 `Im()` 외에도, 복소수와 특히 관련이 깊은 함수가 몇 가지 있어요.

- `Conj()`는 복소수의 허수부 부호를 그냥 뒤집어요(_+에서 -로, 또는 그 반대로_).
  - 복소수 곱셈이 동작하는 방식 때문에, 생각보다 유용해요.
- `abs(<complex number>)`는 허수부가 없는 실수, 즉 "크기"를 반환하는 것이 보장되고, `Mod(<complex number>)`는 동의어예요.
- `Arg(<complex number>)`는 위상각을 라디안으로 반환해요.

```r
z1
#> [1] 1.5+2i

abs(z1)
#> [1] 2.5

Mod(z1)  # same as previous
#> [1] 2.5

Conj(z1)  # flip sign
#> [1] 1.5-2i

Arg(z1)
#> [1] 0.9272952
```

[web-complex]: https://www.cfm.brown.edu/people/dobrush/am33/R/intro/complex0.html
[ref-atomic]: https://cran.r-project.org/doc/manuals/r-release/R-lang.html#Vectors
[ref-complex]: https://www.rdocumentation.org/packages/base/versions/3.3.0/topics/complex
[web-math-complex]: https://www.nagwa.com/en/videos/143121736364/
[web-engineering-complex]: https://www.khanacademy.org/science/electrical-engineering/ee-circuit-analysis-topic/ee-ac-analysis/v/ee-complex-numbers
[ref-operators]: https://stat.ethz.ch/R-manual/R-devel/library/base/html/Syntax.html
[wiki-STEM]: https://en.wikipedia.org/wiki/Science,_technology,_engineering,_and_mathematics
[exercise-complex-numbers]: https://exercism.org/tracks/r/exercises/complex-numbers
