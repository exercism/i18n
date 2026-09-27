# راهنمایی‌ها

## کلی

برای ساختن برگه‌ای که اطلاعات پایه‌ی یک رویداد را در خود دارد، فقط از `f-string` یا متد `format()` استفاده کنید.

- [مقدمه‌ای بر قالب‌بندی رشته در Python][str-f-strings-docs]
- [مقاله در realpython.com][realpython-article]

## 1. سرصفحه را با حرف بزرگ بنویسید

- عنوان را با استفاده از متد `capitalize` روی `str` با حرف اول بزرگ بنویسید.

## 2. تاریخ را قالب‌بندی کنید

- `date` باید به‌صورت دستی با `f''` یا `''.format()` قالب‌بندی شود.
- `date` باید این قالب را داشته باشد: «ماه روز، سال».

## 3. نویسه‌های یونیکد را به‌صورت آیکون نمایش دهید

- یکی از راه‌های نمایش با `format` استفاده از پیشوند یونیکد `u'{}'` است.

## 4. برگه‌ی نهایی را نمایش دهید

- [فیلد format_spec][formatspec-docs] مناسب را برای تراز کردن ستاره‌ها و نویسه‌ها پیدا کنید.
- بخش ۱ همان `header` است، به‌صورت رشته‌ای که حرف اولش بزرگ شده است.
- بخش ۲ همان `date` است.
- بخش ۳ فهرست هنرمندان است؛ هر هنرمند با نویسه‌ی یونیکدی که همان اندیس را دارد مرتبط است.
- هر خط باید ۲۰ نویسه داشته باشد.
- کد مختصری بنویسید که خطوط خالی لازم را بین هر بخش اضافه کند.
- اگر تاریخ داده نشده باشد، آن را با یک خط خالی جایگزین کنید.

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
