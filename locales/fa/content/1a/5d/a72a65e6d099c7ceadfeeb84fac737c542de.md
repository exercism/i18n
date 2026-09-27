# راهنمایی‌ها

## کلی

- شمارش پرندگان در هر روز در یک [فیلد][fields] به اسم `birdsPerDay` ذخیره می‌شود.
- شمارش پرندگان در هر روز یک آرایه است که دقیقاً ۷ عدد صحیح در خود دارد.

## 1. بررسی کنید شمارش هفته‌ی گذشته چه بوده است

- چون این متد به شمارش هفته‌ی جاری وابسته _نیست_، به‌صورت یک [متد `static`][static-members] تعریف شده است.
- [راه‌های مختلفی برای تعریف یک آرایه][single-dimensional-arrays] وجود دارد.

## 2. بررسی کنید امروز چند پرنده آمده است

- یادتان باشد که شمارش‌ها بر اساس روز، از قدیمی‌ترین تا جدیدترین مرتب شده‌اند و آخرین عنصر نشان‌دهنده‌ی امروز است.
- دسترسی به آخرین عنصر یا با استفاده از اندیس (ثابت) آن انجام می‌شود (یادتان باشد شمارش را از صفر شروع کنید) یا با محاسبه‌ی اندیسش از روی [اندازه‌ی آرایه][array-length].

## 3. شمارش امروز را یک واحد افزایش دهید

- عنصری را که نشان‌دهنده‌ی شمارش امروز است، برابر با شمارش امروز به‌علاوه‌ی ۱ قرار دهید.

## 4. بررسی کنید آیا روزی بوده که هیچ پرنده‌ای نیامده است

- کلاس `Array` یک [متد توکار][array-indexof] دارد که نخستین اندیسی را که عنصر در آن پیدا می‌شود برمی‌گرداند، یا اگر عنصر منطبقی پیدا نشد، منفی ۱.

## 5. محاسبه‌ی تعداد پرندگانی که در چند روز نخست آمده‌اند

- می‌توان از یک متغیر برای نگه‌داشتن تعداد پرندگان آمده استفاده کرد.
- می‌توان با استفاده از یک [حلقه‌ی `for`][for-statement] روی آرایه پیمایش کرد.
- متغیر را می‌توان داخل حلقه به‌روزرسانی کرد.
- یادتان باشد: اندیس‌گذاری آرایه‌ها از `0` شروع می‌شود.

## 6. محاسبه‌ی تعداد روزهای پرمشغله

- می‌توان از یک متغیر برای نگه‌داشتن تعداد روزهای پرمشغله استفاده کرد.
- می‌توان با استفاده از یک [حلقه‌ی `foreach`][array-foreach] روی آرایه پیمایش کرد.
- متغیر را می‌توان داخل حلقه به‌روزرسانی کرد.
- می‌توان داخل حلقه از یک [دستور شرطی][if-statement] استفاده کرد.

[array-foreach]: https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/arrays/using-foreach-with-arrays
[single-dimensional-arrays]: https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/arrays/single-dimensional-arrays
[fields]: https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/fields
[static-members]: https://www.oreilly.com/library/view/programming-c/0596001177/ch04s03.html
[array-indexof]: https://docs.microsoft.com/en-us/dotnet/api/system.array.indexof
[if-statement]: https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/if-else
[array-length]: https://docs.microsoft.com/en-us/dotnet/api/system.array.length
[for-statement]: https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/for
