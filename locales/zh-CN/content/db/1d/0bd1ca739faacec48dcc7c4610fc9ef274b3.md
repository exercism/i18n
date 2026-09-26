# 简介

Lambda 是没有名字的函数。它基本上就是函数的一种简写形式。

Lambda 既可以是表达式 lambda，也可以是语句 lambda：

```
(input_parameters) => expression
(input_parameters) => { <statements> }
```

## 声明 lambda

不返回任何值（`void`）的 lambda 可以转换为 `Action<T>` 委托类型。

```csharp
// Statement lambda
Action = () =>
{
    Console.WriteLine("No parameters");
    Console.WriteLine("Still nice, right?");
}

// Expression lambda
Action<int> = (x) => Console.WriteLine(x);
```

返回值不为 `void` 的 lambda 可以转换为 `Func<T>` 委托类型。

```csharp
// Expression lambda
Func<int, int> = (x) => x * x;

// Statement lambda
Func<string, string, bool> = (left, right) =>
{
    var equal = left == right;
    return equal;
}
```

如果一个 lambda 只有一个形参，那么形参外面的括号可以省略：

```csharp
// Equivalent definitions
Action<int> = (x) => Console.WriteLine(x);
Action<int> = x => Console.WriteLine(x);
```

## 作为实参的 lambda

lambda 最主要的用途是把它们作为实参传给其他方法，比如大多数 LINQ 方法：

```csharp
var numbers = new[] { 1, 2, 3, 4 };
var doubled = numbers.Select(n => n * 2);
foreach (var number in doubled)
{
    Console.Write(number)
}
// => 2468
```
