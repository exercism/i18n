# Introdução

As lambdas são funções sem nome. São basicamente uma notação abreviada para funções.

As lambdas podem ser lambdas de expressão ou lambdas de instrução:

```
(input_parameters) => expression
(input_parameters) => { <statements> }
```

## Declarar lambdas

As lambdas que não devolvem valor (`void`) podem ser convertidas num tipo delegate `Action<T>`.

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

As lambdas cujo valor devolvido não é `void` podem ser convertidas num tipo delegate `Func<T>`.

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

Se uma lambda tiver apenas um parâmetro, os parênteses à volta do parâmetro podem ser omitidos:

```csharp
// Equivalent definitions
Action<int> = (x) => Console.WriteLine(x);
Action<int> = x => Console.WriteLine(x);
```

## Lambdas como argumentos

A principal utilização das lambdas é passá-las como argumentos a outros métodos, como a maioria dos métodos LINQ:

```csharp
var numbers = new[] { 1, 2, 3, 4 };
var doubled = numbers.Select(n => n * 2);
foreach (var number in doubled)
{
    Console.Write(number)
}
// => 2468
```
