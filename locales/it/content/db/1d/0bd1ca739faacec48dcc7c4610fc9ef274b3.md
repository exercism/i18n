# Introduzione

Le lambda sono funzioni senza nome. In pratica sono una notazione abbreviata per le funzioni.

Le lambda possono essere espressioni lambda o istruzioni lambda:

```
(input_parameters) => expression
(input_parameters) => { <statements> }
```

## Dichiarare le lambda

Le lambda che non restituiscono alcun valore (`void`) possono essere convertite in un tipo delegato `Action<T>`.

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

Le lambda con un valore restituito non void possono essere convertite in un tipo delegato `Func<T>`.

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

Se una lambda ha un solo parametro, si possono omettere le parentesi tonde (`()`) attorno al parametro:

```csharp
// Equivalent definitions
Action<int> = (x) => Console.WriteLine(x);
Action<int> = x => Console.WriteLine(x);
```

## Le lambda come argomenti

L'uso principale delle lambda è passarle come argomenti ad altri metodi, come la maggior parte dei metodi LINQ:

```csharp
var numbers = new[] { 1, 2, 3, 4 };
var doubled = numbers.Select(n => n * 2);
foreach (var number in doubled)
{
    Console.Write(number)
}
// => 2468
```
