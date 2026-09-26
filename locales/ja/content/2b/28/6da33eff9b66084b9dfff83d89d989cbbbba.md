# ヒント

## 1. スペースをアンダースコアに置き換える

- [こちらのチュートリアル][chars-tutorial]が役に立ちます。
- `char`の[リファレンスドキュメント][chars-docs]はこちらです。
- 配列から要素を取り出すのと同じように、文字列から`char`を取り出すことができます。
- 出力する文字列を組み立てるには、[`StringBuilder`][string-builder]を使います。
- スペースを判定するには、[こちらのメソッド][iswhitespace]を参照してください。静的メソッドであることを忘れないようにしましょう。
- `char`リテラルはシングルクォートで囲みます。

## 2. 制御文字を大文字の文字列"CTRL"に置き換える

- ある文字が制御文字かどうかを確認するには、[こちらのメソッド][iscontrol]を参照してください。

## 3. ケバブケースをキャメルケースに変換する

- 文字を大文字に変換するには、[こちらのメソッド][toupper]を参照してください。

## 4. ギリシャ文字の小文字を除外する

- `char`は、既定の等値演算子と比較演算子をサポートしています。

[chars-docs]: https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/char
[chars-tutorial]: https://csharp.net-tutorials.com/data-types/the-char-type/
[string-builder]: https://docs.microsoft.com/en-us/dotnet/api/system.text.stringbuilder
[iswhitespace]: https://docs.microsoft.com/en-us/dotnet/api/system.char.iswhitespace
[iscontrol]: https://docs.microsoft.com/en-us/dotnet/api/system.char.iscontrol
[toupper]: https://docs.microsoft.com/en-us/dotnet/api/system.char.toupper
[equality]: https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/operators/equality-operators
[comparison]: https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/operators/comparison-operators
