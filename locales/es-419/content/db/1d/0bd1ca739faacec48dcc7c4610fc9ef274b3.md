# Introducción

Las lambdas son funciones sin nombre. Básicamente son una notación abreviada para las funciones.

Las lambdas pueden ser lambdas de expresión o lambdas de sentencia:

```
(input_parameters) => expression
(input_parameters) => { <statements> }
```

## Declarar lambdas

Las lambdas que no devuelven ningún valor (`void`) se pueden convertir a un tipo de delegado `Action<T>`.

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

Las lambdas con un valor de retorno distinto de `void` se pueden convertir a un tipo de delegado `Func<T>`.

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

Si una lambda tiene un solo parámetro, se pueden omitir los paréntesis que rodean al parámetro:

```csharp
// Equivalent definitions
Action<int> = (x) => Console.WriteLine(x);
Action<int> = x => Console.WriteLine(x);
```

## Argumentos de las lambdas

El uso principal de las lambdas es pasarlas como argumentos a otros métodos, como la mayoría de los métodos de LINQ:

```csharp
var numbers = new[] { 1, 2, 3, 4 };
var doubled = numbers.Select(n => n * 2);
foreach (var number in doubled)
{
    Console.Write(number)
}
// => 2468
```
