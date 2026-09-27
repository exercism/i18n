# مقدمه

«لامبداها» توابعی بدون اسم هستند. در واقع نوعی نشانه‌گذاری مختصر برای توابع‌اند.

لامبداها می‌توانند از نوع لامبدای عبارتی یا لامبدای دستوری باشند:

```
(input_parameters) => expression
(input_parameters) => { <statements> }
```

## اعلان لامبدا

لامبداهایی که مقداری برنمی‌گردانند (`void`) را می‌توان به نوع دلیگیت `Action<T>` تبدیل کرد.

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

لامبداهایی که مقدار بازگشتی‌شان `void` نیست را می‌توان به نوع دلیگیت `Func<T>` تبدیل کرد.

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

اگر یک لامبدا فقط یک پارامتر داشته باشد، می‌توان پرانتزهای دور پارامتر را حذف کرد:

```csharp
// Equivalent definitions
Action<int> = (x) => Console.WriteLine(x);
Action<int> = x => Console.WriteLine(x);
```

## آرگومان‌های لامبدا

کاربرد اصلی لامبداها ارسال آن‌ها به‌عنوان آرگومان به متدهای دیگر است، مثل بیشتر متدهای LINQ:

```csharp
var numbers = new[] { 1, 2, 3, 4 };
var doubled = numbers.Select(n => n * 2);
foreach (var number in doubled)
{
    Console.Write(number)
}
// => 2468
```
