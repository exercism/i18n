# مقدمة

يحدث الفيض الحسابي عندما يُنتج حسابٌ ما، مثل عملية حسابية أو تحويل نوع، قيمةً أكبر من سعة النوع المستقبِل.

التعبيرات من النوع `int` و `long` ونظائرها التي لا تحمل إشارة ستلتف بصمت حول الطرف الآخر في هذه الحالات.

يمكن تعديل سلوك الحسابات على الأعداد الصحيحة باستخدام الكلمة المفتاحية `checked`. وعندما يحدث فيض داخل كتلة `checked`، يُطرح استثناء من النوع `OverflowException`.

```csharp
int one = 1;
checked
{
    int expr = int.MaxValue + one;   // OverflowException is thrown
}

// or

int expr2 = checked(int.MaxValue + one);     // OverflowException is thrown
```

التعبيرات من النوع `float` و `double` ستأخذ قيمة خاصة هي اللانهاية.

التعبيرات من النوع `decimal` ستطرح استثناءً من النوع `OverflowException`.
