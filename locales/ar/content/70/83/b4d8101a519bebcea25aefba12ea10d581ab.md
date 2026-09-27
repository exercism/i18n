# تلميحات

## عام

- ستحتاج إلى [التعبيرات الشرطية][concept-conditionals] في هذه التمارين.

## 1. مقارنة المحارف

- يمكن مقارنة المحارف باستخدام دوال مثل `char-greaterp` و`char-lessp` و`char=`.

## 2. تحديد "حجم" المحرف

- لدى Common Lisp دالتان لتحديد ما إذا كان المحرف بحالة كبيرة أم بحالة صغيرة: `upper-case-p` و`lower-case-p`.
- قد لا يكون المحرف كبيرًا ولا صغيرًا.

## 3. تغيير "حجم" المحرف

- لدى Common Lisp دالتان لتغيير حالة المحرف: `char-upcase` و`char-downcase`.

## 4. تحديد "نوع" المحرف

- لدى Common Lisp دالة تحقق `alpha-char-p` لمعرفة ما إذا كان المحرف أبجديًا.
- لدى Common Lisp دالة تحقق `digit-char-p` لمعرفة ما إذا كان المحرف رقميًا.
- يمكنك استخدام `char=` لمعرفة ما إذا كان المحرفان متساويين.
- يُكتب محرف المسافة بالشكل #\Space في Common Lisp.
- يُكتب محرف السطر الجديد بالشكل #\Newline في Common Lisp.

[concept-conditionals]: /tracks/common-lisp/concepts/conditionals
