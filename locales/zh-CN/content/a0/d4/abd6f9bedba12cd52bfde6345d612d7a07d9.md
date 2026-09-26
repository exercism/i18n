# 说明补充

## 异常消息

有时你需要[抛出异常](https://docs.python.org/3/tutorial/errors.html#raising-exceptions)。抛出异常时，一定要附带一条**有意义的错误消息**，说明错误的来源。这样代码更易读，也能大大方便调试。如果你确定错误来源是某种特定类型，可以选择[抛出内置错误类型](https://docs.python.org/3/library/exceptions.html#base-classes)中的一种，但同样要附带一条有意义的错误消息。

本练习要求你在方格输入超出范围时，用 [raise 语句](https://docs.python.org/3/reference/simple_stmts.html#the-raise-statement)“抛出”`ValueError`。只有同时`raise`这个`exception`并附带消息，测试才会通过。

要抛出带消息的 `ValueError`，把消息写成`exception`类型的实参：

```python
# when the square value is not in the acceptable range        
raise ValueError("square must be between 1 and 64")
```
