# 说明

这道练习的主题是解析日志文件。

在最近的一次安全审查之后，你被要求清理组织归档的日志文件。

传给这些函数的所有字符串都保证非空，并且首尾没有空格。

## 1. 识别乱码日志行

你需要大致了解归档里有多少日志行不符合当前标准。
你认为只要一个简单的测试就能判断某行日志是否有效。
一行日志要被认定为有效，必须以以下字符串之一开头：

- [TRC]
- [DBG]
- [INF]
- [WRN]
- [ERR]
- [FTL]

实现`IsValidLine`函数：如果字符串无效就返回`false`，否则返回`true`。

```go
IsValidLine("[ERR] A good error here")
// => true
IsValidLine("Any old [ERR] text")
// => false
IsValidLine("[BOB] Any old text")
// => false
```

## 2. 拆分日志行

一个新团队加入了组织，你发现他们的日志文件用一种奇怪的分隔符来分隔“字段”。
他们不用像冒号 ":" 这样合理的东西，而是用 "<--->" 或 "<=>" 这样的字符串（因为这样更好看）。实际上，只要第一个字符是 "<"、最后一个字符是 ">"，中间是 "~"、"\*"、"=" 和 "-" 的任意组合，这样的字符串都可以。

实现`SplitLogLine`函数，它接收一行日志，返回一个字符串数组，其中每个字符串都包含一个字段。

```go
SplitLogLine("section 1<*>section 2<~~~>section 3")
// => []string{"section 1", "section 2", "section 3"},
```

## 3. 统计引号文本中包含`password`的行数

团队需要了解引号文本中对密码的提及，以便人工检查。

实现`CountQuotedPasswords`函数，用来大致估计这项人工检查可能的规模。

找出这样的日志行：字符串 "password" 被引号包围，其中字母的大小写可以是任意组合。
你要考虑到引号内 "password" 前后可能还有其他内容。
每行最多包含两个引号。

传给这个函数的行可能符合第 1 个任务定义的有效性，也可能不符合。
无论是否有效，我们都以同样的方式处理它们。

```go
lines := []string{
    `[INF] passWord`, // contains 'password' but not surrounded by quotation marks
    `"passWord"`,  // count this one
    `[INF] User saw error message "Unexpected Error" on page load.`, // does not contain 'password'
    `[INF] The message "Please reset your password" was ignored by the user`, // count this one
}
// => 2
```

## 4. 清除日志中的残留内容

你发现日志的某些上游处理会在整个日志中到处散布 "end-of-line" 加上行号的文本（中间没有空格）。

实现`RemoveEndOfLineText`函数，它接收一个字符串，移除其中的 end-of-line 文本，返回一个“干净”的字符串。

不包含 end-of-line 文本的行应原样返回。

只需移除 end-of-line 字符串。
不要试图调整空白字符。

```go
RemoveEndOfLineText("[INF] end-of-line23033 Network Failure end-of-line27")
// => "[INF]  Network Failure "
```

## 5. 给日志行加上用户名标签

你注意到有些日志行包含提到用户的句子。
这些句子总是包含字符串`"User"`，后面跟着一个或多个空格字符，然后是一个用户名。
你决定给这样的行打上标签。

实现一个函数`TagWithUserName`来处理日志行：

- 不包含字符串`"User "`的行保持不变。
- 对于包含字符串`"User "`的行，在行首加上`[USR]`，后面紧跟用户名。

例如：

```go
result := TagWithUserName([]string{
    "[WRN] User James123 has exceeded storage space.",
	"[WRN] Host down. User   Michelle4 lost connection.",
	"[INF] Users can login again after 23:00.",
	"[DBG] We need to check that user names are at least 6 chars long.",
})
// => []string {
//  "[USR] James123 [WRN] User James123 has exceeded storage space.",
//  "[USR] Michelle4 [WRN] Host down. User   Michelle4 lost connection.",
//  "[INF] Users can login again after 23:00.",
//  "[DBG] We need to check that user names are at least 6 chars long."
// }
```

你可以假设：

- 用户名在日志中后面至少跟一个空白字符。
- 每行中字符串 "User " 最多出现一次。
- 用户名是非空字符串，且不包含空白字符。
