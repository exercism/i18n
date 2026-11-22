# 简介

一个`jq`程序在处理值时遇到问题，比如用字符串去索引数字、解析无效的 JSON 文本、用错误类型的实参调用函数，就会抛出**运行时错误**。
未捕获的运行时错误会让`jq`把一条消息打印到_标准错误_，并以状态码`5`退出。

## 抛出错误：`error`和`error(message)`

- `error`抛出一个错误，其值是**输入**值。
- `error(message)`抛出一个错误，其值是对`message`求值的结果。

错误值可以是_任意_ JSON 值，而不只是字符串。

```jq
42 | error("invalid value: \(.)")
# => "invalid value: 42"

42 | error
(not a string): 42
```

## 捕获错误：`try`和`catch`

可以用`try EXP catch HANDLER`捕获错误。
先执行第一个表达式；如果它抛出错误，就会执行`HANDLER`表达式，**并把错误值作为它的输入**。
`try catch`的输出是最后运行的那个表达式的输出（无论是`EXP`还是`HANDLER`）。

```jq
{a: 42} | try .a catch "no index a in \(.)"
# => 42

true | try .a catch "cannot index a \(type)"
# => "cannot index a boolean"

true | try error("some exception") catch .
# => "some exception"
```

较短的形式`try EXP`等价于`try EXP catch empty`：错误会被丢弃，不会产生任何输出。

```jq
[{}, true, {"a": 1}] | [.[] | try .a]
# => [null, 1]
```

## 抑制错误：`?`运算符

`?`运算符用作`EXP?`时，是`try EXP`的简写。
它会把一个失败的表达式变成不产生任何输出的表达式。

```jq
["1", "invalid", "3", 4] | [.[] | tonumber?]
# => [1, 3, 4]
```

它经常出现在索引运算符后面：`.foo?`和`.[]?`。

## 停止程序：`halt_error`和`halt`

`halt_error`会停止程序，把它的输入作为原始文本打印到_标准错误_，并以指定的状态码退出，默认为`5`。
相关的`halt`过滤器会静默地停止程序，退出状态码为`0`。

```jq
"Error: something went wrong" | halt_error(1)
```
