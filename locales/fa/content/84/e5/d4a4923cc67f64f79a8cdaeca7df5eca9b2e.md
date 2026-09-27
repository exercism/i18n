# پیوست دستورالعمل‌ها

## توضیح DSL

یک گراف، در این DSL، شیئی از نوع `Graph` است. این یک `list` از یک یا چند تاپل می‌گیرد که موارد زیر را توصیف می‌کنند:

+ ویژگی
+ `Nodes`
+ `Edges`

پیاده‌سازی‌های `Node` و `Edge` در `dot_dsl.py` ارائه شده‌اند.

برای جزئیات بیشتر درباره‌ی طراحی مورد انتظار DSL و انواع و پیام‌های خطای مورد انتظار، نگاهی به موارد تست در `dot_dsl_test.py` بیندازید


## پیام‌های استثنا

گاهی لازم است [یک استثنا ایجاد کنید](https://docs.python.org/3/tutorial/errors.html#raising-exceptions). وقتی این کار را می‌کنید، باید همیشه یک **پیام خطای گویا** بگنجانید که نشان دهد منبع خطا چیست. این کار کد شما را خواناتر می‌کند و به شکل چشمگیری به اشکال‌زدایی کمک می‌کند. در موقعیت‌هایی که می‌دانید منبع خطا از یک نوع مشخص خواهد بود، می‌توانید یکی از [انواع خطای توکار](https://docs.python.org/3/library/exceptions.html#base-classes) را ایجاد کنید، اما همچنان باید پیامی گویا بگنجانید.

این تمرین به‌طور خاص می‌خواهد که از [دستور raise](https://docs.python.org/3/reference/simple_stmts.html#the-raise-statement) استفاده کنید تا وقتی `Graph` بدشکل است، یک `TypeError` «پرتاب» کنید و وقتی `Edge`، `Node` یا `attribute` بدشکل است، یک `ValueError` پرتاب کنید. تست‌ها تنها در صورتی قبول می‌شوند که هم `exception` را `raise` کنید و هم پیامی همراه آن بگنجانید.

برای اینکه خطایی همراه با پیام ایجاد کنید، پیام را به‌عنوان آرگومان به نوع `exception` بدهید:

```python
# Graph is malformed
raise TypeError("Graph data malformed")

# Edge has incorrect values
raise ValueError("EDGE malformed")
```
