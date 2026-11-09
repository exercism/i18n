# 提示

## 1. 讓機器人定向

- 執行這些運算的順序很重要。
- 把向量的向量轉換成矩陣有幾種方法。
- 一些有助於建立矩陣的做法：推導式、`for` 迴圈、[`hcat`][hcat-ref]、[`reshape`][reshape-ref]、[`stack`][stack-ref] 等等……

## 2. 旋轉機器人

- 如何旋轉矩陣請參閱簡介。
- 只需要簡單的矩陣乘法就夠了。

## 3. 檢查方向是否正確

- 記住，決定方向的是矩陣的*第二*列。
- 可以用內積來檢查。
- 將向量正規化可能會有幫助。
- 如果有浮點數誤差，方向只需要[近似][isapprox-ref]等於大約`~1e-7`即可。
- 以下這個恆等式可能會有幫助：`x⋅y = ||x||*||y||cos(θ)`，其中[`||x|| = norm(x)`][norm-ref]

## 4. 機器人身體座標

- 這非常直接，但逐元素運算很重要。
- 記住，方向矩陣可以看成從原點出發的三個位置向量。

[hcat-ref]: https://docs.julialang.org/en/v1/base/arrays/#Base.hcat
[reshape-ref]: https://docs.julialang.org/en/v1/base/arrays/#Base.reshape
[stack-ref]: https://docs.julialang.org/en/v1/base/arrays/#Base.stack
[isapprox-ref]: https://docs.julialang.org/en/v1/base/math/#Base.isapprox
[norm-ref]: https://docs.julialang.org/en/v1/stdlib/LinearAlgebra/#LinearAlgebra.norm
