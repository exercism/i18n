# 提示

## 通用

- 之前学过的概念[结构体][]、[映射][]和[方法][]在这里很有用。


## 1. 记录参与者

- [类型定义][]这个概念讲解了如何定义一个新类型。
- 用`make()`创建一个新的`map`实例。
- 要向映射中添加值，用`struct{}{}`创建一个空`struct{}`的实例。

## 2. 检查参与者

- 如果某个元素在映射中，就说明集合包含这个值。
- 可以用[双值赋值][]来检查映射中是否包含某一项。

## 3. 比较参与者

- 如果两个集合中的每个值都包含在另一个集合中，那么这两个集合就相同。
- 可以用`range`检查集合中的所有元素。

[maps]: https://exercism.org/tracks/go/concepts/maps
[methods]: https://exercism.org/tracks/go/concepts/methods
[structs]: https://exercism.org/tracks/go/concepts/structs
[two value assignment]: https://go.dev/tour/moretypes/22
[type definition]: https://exercism.org/tracks/go/concepts/type-definitions
