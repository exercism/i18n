# 简介

“统计学”是一门庞大而复杂的学科，涉及很多方面。

有些方面在[`Randomness`][randomness]概念中已经提到过，那是一个独立但相关的主题。

从最简单的层面来说，统计学可以是用单个值来汇总一个可迭代数据集合的方法。

初学 Julia 的人可能会惊讶地发现，这门语言默认内置的函数少得可怜：

- [`sum`][sum]，把数字加起来。
- [`min`][min]和[`max`][max]，用来获取给定参数中的极值。
- [`extrema`][extrema]，用来获取可迭代对象的（min, max）元组。
- [`length`][length]，用来统计所有值的个数。
- [`count`][count]，只统计满足某个条件的值。

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

这组有限的函数是刻意设计的，目的是把其他函数移到一连串其他模块和包中，尽量减少 Julia 基础部分的臃肿。

## `Statistics`模块

作为标准库的一部分，[`Statistics`][statistics]很可能已经预装，只需在程序顶部加上`using Statistics`，就能把它引入命名空间。

这个模块包含下一层级的常用函数，它们可能被一部分程序员广泛使用。

`Statistics`中的许多函数都假定你对该学科有一定背景知识。最简单的例子包括：

- [`mean`][mean]，很多人称之为平均值（结果等同于`sum / length`）。
- [`median`][median]，排序后位于中间的值。
- [`std`][std]，即[标准差][stddev]：衡量数值分布有多分散的一个量度。
- [`var`][var]，即方差：`std`的平方，通常计算起来更快。

每个函数往往都有各种选项，而且还有_大量_其他函数，感兴趣的话可以查看[文档][statistics]。

## 其他包

正如你所预料的，统计学是 Julia 的一大应用场景，有许多可用的包来支持更专业的工作。

JuliaStats 小组贴心地维护了一份[在线列表][juliastats]。

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
