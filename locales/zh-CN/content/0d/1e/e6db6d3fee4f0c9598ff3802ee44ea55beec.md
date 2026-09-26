# 简介

## 文件

`File`模块提供了处理文件的函数。

要读取整个文件，使用`File.read/1`。要写入文件，使用`File.write/2`。

每次使用`File.write/2`写入文件时，都会打开一个文件描述符，并生成一个新的 Elixir [进程][exercism-processes]。因此，应避免在循环中使用`File.write/2`写入文件。

而应使用`File.open/2`打开文件。`File.open/2`的第二个实参是一个模式数组，它让你可以指定是想以读取还是写入方式打开文件。

`File.open/2`返回处理该文件的进程的 PID。要读写这个文件，请使用`IO`模块中的函数，并将该 PID 作为 IO 设备传入。

处理完文件后，用`File.close/1`关闭它。

`File`模块中提到的所有函数都有一个`!`变体，它会抛出错误而不是返回错误元组（例如`File.read!/1`）。如果你不打算处理文件缺失或权限不足等错误，就使用这个变体。

[exercism-processes]: https://exercism.org/tracks/elixir/concepts/processes
