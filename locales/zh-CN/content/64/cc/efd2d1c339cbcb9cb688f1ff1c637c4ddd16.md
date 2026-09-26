# 简介

在 C# 中，元组是一种数据结构，用来组织数据，可以容纳任意类型的两个或多个字段。

创建元组的方式通常是：把 2 个或多个用逗号分隔的表达式放在一对圆括号里。

```csharp
string boast = "All you need to know";
bool success = !string.IsNullOrWhiteSpace(boast);
(bool, int, string) triple = (success, 42, boast);
```

元组可以用于赋值和初始化操作，也可以作为返回值或方法的实参。

使用点语法可以提取字段。默认情况下，第一个字段是 `Item1`，第二个是 `Item2`，以此类推。非默认的名称将在下文讨论。

```csharp
// initialization
(int, int, int) vertices = (90, 45, 45);

// assignment
vertices = (60, 60, 60);

//  return value
(bool, int) GetSameOrBigger(int num1, int num2)
{
    return (num1 == num2, num1 > num2 ? num1 : num2);
}

// method argument
int Add((int, int) operands)
{
    return operands.Item1 + operands.Item2;
}
```

像 `Item1` 这样的字段名并不能让代码易读。下面的代码展示了为元组的字段命名的 2 种方式。还要注意，下面的代码中，`var` 可以和元组一起使用，并且类型会被推断出来。对于有名字段和无名字段的元组，这同样适用。

```csharp
// name items in declaration
(bool success, string message) results = (true, "well done!");
bool mySuccess = results.success;
string myMessage = results.message;

// name items in creating expression
var results2 = (success: true, message: "well done!");
bool mySuccess2 = results2.success;
string myMessage2 = results2.message;
```
