# مقدمه

سرریز حسابی زمانی رخ می‌دهد که محاسبه‌ای مانند یک عمل حسابی یا تبدیل نوع، مقداری بزرگ‌تر از ظرفیت نوع مقصد تولید کند.

عبارت‌هایی از نوع `int` و `long` و همتاهای بدون علامت‌شان، در این شرایط بی‌سروصدا دور می‌زنند.

رفتار محاسبات صحیح را می‌توان با استفاده از کلیدواژه‌ی `checked` تغییر داد. وقتی سرریزی درون یک بلوک `checked` رخ دهد، نمونه‌ای از `OverflowException` پرتاب می‌شود.

```csharp
int one = 1;
checked
{
    int expr = int.MaxValue + one;   // OverflowException is thrown
}

// or

int expr2 = checked(int.MaxValue + one);     // OverflowException is thrown
```

عبارت‌هایی از نوع `float` و `double` مقدار خاص بینهایت را به خود می‌گیرند.

عبارت‌هایی از نوع `decimal` نمونه‌ای از `OverflowException` پرتاب می‌کنند.
