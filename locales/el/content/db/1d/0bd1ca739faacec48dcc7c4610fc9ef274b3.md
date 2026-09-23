# Εισαγωγή

Οι lambda είναι συναρτήσεις χωρίς όνομα. Είναι βασικά ένας συντομευμένος τρόπος γραφής συναρτήσεων.

Οι lambda μπορούν να είναι είτε lambda έκφρασης είτε lambda εντολής:

```
(input_parameters) => expression
(input_parameters) => { <statements> }
```

## Δήλωση lambda

Οι lambda που δεν επιστρέφουν τιμή (`void`) μπορούν να μετατραπούν σε τύπο delegate `Action<T>`.

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

Οι lambda με τιμή επιστροφής διάφορη του `void` μπορούν να μετατραπούν σε τύπο delegate `Func<T>`.

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

Αν μια lambda έχει μόνο μία παράμετρο, οι παρενθέσεις γύρω από την παράμετρο μπορούν να παραλειφθούν:

```csharp
// Equivalent definitions
Action<int> = (x) => Console.WriteLine(x);
Action<int> = x => Console.WriteLine(x);
```

## Ορίσματα lambda

Η κύρια χρήση των lambda είναι να τις περνάς ως ορίσματα σε άλλες μεθόδους, όπως στις περισσότερες μεθόδους LINQ:

```csharp
var numbers = new[] { 1, 2, 3, 4 };
var doubled = numbers.Select(n => n * 2);
foreach (var number in doubled)
{
    Console.Write(number)
}
// => 2468
```
