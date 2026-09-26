# 简介

当算术运算或类型转换等计算产生的值超出了接收类型的容量时，就会发生算术溢出。

`int`和`long`类型的表达式及其无符号对应类型在这种情况下会悄悄地回绕。

整数运算的行为可以通过使用`checked`关键字来修改。当`checked`代码块内发生溢出时，会抛出`OverflowException`的实例。

```csharp
int one = 1;
checked
{
    int expr = int.MaxValue + one;   // OverflowException is thrown
}

// or

int expr2 = checked(int.MaxValue + one);     // OverflowException is thrown
```

`float`和`double`类型的表达式会取一个特殊的值：无穷大。

`decimal`类型的表达式会抛出`OverflowException`的实例。
