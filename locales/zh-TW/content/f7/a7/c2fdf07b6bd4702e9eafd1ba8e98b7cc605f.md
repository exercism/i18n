# 簡介

Go 提供了一個名為`fmt`（格式套件）的內建套件，裡頭有各式各樣的函式可以操作輸入與輸出的格式。
最常用的函式是`Sprintf`，它使用`%s`這類*動詞*把值插入字串中，並回傳該字串。

```go
import "fmt"

food := "taco"
fmt.Sprintf("Bring me a %s", food)
// Returns: Bring me a taco
```

在 Go 中，浮點數可以很方便地用 Sprintf 的動詞來格式化：`%g`（精簡表示法）、`%e`（指數）或`%f`（非指數）。
這三種動詞都能控制欄位的寬度與數值位置。

```go
import "fmt"

number := 4.3242
fmt.Sprintf("%.2f", number)
// Returns: 4.32
```

你可以在[格式套件文件][fmt-docs]中找到所有可用動詞的完整清單。

`fmt`還包含其他處理字串的函式，例如`Println`會直接把它收到的引數印到主控台，而`Printf`則會先像`Sprintf`一樣格式化輸入，再把它印出來。

[fmt-docs]: https://pkg.go.dev/fmt
