# پیوست دستورالعمل‌ها

## پیام‌های استثنا

گاهی لازم است یک [استثنا ایجاد کنید](https://docs.python.org/3/tutorial/errors.html#raising-exceptions). وقتی این کار را می‌کنید، همیشه باید یک **پیام خطای معنادار** بیاورید تا نشان دهید منبع خطا چیست. این کار خوانایی کد شما را بیشتر می‌کند و به دیباگ کردن کمک زیادی می‌کند. در موقعیت‌هایی که می‌دانید منبع خطا از یک نوع مشخص است، می‌توانید یکی از [انواع خطای داخلی](https://docs.python.org/3/library/exceptions.html#base-classes) را ایجاد کنید، اما در هر صورت باید پیام معناداری هم بیاورید.

این تمرین به‌طور خاص می‌خواهد که از [دستور raise](https://docs.python.org/3/reference/simple_stmts.html#the-raise-statement) استفاده کنید تا وقتی مقدار ورودی خانه خارج از محدوده است، یک `ValueError` را «پرتاب» کنید. تست‌ها تنها در صورتی موفق می‌شوند که هم `exception` را `raise` کنید و هم پیامی همراه آن بیاورید.

برای `raise` کردن یک `ValueError` همراه با پیام، پیام را به‌عنوان آرگومان به نوع `exception` بدهید:

```python
# when the square value is not in the acceptable range        
raise ValueError("square must be between 1 and 64")
```
