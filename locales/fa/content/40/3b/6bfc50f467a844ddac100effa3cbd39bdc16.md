# قالب‌بندی رشته

نوع داخلی `str` در Python را می‌توان با دو روش قدرتمند قالب‌بندی رشته مقداردهی اولیه کرد: `f-strings` و `str.format()`. درج رشته‌ای با `f'{variable}'` ترجیح داده می‌شود، چون ماژولی خوانا، کامل و بسیار سریع است. وقتی به رویکردی مناسب بومی‌سازی یا انعطاف‌پذیرتر نیاز باشد، `str.format()` امکان ساختن تقریباً همه‌ی دیگر گونه‌های `str` را که ممکن است لازم داشته باشید فراهم می‌کند.

# درج رشته‌ای تحت‌اللفظی. f-string

درج رشته‌ای تحت‌اللفظی روشی است برای قالب‌بندی و ارزیابی سریع و کارآمد عبارت‌ها به `str` با استفاده از پیشوند `f` و آکولاد `{object}`. می‌توان از آن با همه‌ی انواع محصورکننده‌ی رشته استفاده کرد: کوتیشن تک `'`، کوتیشن دوگانه `"` و برای چندخطی نوشتن و فرار دادن، کوتیشن‌های سه‌گانه `'''` یا `"""`.

در این مثال پایه از **f-string**، متغیر `name` در ابتدای رشته نمایش داده می‌شود و متغیر `age` از نوع `int` به `str` تبدیل و بعد از `' is '` نمایش داده می‌شود.

```python
>>> name, age = 'Artemis', 21
>>> f'{name} is {age} years old.'
'Artemis is 21 years old.'
```

عبارت‌هایی که یک `f-string` ارزیابی می‌کند تقریباً هر چیزی می‌توانند باشند، بنابراین همان هشدارهای همیشگی درباره‌ی پاک‌سازی ورودی در اینجا هم برقرار است. برخی از مقدارهای متعددی که می‌توان ارزیابی کرد: `str`، عددها، متغیرها، عبارت‌های حسابی، عبارت‌های شرطی، نوع‌های داخلی، برش‌ها، توابع یا هر شیئی که یکی از متدهای `__str__` یا `__repr__` در آن تعریف شده باشد. چند مثال:

```python
>>> waves = {'water': 1, 'light': 3, 'sound': 5}

>>> f'"A dict can be represented with f-string: {waves}."'
'"A dict can be represented with f-string: {\'water\': 1, \'light\': 3, \'sound\': 5}."'

>>> f'Tenfold the value of "light" is {waves["light"]*10}.'
'Tenfold the value of "light" is 30.'
```

خروجی f-string همان سازوکارهای کنترلی مانند _عرض_، _ترازبندی_ و _دقت_ را پشتیبانی می‌کند که برای `.format()` توضیح داده شده‌اند. درج رشته‌ای را نمی‌توان همراه با API مربوط به GNU gettext برای بومی‌سازی (I18N) و محلی‌سازی (L10N) به کار برد؛ به جای آن باید از `str.format()` استفاده کرد.

# متد str.format()

`str.format()` امکان جایگزینی جانگهدارهای داخل متن را فراهم می‌کند. جانگهدارها با نمایه‌های نام‌دار `{price}` یا نمایه‌های شماره‌دار `{0}` یا جانگهدارهای خالی `{}` مشخص می‌شوند. مقدارهای آن‌ها به صورت پارامتر در متد `str.format()` تعیین می‌شوند. مثال:

```python
>>> 'My text: {placeholder1} and {}.'.format(12, placeholder1='value1')
'My text: value1 and 12.'
```

`format()` در Python از طیف کاملی از [مشخص‌کننده‌های زبان کوچک][format-mini-language] پشتیبانی می‌کند که می‌توان برای تراز کردن متن، تبدیل و موارد دیگر از آن‌ها استفاده کرد.

مشخص‌کننده‌ی قالب‌بندی پیچیده `{[<name>][!<conversion>][:<format_specifier>]}` است:

- `<name>` می‌تواند یک جانگهدار نام‌دار، یک عدد یا خالی باشد.
- `!<conversion>` اختیاری است و باید یکی از این سه باشد: `!s` برای [`str()`][str-conversion]، `!r` برای [`repr()`][repr-conversion] یا `!a` برای [`ascii()`][ascii-conversion]. به طور پیش‌فرض از `str()` استفاده می‌شود.
- `:<format_specifier>` اختیاری است و گزینه‌های زیادی دارد که [اینجا فهرست شده‌اند][format-specifiers].

مثالی از تبدیل‌ها برای یک حرف ascii دارای علامت تلفظ:

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

مثالی از مشخص‌کننده‌های قالب‌بندی، [مثال‌های بیشتر در پایان این صفحه][summary-string-format]:

```python
>>> "The number {0:d} has a representation in binary: '{0: >8b}'.".format(42)
"The number 42 has a representation in binary: '  101010'."
```

`str.format()` باید همراه با [API مربوط به GNU gettext][gnu-gettext-api] برای بومی‌سازی (I18N) و محلی‌سازی (L10N) استفاده شود.

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
