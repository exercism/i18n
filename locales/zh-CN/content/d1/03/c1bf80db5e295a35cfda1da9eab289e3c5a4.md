# 介绍

## `switch`语句

[`switch`语句][switch]让你可以把一个值与多个可能的匹配值进行比较，从而写出比使用多个`else-if`语句更简洁的代码。`switch`语句以`switch`关键字开头，后面跟着要比较的值。然后你可以用`case`关键字定义各个分支，后面跟着要与之比较的值。当所有分支都不匹配时，用`default`关键字定义默认分支。和`else-if`语句一样，`switch`语句只会执行第一个匹配分支所对应的代码块。

```swift
switch value {
case 1:
    print("One")
case 2:
    print("Two")
default:
    print("Other")
}
```

看看下面这个例子：

```swift
if str == "apple" {
    print("Let's bake an apple crumble")
} else if str == "lemon" {
    print("Let's bake a lemon meringue pie!")
} else if str == "peach" {
    print("Let's bake a peach pie!")
} else {
    print("Let's buy ice cream.")
}
```

也可以改写成这样：

```swift
switch str {
case "apple":
    print("Let's bake an apple crumble")
case "lemon":
    print("Let's bake a lemon meringue pie!")
case "peach":
    print("Let's bake a peach pie!")
default:
    print("Let's buy ice cream.")
}
```

## `while`循环

[`while`循环][while-loops]是一种控制流语句，它让代码在某个条件为真时反复执行。Swift 提供了两种 while 循环：`while`循环和`repeat-while`循环。`while`循环会先对条件求值，再执行循环体；如果条件为假，循环体根本不会执行。Swift 中`while`循环的结构如下：

```swift
while <#condition#> {
  <#code#>
}
```

这里的循环会在 count 大于 0 时一直执行，因此会依次打印出数字 2、1 和“Liftoff!”。

```swift
var count = 2
while count > 0 {
  print("\(count)…")
  count -= 1
}
print("Liftoff!")

// prints:
// 2…
// 1…
// Liftoff!
```

[`repeat-while`循环][while-loops]与`while`循环类似，但它的条件是在循环体执行之后才求值。这意味着即使条件为假，循环体也至少会执行一次。Swift 中`repeat-while`循环的结构如下：

```swift
repeat {
  <#code#>
} while <#condition#>
```

这里的循环只会执行一次，因为条件为假。由于它是`repeat-while`循环，循环体会先执行一次，然后才对条件求值。

```swift
var count = 2
repeat {
  print("\(count)…")
} while count < 0
print("Liftoff!")
```

## 控制转移

Swift 提供了控制转移语句，用来改变循环和`switch`语句的执行流程。除了`return`，Swift 还有`continue`、`break`、循环标签和`fallthrough`。

### `continue`

`continue`语句让循环停止执行当前迭代，立即开始下一次迭代。在`while`或`repeat-while`循环中，它会直接跳到条件检查。在`for-in`循环中，它会前进到序列中的下一个元素。

```swift
var count = 1
while count < 6 {
    count += 1
    if count == 4 {
        continue
    }
    print(count)
}

// Prints:
// 2
// 3
// 5
// 6
```

### `break`

`break`语句会立即退出整个循环或`switch`语句，程序接着执行循环或`switch`之后的第一行代码。

```swift
for fruit in ["banana", "grapes", "apple", "strawberry", "kiwi", "lemon"] {
    if !fruit.count.isMultiple(of: 2) {
        break
    }
    print(fruit)
}

// Prints:
// banana
// grapes
```

### 带标签的语句

在嵌套循环中，你可能希望`break`或`continue`作用于外层循环，而不是最内层的循环。在循环前面加上名字和冒号（`labelName:`），就可以给循环加上标签。然后你可以把这个标签传给`break`或`continue`：

```swift
outerLoop: for fruit in ["banana", "grapes", "apple", "strawberry", "kiwi", "lemon"] {
    print("\n--- \(fruit) ---")
    for letter in fruit {
        guard letter != "n" else {
            break outerLoop
        }
        print(letter)
    }
}

// Prints:
// --- banana ---
// b
// a
```

[control-transfer]: https://docs.swift.org/swift-book/documentation/the-swift-programming-language/controlflow/#Control-Transfer-Statements
[fallthrough]: https://docs.swift.org/swift-book/documentation/the-swift-programming-language/controlflow/#Fallthrough
[while-loops]: https://docs.swift.org/swift-book/documentation/the-swift-programming-language/controlflow/#While-Loops
[repeat-loops]: https://docs.swift.org/swift-book/documentation/the-swift-programming-language/controlflow/#Repeat-While
[switch]: https://docs.swift.org/swift-book/documentation/the-swift-programming-language/controlflow/#Switch
