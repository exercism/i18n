# Bevezetés

A lambdák név nélküli függvények, lényegében a függvények rövidített jelölései.

A lambdák lehetnek kifejezéslambdák vagy utasításlambdák:

```
(input_parameters) => expression
(input_parameters) => { <statements> }
```

## Lambdák deklarálása

Azok a lambdák, amelyek nem adnak vissza értéket (`void`), `Action<T>` delegate típusra alakíthatók.

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

A nem `void` visszatérési értékű lambdák `Func<T>` delegate típusra alakíthatók.

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

Ha egy lambdának csak egyetlen paramétere van, a paraméter körüli zárójelek elhagyhatók:

```csharp
// Equivalent definitions
Action<int> = (x) => Console.WriteLine(x);
Action<int> = x => Console.WriteLine(x);
```

## Lambda argumentumok

A lambdákat leginkább arra használjuk, hogy argumentumként adjuk át őket más metódusoknak, például a legtöbb LINQ-metódusnak:

```csharp
var numbers = new[] { 1, 2, 3, 4 };
var doubled = numbers.Select(n => n * 2);
foreach (var number in doubled)
{
    Console.Write(number)
}
// => 2468
```
