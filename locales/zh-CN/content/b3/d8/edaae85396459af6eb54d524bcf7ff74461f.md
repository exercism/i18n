# 简介

`Complex numbers`并不复杂。
只是需要换个不那么吓人的名字。

复数非常有用，尤其在工程和科学领域，所以 Julia 直接把复数作为一种标准数值类型，与整数和浮点数并列。

## 基础

在 Julia 中，一个`complex`值本质上就是一对数字：通常是浮点数，但并非总是如此。
出于一些不幸的历史原因，它们被称为“实部”和“虚部”。
还是那句话，最好关注它背后的简单本质，而不是这些奇怪的名字。

要用两个实数创建复数，只需给虚部加上后缀`im`。

```julia-repl
julia> z = 1.2 + 3.4im
1.2 + 3.4im

julia> typeof(z)
ComplexF64 (alias for Complex{Float64})

julia> zi = 1 + 2im
1 + 2im

julia> typeof(zi)
Complex{Int64}
```

因此，`Complex`类型有若干种，分别由对应的整数类型或浮点数类型派生而来。

如果要由实数变量创建复数，上面的写法行不通。
写成`a + bim`会让解析器误以为`bim`是一个（并不存在的）变量名。

写成`b*im`也行，但更推荐的方法是使用`complex()`函数，这样就能绕开乘法和加法运算。

```julia-repl
julia> a = 1.2; b = 3.4; complex(a, b)
1.2 + 3.4im
```

要分别取得复数的各个部分：

```julia-repl
julia> z = 1.2 + 3.4im
1.2 + 3.4im

julia> real(z)
1.2

julia> imag(z)
3.4
```

或者一起取得：

```julia-repl
julia> reim(z)
(1.2, 3.4)
```

任一部分都可以为零，这时数学家会说这个数是“纯实数”或“纯虚数”。
不过在 Julia 中，它仍然是一个复数。

```julia-repl
julia> zr = 1.2 + 0im
1.2 + 0.0im

julia> typeof(zr)
ComplexF64 (alias for Complex{Float64})

julia> zi = 3.4im
0.0 + 3.4im

julia> typeof(zi)
ComplexF64 (alias for Complex{Float64})
```

你可能听说过“`i`（或`j`）是 -1 的平方根”。

目前，这句话的意思只是：虚部_按定义_满足下面这个等式：

```julia-repl
julia> 1im * 1im == -1
true
```

这个想法很简单，却能引出有趣的结果。

## 算术

所有用于浮点数和整数的标准数学`operators`和初等函数，同样适用于复数。下面是一小部分示例：

```julia-repl
julia> z1 = 1.5 + 2im
1.5 + 2.0im

julia> z2 = 2 + 1.5im
2.0 + 1.5im

julia> z1 + z2  # addition
3.5 + 3.5im

julia> z1 * z2  # multiplication
0.0 + 6.25im

julia> z1 / z2  # division
0.96 + 0.28im

julia> z1^2  # exponentiation
-1.75 + 6.0im

julia> 2^z1  # another exponentiation
0.5188946835878313 + 2.7804223253571183im
```

## 函数

除了`real()`和`imag()`，还有几个函数与复数关系尤为密切。

- `conj()`只是把复数虚部的符号翻转过来（_从 + 变成 -，或者反过来_）。
    - 由于复数乘法的特点，这个函数的用处比你想象的要多。
- `abs(<complex number>)`保证返回一个没有虚部的实数。
- `abs2(<complex number>)`返回`abs(<complex number>)`的平方：计算起来比`abs()`更快，而且往往正是计算所需要的。
- `angle(<complex number>)`返回以弧度表示的相位角。

```julia-repl
julia> z1
1.5 + 2.0im

julia> conj(z1)
1.5 - 2.0im

julia> abs(z1)
2.5

julia> abs2(z1)
6.25

julia> angle(z1)
0.9272952180016122
```
如果你对数学感兴趣，这里给出部分解释：

- `z1`的`(real, imag)`表示，实际上就是在复平面上使用笛卡尔坐标。
- 同一个复数也可以用极坐标写成`(r, θ)`的形式。
- 这里`r`和`θ`分别由`abs(z1)`和`angle(z1)`给出。

下面是一个用到若干常数的例子：

```julia-repl
julia> euler = exp(1im * π)
-1.0 + 1.2246467991473532e-16im

julia> real(euler)
-1.0

julia> round(imag(euler), digits=15)  # round to 15 decimal places
0.0
```

极坐标`(r, θ)`表示非常有用，所以 Julia 内置了`cis`（`cos(x) + isin(x)`的缩写）和`cispi`（`cos(πx) + isin(πx)`的缩写）这两个函数，帮助你更高效地构造它。

极坐标表示的用处体现在欧拉那个优美的公式里：`ℯ^(iθ) = cos(θ) + isin(θ) = x + iy`，其中`|x + iy| = 1`。
当`|x + iy| = r`时，就得到更一般的极坐标形式`r * ℯ^(iθ) = r * (cos(θ) + isin(θ)) = x + iy`。
注意，指数形式尤其紧凑，也便于运算。

```julia-repl
julia> exp(1im * π) ≈ cis(π) ≈ cispi(1)
true
```

上面之所以是近似相等，是因为`cis`和`cispi`能给出数值上更漂亮的结果，其中`cispi`在处理以 π 的任意倍数作为实参时（例如弧度！）尤其如此。

```julia-repl
julia> cis(π)
-1.0 + 0.0im

julia> cispi(1)
-1.0 + 0.0im

julia> θ = π/2;
julia> exp(im*θ)
6.123233995736766e-17 + 1.0im

julia> cis(θ)
6.123233995736766e-17 + 1.0im

julia> cispi(θ / π)  # θ/π == 1/2
0.0 + 1.0im
```

顺便说一句，这让复数非常适合在二维平面上做旋转和径向位移。

做旋转时，复数`z = x + iy`只需做一次简单的乘法就能绕原点旋转角度`θ`：`z * ℯ^(iθ)`。
注意，这里的`x`和`y`就是普通实数二维笛卡尔平面上的常用坐标；正角度对应*逆时针*旋转，负角度对应*顺时针*旋转。

同样简单的是，径向位移`Δr`可以通过把它加到极坐标形式复数的模`r`上来实现（例如`z = r * ℯ^(iθ)` -> `z' = (r + Δr) * ℯ^(iθ)`）。
注意，角度部分保持不变，只有模`r`发生变化，这符合预期。
