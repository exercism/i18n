# 提示

## 1. 确定机器人的朝向

- 执行这些操作的顺序很重要。
- 把由向量组成的向量转换成矩阵，方法有好几种。
- 构造矩阵时，下面这些思路可能会有帮助：推导式、`for`循环、[`hcat`][hcat-ref]、[`reshape`][reshape-ref]、[`stack`][stack-ref] 等等……

## 2. 旋转机器人

- 如何旋转矩阵，见简介。
- 只需要简单的矩阵乘法。

## 3. 检查朝向是否正确

- 记住，矩阵的*第二*列才表示朝向。
- 可以用点积来检查。
- 把向量归一化可能会有帮助。
- 如果出现浮点数误差，朝向只需要[近似][isapprox-ref]等于`~1e-7`左右即可。
- 下面这个恒等式可能会有帮助：`x⋅y = ||x||*||y||cos(θ)`，其中 [`||x|| = norm(x)`][norm-ref]

## 4. 机器人的本体坐标

- 这一部分非常直接，但逐元素运算很重要。
- 记住，朝向矩阵可以看作从原点出发的三个位置向量。

[hcat-ref]: https://docs.julialang.org/en/v1/base/arrays/#Base.hcat
[reshape-ref]: https://docs.julialang.org/en/v1/base/arrays/#Base.reshape
[stack-ref]: https://docs.julialang.org/en/v1/base/arrays/#Base.stack
[isapprox-ref]: https://docs.julialang.org/en/v1/base/math/#Base.isapprox
[norm-ref]: https://docs.julialang.org/en/v1/stdlib/LinearAlgebra/#LinearAlgebra.norm
