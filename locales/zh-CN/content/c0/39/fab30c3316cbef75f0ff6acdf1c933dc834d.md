# 简介

Swift 中的`guard`语句用于在所需条件不满足时，从函数、循环或方法中提前退出：

```swift
guard myValue >= 0 else { return 0 }
let root = myValue.squareRoot()
```

在上面的例子中，`guard`会对紧跟其后的布尔表达式求值。
如果条件为`true`，就继续执行`guard`语句后面的代码。
如果条件为`false`，就执行`else`块中的代码。

与`if`语句不同：

- `guard`语句**必须**包含`else`子句。
- `else`子句**必须**转移控制权，以退出所在的作用域（例如使用`return`、`continue`、`break`，或者抛出错误）。

`guard`常用于清晰地校验前置条件。
例如，来看 sinc 函数（$\text{sinc}(x) = \frac{\sin(x)}{x}$，其中 $\text{sinc}(0) = 1$，以避免除以零）：

```swift
func sinc(_ x: Double) -> Double {
    guard x != 0 else { return 1 }
    return sin(x) / x
}

sinc(0)             // returns 1
sinc(Double.pi / 2) // returns 0.6366197723675814
```
