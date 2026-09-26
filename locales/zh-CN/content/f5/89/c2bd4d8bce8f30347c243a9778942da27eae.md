# 介绍

`Complex numbers`并不复杂。
它们只是需要一个不那么吓人的名字。

它们在工程和科学领域尤其有用，因此 R 把[复数][web-complex]作为标准的[原子类型][ref-atomic]，与整数、双精度、逻辑、字符和原始类型并列。

## 基础

在 R 中，一个`complex`数就是一个值。
不过在使用时，可以把它看作一对数字。
由于一些不幸的历史原因，这两个部分分别叫作“实部”和“虚部”。
还是那句话，最好关注它底层的简单本质，而不是这些奇怪的名字。

要从两个实数创建复数，只需给虚部加上后缀`i`。

```r
2+3i
#> [1] 2+3i

typeof(2+3i)
#> [1] "complex"
```

如果要从实数变量创建复数，上面的语法就不管用了。
写成`r + imi`会让解析器误以为`imi`是一个（并不存在的）变量名。

你可以把虚部乘以`1i`，也可以使用[`complex()`][ref-complex]函数：

```r
r <- 2
im <- 3

r + im * 1i
#> [1] 2+3i

# must include the `real` and `imaginary` keywords
complex(real = r, imaginary = im)
#> [1] 2+3i
```

你可能会想，为什么是`i`而不是`j`？

大多数工程师更喜欢`j`。
大多数科学家和数学家更偏爱用数学记号`i`来表示_虚数_，但这个记号与电气工程中用`i`表示_电流_的做法冲突。

R 选择了`i`，Python 选择了`j`，而 Julia 干脆避开这场争论，选择了`im`。
在不同 [STEM][wiki-STEM] 编程语言之间切换时要小心。

要单独访问复数的各个部分：

```r
z <- 2+3i

Re(z)  # real part
#> [1] 2

Im(z)  # imaginary part
#> [1] 3
```

任一部分都可以为零，这时数学家会说这个数是“纯实数”或“纯虚数”。
不过，在 R 中它仍然是复数。

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

你可能听说过“`i`（或`j`）是 -1 的平方根”。

眼下，这句话的意思无非是：虚部_按定义_满足下面这个等式：

```r
1i * 1i == -1  # more precisely, 1i * 1i == -1 + 0i
#> [1] TRUE
```

这个想法很简单，却能带来一些有趣的结果。

## 运算

用于浮点数和整数的大多数[`operators`][ref-operators]也能用于复数：

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

解释复数乘法和除法的规则超出了本概念的范围（_而且你也不太可能经常需要“手工”进行这些运算_）。

如果你想深入了解这个话题，任何一篇关于复数的[数学][web-math-complex]或[电气工程][web-engineering-complex]入门材料都会讲到这些。

另外，Exercism 还有一道[`Complex Numbers`][exercise-complex-numbers]练习，你可以在其中从基本原理出发，实现一个带有这些运算的复数类。

复数通常___不能___做整数除法，所以 `%/%` 和 `%%` 运算符对复数类型会报错。

## 函数

大多数数学函数都能处理复数输入。

不过，提供实数输入却期待得到复数输出，通常是不行的。

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

除了`Re()`和`Im()`之外，还有几个函数与复数特别相关。

- `Conj()`只是翻转复数虚部的符号（_从 + 变成 -，或者反过来_）。
  - 由于复数乘法的运作方式，这个函数比你可能以为的更有用。
- `abs(<complex number>)`保证返回一个不含虚部的实数（它的“模”），`Mod(<complex number>)`是它的同义词。
- `Arg(<complex number>)`返回以弧度表示的相位角。

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
