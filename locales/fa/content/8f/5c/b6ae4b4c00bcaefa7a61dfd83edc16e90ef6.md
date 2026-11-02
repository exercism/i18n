# راهنمایی‌ها

## کلی

- کلاس [`TemporalAdjusters`][temporaladjusters-docs] (دقت کنید که جمع است) مجموعه‌ای از متدهای ایستا است که تنظیم‌کننده‌های آماده برمی‌گرداند.
- یک تنظیم‌کننده با متد [`with()`][localdate-with] روی یک `LocalDate` اعمال می‌شود؛ این متد یک `LocalDate` تازه برمی‌گرداند و تاریخ اصلی را بدون تغییر می‌گذارد.
- برای تنظیم «درون یک ماه»، از هر تاریخی در آن ماه شروع کنید، مثلاً از اولین روزش: `LocalDate.of(year, month, 1)`.

## 1. یافتن نوبت ثابت یک مشتری همیشگی

- تنظیم‌کننده‌ای هست که nاُمین تکرار یک روز از هفته را در ماهِ تاریخی که روی آن اعمال می‌شود پیدا می‌کند.

## 2. یافتن نوبت آخر ماه یک مشتری همیشگی

- تنظیم‌کننده‌ای هست که آخرین تکرار یک روز از هفته را در ماهِ تاریخی که روی آن اعمال می‌شود پیدا می‌کند.

## 3. یافتن نزدیک‌ترین روز آزاد برای یک مشتری سرزده

- دو تنظیم‌کننده هست که به یک روز مشخص از هفته جلو می‌روند: یکی همیشه به تاریخی دیرتر می‌رود و [دیگری][nextorsame-docs] اگر تاریخ از قبل با آن روز هم‌خوانی داشته باشد، همان را نگه می‌دارد.

## 4. یافتن روز حسابداری

- تنظیم‌کننده‌ای هست که به آخرین روز ماه می‌رود.
- یک `LocalDate` می‌تواند [روز هفته][localdate-getdayofweek] خودش را به شما بگوید.
- وقتی آخرین روز ماه روی تعطیلات آخر هفته می‌افتد، تنظیم‌کننده‌ای هست که به [تکرار قبلی][previous-docs] یک روز از هفته برمی‌گردد.

## 5. استفاده‌ی دوباره از قاعده‌ی آخر هفته برای روز حقوق

- [`TemporalAdjuster`][temporaladjuster-docs] یک اینترفیس تابعی با یک متد به اسم `adjustInto()` است، پس می‌توان آن را با یک لامبدا پیاده‌سازی کرد.
- درون لامبدا، [`DayOfWeek.from()`][dayofweek-from] روز هفته‌ی مقدار زمانی‌ای را که تنظیم می‌شود برمی‌گرداند.
- تنظیم‌کننده‌ها را می‌توان زنجیره کرد: نتیجه‌ی اعمال یک تنظیم‌کننده یک مقدار زمانی است که می‌توان تنظیم‌کننده‌ی دیگری را روی آن اعمال کرد.

[temporaladjusters-docs]: https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/time/temporal/TemporalAdjusters.html
[temporaladjuster-docs]: https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/time/temporal/TemporalAdjuster.html
[localdate-with]: https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/time/LocalDate.html#with(java.time.temporal.TemporalAdjuster)
[localdate-getdayofweek]: https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/time/LocalDate.html#getDayOfWeek()
[dayofweek-from]: https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/time/DayOfWeek.html#from(java.time.temporal.TemporalAccessor)
[dayofweekinmonth-docs]: https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/time/temporal/TemporalAdjusters.html#dayOfWeekInMonth(int,java.time.DayOfWeek)
[lastinmonth-docs]: https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/time/temporal/TemporalAdjusters.html#lastInMonth(java.time.DayOfWeek)
[nextorsame-docs]: https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/time/temporal/TemporalAdjusters.html#nextOrSame(java.time.DayOfWeek)
[lastdayofmonth-docs]: https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/time/temporal/TemporalAdjusters.html#lastDayOfMonth()
[previous-docs]: https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/time/temporal/TemporalAdjusters.html#previous(java.time.DayOfWeek)
