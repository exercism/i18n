# 簡介

在 Swift 中，`guard`敘述用於在必要條件未滿足時，提前離開函式、迴圈或方法：

```swift
guard myValue >= 0 else { return 0 }
let root = myValue.squareRoot()
```

在上面的範例中，`guard`會評估緊接在它後面的布林運算式。
如果條件為 `true`，就會繼續執行 `guard`敘述後面的程式碼。
如果條件為 `false`，則會執行`else`區塊裡的程式碼。

和`if`敘述不同：

- `guard`敘述**必須**包含`else`子句。
- `else`子句**必須**轉移控制權，離開所在的作用域（例如使用`return`、`continue`、`break`，或拋出錯誤）。

`guard`常用來簡潔地驗證前置條件。
例如，來看看 sinc 函式（$\text{sinc}(x) = \frac{\sin(x)}{x}$，其中 $\text{sinc}(0) = 1$，以避免除以零）：

```swift
func sinc(_ x: Double) -> Double {
    guard x != 0 else { return 1 }
    return sin(x) / x
}

sinc(0)             // returns 1
sinc(Double.pi / 2) // returns 0.6366197723675814
```
