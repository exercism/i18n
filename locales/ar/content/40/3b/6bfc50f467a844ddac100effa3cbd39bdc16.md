# تنسيق السلاسل النصية

يمكن تهيئة النوع المدمج `str` في Python باستخدام طريقتين قويتين لتنسيق السلاسل النصية: `f-strings` و `str.format()`. ويُفضَّل استيفاء السلاسل النصية باستخدام `f'{variable}'` لأنه سهل القراءة ومكتمل وسريع جدًا. وعند الحاجة إلى أسلوب ملائم للتدويل أو أكثر مرونة، يتيح لك `str.format()` إنشاء كل تنويعات `str` الأخرى التي قد تحتاجها تقريبًا.

# الاستيفاء الحرفي للسلاسل النصية. f-string

الاستيفاء الحرفي للسلاسل النصية طريقة سريعة وفعّالة لتنسيق التعبيرات وتقييمها وتحويلها إلى `str` باستخدام البادئة `f` والأقواس المعقوفة `{object}`. ويمكن استخدامه مع جميع أنواع علامات الاقتباس المحيطة: علامة الاقتباس المفردة `'`، وعلامة الاقتباس المزدوجة `"`، وكذلك مع الأسطر المتعددة والهروب بعلامات الاقتباس الثلاثية `'''` أو `"""`.

في هذا المثال الأساسي لـ **f-string**، يُعرض المتغير `name` في بداية السلسلة النصية، ويُحوَّل المتغير `age` من النوع `int` إلى `str` ويُعرض بعد `' is '`.

```python
>>> name, age = 'Artemis', 21
>>> f'{name} is {age} years old.'
'Artemis is 21 years old.'
```

يمكن أن تكون التعبيرات التي يقيّمها `f-string` أي شيء تقريبًا، ولذلك تنطبق التحذيرات المعتادة بشأن تعقيم المدخلات. ومن بين القيم الكثيرة التي يمكن تقييمها: `str` والأعداد والمتغيرات والتعبيرات الحسابية والتعبيرات الشرطية والأنواع المدمجة والشرائح والدوال، أو أي كائنات معرَّف لها الطريقتان `__str__` أو `__repr__`. وإليك بعض الأمثلة:

```python
>>> waves = {'water': 1, 'light': 3, 'sound': 5}

>>> f'"A dict can be represented with f-string: {waves}."'
'"A dict can be represented with f-string: {\'water\': 1, \'light\': 3, \'sound\': 5}."'

>>> f'Tenfold the value of "light" is {waves["light"]*10}.'
'Tenfold the value of "light" is 30.'
```

تدعم مخرجات f-string آليات التحكم نفسها، مثل _العرض_ و_المحاذاة_ و_الدقة_، الموصوفة في `.format()`. ولا يمكن استخدام استيفاء السلاسل النصية مع واجهة GNU gettext API الخاصة بالتدويل (I18N) والتوطين (L10N)، بل يلزم استخدام `str.format()` بدلًا من ذلك.

# طريقة `str.format()`

يتيح `str.format()` استبدال العناصر النائبة داخل النص. وتُحدَّد العناصر النائبة بفهارس مسمّاة `{price}` أو فهارس مرقمة `{0}` أو عناصر نائبة فارغة `{}`. وتُحدَّد قيمها كمعاملات في طريقة `str.format()`. مثال:

```python
>>> 'My text: {placeholder1} and {}.'.format(12, placeholder1='value1')
'My text: value1 and 12.'
```

يدعم `.format()` في Python مجموعة كاملة من [مواصفات اللغة المصغّرة][format-mini-language] التي يمكن استخدامها لمحاذاة النص وتحويله وغير ذلك.

مواصفة التنسيق المركبة هي `{[<name>][!<conversion>][:<format_specifier>]}`:

- يمكن أن يكون `<name>` عنصرًا نائبًا مسمّى أو رقمًا أو فارغًا.
- `!<conversion>` اختياري ويجب أن يكون واحدًا من الثلاثة: `!s` لـ [`str()`][str-conversion]، أو `!r` لـ [`repr()`][repr-conversion]، أو `!a` لـ [`ascii()`][ascii-conversion]. ويُستخدم `str()` افتراضيًا.
- `:<format_specifier>` اختياري وله خيارات كثيرة [مدرجة هنا][format-specifiers].

مثال على التحويلات لحرف ascii يحمل علامة تشكيل:

```python
>>> '{0!s}'.format('ë')
'ë'
>>> '{0!r}'.format('ë')
"'ë'"
>>> '{0!a}'.format('ë')
"'\\xeb'"

>>> 'She said her name is not {} but {!r}.'.format('Anna', 'Zoë')
"She said her name is not Anna but 'Zoë'."
```

مثال على مواصفات التنسيق، و[مزيد من الأمثلة في نهاية هذه الصفحة][summary-string-format]:

```python
>>> "The number {0:d} has a representation in binary: '{0: >8b}'.".format(42)
"The number 42 has a representation in binary: '  101010'."
```

ينبغي استخدام `str.format()` مع [واجهة GNU gettext API][gnu-gettext-api] للتدويل (I18N) والتوطين (L10N).

[all-about-formatting]: https://realpython.com/python-formatted-output
[difference-formatting]: https://realpython.com/python-string-formatting/#2-new-style-string-formatting-strformat
[printf-style-docs]: https://docs.python.org/3/library/stdtypes.html#printf-style-string-formatting
[tuples]: https://www.w3schools.com/python/python_tuples.asp
[format-mini-language]: https://docs.python.org/3/library/string.html#format-specification-mini-language
[str-conversion]: https://www.w3resource.com/python/built-in-function/str.php
[repr-conversion]: https://www.w3resource.com/python/built-in-function/repr.php
[ascii-conversion]: https://www.w3resource.com/python/built-in-function/ascii.php
[format-specifiers]: https://www.python.org/dev/peps/pep-3101/#standard-format-specifiers
[summary-string-format]: https://www.w3schools.com/python/ref_string_format.asp
[template-string]: https://docs.python.org/3/library/string.html#template-strings
[gnu-gettext-api]: https://docs.python.org/3/library/gettext.html
