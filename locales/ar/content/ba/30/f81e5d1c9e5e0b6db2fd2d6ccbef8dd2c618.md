# تلميحات

## عام

- الحروف في Factor هي أعداد صحيحة (نقاط ترميز Unicode)، لذا تعمل العوامل الرقمية `<` و`>` و`=` مباشرة.
- توجد الدوال المنطقية وتحويل حالة الأحرف في [`unicode`][unicode].
- يجب تعريف الرموز التي تُرجعها (`less`، `big`، `alpha`، ...) قبل استخدامها؛ اجمعها معًا باستخدام `SYMBOLS: ... ;`.

## 1. مقارنة حرفين

- استخدم `<` و`>` من [`math`][math].
- غلّف الحالات الثلاث باستخدام `cond` من [`combinators`][combinators].

## 2. تحديد الحجم

- `LETTER?` هي الدالة المنطقية للأحرف الكبيرة، و`letter?` الدالة المنطقية للأحرف الصغيرة.

## 3. تغيير الحجم

- `ch>upper` و`ch>lower` هما دالتا التحويل لكل حرف على حدة (توجد أيضًا `>upper` و`>lower` على مستوى السلسلة النصية، لكن ما لديك هنا حرف واحد).

## 4. تحديد النوع

- الترتيب مهم في `cond`. إن الرمز `Letter?` يطابق الأحرف الكبيرة *أو* الصغيرة، لذا يجب أن يُنفَّذ قبل أي فحص خاص بحالة الأحرف.

[unicode]: https://docs.factorcode.org/content/vocab-unicode.html
[math]: https://docs.factorcode.org/content/vocab-math.html
[combinators]: https://docs.factorcode.org/content/vocab-combinators.html
