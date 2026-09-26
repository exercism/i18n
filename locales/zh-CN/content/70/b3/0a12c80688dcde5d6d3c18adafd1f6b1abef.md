# 说明

在本练习中，你将处理日志行。

每行日志都是一个字符串，格式如下：`"[<LEVEL>]: <MESSAGE>"`。

日志级别共有三种：

- `INFO`
- `WARNING`
- `ERROR`

你有三个任务，每个任务都会接受一行日志，并要求你对其做相应的处理。

## 1. 从日志行中获取消息

实现`message`函数，返回日志行中的消息：

```julia-repl
julia> message("[ERROR]: Invalid operation")
"Invalid operation"
```

开头和结尾的所有空白字符都应被移除：

```julia-repl
julia> message("[WARNING]:  Disk almost full\r\n")
"Disk almost full"
```

## 2. 从日志行中获取日志级别

实现`log_level`函数，返回日志行的日志级别，且应以小写形式返回：

```julia-repl
julia> log_level("[ERROR]: Invalid operation")
"error"
```

## 3. 重新格式化日志行

实现`reformat`函数，重新格式化日志行：把消息放在最前面，日志级别紧随其后并放在括号中：

```julia-repl
julia> reformat("[INFO]: Operation completed")
"Operation completed (info)"
```

----

***注意：*** 本练习中的所有字符串都是英文，且仅限于 ASCII 字符集。后续的概念将让你有机会处理 Unicode 字符。
