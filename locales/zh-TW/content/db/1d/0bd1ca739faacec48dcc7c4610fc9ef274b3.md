# 簡介

Lambda 是沒有名稱的函式。它們基本上算是函式的簡寫表示法。

Lambda 可以是運算式 Lambda 或敘述 Lambda：

```
(input_parameters) => expression
(input_parameters) => { <statements> }
```

## 宣告 Lambda

沒有回傳值的 Lambda（`void`）可以轉換成 `Action<T>` 委派型別。

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

有非 void 回傳值的 Lambda 可以轉換成 `Func<T>` 委派型別。

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

如果 Lambda 只有單一參數，就可以省略參數外面的括號：

```csharp
// Equivalent definitions
Action<int> = (x) => Console.WriteLine(x);
Action<int> = x => Console.WriteLine(x);
```

## Lambda 引數

Lambda 最主要的用途，是把它們當作引數傳給其他方法，例如大多數的 LINQ 方法：

```csharp
var numbers = new[] { 1, 2, 3, 4 };
var doubled = numbers.Select(n => n * 2);
foreach (var number in doubled)
{
    Console.Write(number)
}
// => 2468
```
