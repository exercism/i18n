# 簡介

和其他語言一樣，Go 也提供了`switch`敘述。
`switch`敘述是撰寫冗長的`if ... else if`敘述時更簡潔的方式。
要建立一個 switch，我們會先使用關鍵字`switch`，後面接著一個值或運算式。
接著，我們會用`case`關鍵字宣告每一個條件。
我們也可以宣告一個`default` case，當前面所有`case`條件都不符合時，它就會執行：

```go
operatingSystem := "windows"

switch operatingSystem {
case "windows":
    // do something if the operating system is windows
case "linux":
    // do something if the operating system is linux
case "macos":
    // do something if the operating system is macos
default:
    // do something if the operating system is none of the above
} 
```

switch 敘述有一個有趣的地方：`switch`關鍵字後面的值可以省略，而且我們可以為每個`case`設定布林條件：

```go
age := 21

switch {
case age > 20 && age < 30:
    // do something if age is between 20 and 30
case age == 10:
    // do something if age is equal to 10
default:
    // do something else for every other case
}
```
