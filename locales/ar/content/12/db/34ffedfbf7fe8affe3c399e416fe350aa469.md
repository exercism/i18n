# التعليمات

في هذا التمرين ستبني معالجة للأخطاء في آلة حاسبة بسيطة للأعداد الصحيحة. ولتبسيط الأمور، وُفّرت طُرق لحساب الجمع والضرب والقسمة.

الهدف هو الحصول على آلة حاسبة تعمل وتُرجع سلسلة نصية بالنمط التالي: `16 + 51 = 67`، عند تمرير الوسائط `16` و`51` و`+`.

```csharp
SimpleCalculator.Calculate(16, 51, "+"); // => returns "16 + 51 = 67"

SimpleCalculator.Calculate(32, 6, "*"); // => returns "32 * 6 = 192"

SimpleCalculator.Calculate(512, 4, "/"); // => returns "512 / 4 = 128"
```

## 1. نفّذ عمليات الآلة الحاسبة

الطريقة الرئيسية التي ستُنفّذ في هذه المهمة هي الطريقة (*static*) `SimpleCalculator.Calculate()`. وهي تأخذ ثلاثة وسائط. الوسيطان الأولان عددان صحيحان ستُجرى عليهما العملية. أما الوسيط الثالث فمن نوع سلسلة نصية، وفي هذا التمرين يلزمك تنفيذ العمليات التالية:

- الجمع باستخدام السلسلة النصية `+`
- الضرب باستخدام السلسلة النصية `*`
- القسمة باستخدام السلسلة النصية `/`

## 2. تعامل مع العمليات غير الصحيحة

أي رمز عملية آخر ينبغي أن يرمي الاستثناء `ArgumentOutOfRangeException`. وإذا كان وسيط العملية سلسلة نصية فارغة، فينبغي أن ترمي الطريقة الاستثناء `ArgumentException`. وعند تمرير `null` كوسيط للعملية، فينبغي أن ترمي الطريقة الاستثناء `ArgumentNullException`.

```csharp
SimpleCalculator.Calculate(100, 10, "-"); // => throws ArgumentOutOfRangeException

SimpleCalculator.Calculate(8, 2, ""); // => throws ArgumentException

SimpleCalculator.Calculate(58, 6, null); // => throws ArgumentNullException
```

## 3. تعامل مع الأخطاء عند القسمة على صفر

عند محاولة القسمة على `0`، ينبغي أن تُرجع الآلة الحاسبة سلسلة نصية بمحتوى `Division by zero is not allowed.`. وأي استثناء آخر لا ينبغي أن تتولى الطريقة `SimpleCalculator.Calculate()` معالجته.

```csharp
SimpleCalculator.Calculate(512, 0, "/"); // => returns "Division by zero is not allowed."
```
