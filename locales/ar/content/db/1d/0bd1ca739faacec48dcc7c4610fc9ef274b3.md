# مقدمة

دوال لامدا هي دوال بدون اسم. وهي في الأساس صيغة مختصرة لكتابة الدوال.

يمكن أن تكون دوال لامدا إما لامدا تعبيرية أو لامدا عبارية:

```
(input_parameters) => expression
(input_parameters) => { <statements> }
```

## تعريف دوال لامدا

يمكن تحويل دوال لامدا التي لا تُرجع قيمة (`void`) إلى نوع المفوَّض `Action<T>`.

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

أما دوال لامدا التي تُرجع قيمة (أي أن نوعها ليس `void`) فيمكن تحويلها إلى نوع المفوَّض `Func<T>`.

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

إذا كانت دالة لامدا لها معامل واحد فقط، فيمكن حذف الأقواس الهلالية حول المعامل:

```csharp
// Equivalent definitions
Action<int> = (x) => Console.WriteLine(x);
Action<int> = x => Console.WriteLine(x);
```

## وسائط لامدا

الاستخدام الأساسي لدوال لامدا هو تمريرها كوسائط إلى طرق أخرى، مثل معظم طرق LINQ:

```csharp
var numbers = new[] { 1, 2, 3, 4 };
var doubled = numbers.Select(n => n * 2);
foreach (var number in doubled)
{
    Console.Write(number)
}
// => 2468
```
