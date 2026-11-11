# 提示

## 一般

- 先前的[結構體][structs]、[映射][maps]和[方法][methods]概念在這裡很有用。


## 1. 追蹤參與者

- [型別定義][type definition]概念說明了如何定義一個新的型別。
- 使用`make()`建立新的`map`實例。
- 要把值加入 map，請使用`struct{}{}`建立一個空的`struct{}`實例。

## 2. 檢查參與者

- 如果元素在 map 中，集合就包含該值。
- 可以用[雙值賦值][two value assignment]來檢查 map 是否含有某個項目。

## 3. 比較參與者

- 如果每個集合中的所有值都包含在另一個集合中，這兩個集合就相同。
- `range` 可以用來檢查集合中的所有元素。

[maps]: https://exercism.org/tracks/go/concepts/maps
[methods]: https://exercism.org/tracks/go/concepts/methods
[structs]: https://exercism.org/tracks/go/concepts/structs
[two value assignment]: https://go.dev/tour/moretypes/22
[type definition]: https://exercism.org/tracks/go/concepts/type-definitions
