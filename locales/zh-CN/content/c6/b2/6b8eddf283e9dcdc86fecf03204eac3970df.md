# 提示

## 通用

- Kotlin 提供了许多用于处理字符串的[函数][ref-strings]。记得查看 `Members & Extensions` 标签页！

## 1. 从日志行中获取消息

- 有一个[函数][ref-string-substringAfter]可以提取 `String` 中位于给定分隔符之后的部分。
- 从 `String` 中移除空白字符，可以参考[在 Kotlin 中移除字符串的所有空白字符][tutorial-trim-white-space]。

## 2. 从日志行中获取日志级别

- 还有一个[函数][ref-string-substringBefore]可以提取 `String` 中位于给定分隔符_之前_的部分。
- 有一种[方法][ref-string-lowercase]可以把 `String` 转换为小写。

## 3. 重新格式化日志行

- [字符串模板][docs-string-template]可以用[多行字符串][docs-string-multiline]来实现。

[docs-string-multiline]: https://kotlinlang.org/docs/strings.html#multiline-strings
[docs-string-template]: https://kotlinlang.org/docs/strings.html#string-templates
[ref-strings]: https://kotlinlang.org/api/core/kotlin-stdlib/kotlin/-string/
[ref-string-indexOf]: https://kotlinlang.org/api/core/kotlin-stdlib/kotlin/-string/#-537588047%2FFunctions%2F-1430298843
[ref-string-lowercase]: https://kotlinlang.org/api/core/kotlin-stdlib/kotlin/-string/#-648004414%2FFunctions%2F-956074838
[ref-string-substringAfter]: https://kotlinlang.org/api/core/kotlin-stdlib/kotlin/-string/#1564391517%2FFunctions%2F-1430298843
[tutorial-search-text-in-string]: https://javarevisited.blogspot.com/2016/10/how-to-check-if-string-contains-another-substring-in-java-indexof-example.html
[tutorial-trim-white-space]: https://www.baeldung.com/kotlin/string-remove-whitespace
