# はじめに

`Complex numbers`は、ややこしいものではありません。
ただ、もう少しおだやかな名前を付けてあげればいいだけです。

工学や科学の分野ではとりわけ役に立つため、Rでは[複素数][web-complex]が、整数・倍精度・論理値・文字列・rawと並ぶ標準の[アトミック型][ref-atomic]として用意されています。

## 基本

Rにおける`complex`は、1つの値です。
ただし、実際には2つの数値のペアと考えることができます。
これらは、残念な歴史的経緯から「実部」と「虚部」と呼ばれています。
繰り返しになりますが、奇妙な名前にとらわれず、その根底にあるシンプルさに目を向けましょう。

2つの実数から複素数を作るには、虚部に接尾辞`i`を付けるだけです。

```r
2+3i
#> [1] 2+3i

typeof(2+3i)
#> [1] "complex"
```

実数の変数から複素数を作る場合、上記の書き方ではうまくいきません。
`r + imi`と書くと、パーサーが`imi`という（存在しない）変数名だと勘違いしてしまいます。

虚部に`1i`を掛けるか、[`complex()`][ref-complex]関数を使います。

```r
r <- 2
im <- 3

r + im * 1i
#> [1] 2+3i

# must include the `real` and `imaginary` keywords
complex(real = r, imaginary = im)
#> [1] 2+3i
```

なぜ`j`ではなく`i`なのか、不思議に思うかもしれません。

エンジニアの多くは`j`を好みます。
科学者や数学者の多くは、_虚数_を表す数学記号として`i`を好みますが、電気工学では`i`が_電流_を意味するために使われ、この記号は衝突してしまいます。

Rは`i`を選び、Pythonは`j`を選び、Juliaは`im`を選んでこの論争を避けました。
[科学・技術・工学・数学（STEM）][wiki-STEM]分野のプログラミング言語を行き来するときは、注意しましょう。

複素数の各部に個別にアクセスするには、次のようにします。

```r
z <- 2+3i

Re(z)  # real part
#> [1] 2

Im(z)  # imaginary part
#> [1] 3
```

どちらの部分も0になり得ます。その場合、数学者はその数を「完全に実数」または「完全に虚数」と呼ぶことがあります。
ただし、Rではそれでも複素数です。

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

「`i`（または`j`）は-1の平方根だ」と聞いたことがあるかもしれません。

今のところ、これが意味するのは、虚部が_定義により_次の等式を満たすということだけです。

```r
1i * 1i == -1  # more precisely, 1i * 1i == -1 + 0i
#> [1] TRUE
```

単純な考え方ですが、興味深い結果につながります。

## 演算

浮動小数点数や整数で使う[`operators`][ref-operators]のほとんどは、複素数でも使えます。

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

複素数の乗算と除算のルールを説明することは、この概念の範囲外です（_そして、そうした演算を「手作業で」行う必要は、めったにないでしょう_）。

この話題を深く掘り下げたい場合は、複素数に関する[数学][web-math-complex]や[電気工学][web-engineering-complex]の入門書が参考になるでしょう。

あるいは、Exercismには[`Complex Numbers`][exercise-complex-numbers]という練習用の演習があり、これらの演算を基本原理から実装した複素数クラスを作ることができます。

整数除算は、一般に複素数では___できません___。そのため、`%/%`演算子と`%%`演算子は複素数型ではエラーになります。

## 関数

ほとんどの数学関数は、複素数を入力として受け付けます。

ただし、実数を入力して複素数の結果を期待しても、通常はうまくいきません。

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

`Re()`と`Im()`のほかにも、複素数に特に関連する関数がいくつかあります。

- `Conj()`は、複素数の虚部の符号を反転させるだけです（_+から-へ、またはその逆へ_）。
  - 複素数の乗算の仕組み上、これは思っている以上に役に立ちます。
- `abs(<complex number>)`は、虚部を持たない実数（その「大きさ」）を返すことが保証されており、`Mod(<complex number>)`はその同義語です。
- `Arg(<complex number>)`は、位相角をラジアンで返します。

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
