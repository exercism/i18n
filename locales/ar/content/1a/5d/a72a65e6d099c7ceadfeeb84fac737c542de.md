# تلميحات

## عام

- يُخزَّن عدد الطيور في اليوم في [حقل][fields] باسم `birdsPerDay`.
- عدد الطيور في اليوم عبارة عن مصفوفة تحتوي على 7 أعداد صحيحة بالضبط.

## 1. تحقّق ممّا كانت عليه الأعداد الأسبوع الماضي

- بما أنّ هذه الطريقة _لا_ تعتمد على عدد هذا الأسبوع، فإنها معرّفة كـ[طريقة `static`][static-members].
- هناك [عدة أساليب لتعريف مصفوفة][single-dimensional-arrays].

## 2. تحقّق من عدد الطيور التي زارت اليوم

- تذكّر أنّ الأعداد مرتّبة حسب اليوم من الأقدم إلى الأحدث، والعنصر الأخير يمثّل اليوم.
- يمكن الوصول إلى العنصر الأخير إمّا باستخدام فهرسه (الثابت) (تذكّر أن تبدأ العدّ من الصفر) أو بحساب فهرسه باستخدام [حجم المصفوفة][array-length].

## 3. زد عدد اليوم

- اجعل العنصر الذي يمثّل عدد اليوم مساويًا لعدد اليوم زائد 1.

## 4. تحقّق إن كان هناك يوم لم تزره أي طيور

- يمتلك الصنف `Array` [طريقة مدمجة][array-indexof] تُرجع أول فهرس يُوجد فيه العنصر، أو -1 إذا لم يُعثر على عنصر مطابق.

## 5. احسب عدد الطيور الزائرة خلال أول عدد من الأيام

- يمكن استخدام متغيّر لحمل عدد الطيور الزائرة.
- يمكن تكرار المرور على المصفوفة باستخدام [`for` حلقة][for-statement].
- يمكن تحديث المتغيّر داخل الحلقة.
- تذكّر: تُفهرَس المصفوفات بدءًا من `0`.

## 6. احسب عدد الأيام المزدحمة

- يمكن استخدام متغيّر لحمل عدد الأيام المزدحمة.
- يمكن تكرار المرور على المصفوفة باستخدام [`foreach` حلقة][array-foreach].
- يمكن تحديث المتغيّر داخل الحلقة.
- يمكن استخدام [جملة شرطية][if-statement] داخل الحلقة.

[array-foreach]: https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/arrays/using-foreach-with-arrays
[single-dimensional-arrays]: https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/arrays/single-dimensional-arrays
[fields]: https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/fields
[static-members]: https://www.oreilly.com/library/view/programming-c/0596001177/ch04s03.html
[array-indexof]: https://docs.microsoft.com/en-us/dotnet/api/system.array.indexof
[if-statement]: https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/if-else
[array-length]: https://docs.microsoft.com/en-us/dotnet/api/system.array.length
[for-statement]: https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/for
