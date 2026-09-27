# 提示

## 一般

- 在官方的[字串型別說明文件][string-type-documentation]中閱讀字串的相關內容。
- 瀏覽[可用的_字串函式_][string-functions]，發掘字串的內建操作。

## 1. 取得名字的第一個字母

- 有一個[內建函式][string-substr]可以取得字串的第一個字元。
- 有多個[內建函式][string-trim]可以移除字串開頭、結尾，或同時移除開頭與結尾的空白。

## 2. 將第一個字母格式化為縮寫

- 有一個[內建函式][string-upcase]可以將字串中的所有字元轉換成大寫。
- 有一個[運算子][concat-operator]可以串接兩個字串。

## 3. 將全名拆分成名字與姓氏

- 有一個[內建函式][string-explode]可以依照另一個字串來拆分字串。
- 可以透過對陣列做模式比對，將陣列的前幾個元素指定給變數。

## 4. 將縮寫放進愛心裡

- 有一種特殊的語法可以在字串中[展開變數][string-variables]。
- 有一種特殊的語法可以撰寫[多行字串][heredoc-syntax]，而不需要跳脫換行字元。

[string-type-documentation]: https://www.php.net/manual/en/language.types.string.php
[string-functions]: https://www.php.net/manual/en/ref.strings.php 
[string-substr]: https://www.php.net/manual/en/function.substr.php 
[string-trim]: https://www.php.net/manual/en/function.trim.php 
[string-upcase]: https://www.php.net/manual/en/function.strtoupper.php
[string-explode]: https://www.php.net/manual/en/function.explode.php
[string-variables]: https://www.php.net/manual/en/language.types.string.php#language.types.string.parsing 
[concat-operator]: https://www.php.net/manual/en/language.operators.string.php
[heredoc-syntax]: https://www.php.net/manual/en/language.types.string.php#language.types.string.syntax.heredoc
