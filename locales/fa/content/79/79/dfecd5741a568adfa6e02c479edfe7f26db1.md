# پیوست دستورالعمل‌ها


## این تمرین برای مسیر پایتون چگونه پیاده‌سازی شده است


تست‌های این تمرین انتظار دارند که ساعت شما در قالب یک `class` به اسم `Clock` پیاده‌سازی شود.
اگر با کلاس‌ها در پایتون آشنایی ندارید، [concept:python/classes]() و [classes][classes in python] (_از مستندات پایتون_) نقطه‌های خوبی برای شروع هستند.


## نمایش کلاس شما

وقتی با [objects][what-is-an-object] کار می‌کنید و آن‌ها را debug می‌کنید، داشتن نمایشی خوب از آن شیء مهم است.
برای مثال، اگر بخواهید یک شیء تازه‌ی [`datetime.datetime`][datetime] در محیط [REPL][REPL] پایتون بسازید، می‌توانید [نمایش رشته‌ای][str-rep-classes] آن را ببینید:


```python
>>> from datetime import datetime
>>> new_date = datetime(2022, 5, 4)
>>> new_date
datetime.datetime(2022, 5, 4, 0, 0)
```

کلاس `Clock` شما باید یک `object` سفارشی بسازد که زمان‌ها را _بدون_ تاریخ مدیریت می‌کند.
یکی از جنبه‌های مهم این `class` نحوه‌ی نمایش آن به شکل یک _رشته_ است.
برنامه‌نویسان دیگری که از `objects` ساخته‌شده از کلاس `Clock` استفاده می‌کنند یا آن‌ها را فراخوانی می‌کنند، برای debug و کارهای دیگر به همین نمایش رشته‌ای مراجعه می‌کنند.
با این حال، نمایش پیش‌فرض یک `class` سفارشی چندان کمک‌کننده نیست:


```python
>>> Clock(12, 34)
<Clock object st 0x102807b20 >
```

برای ساختن نمایشی کمک‌کننده‌تر، می‌توانید یک [متد ویژه][dunder-methods] [`__repr__`][repr-method] روی `class` تعریف کنید.

در حالت آرمانی، متد `__repr__` کد معتبری از پایتون برمی‌گرداند که وقتی به [`eval()`][eval-built-in] داده شود می‌توان با آن شیء را دوباره ساخت، همان‌طور که در [مشخصات یک متد `__repr__`][repr-docs] آمده است.
برگرداندن کد معتبر پایتون به برنامه‌نویس دیگری اجازه می‌دهد که `str` را مستقیم در کد یا در REPL کپی‌پیست کند.
یک `Clock` که ساعت ۱۱:۳۰ صبح را نمایش می‌دهد می‌تواند این‌گونه باشد:

```python
 `Clock(11, 30)`
```

تعریف یک متد `__repr__` برای همه‌ی کلاس‌های سفارشی روش خوبی است.
چند نکته‌ی دیگر هم هست که باید در نظر بگیرید:

- اطلاعاتی که این متد برمی‌گرداند باید هنگام debug کردن مشکلات مفید باشد.
- _در حالت آرمانی_، متد رشته‌ای برمی‌گرداند که کد معتبر پایتون است، هرچند همیشه ممکن نیست.
- اگر کد معتبر پایتون عملی نیست، برگرداندن یک توضیح میان دو علامت کوچک‌تر و بزرگ‌تر، یعنی `< ...a practical description... >`، روش مرسوم است.


### تبدیل رشته

علاوه بر متد `__repr__`، ممکن است به یک نمایش رشته‌ای جایگزین از `class` هم نیاز باشد که «خوانا برای انسان» باشد.
ممکن است از آن برای قالب‌بندی شیء در خروجی برنامه یا مستندات استفاده شود.
این کار با نوشتن یک متد ویژه‌ی [`__str__`][str-dunder] انجام می‌شود.
دوباره به `datetime.datetime` نگاه کنید:


```python
>>> str(datetime.datetime(2022, 5, 4))
'2022-05-04 00:00:00'
```

وقتی از یک شیء `datetime` خواسته می‌شود خودش را به یک نمایش رشته‌ای تبدیل کند، یک `str` برمی‌گرداند که بر اساس [استاندارد ISO 8601][ISO 8601] قالب‌بندی شده است و بیشتر کتابخانه‌های datetime می‌توانند آن را به تاریخ و زمانی خوانا برای انسان تبدیل کنند.

در این تمرین، فرصتی خواهید داشت که برای Clock خود یک متد `__str__` و همچنین یک متد `__repr__` بنویسید.

```python
>>> str(Clock(11, 30))
'11:30'
```

برای پشتیبانی از این تبدیل رشته، باید روی `class` خود یک متد ویژه‌ی `__str__` بسازید که رشته‌ای باز هم «خوانا برای انسان» و نشان‌دهنده‌ی زمان Clock را برگرداند.

اگر متد `__str__` نسازید و `str()` را روی کلاس خود فراخوانی کنید، پایتون به‌عنوان جایگزین تلاش می‌کند `__repr__` را روی کلاس شما فراخوانی کند.
بنابراین اگر فقط یکی از این دو متد ویژه را پیاده‌سازی می‌کنید، بهتر است `__repr__` را بسازید نه فقط `__str__` را.


[ISO 8601]: https://www.iso.org/iso-8601-date-and-time-format.html
[REPL]: https://pythonprogramminglanguage.com/repl/
[classes in python]: https://docs.python.org/3/tutorial/classes.html
[datetime]: https://docs.python.org/3/library/datetime.html#available-types
[dunder-methods]: https://www.pythonmorsels.com/every-dunder-method/
[eval-built-in]: https://docs.python.org/3/library/functions.html#eval
[repr-docs]: https://docs.python.org/3/reference/datamodel.html#object.__repr__
[repr-method]: https://docs.python.org/3/library/functions.html#repr
[str-dunder]: https://docs.python.org/3/reference/datamodel.html#object.__str__
[str-rep-classes]: https://www.digitalocean.com/community/tutorials/python-str-repr-functions#introduction
[what-is-an-object]: https://realpython.com/ref/glossary/object/
