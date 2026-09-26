# 简介

## 进一步了解模式

回想一下 Fundamentals 概念：一个 AWK 程序由**模式-动作对**组成。

```awk
pattern1 { action1 }
pattern2 { action2 }
...
```

### 我们说的“模式”是什么？

“模式”就是任意一个 AWK 表达式。
表达式结果的真假决定了动作是否执行。

### 空模式

模式可以省略。
这时，动作会针对每一条记录执行。

我们可以打印 passwd 文件中的所有用户名。

```sh
awk -F: '{print $1}' /etc/passwd
```

### 正则表达式

AWK 可以把字符串与正则表达式进行比较，得到一个布尔结果。

使用`~`这个正则匹配运算符来匹配某个字段。
该运算符以字符串作为左操作数，以正则表达式作为右操作数。
正则表达式字面量用`/`斜杠括起来。

要找出 passwd 文件中使用 bash 登录的用户：

```sh
awk -F: '$7 ~ /bash/ {print $1}' /etc/passwd
```

`!~`是“正则表达式**不**匹配”运算符。

要把正则表达式与当前记录匹配，可以写`$0 ~ /regex/`。
这种写法非常常见，因此有一个简写：可以省略`$0`和`~`，直接写`/regex/`

```sh
awk '/regex/' data.txt
```

~~~~exercism/note
把这个 AWK 单行命令与等效的 grep 命令比较一下

```sh
grep 'regex' data.txt
```

AWK 让你拥有完整的编程语言，同时又不牺牲简洁性。
~~~~

在后续的概念中，我们会更深入地了解 GNU AWK 的正则表达式风格。

### 表达式

AWK 表达式（算术的、逻辑的，或其他任何形式）都可以用作模式。

要提取 UID 为 1000 及以上的所有用户：

```sh
awk -F: '$3 >= 1000' /etc/passwd
```

回想一下，AWK 中代表 false 的值是数字 0 和空字符串，其他所有数字或字符串都是 true。
任何求值为数字或字符串的表达式都可以用作模式。

### 函数

任何[内置][builtins]或[用户自定义][user-defined]函数都可以用在表达式中，因而也能用在模式里。
举两个例子：

```awk
length($1) {print "first field is not empty"}
```
```awk
toupper(substr($1, 1, 1)) ~ /[AEIOU]/ {print "starts with a vowel"}
```

### 常量模式

一个常见的 AWK 惯用法是：

```sh
{
    xyz()   # some code that transforms each record
}
1
```

`1`是一个真值模式，没有关联的动作。
它的意思是“打印当前记录”。

[builtins]: https://www.gnu.org/software/gawk/manual/html_node/Built_002din.html
[user-defined]: https://www.gnu.org/software/gawk/manual/html_node/User_002ddefined.html
