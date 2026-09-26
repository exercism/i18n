# 简介

[数组][array]是 Swift 三种主要集合类型之一。
数组是有序的元素列表。
数组可以存储任意类型的元素，但同一个数组中的所有元素必须类型相同。
把数组赋值给变量时，它是可变的，也就是说创建数组之后，你可以添加、删除或修改其中的元素。
赋值给常量时，数组是不可变的，也就是说它的内容无法更改。

数组字面量写成用方括号（`[...]`）括起来、以逗号分隔的元素列表。
Swift 可以从字面量中的元素推断出数组的类型。

```swift
let evenInts = [2, 4, 6, 8, 10, 12]
var oddInts = [1, 3, 5, 7, 9, 11, 13]
let greetings = ["Hello!", "Hi!", "¡Hola!"]
```

你也可以显式指定类型。
数组类型有两种写法：`Array<T>` 或简写形式 `[T]`，其中 `T` 是数组所含值的类型。

```swift
let evenInts: Array<Int> = [2, 4, 6, 8, 10, 12]
var oddInts: [Int] = [1, 3, 5, 7, 9, 11, 13]
let greetings: [String] = ["Hello!", "Hi!", "¡Hola!"]
```

## 数组的大小

你可以使用数组的 [`count`][count] 属性获取其中元素的数量：

```swift
evenInts.count
// returns 6
```

## 空数组

要创建空数组，必须指定它的类型。
你可以使用数组初始化语法或显式的类型标注：

```swift
let emptyArray = [Int]()
let emptyArray2 = Array<Int>()
let emptyArray3: [Int] = []
```

## 多维数组

数组可以嵌套，从而创建多维数组。
显式指定嵌套数组的类型时，要把元素类型包在嵌套的方括号中，例如 `[[Int]]` 或 `Array<Array<Int>>`：

```swift
let multiDimArray = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
let multiDimArray2: [[Int]] = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
```

## 向数组追加元素

你可以使用 [`append(_:)`][append] 方法把元素添加到可变数组的末尾：

```swift
var oddInts = [1, 3, 5, 7, 9, 11, 13]
oddInts.append(15)
// oddInts is now [1, 3, 5, 7, 9, 11, 13, 15]
```

## 向数组插入元素

你可以使用 [`insert(_:at:)`][insert] 方法在指定的下标处插入元素。
这个方法接收两个实参：要插入的元素，以及插入位置的下标。

```swift
var oddInts = [1, 3, 5, 7, 9, 11, 13]
oddInts.insert(0, at: 0)
// oddInts is now [0, 1, 3, 5, 7, 9, 11, 13]
```

## 数组相加

你可以使用 `+` 运算符把两个数组合并成一个数组。
`+` 运算符会创建并返回一个新数组，它不会修改原来的数组。

```swift
var oddInts = [1, 3, 5, 7, 9, 11, 13]
let combined = oddInts + [15, 17, 19]
// combined is [1, 3, 5, 7, 9, 11, 13, 15, 17, 19]

print(oddInts)
// prints [1, 3, 5, 7, 9, 11, 13]
```

## 访问数组元素

把下标放在数组名后面的方括号（`[]`）中，就可以访问数组中的单个元素。
数组下标是从零开始的 `Int` 值，第一个元素的下标为 `0`。
访问超出有效范围的下标会导致运行时错误，使程序崩溃。

```swift
let evenInts = [2, 4, 6, 8, 10, 12]
let oddInts = [1, 3, 5, 7, 9, 11, 13]

evenInts[2]
// returns 6

oddInts[7]
// Fatal error: Index out of range
```

## 修改数组元素

你可以给某个下标赋新值，从而修改可变数组中的元素。
与读取元素一样，使用超出有效范围的下标会导致运行时错误。

```swift
var evenInts = [2, 4, 6, 8, 10, 12]

evenInts[2] = 0
// evenInts is now [2, 4, 0, 8, 10, 12]
```

## 数组与字符串的相互转换

你可以使用 [`joined(separator:)`][joined] 方法把一个字符串数组连接成单个字符串，它接收一个分隔字符串：

```swift
let evenInts = ["2", "4", "6", "8", "10", "12"]
let evenIntsString = evenInts.joined(separator: ", ")
// returns "2, 4, 6, 8, 10, 12"
```

你可以使用 [`split(separator:)`][split] 方法把字符串拆分成子字符串组成的数组，并传入分隔字符：

```swift
let evenIntsString = "2, 4, 6, 8, 10, 12"
let evenInts = evenIntsString.split(separator: ",")
// returns ["2", " 4", " 6", " 8", " 10", " 12"]
```

## 从数组中删除元素

你可以使用 [`remove(at:)`][remove] 方法删除指定下标处的元素。
下标必须在数组的有效范围内，否则会发生运行时错误。

```swift
var oddInts = [1, 3, 5, 7, 9, 11, 13]
oddInts.remove(at: 3)
// oddInts is now [1, 3, 5, 9, 11, 13]
```

要删除数组的最后一个元素，请使用 [`removeLast()`][removeLast] 方法。
对空数组调用 `removeLast()` 会导致运行时错误。

```swift
var oddInts = [1, 3, 5, 7, 9, 11, 13]
oddInts.removeLast()
// oddInts is now [1, 3, 5, 7, 9, 11]
```

[array]: https://developer.apple.com/documentation/swift/array
[count]: https://developer.apple.com/documentation/swift/array/count
[insert]: https://developer.apple.com/documentation/swift/array/insert(_:at:)-3erb3
[remove]: https://developer.apple.com/documentation/swift/array/remove(at:)-1p2pj
[removeLast]: https://developer.apple.com/documentation/swift/array/removelast()
[append]: https://developer.apple.com/documentation/swift/array/append(_:)-1ytnt
[joined]: https://developer.apple.com/documentation/swift/array/joined(separator:)-5do1g
[split]: https://developer.apple.com/documentation/swift/string/2894564-split
