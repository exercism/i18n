# راهنمایی‌ها

## کلی

- [آموزش کار با تاریخ و زمان از csharp.net][csharp.net-datetimes-working-with-datetimes-time]

## 1. تجزیه‌ی تاریخ نوبت

- کلاس `DateTime` چندین متد برای [تجزیه][docs.microsoft.com_parsing-date] یک `string` به `DateTime` دارد.

## 2. بررسی این که نوبت گذشته است یا نه

- اشیای `DateTime` را می‌توان با [عملگرهای مقایسه][docs.microsoft.com_datetime-operators] پیش‌فرض مقایسه کرد.
- یک [ویژگی][docs.microsoft.com_datetime-properties] برای گرفتن تاریخ و زمان جاری وجود دارد.

## 3. بررسی این که نوبت بعدازظهر است یا نه

- دسترسی به بخش زمان یک شیء `DateTime` را می‌توان از طریق یکی از [ویژگی‌ها][docs.microsoft.com_datetime-properties]ی آن انجام داد.

## 4. توصیف زمان و تاریخ نوبت

- تست‌ها طوری اجرا می‌شوند که گویی روی ماشینی در ایالات متحده اجرا می‌شوند؛ یعنی هنگام تبدیل یک `DateTime` به `string`، تاریخ و زمان در قالب آمریکایی برگردانده می‌شود.
- هنگام تبدیل یک نمونه‌ی `DateTime` به `string`، می‌توانید از یک [رشته‌ی قالب استاندارد][docs.microsoft.com_standard-date-and-time-format-strings] یا یک [رشته‌ی قالب سفارشی][docs.microsoft.com_custom-date-and-time-format-strings] استفاده کنید.

## 5. برگرداندن تاریخ سالگرد

- از یکی از [سازنده‌ها][constructors]ی گوناگون `DateTime` برای ساختن یک نمونه‌ی جدید `DateTime` استفاده کنید.
- می‌توانید از یکی از [ویژگی‌ها][docs.microsoft.com_datetime-properties]ی تاریخ و زمان جاری برای گرفتن سال جاری استفاده کنید.

[docs.microsoft.com_parsing-date]: https://docs.microsoft.com/en-us/dotnet/standard/base-types/parsing-datetime
[docs.microsoft.com_datetime-operators]: https://docs.microsoft.com/en-us/dotnet/api/system.datetime
[docs.microsoft.com_datetime-properties]: https://docs.microsoft.com/en-us/dotnet/api/system.datetime
[docs.microsoft.com_standard-date-and-time-format-strings]: https://docs.microsoft.com/en-us/dotnet/standard/base-types/standard-date-and-time-format-strings
[docs.microsoft.com_custom-date-and-time-format-strings]: https://docs.microsoft.com/en-us/dotnet/standard/base-types/custom-date-and-time-format-strings
[csharp.net-datetimes-working-with-datetimes-time]: https://csharp.net-tutorials.com/data-types/working-with-dates-time//
[constructors]: https://docs.microsoft.com/en-us/dotnet/api/system.datetime
