# 说明

一家研究机构发现，部分初级研究员在分析中一直使用不太理想的方法。
其中一种做法是：在继续计算之前，先把离散概率直接转成浮点数（也就是实数）。

资深研究员更愿意在计算中使用有理数，这样精度可能更高。他们想知道，初级研究员的这些不良做法是否影响了研究的结果。

研究分为两类：
- 运行大量测试，每个测试给出一个离散的成功概率，然后计算这些概率的平均值。
- 测试大量相互独立的事件，把所有事件都发生的总概率相乘计算出来。

资深研究员请你编写一些函数，帮他们判断使用浮点数做的分析中是否存在舍入误差；如果存在误差，还要给出精确的有理数结果。

## 1. 给出成功次数与试验次数之比

`rationalize(successes, trials)` 函数接收两个数组：`successes` 和 `trials`。
对于下标 `i`，`successes[i]` 表示在 `trials[i]` 次试验中成功的次数。
该函数返回一个数组，其中的元素是成功次数除以试验次数所得的有理数，顺序与输入数组一致。

```julia-repl
julia> rationalize([1, 2, 3], [4, 5, 6])
3-element Vector{Rational{Int64}}:
 1//4
 2//5
 1//2
```

## 2. 求出与成功次数和试验次数对应的实数概率

同样，`probabilities(successes, trials)` 函数接收两个数组：`successes` 和 `trials`。
它返回一个浮点数数组，其中的元素是成功次数除以试验次数，顺序与输入数组一致。

```julia-repl
julia> probabilities([1, 2, 3], [4, 5, 6])
3-element Vector{Float64}:
 0.25
 0.4
 0.5
```

## 3. 检查概率的平均值

`checkmean(successes, trials)` 接收两个数组：`successes` 和 `trials`。
它会比较实数概率的平均值与有理数概率的平均值。
- 如果两个平均值相等，`checkmean` 返回 `true`
- 如果两个平均值不同，`checkmean` 返回有理数概率。

```julia-repl
julia> successes, trials = [9, 4, 7, 8, 6], [22, 22, 11, 17, 12];
julia> checkmean(successes, trials)
true

julia> successes, trials = [6, 5, 9, 8, 9], [21, 19, 13, 25, 22];
julia> checkmean(successes, trials)
1873629//4754750
```

## 4. 检查独立概率

`checkprob(successes, trials)` 接收两个数组：`successes` 和 `trials`。
它会比较浮点数概率的总概率与有理数概率的总概率。
- 如果两个概率相等，`checkprob` 返回 `true`
- 如果两个概率不同，`checkprob` 返回有理数概率。

```julia-repl
julia> successes, trials = [2, 9, 4, 4, 5], [15, 11, 17, 19, 15];
julia> checkprob(successes, trials)
true

julia> successes, trials = [9, 8, 5, 4, 3], [22, 14, 19, 25, 18];
julia> checkprob(sucesses, trials)
12//7315
```
