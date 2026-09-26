# 提示

## 通用

- Factor 里的字符其实就是整数（Unicode 码点），所以数值比较 `<`、`>`、`=` 可以直接用。
- 各种判断谓词和大小写转换都在 [`unicode`][unicode] 里。
- 你返回的那些符号（`less`、`big`、`alpha` 等）需要先声明再使用；可以用 `SYMBOLS: ... ;` 把它们归到一起。

## 1. 比较两个字符

- 使用 [`math`][math] 里的 `<` 和 `>`。
- 用 [`combinators`][combinators] 里的 `cond` 把三种情况包起来。

## 2. 判断大小写

- `LETTER?` 是判断大写的谓词，`letter?` 是判断小写的那个。

## 3. 改变大小写

- `ch>upper` 和 `ch>lower` 是逐字符的转换函数（字符串级别的 `>upper`/`>lower` 也有，不过这里你手上是单个字符）。

## 4. 判断类型

- `cond` 里的顺序很关键。`Letter?` 既能匹配大写，*也*能匹配小写，所以要放在任何针对具体大小写的判断之前。

[unicode]: https://docs.factorcode.org/content/vocab-unicode.html
[math]: https://docs.factorcode.org/content/vocab-math.html
[combinators]: https://docs.factorcode.org/content/vocab-combinators.html
