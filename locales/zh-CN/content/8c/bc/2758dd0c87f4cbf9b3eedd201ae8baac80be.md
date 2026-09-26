# 提示

## 通用

- 阅读官方的[字符串类型文档][string-type-documentation]，了解字符串的相关知识。
- 浏览[可用的_字符串函数_][string-functions]，了解字符串的内置操作。

## 1. 获取名字的首字母

- 有一个[内置函数][string-substr]，可以从字符串中获取第一个字符。
- 有多个[内置函数][string-trim]，可以去除字符串开头、结尾或开头加结尾的空白。

## 2. 将首字母格式化为姓名首字母缩写

- 有一个[内置函数][string-upcase]，可以把字符串中的所有字符转换为大写形式。
- 有一个[运算符][concat-operator]，可以拼接两个字符串。

## 3. 将全名拆分为名字和姓氏

- 有一个[内置函数][string-explode]，可以用另一个字符串来拆分字符串。
- 通过对数组进行模式匹配，可以把数组的前几个元素赋值给变量。

## 4. 将姓名首字母放进心形里

- 有一种特殊语法，可以在字符串中[展开变量][string-variables]。
- 有一种特殊语法，可以编写[多行字符串][heredoc-syntax]，而无需转义换行。

[string-type-documentation]: https://www.php.net/manual/en/language.types.string.php
[string-functions]: https://www.php.net/manual/en/ref.strings.php 
[string-substr]: https://www.php.net/manual/en/function.substr.php 
[string-trim]: https://www.php.net/manual/en/function.trim.php 
[string-upcase]: https://www.php.net/manual/en/function.strtoupper.php
[string-explode]: https://www.php.net/manual/en/function.explode.php
[string-variables]: https://www.php.net/manual/en/language.types.string.php#language.types.string.parsing 
[concat-operator]: https://www.php.net/manual/en/language.operators.string.php
[heredoc-syntax]: https://www.php.net/manual/en/language.types.string.php#language.types.string.syntax.heredoc
