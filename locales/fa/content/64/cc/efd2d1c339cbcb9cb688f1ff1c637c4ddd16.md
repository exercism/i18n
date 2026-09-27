# مقدمه

در C#، «تاپل» یک ساختار داده است که داده‌ها را سازماندهی می‌کند و دو یا چند «فیلد» از هر نوعی را در خود نگه می‌دارد.

یک تاپل معمولاً با قرار دادن دو یا چند عبارت جدا شده با کاما، داخل یک جفت پرانتز ساخته می‌شود.

```csharp
string boast = "All you need to know";
bool success = !string.IsNullOrWhiteSpace(boast);
(bool, int, string) triple = (success, 42, boast);
```

تاپل را می‌توان در عملیات انتساب و مقداردهی اولیه، به عنوان مقدار بازگشتی یا آرگومان متد استفاده کرد.

فیلدها با روش نقطه‌گذاری استخراج می‌شوند. به‌طور پیش‌فرض، فیلد اول `Item1`، فیلد دوم `Item2` و به همین ترتیب است. در ادامه به نام‌های غیرپیش‌فرض می‌پردازیم.

```csharp
// initialization
(int, int, int) vertices = (90, 45, 45);

// assignment
vertices = (60, 60, 60);

//  return value
(bool, int) GetSameOrBigger(int num1, int num2)
{
    return (num1 == num2, num1 > num2 ? num1 : num2);
}

// method argument
int Add((int, int) operands)
{
    return operands.Item1 + operands.Item2;
}
```

نام‌های فیلدهایی مانند `Item1` و غیره باعث خوانا شدن کد نمی‌شوند. کد زیر دو روش برای نام‌گذاری فیلدهای تاپل نشان می‌دهد. همچنین توجه کنید که در کد زیر می‌توان از `var` با تاپل‌ها استفاده کرد و نوع را استنتاج کرد. این موضوع برای تاپل‌های دارای فیلدهای نام‌دار و بی‌نام هم به همان خوبی کار می‌کند.

```csharp
// name items in declaration
(bool success, string message) results = (true, "well done!");
bool mySuccess = results.success;
string myMessage = results.message;

// name items in creating expression
var results2 = (success: true, message: "well done!");
bool mySuccess2 = results2.success;
string myMessage2 = results2.message;
```
