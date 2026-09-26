# はじめに

ラムダは、名前のない関数です。基本的には、関数を短く書くための記法です。

ラムダには、式ラムダとステートメントラムダの2種類があります。

```
(input_parameters) => expression
(input_parameters) => { <statements> }
```

## ラムダの宣言

値を返さないラムダ（`void`）は、`Action<T>`デリゲート型に変換できます。

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

`void`以外の値を返すラムダは、`Func<T>`デリゲート型に変換できます。

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

ラムダの仮引数が1つだけの場合、その仮引数を囲む括弧（`()`）は省略できます。

```csharp
// Equivalent definitions
Action<int> = (x) => Console.WriteLine(x);
Action<int> = x => Console.WriteLine(x);
```

## ラムダを引数として渡す

ラムダの主な用途は、他のメソッドに引数として渡すことです。LINQのほとんどのメソッドがその例です。

```csharp
var numbers = new[] { 1, 2, 3, 4 };
var doubled = numbers.Select(n => n * 2);
foreach (var number in doubled)
{
    Console.Write(number)
}
// => 2468
```
