# راهنما

## کلیات

- در [مستندات رسمی نوع رشته][string-type-documentation] درباره‌ی رشته‌ها بخوانید.
- [_توابع رشته‌ای_ موجود][string-functions] را ببینید تا با عملیات توکار روی رشته‌ها آشنا شوید.

## 1. اولین حرف اسم را بگیرید

- یک [تابع توکار][string-substr] برای گرفتن اولین کاراکتر از یک رشته وجود دارد.
- چندین [تابع توکار][string-trim] برای حذف فاصله‌های ابتدا، انتها، یا ابتدا و انتهای یک رشته وجود دارد.

## 2. اولین حرف را به‌صورت حرف اختصاری قالب‌بندی کنید

- یک [تابع توکار][string-upcase] برای تبدیل همه‌ی کاراکترهای یک رشته به حالت حروف بزرگ وجود دارد.
- یک [عملگر][concat-operator] وجود دارد که دو رشته را به هم می‌چسباند.

## 3. اسم کامل را به اسم کوچک و اسم خانوادگی تقسیم کنید

- یک [تابع توکار][string-explode] وجود دارد که یک رشته را با رشته‌ی دیگری تقسیم می‌کند.
- چند عنصر اول یک لیست را می‌توان با تطبیق الگو روی لیست به متغیرها نسبت داد.

## 4. حروف اختصاری را داخل قلب بگذارید

- یک نحوه‌ی نگارش ویژه برای [جای‌گذاری متغیرها][string-variables] داخل یک رشته وجود دارد.
- یک نحوه‌ی نگارش ویژه برای نوشتن [رشته‌های چندخطی][heredoc-syntax] وجود دارد که نیازی به escape کردن خطوط جدید ندارد.

[string-type-documentation]: https://www.php.net/manual/en/language.types.string.php
[string-functions]: https://www.php.net/manual/en/ref.strings.php 
[string-substr]: https://www.php.net/manual/en/function.substr.php 
[string-trim]: https://www.php.net/manual/en/function.trim.php 
[string-upcase]: https://www.php.net/manual/en/function.strtoupper.php
[string-explode]: https://www.php.net/manual/en/function.explode.php
[string-variables]: https://www.php.net/manual/en/language.types.string.php#language.types.string.parsing 
[concat-operator]: https://www.php.net/manual/en/language.operators.string.php
[heredoc-syntax]: https://www.php.net/manual/en/language.types.string.php#language.types.string.syntax.heredoc
