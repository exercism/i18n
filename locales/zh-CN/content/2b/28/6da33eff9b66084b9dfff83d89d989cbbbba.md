# 提示

## 1. 把遇到的空格替换成下划线

- [这个教程][chars-tutorial]很有用。
- 这里有关于`char`的[参考文档][chars-docs]。
- 从字符串中取出`char`的方式，与从数组中取出元素的方式一样。
- 你应该用 [`StringBuilder`][string-builder] 来构建输出的字符串。
- 检测空格可以看[这个方法][iswhitespace]。记住它是一个静态方法。
- `char`字面量用单引号括起来。

## 2. 把控制字符替换成大写字符串“CTRL”

- 看[这个方法][iscontrol]，可以检查一个字符是不是控制字符。

## 3. 把 kebab-case 转换成 camel-case

- 看[这个方法][toupper]，可以把字符转换成大写。

## 4. 省略小写希腊字母

- `char`支持默认的相等运算符和比较运算符。

[chars-docs]: https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/char
[chars-tutorial]: https://csharp.net-tutorials.com/data-types/the-char-type/
[string-builder]: https://docs.microsoft.com/en-us/dotnet/api/system.text.stringbuilder
[iswhitespace]: https://docs.microsoft.com/en-us/dotnet/api/system.char.iswhitespace
[iscontrol]: https://docs.microsoft.com/en-us/dotnet/api/system.char.iscontrol
[toupper]: https://docs.microsoft.com/en-us/dotnet/api/system.char.toupper
[equality]: https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/operators/equality-operators
[comparison]: https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/operators/comparison-operators
