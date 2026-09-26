# 说明

在本练习中，你将为一个简单的整数计算器构建错误处理。为简化起见，已经提供了用于计算加法、乘法和除法的方法。

目标是让计算器能够正常工作，当传入实参`16`、`51`和`+`时，返回符合以下格式的字符串：`16 + 51 = 67`。

```csharp
SimpleCalculator.Calculate(16, 51, "+"); // => returns "16 + 51 = 67"

SimpleCalculator.Calculate(32, 6, "*"); // => returns "32 * 6 = 192"

SimpleCalculator.Calculate(512, 4, "/"); // => returns "512 / 4 = 128"
```

## 1. 实现计算器运算

本任务中要实现的主要方法是（_static_）`SimpleCalculator.Calculate()`方法。它接受三个实参。前两个实参是整数，将对它们进行运算。第三个实参是字符串类型，在本练习中需要实现以下运算：

- 使用`+`字符串进行加法运算
- 使用`*`字符串进行乘法运算
- 使用`/`字符串进行除法运算

## 2. 处理非法运算

任何其他运算符号都应抛出`ArgumentOutOfRangeException`异常。如果运算实参是空字符串，那么该方法应抛出`ArgumentException`异常。当`null`作为运算实参传入时，该方法应抛出`ArgumentNullException`异常。

```csharp
SimpleCalculator.Calculate(100, 10, "-"); // => throws ArgumentOutOfRangeException

SimpleCalculator.Calculate(8, 2, ""); // => throws ArgumentException

SimpleCalculator.Calculate(58, 6, null); // => throws ArgumentNullException
```

## 3. 处理除以零时的错误

当尝试除以`0`时，计算器应返回内容为`Division by zero is not allowed.`的字符串。任何其他异常都不应由`SimpleCalculator.Calculate()`方法处理。

```csharp
SimpleCalculator.Calculate(512, 0, "/"); // => returns "Division by zero is not allowed."
```
