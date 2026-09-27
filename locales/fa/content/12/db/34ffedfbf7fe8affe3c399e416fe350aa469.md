# دستورالعمل‌ها

در این تمرین، مدیریت خطا را برای یک ماشین‌حساب ساده‌ی اعداد صحیح می‌سازید. برای اینکه کار ساده‌تر شود، متدهایی برای محاسبه‌ی جمع، ضرب و تقسیم در اختیار شما قرار داده شده است.

هدف این است که یک ماشین‌حساب کارآمد داشته باشید که وقتی آرگومان‌های `16`، `51` و `+` به آن داده می‌شوند، رشته‌ای با الگوی زیر برگرداند: `16 + 51 = 67`.

```csharp
SimpleCalculator.Calculate(16, 51, "+"); // => returns "16 + 51 = 67"

SimpleCalculator.Calculate(32, 6, "*"); // => returns "32 * 6 = 192"

SimpleCalculator.Calculate(512, 4, "/"); // => returns "512 / 4 = 128"
```

## 1. عملیات ماشین‌حساب را پیاده‌سازی کنید

متد اصلی که در این کار باید پیاده‌سازی شود، متد (_static_) `SimpleCalculator.Calculate()` است. این متد سه آرگومان می‌گیرد. دو آرگومان اول اعداد صحیحی هستند که قرار است عملیاتی روی آن‌ها انجام شود. آرگومان سوم از نوع رشته است و در این تمرین لازم است عملیات زیر پیاده‌سازی شوند:

- جمع با استفاده از رشته‌ی `+`
- ضرب با استفاده از رشته‌ی `*`
- تقسیم با استفاده از رشته‌ی `/`

## 2. عملیات غیرمجاز را مدیریت کنید

هر نماد عملیات دیگری باید استثنای `ArgumentOutOfRangeException` را پرتاب کند. اگر آرگومان عملیات یک رشته‌ی خالی باشد، متد باید استثنای `ArgumentException` را پرتاب کند. وقتی `null` به‌عنوان آرگومان عملیات داده شود، متد باید استثنای `ArgumentNullException` را پرتاب کند.

```csharp
SimpleCalculator.Calculate(100, 10, "-"); // => throws ArgumentOutOfRangeException

SimpleCalculator.Calculate(8, 2, ""); // => throws ArgumentException

SimpleCalculator.Calculate(58, 6, null); // => throws ArgumentNullException
```

## 3. مدیریت خطاها هنگام تقسیم بر صفر

وقتی تلاش می‌شود بر `0` تقسیم شود، ماشین‌حساب باید رشته‌ای با محتوای `Division by zero is not allowed.` برگرداند. هیچ استثنای دیگری نباید توسط متد `SimpleCalculator.Calculate()` مدیریت شود.

```csharp
SimpleCalculator.Calculate(512, 0, "/"); // => returns "Division by zero is not allowed."
```
