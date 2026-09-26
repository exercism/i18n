# 关于

词汇表是 Factor 中的组织单位：一组有名字的单词定义。

```factor
USING: kernel ;
IN: greetings.formal

: hello ( name -- str ) "Greetings, " prepend ;
```

## 文件和目录布局

词汇表的名字用 `.` 作为分隔符。路径就跟着这些点展开：

| Vocabulary             | File                                       |
| ---                    | ---                                        |
| `greetings`            | `greetings/greetings.factor`               |
| `greetings.formal`     | `greetings/formal/formal.factor`           |
| `greetings.casual`     | `greetings/casual/casual.factor`           |

Factor 的加载器通过遍历*词汇表根*来查找词汇表，也就是项目根目录和随附的 basis 库，直到找到名字与每一段路径都匹配的目录为止。路径的最后一段会重复一次，用作文件名。

## `USING:` 和 `IN:`

`USING:`（以及一次只引入一个词汇表的 `USE:`）会把其他词汇表加入当前文件的搜索路径。`IN:` 声明这个文件中定义的单词*属于*哪个词汇表：它们的完全限定名就以这个词汇表名开头。

```factor
USING: kernel sequences greetings.formal ;
IN: greetings

: greet-everyone ( names -- strs )
    [ hello ] map ;
```

这里 `greet-everyone` 属于 `greetings`，它调用了来自 `greetings.formal` 的 `hello`，以及来自 `sequences` 的 `map`。

## 为什么要把解答拆分到多个词汇表里

把代码拆分到多个词汇表，可以让你：

- 按职责给小的辅助单词分组，让它们和组合它们的上层例程分开。
- 在其他地方复用这些辅助单词，而不用把主例程也一起拖进来。
- 把每个文件读成一个连贯的抽象层。

Factor 的加载器既快又足够惰性，所以往*下*拆成更小的词汇表成本很低；标准库的惯例就是大胆地拆分。
