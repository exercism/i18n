# Introdução

Lambdas são funções sem nome. São basicamente uma notação abreviada para funções.

Lambdas podem ser de expressão ou de instrução:

```
(input_parameters) => expression
(input_parameters) => { <statements> }
```

## Declarando lambdas

Lambdas que não retornam valor (`void`) podem ser convertidas para um tipo delegado `Action<T>`.

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

Lambdas com um valor de retorno que não é void podem ser convertidas para um tipo delegado `Func<T>`.

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

Se uma lambda tiver apenas um parâmetro, os parênteses em volta do parâmetro podem ser omitidos:

```csharp
// Equivalent definitions
Action<int> = (x) => Console.WriteLine(x);
Action<int> = x => Console.WriteLine(x);
```

## Lambdas como argumentos

O uso principal das lambdas é passá-las como argumentos para outros métodos, como a maioria dos métodos LINQ:

```csharp
var numbers = new[] { 1, 2, 3, 4 };
var doubled = numbers.Select(n => n * 2);
foreach (var number in doubled)
{
    Console.Write(number)
}
// => 2468
```
