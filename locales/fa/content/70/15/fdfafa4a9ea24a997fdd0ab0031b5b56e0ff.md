# درباره

پایتون مقادیر «درست» و «غلط» را با نوع [`bool`][bools] نمایش می‌دهد که زیرکلاسی از `int` است.
فقط دو مقدار «منطقی» در این نوع وجود دارد: `True` و `False`.
این مقادیر را می‌توان به یک متغیر نسبت داد و با [عملگرهای منطقی][boolean-operators] (`and`، `or`، `not`) ترکیب کرد:


```python
>>> true_variable = True and True
>>> false_variable = True and False

>>> true_variable = False or True
>>> false_variable = False or False

>>> true_variable = not False
>>> false_variable = not True
```

[عملگرهای منطقی][boolean-operators] از _ارزیابی اتصال‌کوتاه_ استفاده می‌کنند، یعنی عبارت سمت راست عملگر فقط در صورت نیاز ارزیابی می‌شود.

هر یک از این عملگرها اولویت متفاوتی دارند، به‌طوری که `not` پیش از `and` و `or` ارزیابی می‌شود.
می‌توان از پرانتزها استفاده کرد تا بخشی از عبارت پیش از بخش‌های دیگر ارزیابی شود:

```python
>>> not True and True
False

>>> not (True and False)
True
```

اولویت همه‌ی `boolean operators` پایین‌تر از [`comparison operators`][comparisons] پایتون در نظر گرفته می‌شود، مانند `==`، `>`، `<`، `is` و `is not`.


## تبدیل نوع و درستینمایی

تابع `bool` ([`bool()`][bool-function]) هر شیء را به یک مقدار منطقی تبدیل می‌کند.
به‌طور پیش‌فرض، همه‌ی اشیاء `True` برمی‌گردانند، مگر اینکه طوری تعریف شده باشند که `False` برگردانند.

چند مورد از `built-ins` طبق تعریف همیشه `False` در نظر گرفته می‌شوند:

- ثابت‌های `None` و `False`
- صفرِ هر _نوع عددی_ (`int`، `float`، `complex`، `decimal` یا `fraction`)
- _دنباله‌ها_ و _مجموعه‌های_ خالی (`str`، `list`، `set`، `tuple`، `dict`، `range(0)`)


```python
>>> bool(None)
False

>>> bool(1)
True

>>> bool(0)
False

>>> bool([1,2,3])
True

>>> bool([])
False

>>> bool({"Pig" : 1, "Cow": 3})
True

>>> bool({})
False
```

وقتی یک شیء در یک _زمینه‌ی منطقی_ به کار می‌رود، با استفاده از `bool()` به‌طور خودکار به عنوان _درستینما_ یا _غلط‌نما_ ارزیابی می‌شود:


```python
>>> a = "is this true?"
>>> b = []

# This will print "True", as a non-empty string is considered a "truthy" value
>>> if a:
...  print("True")

# This will print "False", as an empty list is considered a "falsey" value
>>> if not b:
...   print("False")
```


کلاس‌ها می‌توانند تعیین کنند که در موقعیت‌های درستینما چگونه ارزیابی شوند، به شرط اینکه متد `__bool__()` و/یا متد `__len__()` را بازنویسی و پیاده‌سازی کنند.


## نحوه‌ی کار مقادیر منطقی در پشت صحنه

نوع `bool` به عنوان _زیرنوعی_ از _int_ پیاده‌سازی شده است.
این یعنی `True` از نظر _عددی برابر_ با `1` است و `False` از نظر _عددی برابر_ با `0` است.
این موضوع هنگام مقایسه‌ی آن‌ها با یک _عملگر برابری_ دیده می‌شود:


```python
>>> 1 == True
True

>>> 0 == False
True
```

با این حال، `bools` **هنوز متفاوت‌اند** از `ints`، همان‌طور که هنگام مقایسه‌ی آن‌ها با _عملگر هویت_، `is`، مشخص می‌شود:


```python
>>> 1 is True
False

>>> 0 is False
False
```

> نکته: در پایتون نسخه‌ی ۳.۸ و بالاتر، استفاده از یک مقدار ثابت (مانند `1`، `''`، `[]` یا `{}`) در _سمت چپ_ `is` باعث ایجاد هشدار می‌شود.


استفاده از عملگر برابری برای مقایسه‌ی یک متغیر منطقی با `True` یا `False` یک [ضدالگوی پایتون][comparing to true in the wrong way] در نظر گرفته می‌شود.
در عوض، باید از عملگر هویت `is` استفاده کرد:


```python

>>> flag = True

# Not "Pythonic"
>>> if flag == True:
...    print("This works, but it's not considered Pythonic.")

# A better way
>>> if flag:
...    print("Pythonistas prefer this pattern as more Pythonic.")
```


[Boolean-operators]: https://docs.python.org/3/library/stdtypes.html#boolean-operations-and-or-not
[bool-function]: https://docs.python.org/3/library/functions.html#bool
[bools]: https://docs.python.org/3/library/stdtypes.html#typebool
[comparing to true in the wrong way]: https://docs.quantifiedcode.com/python-anti-patterns/readability/comparison_to_true.html
[comparisons]: https://docs.python.org/3/library/stdtypes.html#comparisons
