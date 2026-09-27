# 提示

## 一般

- Kotlin 提供了許多處理字串的[函式][ref-strings]。記得去看看`Members & Extensions`分頁喔！

## 1. 從日誌行取得訊息

- 有一個[函式][ref-string-substringAfter]可以取出`String`中指定分隔符號之後的部分。
- 從`String`移除空白字元的方法，可以參考[在 Kotlin 中移除字串中的所有空白][tutorial-trim-white-space]。

## 2. 從日誌行取得日誌等級

- 另外還有個[函式][ref-string-substringBefore]可以取出`String`中指定分隔符號_之前_的部分。
- 有種[方法][ref-string-lowercase]可以把`String`轉成小寫。

## 3. 重新格式化日誌行

- [字串範本][docs-string-template]可以搭配[多行字串][docs-string-multiline]來使用。

[docs-string-multiline]: https://kotlinlang.org/docs/strings.html#multiline-strings
[docs-string-template]: https://kotlinlang.org/docs/strings.html#string-templates
[ref-strings]: https://kotlinlang.org/api/core/kotlin-stdlib/kotlin/-string/
[ref-string-indexOf]: https://kotlinlang.org/api/core/kotlin-stdlib/kotlin/-string/#-537588047%2FFunctions%2F-1430298843
[ref-string-lowercase]: https://kotlinlang.org/api/core/kotlin-stdlib/kotlin/-string/#-648004414%2FFunctions%2F-956074838
[ref-string-substringAfter]: https://kotlinlang.org/api/core/kotlin-stdlib/kotlin/-string/#1564391517%2FFunctions%2F-1430298843
[tutorial-search-text-in-string]: https://javarevisited.blogspot.com/2016/10/how-to-check-if-string-contains-another-substring-in-java-indexof-example.html
[tutorial-trim-white-space]: https://www.baeldung.com/kotlin/string-remove-whitespace
