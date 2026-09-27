1.  با قراردادهایی که در [PEP 8][pep-8] مطرح شده‌اند آشنا شوید. گرچه این‌ها «قانون» نیستند، اما استانداردی هستند که خودِ پروژه‌ی Python از آن استفاده می‌کند و در بیشتر موقعیت‌های برنامه‌نویسی مبنای بسیار خوبی به شمار می‌روند.
2.  ایده‌هایی را که در [PEP 20 (معروف به «The Zen of Python»)][pep-20] مطرح شده‌اند بخوانید و درباره‌شان فکر کنید. مانند PEP 8، این‌ها هم «قانون» نیستند، اما اصول راهنمای محکمی برای code بهتر و خواناتر Python به شمار می‌روند.
3.  code روشن و آسان برای دنبال‌کردن را به کامنت‌ها ترجیح دهید. اما هر جا که برای شفافیت لازم است، حتماً کامنت بنویسید.
4.  به استفاده از type hint برای شفاف‌ترکردن code خود فکر کنید. [مستندات][type-hint-docs] type hint را بررسی کنید و ببینید [چرا ممکن است نخواهید از type hint استفاده کنید][type-hint-nos].
5.  سعی کنید از دستورالعمل‌های docstring که در [PEP 257][pep-257] آمده است پیروی کنید. مستندسازی خوب اهمیت دارد.
6.  از [اعداد جادویی][magic-numbers] بپرهیزید.
7.  در حلقه‌هایی که هم به اندیس و هم به عنصر نیاز دارند، [`enumerate()`][enumerate-docs] را به [`range(len())`][range-docs] ترجیح دهید.
8.  [comprehensionها][comprehensions] و [generator expressionها][generators] را به حلقه‌هایی که عنصری به یک ساختار داده اضافه می‌کنند ترجیح دهید. اما در استفاده از [comprehensionها][comprehension-overuse] زیاده‌روی نکنید.
9.  وقتی بیش از چند زیررشته را به هم می‌پیوندید یا در یک حلقه الحاق می‌کنید، [`str.join()`][join] را به سایر روش‌های الحاق رشته ترجیح دهید.
10.  با مجموعه‌ی غنی [توابع داخلی][built-in-functions] Python و [کتابخانه‌ی استاندارد][standard-lib] آن آشنا شوید. برای یک مرور کوتاه و چند نکته‌ی جالب [اینجا][standard-lib-overview] را ببینید.

[built-in-functions]: https://docs.python.org/3/library/functions.html
[comprehension-overuse]: https://treyhunner.com/2019/03/abusing-and-overusing-list-comprehensions-in-python/
[comprehensions]: https://treyhunner.com/2015/12/python-list-comprehensions-now-in-color/
[enumerate-docs]: https://docs.python.org/3/library/functions.html#enumerate
[generators]: https://www.pythonmorsels.com/how-write-generator-expression/
[join]: https://docs.python.org/3/library/stdtypes.html#str.join
[magic-numbers]: https://en.wikipedia.org/wiki/Magic_number_(programming)
[pep-20]: https://peps.python.org/pep-0020/
[pep-257]: https://peps.python.org/pep-0257/
[pep-8]: https://peps.python.org/pep-0008/
[range-docs]: https://docs.python.org/3/library/functions.html#func-range
[standard-lib-overview]: https://docs.python.org/3/tutorial/stdlib.html
[standard-lib]: https://docs.python.org/3/library/index.html
[type-hint-docs]: https://typing.python.org/en/latest/index.html
[type-hint-nos]: https://typing.python.org/en/latest/guides/typing_anti_pitch.html
