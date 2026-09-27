# تلميحات

## عام

- اقرأ عن السلاسل النصية في [توثيق نوع السلسلة النصية][string-type-documentation] الرسمي.
- تصفّح [_دوال السلاسل النصية_ المتاحة][string-functions] لتكتشف العمليات المدمجة على السلاسل النصية.

## 1. الحصول على الحرف الأول من الاسم

- توجد [دالة مدمجة][string-substr] للحصول على الحرف الأول من سلسلة نصية.
- توجد عدة [دوال مدمجة][string-trim] لإزالة المسافات البيضاء من بداية سلسلة نصية أو نهايتها أو من البداية والنهاية معًا.

## 2. تنسيق الحرف الأول كحرف استهلالي

- توجد [دالة مدمجة][string-upcase] لتحويل جميع الأحرف في سلسلة نصية إلى صورتها الكبيرة.
- يوجد [عامل][concat-operator] يدمج سلسلتين نصيتين.

## 3. تقسيم الاسم الكامل إلى الاسم الأول واسم العائلة

- توجد [دالة مدمجة][string-explode] تقسّم سلسلة نصية بواسطة سلسلة نصية أخرى.
- يمكن إسناد العناصر الأولى القليلة من مصفوفة إلى متغيرات عبر مطابقة الأنماط على المصفوفة.

## 4. وضع الأحرف الاستهلالية داخل القلب

- يوجد تركيب خاص لـ[توسيع المتغيرات][string-variables] داخل سلسلة نصية.
- يوجد تركيب خاص لكتابة [السلاسل النصية متعددة الأسطر][heredoc-syntax] دون الحاجة إلى استخدام محارف الهروب للأسطر الجديدة.

[string-type-documentation]: https://www.php.net/manual/en/language.types.string.php
[string-functions]: https://www.php.net/manual/en/ref.strings.php 
[string-substr]: https://www.php.net/manual/en/function.substr.php 
[string-trim]: https://www.php.net/manual/en/function.trim.php 
[string-upcase]: https://www.php.net/manual/en/function.strtoupper.php
[string-explode]: https://www.php.net/manual/en/function.explode.php
[string-variables]: https://www.php.net/manual/en/language.types.string.php#language.types.string.parsing 
[concat-operator]: https://www.php.net/manual/en/language.operators.string.php
[heredoc-syntax]: https://www.php.net/manual/en/language.types.string.php#language.types.string.syntax.heredoc
