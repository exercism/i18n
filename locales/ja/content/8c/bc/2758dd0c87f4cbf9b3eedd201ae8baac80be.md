# ヒント

## 全般

- 文字列については、公式の[文字列型のドキュメント][string-type-documentation]を読んでみましょう。
- [利用できる_文字列関数_][string-functions]を見て、文字列に対する組み込みの操作を確認してみましょう。

## 1. 名前の最初の文字を取得する

- 文字列から最初の文字を取り出す[組み込み関数][string-substr]があります。
- 文字列の先頭、末尾、またはその両方の空白を削除する[組み込み関数][string-trim]がいくつかあります。

## 2. 最初の文字をイニシャルに整形する

- 文字列内のすべての文字を大文字に変換する[組み込み関数][string-upcase]があります。
- 2つの文字列を連結する[演算子][concat-operator]があります。

## 3. フルネームを名と姓に分割する

- ある文字列を別の文字列で分割する[組み込み関数][string-explode]があります。
- 配列に対するパターンマッチングを使うと、配列の先頭のいくつかの要素を変数に代入できます。

## 4. イニシャルをハートの中に入れる

- 文字列の中で[変数を展開する][string-variables]ための特別な構文があります。
- 改行をエスケープせずに[複数行の文字列][heredoc-syntax]を書くための特別な構文があります。

[string-type-documentation]: https://www.php.net/manual/en/language.types.string.php
[string-functions]: https://www.php.net/manual/en/ref.strings.php 
[string-substr]: https://www.php.net/manual/en/function.substr.php 
[string-trim]: https://www.php.net/manual/en/function.trim.php 
[string-upcase]: https://www.php.net/manual/en/function.strtoupper.php
[string-explode]: https://www.php.net/manual/en/function.explode.php
[string-variables]: https://www.php.net/manual/en/language.types.string.php#language.types.string.parsing 
[concat-operator]: https://www.php.net/manual/en/language.operators.string.php
[heredoc-syntax]: https://www.php.net/manual/en/language.types.string.php#language.types.string.syntax.heredoc
