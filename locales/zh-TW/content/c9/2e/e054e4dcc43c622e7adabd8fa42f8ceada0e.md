# 簡介

`Complex numbers`並不複雜。
它們只是需要一個不那麼嚇人的名稱。

複數非常實用，尤其在工程與科學領域，因此 Julia 把複數與整數和浮點數一同列為標準數值型別。

## 基礎

在 Julia 中，一個`complex`值本質上是一對數字：通常是浮點數，但不總是如此。
基於一些不幸的歷史因素，它們被稱為「實部」與「虛部」。
同樣地，最好專注於它們本質上的簡單，而不是那些奇怪的名稱。

若要用兩個實數建立複數，只要在虛部加上後綴`im`即可。

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

因此有各種`Complex`型別，分別衍生自對應的整數或浮點數型別。

若要從實數變數建立複數，上述語法行不通。
寫成`a + bim`會讓解析器誤以為`bim`是一個（不存在的）變數名稱。

寫成`b*im`也是可行的，但較建議的做法是使用`complex()`函式，這樣就能避開乘法與加法運算。

```julia-repl
julia> a = 1.2; b = 3.4; complex(a, b)
1.2 + 3.4im
```

若要個別存取複數的各個部分：

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

任一部分都可以是零，數學家可能會因此稱這個數為「純實數」或「純虛數」。
不過，在 Julia 中它仍然是複數。

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

你可能聽過「`i`（或`j`）是 -1 的平方根」。

到目前為止，這只表示虛部_依定義_滿足下列等式：

```julia-repl
julia> 1im * 1im == -1
true
```

這是個簡單的概念，卻會帶來有趣的結果。

## 算術

所有用於浮點數與整數的標準數學`operators`與基本函式，也都能用在複數上。以下是一個小範例：

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

## 函式

除了`real()`與`imag()`之外，還有幾個函式與複數特別相關。

- `conj()`只是把複數虛部的正負號翻轉（_從 + 變 -，或反過來_）。
    - 由於複數乘法的運作方式，這比你想像的還要有用。
- `abs(<complex number>)`保證會回傳一個不含虛部的實數。
- `abs2(<complex number>)`會回傳`abs(<complex number>)`的平方：計算起來比`abs()`快，而且往往正是某個計算所需要的。
- `angle(<complex number>)`會回傳以弧度表示的相位角。

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
給偏好數學的讀者一個粗略的解釋：

- `z1`的`(real, imag)`表示法實際上是在複數平面上使用笛卡兒座標。
- 同一個複數也可以用`(r, θ)`記法表示，也就是使用極座標。
- 在這裡，`r`與`θ`分別由`abs(z1)`與`angle(z1)`求得。

以下是使用一些常數的例子：

```julia-repl
julia> euler = exp(1im * π)
-1.0 + 1.2246467991473532e-16im

julia> real(euler)
-1.0

julia> round(imag(euler), digits=15)  # round to 15 decimal places
0.0
```

極座標`(r, θ)`記法非常實用，因此有內建函式`cis`（`cos(x) + isin(x)`的縮寫）與`cispi`（`cos(πx) + isin(πx)`的縮寫），能協助你更有效率地建構它。

極座標記法的實用性體現在歐拉優雅的公式上：`ℯ^(iθ) = cos(θ) + isin(θ) = x + iy`，其中`|x + iy| = 1`。
當`|x + iy| = r`時，我們有更一般的極座標形式：`r * ℯ^(iθ) = r * (cos(θ) + isin(θ)) = x + iy`。
特別值得一提的是，指數形式既精簡又易於操作。

```julia-repl
julia> exp(1im * π) ≈ cis(π) ≈ cispi(1)
true
```

上面之所以是近似相等，是因為`cis`與`cispi`這兩個函式能給出更漂亮的數值輸出，尤其是`cispi`，在處理引數是 π 的任意倍數（例如以弧度為單位！）時更是如此。

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

順帶一提，這讓複數在 2D 中進行旋轉與徑向位移時非常實用。

就旋轉而言，複數`z = x + iy`只要簡單乘上一個數，就能繞原點旋轉角度`θ`：`z * ℯ^(iθ)`。
請注意，這裡的`x`與`y`就只是實數 2D 笛卡兒平面上常用的座標，正的角度會造成*逆時針*旋轉，負的角度則造成*順時針*旋轉。

同樣簡單地，只要把徑向位移`Δr`加到極座標形式複數的量值`r`上，就能完成位移（例如`z = r * ℯ^(iθ)` -> `z' = (r + Δr) * ℯ^(iθ)`）。
請注意，角度部分保持不變，只有量值`r`改變，一如預期。
