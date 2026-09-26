# 简介

Go 提供了一个名为 `fmt` 的内置包（格式化包），其中包含各种函数，用来处理输入和输出的格式。最常用的函数是 `Sprintf`，它使用 `%s` 这样的_动词_把值插入字符串中，并返回这个字符串。

```go
import "fmt"

food := "taco"
fmt.Sprintf("Bring me a %s", food)
// Returns: Bring me a taco
```

在 Go 中，浮点数可以用 `Sprintf` 的动词很方便地格式化：`%g`（紧凑表示）、`%e`（指数）和 `%f`（非指数）。这三个动词都可以控制字段的宽度和数字的位置。

```go
import "fmt"

number := 4.3242
fmt.Sprintf("%.2f", number)
// Returns: 4.32
```

你可以在[格式化包文档][fmt-docs]中找到可用动词的完整列表。

`fmt` 还包含其他处理字符串的函数，比如 `Println` 会把接收到的实参直接打印到控制台，`Printf` 则会先按 `Sprintf` 的方式格式化输入，然后再打印出来。

[fmt-docs]: https://pkg.go.dev/fmt
