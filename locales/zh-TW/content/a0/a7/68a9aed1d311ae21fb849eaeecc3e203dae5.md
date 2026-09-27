# 提示

## 1. 將字串拆成個別的行

- Swift 有一個[方法][nsstring-components-docs]，可以用指定的分隔符號把字串拆成字串陣列。

## 2. 前門

- 守衛會朗誦一首詩，而你必須把詩拆成個別的行，你可以使用現成的函式來做這件事。
- 你可以用 `for` 迴圈走訪詩中的每一行。
- 你可以用字串的 `first` 屬性取得字串的第一個字元。
- 要儲存每一行的第一個字元，你可以使用字元陣列或字串。

## 3. 後門

- 守衛會朗誦一首詩，而你必須把詩拆成個別的行，你可以使用現成的函式來做這件事。
- 你可以用 `for` 迴圈走訪詩中的每一行。
- 你可以用字串的 `last` 屬性取得字串的最後一個字元。
- 要儲存每一行的最後一個字元，你可以使用字元陣列或字串。

## 4. 秘密房間

- 守衛會朗誦一首詩，而你必須把詩拆成個別的行，你可以使用現成的函式來做這件事。
- 你可以用 `for` 迴圈走訪詩中每一行的長度。
- Swift 有一個[方法][indexing]，可以取得字串中特定索引的字元。
- Swift 有一個[方法][uppercased]，可以將字串轉成大寫。

[nsstring-components-docs]: https://developer.apple.com/documentation/foundation/nsstring/components(separatedby:)-238fy
[indexing]: https://developer.apple.com/documentation/swift/string/index(_:offsetby:)
[uppercased]: https://developer.apple.com/documentation/foundation/nsstring/uppercased
