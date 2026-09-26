# 附加说明

## 异常消息

有时需要[抛出异常](https://docs.python.org/3/tutorial/errors.html#raising-exceptions)。这样做时，你应该始终包含一条**有意义的错误消息**，说明错误的来源是什么。这会让你的代码更易读，对调试也大有帮助。如果你知道错误来源会是某种特定类型，可以选择抛出[内置错误类型](https://docs.python.org/3/library/exceptions.html#base-classes)中的一种，但仍应包含有意义的消息。

本练习要求你在`prime()`函数收到格式错误的输入时，使用 [raise 语句](https://docs.python.org/3/reference/simple_stmts.html#the-raise-statement)“抛出”一个`ValueError`。由于本练习只处理_正数_，任何小于 1 的数字都是格式错误的。只有当你既`raise`了`exception`，又为它附带了一条消息，测试才会通过。

要想抛出带消息的`ValueError`，把消息写成`exception`类型的实参：

```python
# when the prime function receives malformed input
raise ValueError('there is no zeroth prime')
```
