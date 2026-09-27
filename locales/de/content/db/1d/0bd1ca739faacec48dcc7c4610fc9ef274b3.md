# Einführung

Lambdas sind Funktionen ohne Namen. Sie sind im Grunde eine Kurzschreibweise für Funktionen.

Lambdas können entweder Ausdruckslambdas oder Anweisungslambdas sein:

```
(input_parameters) => expression
(input_parameters) => { <statements> }
```

## Lambdas deklarieren

Lambdas, die keinen Wert zurückgeben (`void`), können in einen `Action<T>`-Delegattyp umgewandelt werden.

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

Lambdas mit einem Rückgabewert, der nicht `void` ist, können in einen `Func<T>`-Delegattyp umgewandelt werden.

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

Wenn ein Lambda nur einen einzigen Parameter hat, können die runden Klammern um den Parameter weggelassen werden:

```csharp
// Equivalent definitions
Action<int> = (x) => Console.WriteLine(x);
Action<int> = x => Console.WriteLine(x);
```

## Lambda-Argumente

Lambdas werden hauptsächlich dazu verwendet, sie als Argumente an andere Methoden zu übergeben, wie an die meisten LINQ-Methoden:

```csharp
var numbers = new[] { 1, 2, 3, 4 };
var doubled = numbers.Select(n => n * 2);
foreach (var number in doubled)
{
    Console.Write(number)
}
// => 2468
```
