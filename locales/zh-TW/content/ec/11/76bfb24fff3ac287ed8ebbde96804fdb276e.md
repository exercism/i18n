# 簡介

`Complex numbers`並不複雜。它們只是需要一個不那麼嚇人的名稱。

複數非常實用，尤其在工程和科學領域，因此 R 把[複數][web-complex]列為標準的[原子型別][ref-atomic]，與 integer、double、logical、character 和 raw 並列。

## 基礎

在 R 中，`complex`數字是單一的值。不過在使用時，它可以被想成一對數字。基於一些不幸的歷史因素，這兩個部分被稱為「實部」和「虛部」。再次強調，最好著眼於它底層的簡單，而不是那些奇怪的名稱。

若要從兩個實數建立複數，只要在虛部加上後綴`i`就可以了。

```r
2+3i
#> [1] 2+3i

typeof(2+3i)
#> [1] "complex"
```

若要用實數變數建立複數，上面的語法行不通。寫成`r + imi`會讓解析器誤以為`imi`是一個（不存在的）變數名稱。

你可以把虛部乘上`1i`，或是使用[`complex()`][ref-complex]函式：

```r
r <- 2
im <- 3

r + im * 1i
#> [1] 2+3i

# must include the `real` and `imaginary` keywords
complex(real = r, imaginary = im)
#> [1] 2+3i
```

你可能會想，為什麼是`i`而不是`j`？

大多數工程師偏好`j`。大多數科學家和數學家則偏好用數學符號`i`來表示 _虛數_，但這個符號和電機工程中以`i`表示 _電流_ 的用法衝突。

R 選了`i`，Python 選了`j`，而 Julia 則以`im`迴避了這場爭議。在 [STEM][wiki-STEM] 程式語言之間切換時要小心。

若要分別存取複數的各個部分：

```r
z <- 2+3i

Re(z)  # real part
#> [1] 2

Im(z)  # imaginary part
#> [1] 3
```

任一部分都可以是零，數學家可能會因此說這個數「完全是實數」或「完全是虛數」。不過，它在 R 中仍然是個複數。

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

你可能聽過「`i`（或`j`）是 -1 的平方根」。

目前，這一切的意思只是：虛部 _依定義_ 滿足以下等式：

```r
1i * 1i == -1  # more precisely, 1i * 1i == -1 + 0i
#> [1] TRUE
```

這是個簡單的概念，但會帶來有趣的結果。

## 算術

大多用於浮點數和整數的[`operators`][ref-operators]也適用於複數：

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

說明複數乘法和除法的規則超出了這個概念的範圍（_而且你也不太需要經常「手動」執行這些運算_）。

如果你想深入研究這個主題，任何[數學][web-math-complex]或[電機工程][web-engineering-complex]的複數入門介紹都會涵蓋這些內容。

另外，Exercism 有一個[`Complex Numbers`][exercise-complex-numbers]練習題，你可以從基本原理出發，實作一個具備這些運算的複數類別。

整數除法通常___無法___用在複數上，所以`%/%`和`%%`運算子對複數型別會失敗。

## 函式

大多數數學函式都能處理複數輸入。不過，提供實數輸入卻期待得到複數輸出，通常行不通。

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

除了`Re()`和`Im()`之外，還有幾個函式與複數特別相關。

- `Conj()`只是把複數虛部的正負號翻轉（_從 + 變成 -，或反過來_）。
  - 由於複數乘法的運作方式，這比你想像的還要有用。
- `abs(<complex number>)`保證會回傳一個沒有虛部的實數（它的「量值」），而`Mod(<complex number>)`是同義詞。
- `Arg(<complex number>)`會回傳以弧度為單位的相位角。

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
