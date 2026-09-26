# ヒント

## 全般

- Kotlinには、文字列を扱うための[関数][ref-strings]がたくさん用意されています。`Members & Extensions`タブもぜひ確認してみてください。

## 1. ログ行からメッセージを取得する

- 指定した区切り文字より後ろの部分を`String`から取り出す[関数][ref-string-substringAfter]があります。
- `String`から空白を取り除く方法は、[Kotlinで文字列から空白をすべて削除する][tutorial-trim-white-space]で解説されています。

## 2. ログ行からログレベルを取得する

- 指定した区切り文字より_前_の部分を`String`から取り出す[関数][ref-string-substringBefore]もあります。
- `String`を小文字に変換する[方法][ref-string-lowercase]もあります。

## 3. ログ行を整形する

- [文字列テンプレート][docs-string-template]は[複数行文字列][docs-string-multiline]でも使えます。

[docs-string-multiline]: https://kotlinlang.org/docs/strings.html#multiline-strings
[docs-string-template]: https://kotlinlang.org/docs/strings.html#string-templates
[ref-strings]: https://kotlinlang.org/api/core/kotlin-stdlib/kotlin/-string/
[ref-string-indexOf]: https://kotlinlang.org/api/core/kotlin-stdlib/kotlin/-string/#-537588047%2FFunctions%2F-1430298843
[ref-string-lowercase]: https://kotlinlang.org/api/core/kotlin-stdlib/kotlin/-string/#-648004414%2FFunctions%2F-956074838
[ref-string-substringAfter]: https://kotlinlang.org/api/core/kotlin-stdlib/kotlin/-string/#1564391517%2FFunctions%2F-1430298843
[tutorial-search-text-in-string]: https://javarevisited.blogspot.com/2016/10/how-to-check-if-string-contains-another-substring-in-java-indexof-example.html
[tutorial-trim-white-space]: https://www.baeldung.com/kotlin/string-remove-whitespace
