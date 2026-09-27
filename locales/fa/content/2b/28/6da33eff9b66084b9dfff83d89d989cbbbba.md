# راهنمایی‌ها

## 1. هر فاصله‌ای را که به آن برخوردید با زیرخط جایگزین کنید

- [این آموزش][chars-tutorial] مفید است.
- [مستندات مرجع][chars-docs] مربوط به `char`ها اینجاست.
- می‌توانید `char`ها را از یک رشته، درست مانند عناصر یک آرایه، به دست آورید.
- برای ساختن رشته‌ی خروجی باید از [`StringBuilder`][string-builder] استفاده کنید.
- برای تشخیص فاصله‌ها [این متد][iswhitespace] را ببینید. یادتان باشد که این یک متد استاتیک است.
- لیترال‌های `char` بین دو نقل‌قول تکی قرار می‌گیرند.

## 2. کاراکترهای کنترلی را با رشته‌ی «CTRL»، که با حروف بزرگ نوشته می‌شود، جایگزین کنید

- برای بررسی کنترلی بودن یک کاراکتر، [این متد][iscontrol] را ببینید.

## 3. نگارش kebab-case را به نگارش camelCase تبدیل کنید

- برای تبدیل یک کاراکتر به حروف بزرگ، [این متد][toupper] را ببینید.

## 4. حروف کوچک یونانی را حذف کنید

- `char`ها از عملگرهای پیش‌فرض برابری و مقایسه پشتیبانی می‌کنند.

[chars-docs]: https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/char
[chars-tutorial]: https://csharp.net-tutorials.com/data-types/the-char-type/
[string-builder]: https://docs.microsoft.com/en-us/dotnet/api/system.text.stringbuilder
[iswhitespace]: https://docs.microsoft.com/en-us/dotnet/api/system.char.iswhitespace
[iscontrol]: https://docs.microsoft.com/en-us/dotnet/api/system.char.iscontrol
[toupper]: https://docs.microsoft.com/en-us/dotnet/api/system.char.toupper
[equality]: https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/operators/equality-operators
[comparison]: https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/operators/comparison-operators
