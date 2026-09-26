# 提示

## 1. 把字符串拆分成单独的行

- Swift 有一个[方法][nsstring-components-docs]，可以按指定的分隔符把字符串拆分成字符串数组。

## 2. 前门

- 守卫会背诵一首诗，你需要把这首诗拆分成单独的行，这一步可以复用已有的函数。
- 你可以用`for`循环遍历诗中的每一行。
- 你可以用字符串的`first`属性获取字符串的第一个字符。
- 要保存每一行的第一个字符，可以用字符数组，也可以用字符串。

## 3. 后门

- 守卫会背诵一首诗，你需要把这首诗拆分成单独的行，这一步可以复用已有的函数。
- 你可以用`for`循环遍历诗中的每一行。
- 你可以用字符串的`last`属性获取字符串的最后一个字符。
- 要保存每一行的最后一个字符，可以用字符数组，也可以用字符串。

## 4. 密室

- 守卫会背诵一首诗，你需要把这首诗拆分成单独的行，这一步可以复用已有的函数。
- 你可以用`for`循环，遍历诗中各行的长度。
- Swift 有一个[方法][indexing]，可以获取字符串中指定下标处的字符。
- Swift 有一个[方法][uppercased]，可以把字符串转换为大写。

[nsstring-components-docs]: https://developer.apple.com/documentation/foundation/nsstring/components(separatedby:)-238fy
[indexing]: https://developer.apple.com/documentation/swift/string/index(_:offsetby:)
[uppercased]: https://developer.apple.com/documentation/foundation/nsstring/uppercased
