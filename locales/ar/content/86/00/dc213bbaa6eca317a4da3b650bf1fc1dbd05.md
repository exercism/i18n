# تلميحات

## عام

استخدم فقط `f-strings` أو الطريقة `format()` لبناء منشور يحتوي على معلومات أساسية عن حدث.

- [مقدمة إلى تنسيق السلاسل النصية في Python][str-f-strings-docs]
- [مقال على realpython.com][realpython-article]

## 1. اجعل الحرف الأول من العنوان كبيرًا

- اجعل الحرف الأول من العنوان كبيرًا باستخدام الطريقة `capitalize` من `str`.

## 2. تنسيق التاريخ

- يجب تنسيق `date` يدويًا باستخدام `f''` أو `''.format()`.
- يجب أن يستخدم `date` هذا التنسيق: 'Month day, year'.

## 3. اعرض محارف يونيكود كأيقونات

- إحدى طرق العرض باستخدام `format` هي استخدام بادئة يونيكود `u'{}'`.

## 4. اعرض المنشور النهائي

- ابحث عن [حقل format_spec][formatspec-docs] المناسب لمحاذاة النجوم والمحارف.
- القسم 1 هو `header` كسلسلة نصية يبدأ حرفها الأول كبيرًا.
- القسم 2 هو `date`.
- القسم 3 هو قائمة الفنانين، وكل فنان مرتبط بمحرف يونيكود يحمل الفهرس نفسه.
- يجب أن يحتوي كل سطر على 20 محرفًا.
- اكتب كودًا موجزًا لإضافة الأسطر الفارغة اللازمة بين كل قسم.
- إذا لم يُعطَ التاريخ، استبدله بسطر فارغ.

```python
******************** # 20 asterisks
*                  *
*     'Header'     * # capitalized header
*                  *
* Month day, year  * # Optional date
*                  *
* Artist1       ⑴ * # Artist list from 1 to 4
* Artist2       ⑵ *
* Artist3       ⑶ *
* Artist4       ⑷ *
*                  *
********************
```

[str-f-strings-docs]: https://docs.python.org/3/reference/lexical_analysis.html#f-strings
[realpython-article]: https://realpython.com/python-formatted-output/
[formatspec-docs]: https://docs.python.org/3/library/string.html#formatspec
