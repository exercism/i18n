# Rexx 风格指南

本指南介绍 Rexx 赛道的练习测试文件和示例文件所应采用的风格。

## Rexx 标准

代码应符合 Rexx 语言 5.0 级标准。

可以使用 Regina Rexx 扩展，以及用于访问外部库的 SAA 标准函数。

不应使用 AREXX 扩展和 CMS 缓冲区操作例程。

## 平台

运行时测试环境基于 Linux，因此在 ADDRESS 指令调用中只能使用该环境中可用的命令。这些命令应在代码注释中清楚标出。

## 命名

### 指令

指令（保留字）应使用 **_小写_**。因此，以下写法符合风格指南的建议：

```rexx
do while input \= ''
  parse var input char +1 input
  say char
end
```

而以下两种都不符合规范，因此不推荐：

```rexx
/* *** Not recommended *** */
Do While input \= ''
  Parse Var input char +1 input
  Say char
End
```

以及：

```rexx
/* *** Not recommended *** */
DO WHILE input \= ''
  PARSE VAR input char +1 input
  SAY char
END
```

### 内置函数（BIF）

内置函数应使用 **_大写_**，如下所示：

```rexx
input = 'ABCDE'
say 'Length of input is' LENGTH(input)
say 'First letter of input is' SUBSTR(input, 1, 1)
```

### 标签（用户自定义函数）

标签名应使用 **_帕斯卡命名法_**，如下所示：

```rexx
greeting = MyFuncSayHello()
say greeting

exit 0

MyFuncSayHello : procedure
  hello = 'Hello there!'
return hello
```

### 变量

变量名应以 **_小写_** 字母开头，因此单词变量名应全部小写。

多词变量名可以使用 **_驼峰命名法_** 或 **_蛇形命名法_**。

本赛道采用的约定是：_大多数变量使用驼峰命名法_，蛇形命名法留给测试变量。用作常量的变量也可以选择使用大写。

```rexx
input = 'ABCDE'
i = 0

personName = 'Alice'
test_person_description = 'Brown hair, blue eyes'

TRUE = 1
PI_CONSTANT = 3.14159
```

## 字面量

字符串可以用单引号或双引号表示，即 **`'`** 和 **`"`**。以下两种写法等价：

```rexx
say "Hello, world!"

say 'Hello, world!'
```

两者可以互相嵌套，无需转义字符：

```rexx
say "Please don't do that as it's wrong."

say 'He said, "Please sir, may I have more?".'
```

除非字符串本身包含引号、需要混用引号，否则优先使用 **_单引号_** 表示字符串。

### 十六进制和二进制字符串

二进制值和十六进制值可以分别通过在字符串后追加 **`B`** 或 **`X`** 来表示。例如：

```rexx
hexvalue = "0A"X

binvalue = "00001010"B
```

建议用 **_双引号_** 括起这类值。

结合前面用单引号表示普通字符串的建议，这一约定应有助于在代码库中识别二进制字符串和十六进制字符串。

### 换行符
在许多 UNIX 或受 C 影响的语言中，字面量 **_`\n`_** 被用作 **_换行_** 符。这种用法很普遍，本赛道有若干练习涉及使用和操作带有这种换行符的字符串。

Rexx 不支持这种换行符，也不支持用 **_`\`_**（或任何其他字符）作为转义字符。

换行字符在 Rexx 中的等价形式是一个（与平台相关的）十六进制值；在源自 UNIX 的平台上它是：

**_`"0A"X`_**

下面这个内嵌换行的字符串（使用 bash shell）：

```bash
printf "I have\nthree embedded\nnewlines.\n"
```

在 Rexx 中的等价写法是：

```rexx
say 'I have' || "0A"X || 'three embedded' || "0A"X || 'newlines.' || "0A"X
```

本赛道的练习只有在字符串用于终端显示时，才会把 **_`\n`_** 转换为 **_`"0A"X`_**。在其他情况下，**_`\n`_** 字符串只会被解释为逻辑换行。

## 其他风格建议

缩进可以使用两个、三个或四个空格字符，不过优先使用_两个字符_的缩进，并保持缩进一致。

函数中最后一条 **_return_** 指令应与标签名对齐，从而清楚地标示该函数的结束，并且应_始终_返回一个值。

布尔 NOT 运算符可以用若干不同符号表示。本赛道首选 **`\`**，并且为了保持用法一致，关系运算符“不等于”应写作 **`\=`**。

布尔值 **`false`** 和 **`true`** 分别用 **`0`** 和 **`1`** 表示。这些值没有预定义的字面量。

错误状态通过返回值来指示：空字符串 **`''`** 或 **`-1`** 表示错误状态，具体取决于上下文。

## 规范代码风格示例
```rexx
TO DO EXAMPLE
```

## 测试文件结构

每个练习都有一个测试文件，位于练习的顶层目录中，命名为：`<exercise>-check.rexx`

按照这一约定，练习 `acronym` 的测试文件将命名为：`acronym-check.rexx`

每个练习的测试文件都按照一种宽松但特定的方式组织，既帮助学习者理解练习要求，也便于贡献者实现或扩展测试。

以下是 `acronym` 练习测试文件的一部分：

```rexx
/* Unit Test Runner: t-rexx */
function = 'Abbreviate'
context('Checking the' function 'function')

/* Unit tests */
check('basic' function||'("Portable Network Graphics")',,
      function||'("Portable Network Graphics")',, 'to be', 'PNG')

check('lowercase words' function||'("Ruby on Rails")',,
      function||'("Ruby on Rails")',, 'to be', 'ROR')
```

该文件分为两个逻辑部分，每部分都用一行注释标识。

第一部分把 **_被测函数_** 的名称（这里是 `Abbreviate` 函数）赋给 `function` 变量。这个变量名具有描述性，但可以任意取；文件中其余所有需要用到被测函数名称的地方都会引用它。

这一部分还调用了 `context` 函数，其用途不言自明。

下一部分包含单元测试。`check` 函数的每次调用就是一个单元测试。期望的参数为：

```rexx
check(<test description>,
      <function invocation>,
      [<actual result variable>],
      <test comparator>,
      <expected result>)
```

**\<test description>** 是测试执行时输出的字符串。为了尽可能具有描述性，建议使用由被测函数名称和传给它的参数组成的字符串，如示例所示。

**\<function invocation>** 是实际的函数调用，因此会把它的返回值传给 `check` 用于测试比较。

**\<actual result variable>** 是一个可选参数，如果使用，它是一个变量名，该变量包含用于测试比较的值。

使用它的原因是可以检查_派生自_被测函数返回值的结果，而不是返回值本身。一个明显的例子是返回值是一个数 KB 的字符串，如下所示：

```rexx
expected_length = LENGTH(FUT(...))

check('...', FUT(...), expected_length, 'to be', 50)
```

请注意，仍然必须传入 \<function invocation> 参数。

**\<test comparator>** 是描述要执行的比较类型的字符串。多数情况下这个字符串是 'to be'，表示进行相等性比较。其他比较选项请参阅单元测试框架的文档。

**\<expected result>** 不言自明，就是用来与实际结果进行比较的值。

在测试文件中可以自由声明变量（当然要在使用之前），并可以用它们代替字面量，作为 `check` 的参数。
