# 简介

和其他语言一样，Go 也提供了 `switch` 语句。相比冗长的 `if ... else if` 语句，`switch` 语句写起来更简短。要创建一个 switch 语句，先写关键字 `switch`，后面跟一个值或表达式。然后我们用 `case` 关键字声明每一个条件。我们还可以声明一个 `default` 分支，当之前所有 `case` 条件都不匹配时，它就会运行：

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

switch 语句有一个有趣的地方：`switch` 关键字后面的值可以省略，这样每个 `case` 都可以是布尔条件：

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
