# ضمیمه‌ی دستورالعمل‌ها

## پیام‌های استثنا

گاهی لازم است [استثنا ایجاد کنید](https://docs.python.org/3/tutorial/errors.html#raising-exceptions). وقتی این کار را می‌کنید، باید همیشه یک **پیام خطای معنادار** هم بنویسید که نشان دهد منبع خطا چیست. این کار کد شما را خواناتر می‌کند و به اشکال‌زدایی کمک زیادی می‌کند. در موقعیت‌هایی که می‌دانید منبع خطا نوع مشخصی دارد، می‌توانید یکی از [انواع خطای داخلی](https://docs.python.org/3/library/exceptions.html#base-classes) را ایجاد کنید، اما باز هم باید پیام معناداری همراه آن بنویسید.

این تمرین خاص از شما می‌خواهد که با [دستور `raise`](https://docs.python.org/3/reference/simple_stmts.html#the-raise-statement) وقتی تابع `prime()` ورودی نامعتبری دریافت می‌کند، یک `ValueError` «پرتاب کنید». از آنجا که این تمرین فقط با اعداد _مثبت_ سر و کار دارد، هر عددی کمتر از ۱ نامعتبر است. تست‌ها تنها در صورتی قبول می‌شوند که هم `exception` را `raise` کنید و هم پیامی همراه آن بیاورید.

برای ایجاد یک `ValueError` همراه با پیام، پیام را به‌عنوان آرگومان به نوع `exception` بدهید:

```python
# when the prime function receives malformed input
raise ValueError('there is no zeroth prime')
```
