# تلميحات

## عام

- [درس تعليمي عن التواريخ والوقت من csharp.net][csharp.net-datetimes-working-with-datetimes-time]

## 1. تحليل تاريخ الموعد

- يحتوي الصنف `DateTime` على عدة طرق من أجل [تحليل][docs.microsoft.com_parsing-date] قيمة `string` إلى `DateTime`.

## 2. التحقق مما إذا كان الموعد قد مضى

- يمكن مقارنة كائنات `DateTime` باستخدام [عوامل المقارنة][docs.microsoft.com_datetime-operators] الافتراضية.
- توجد [خاصية][docs.microsoft.com_datetime-properties] لاسترداد التاريخ والوقت الحاليين.

## 3. التحقق مما إذا كان الموعد في فترة ما بعد الظهر

- يمكن الوصول إلى جزء الوقت في كائن `DateTime` من خلال إحدى [خصائصه][docs.microsoft.com_datetime-properties].

## 4. وصف وقت وتاريخ الموعد

- تعمل الاختبارات كما لو كانت تعمل على جهاز في الولايات المتحدة، مما يعني أن تحويل قيمة `DateTime` إلى `string` سيُرجع التواريخ والوقت بالتنسيق الأمريكي.
- عند تحويل نسخة من `DateTime` إلى `string`، يمكنك استخدام إما [سلسلة نصية قياسية للتنسيق][docs.microsoft.com_standard-date-and-time-format-strings] أو [سلسلة نصية مخصصة للتنسيق][docs.microsoft.com_custom-date-and-time-format-strings].

## 5. إرجاع تاريخ الذكرى السنوية

- استخدم أحد [مُنشئات][constructors] `DateTime` المتنوعة لإنشاء نسخة جديدة من `DateTime`.
- يمكنك استخدام إحدى [خصائص][docs.microsoft.com_datetime-properties] التاريخ والوقت الحاليين للحصول على السنة الحالية.

[docs.microsoft.com_parsing-date]: https://docs.microsoft.com/en-us/dotnet/standard/base-types/parsing-datetime
[docs.microsoft.com_datetime-operators]: https://docs.microsoft.com/en-us/dotnet/api/system.datetime
[docs.microsoft.com_datetime-properties]: https://docs.microsoft.com/en-us/dotnet/api/system.datetime
[docs.microsoft.com_standard-date-and-time-format-strings]: https://docs.microsoft.com/en-us/dotnet/standard/base-types/standard-date-and-time-format-strings
[docs.microsoft.com_custom-date-and-time-format-strings]: https://docs.microsoft.com/en-us/dotnet/standard/base-types/custom-date-and-time-format-strings
[csharp.net-datetimes-working-with-datetimes-time]: https://csharp.net-tutorials.com/data-types/working-with-dates-time//
[constructors]: https://docs.microsoft.com/en-us/dotnet/api/system.datetime
