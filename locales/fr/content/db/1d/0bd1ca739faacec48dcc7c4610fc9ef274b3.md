# Introduction

Les lambdas sont des fonctions sans nom. Il s'agit essentiellement d'une notation abrégée pour les fonctions.

Une lambda peut être soit une expression lambda, soit une instruction lambda :

```
(input_parameters) => expression
(input_parameters) => { <statements> }
```

## Déclare des lambdas

Une lambda qui ne renvoie aucune valeur (`void`) peut être convertie en un type délégué `Action<T>`.

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

Une lambda dont la valeur de retour n'est pas `void` peut être convertie en un type délégué `Func<T>`.

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

Si une lambda ne prend qu'un seul paramètre, on peut omettre les parenthèses autour de ce paramètre :

```csharp
// Equivalent definitions
Action<int> = (x) => Console.WriteLine(x);
Action<int> = x => Console.WriteLine(x);
```

## Arguments de lambda

Les lambdas servent principalement à être passées en arguments à d'autres méthodes, comme la plupart des méthodes LINQ :

```csharp
var numbers = new[] { 1, 2, 3, 4 };
var doubled = numbers.Select(n => n * 2);
foreach (var number in doubled)
{
    Console.Write(number)
}
// => 2468
```
