# راهنمایی‌ها

## کلی

- کاراکترها در Factor عدد صحیح هستند (کدپوینت‌های یونیکد)، بنابراین عملگرهای عددی `<`، `>` و `=` مستقیماً کار می‌کنند.
- گزاره‌ها و تبدیل حالت حروف در [`unicode`][unicode] قرار دارند.
- نمادهایی که برمی‌گردانید (`less`، `big`، `alpha`، …) باید پیش از استفاده تعریف شوند؛ آن‌ها را با `SYMBOLS: ... ;` گروه‌بندی کنید.

## 1. مقایسه‌ی دو کاراکتر

- از `<` و `>` در [`math`][math] استفاده کنید.
- سه حالت را با `cond` از [`combinators`][combinators] بپوشانید.

## 2. تعیین حالت حروف

- `LETTER?` گزاره‌ی حروف بزرگ است و `letter?` گزاره‌ی حروف کوچک.

## 3. تغییر حالت حروف

- `ch>upper` و `ch>lower` تبدیل‌کننده‌های هر کاراکتر هستند (`>upper`/`>lower` در سطح رشته هم وجود دارند، اما شما اینجا فقط یک کاراکتر دارید).

## 4. تعیین نوع

- ترتیب در `cond` شما مهم است. `Letter?` با حروف بزرگ *یا* کوچک مطابقت می‌کند، پس باید پیش از هر بررسی مخصوص حالت اجرا شود.

[unicode]: https://docs.factorcode.org/content/vocab-unicode.html
[math]: https://docs.factorcode.org/content/vocab-math.html
[combinators]: https://docs.factorcode.org/content/vocab-combinators.html
