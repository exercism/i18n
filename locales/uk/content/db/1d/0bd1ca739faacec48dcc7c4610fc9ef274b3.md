# Вступ

Лямбди - це функції без назви. По суті, це лише скорочений запис функцій.

Лямбди бувають лямбдами-виразами або лямбдами-інструкціями:

```
(input_parameters) => expression
(input_parameters) => { <statements> }
```

## Оголошення лямбд

Лямбди, які не повертають значення (`void`), можна перетворити на тип делегата `Action<T>`.

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

Лямбди, які повертають не `void`, можна перетворити на тип делегата `Func<T>`.

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

Якщо лямбда має лише один параметр, дужки навколо нього можна опустити:

```csharp
// Equivalent definitions
Action<int> = (x) => Console.WriteLine(x);
Action<int> = x => Console.WriteLine(x);
```

## Лямбди як аргументи

Основне призначення лямбд - передавати їх як аргументи в інші методи, зокрема в більшість методів LINQ:

```csharp
var numbers = new[] { 1, 2, 3, 4 };
var doubled = numbers.Select(n => n * 2);
foreach (var number in doubled)
{
    Console.Write(number)
}
// => 2468
```
