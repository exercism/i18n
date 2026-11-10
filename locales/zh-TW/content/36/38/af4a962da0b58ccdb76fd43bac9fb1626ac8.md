# 簡介

「統計」是一門龐大又複雜的學科，涵蓋許多面向。

其中有些面向已經在[`Randomness`][randomness]概念裡提過，那是個獨立但相關的主題。

最簡單來說，統計可以用來把一整組可疊代的資料彙整成單一個值。
剛接觸 Julia 的人可能會訝異，這個語言預設內建的函式竟然這麼少：

- [`sum`][sum]，用來把數字加總。
- [`min`][min]和[`max`][max]，用來取得所給參數中的極值。
- [`extrema`][extrema]，用來取得某個可疊代序列的（min, max）元組。
- [`length`][length]，用來計算所有值的數量。
- [`count`][count]，只計算符合某個條件的值。

```julia-repl
julia> v = collect(1:0.2:3)
11-element Vector{Float64}:
 1.0
 1.2
 ... # display truncated
 3.0

julia> mean(v)
2.0

julia> extrema(v)
(1.0, 3.0)

julia> length(v)
11

julia> min('g', 'a', 'c')
'a': ASCII/Unicode U+0061 (category Ll: Letter, lowercase)

julia> count(isodd, 1:5)  # 1, 3, and 5 are odd
3
```

這組有限的函式是刻意的設計，目的是避免 Julia 的基礎環境過於臃腫，因此把其他函式一層一層地移到其他模組與套件裡。

## `Statistics`模組

由於[`Statistics`][statistics]屬於標準函式庫，通常會預先安裝好，只要在程式開頭加上`using Statistics`，就能把它帶進命名空間。

這個模組收錄了下一層常用的函式，這些函式可能會被一部分的程式設計師廣泛使用。

`Statistics`裡的許多函式都預設你對統計學有些背景知識。
最簡單的例子包括：

- [`mean`][mean]，許多人稱之為平均數（結果等同於 `sum / length`）。
- [`median`][median]，排序後位在中間的值。
- [`std`][std]，也就是[標準差][stddev]：衡量數值分散程度的指標。
- [`var`][var]，變異數：即 `std`的平方，計算上通常比較快。

每個函式通常都有各種選項，而且還有_更多_函式，如果有興趣，可以查閱[官方文件][statistics]。

## 其他套件

如你所料，統計是 Julia 的一大應用領域，也有許多現成的套件可以支援更專門的工作。

JuliaStats 團隊很熱心地維護了一份[線上清單][juliastats]。

[statistics]: https://docs.julialang.org/en/v1/stdlib/Statistics/
[randomness]: https://exercism.org/tracks/julia/concepts/randomness
[sum]: https://docs.julialang.org/en/v1/base/collections/#Base.sum
[min]: https://docs.julialang.org/en/v1/base/math/#Base.min
[max]: https://docs.julialang.org/en/v1/base/math/#Base.max
[extrema]: https://docs.julialang.org/en/v1/base/collections/#Base.extrema
[length]: https://docs.julialang.org/en/v1/base/collections/#Base.length
[count]: https://docs.julialang.org/en/v1/base/collections/#Base.count
[mean]: https://docs.julialang.org/en/v1/stdlib/Statistics/#Statistics.mean
[median]: https://docs.julialang.org/en/v1/stdlib/Statistics/#Statistics.median
[std]: https://docs.julialang.org/en/v1/stdlib/Statistics/#Statistics.std
[var]: https://docs.julialang.org/en/v1/stdlib/Statistics/#Statistics.var
[stddev]: https://en.wikipedia.org/wiki/Standard_deviation
[juliastats]: https://juliapackages.com/u/juliastats
