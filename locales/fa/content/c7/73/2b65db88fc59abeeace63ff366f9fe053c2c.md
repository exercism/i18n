# راهنما

## کلی

- مفاهیم پیشین [ساختارها][structs]، [نقشه‌ها][maps] و [متدها][methods] اینجا به کار می‌آیند.


## 1. ردیابی شرکت‌کنندگان

- مفهوم [تعریف نوع][type definition] توضیح می‌دهد که چگونه یک نوع جدید تعریف کنیم.
- برای ساختن نمونه‌ی جدیدی از `map` از `make()` استفاده کنید.
- برای افزودن یک مقدار به نقشه، از `struct{}{}` استفاده کنید تا نمونه‌ای از `struct{}` خالی بسازید.

## 2. بررسی شرکت‌کنندگان

- اگر عنصری در نقشه باشد، مجموعه آن مقدار را در خود دارد.
- از [انتساب دو مقداری][two value assignment] می‌توان برای بررسی اینکه آیا نقشه عنصری را در خود دارد استفاده کرد.

## 3. مقایسه‌ی شرکت‌کنندگان

- دو مجموعه یکسان‌اند اگر همه‌ی مقدارهای هر مجموعه در مجموعه‌ی دیگر هم باشند.
- از `range` می‌توان برای بررسی همه‌ی عنصرهای مجموعه استفاده کرد.

[maps]: https://exercism.org/tracks/go/concepts/maps
[methods]: https://exercism.org/tracks/go/concepts/methods
[structs]: https://exercism.org/tracks/go/concepts/structs
[two value assignment]: https://go.dev/tour/moretypes/22
[type definition]: https://exercism.org/tracks/go/concepts/type-definitions
