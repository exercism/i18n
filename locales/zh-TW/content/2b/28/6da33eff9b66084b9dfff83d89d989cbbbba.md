# 提示

## 1. 把遇到的空格替換成底線

- [這篇教學][chars-tutorial]很實用。
- `char`的[參考文件][chars-docs]在這裡。
- 你可以用取出陣列元素的相同方式，從字串中取出`char`。
- 你應該用[`StringBuilder`][string-builder]來建立輸出的字串。
- 偵測空格請參考[這個方法][iswhitespace]，記得它是靜態方法。
- `char`常值要用單引號括住。

## 2. 把控制字元替換成大寫字串「CTRL」

- 檢查某個字元是不是控制字元，請參考[這個方法][iscontrol]。

## 3. 把 kebab-case 轉成 camel-case

- 把字元轉成大寫，請參考[這個方法][toupper]。

## 4. 略過希臘小寫字母

- `char`支援預設的相等與比較運算子。

[chars-docs]: https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/char
[chars-tutorial]: https://csharp.net-tutorials.com/data-types/the-char-type/
[string-builder]: https://docs.microsoft.com/en-us/dotnet/api/system.text.stringbuilder
[iswhitespace]: https://docs.microsoft.com/en-us/dotnet/api/system.char.iswhitespace
[iscontrol]: https://docs.microsoft.com/en-us/dotnet/api/system.char.iscontrol
[toupper]: https://docs.microsoft.com/en-us/dotnet/api/system.char.toupper
[equality]: https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/operators/equality-operators
[comparison]: https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/operators/comparison-operators
