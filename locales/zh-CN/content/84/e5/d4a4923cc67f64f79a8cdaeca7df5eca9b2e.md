# 指令补充

## DSL 说明

在这个 DSL 中，图是 `Graph` 类型的对象。它接收一个 `list`，里面包含一个或多个元组，用来描述：

+ 属性
+ `Nodes`
+ `Edges`

`Node` 和 `Edge` 的实现已在 `dot_dsl.py` 中提供。

关于该 DSL 的预期设计，以及预期的错误类型和错误消息的更多细节，请查看 `dot_dsl_test.py` 中的测试用例。


## 异常消息

有时需要[抛出异常](https://docs.python.org/3/tutorial/errors.html#raising-exceptions)。这样做时，应该始终包含一条**有意义的错误消息**，说明错误来自哪里。这能让你的代码更易读，也大大有助于调试。如果已知错误来源属于某种类型，你可以选择抛出某种[内置错误类型](https://docs.python.org/3/library/exceptions.html#base-classes)，但仍应包含一条有意义的错误消息。

这个练习要求你使用 [raise 语句](https://docs.python.org/3/reference/simple_stmts.html#the-raise-statement)，在 `Graph` 格式不正确时“抛出” `TypeError`，在 `Edge`、`Node` 或 `attribute` 格式不正确时“抛出” `ValueError`。只有当你既 `raise` 了 `exception`，又为它附上一条消息时，测试才会通过。

要抛出带有消息的错误，请把消息写成 `exception` 类型的实参：

```python
# Graph is malformed
raise TypeError("Graph data malformed")

# Edge has incorrect values
raise ValueError("EDGE malformed")
```
