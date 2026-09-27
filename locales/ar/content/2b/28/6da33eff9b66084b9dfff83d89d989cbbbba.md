# تلميحات

## 1. استبدال أي مسافات تصادفها بشرطات سفلية

- [هذا الدرس التعليمي][chars-tutorial] مفيد.
- [الوثائق المرجعية][chars-docs] لمحارف `char` موجودة هنا.
- يمكنك استرداد محارف `char` من سلسلة نصية بالطريقة نفسها التي تسترد بها العناصر من مصفوفة.
- ينبغي أن تستخدم [`StringBuilder`][string-builder] لبناء السلسلة النصية الناتجة.
- راجع [هذه الطريقة][iswhitespace] للكشف عن المسافات. تذكّر أنها طريقة ثابتة.
- تُحاط قيم `char` الحرفية بعلامات اقتباس مفردة.

## 2. استبدال محارف التحكم بالسلسلة "CTRL" المكتوبة بحروف كبيرة

- راجع [هذه الطريقة][iscontrol] للتحقق مما إذا كان المحرف محرف تحكم.

## 3. تحويل حالة الكباب إلى حالة الجمل

- راجع [هذه الطريقة][toupper] لتحويل المحرف إلى حرف كبير.

## 4. حذف الحروف اليونانية الصغيرة

- تدعم محارف `char` عاملي التساوي والمقارنة الافتراضيين.

[chars-docs]: https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/char
[chars-tutorial]: https://csharp.net-tutorials.com/data-types/the-char-type/
[string-builder]: https://docs.microsoft.com/en-us/dotnet/api/system.text.stringbuilder
[iswhitespace]: https://docs.microsoft.com/en-us/dotnet/api/system.char.iswhitespace
[iscontrol]: https://docs.microsoft.com/en-us/dotnet/api/system.char.iscontrol
[toupper]: https://docs.microsoft.com/en-us/dotnet/api/system.char.toupper
[equality]: https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/operators/equality-operators
[comparison]: https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/operators/comparison-operators
