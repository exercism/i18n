# راهنمایی‌ها

## کلی

- همه‌ی بخش‌های این تمرین بر عملیات بیتی تکیه دارند.
  - [برنامه‌ی درسی یادگیری][concept-bitwise-operations] در Exercism مقدمه‌ای ملایم ارائه می‌دهد.
  - [عملگرهای بیتی][ref-bitwise-operators] در راهنمای Julia فهرست شده‌اند.
  - `Base` شامل چندین تابع مفید مرتبط با بیت است، از جمله [count_ones()][count_ones] و [trailing_zeros()][trailing_zeros].
- تست‌ها سعی می‌کنند در مورد نوع‌ها سخت‌گیر نباشند، اما این تمرین درباره‌ی بایت‌های بدون علامت است و استدلال درباره‌ی مقادیر [`UInt8`][uint8] نسبتاً آسان است.
  - آرگومان‌ها و مقادیر بازگشتی `Vector{UInt8}` هستند،
  - مقادیر `UInt8` برای ماسک‌های بیتی و مقادیر میانی به کار می‌آیند.
- اعداد دهدهی باعث حواس‌پرتی می‌شوند، پس برای لیترال‌های `UInt8` هگز (`0xFF`) یا دودویی (`0b11111111`) را ترجیح دهید.
  - تابع [`bitstring()`][bitstring] می‌تواند در دیباگ کردن مفید باشد، چون خروجی آن قالبی دودویی و خوانا برای انسان است.
- یک پیام خام به شکل برداری از تکه‌های ۸ بیتی می‌آید و باید به تکه‌های ۷ بیتی در بیت‌های مرتبه‌ی بالا به‌همراه یک بیت توازن به‌عنوان کم‌معناترین بیت تبدیل شود.
  - برای جدا کردن بیت‌هایی که می‌خواهید، از ماسک‌های بیتی همراه با `&` یا `|` استفاده کنید.
  - عملگرهای شیفت به چپ (`<<`) و شیفت منطقی به راست (`>>>`) مهم‌اند.
  - برای انتقال بیت‌های اضافی به دور بعدی پردازش، راهی در نظر بگیرید.
  - انتقال بیت‌های اضافی باعث می‌شود پردازش بایت‌های ورودی به‌صورت مستقل از هم دشوار باشد، پس حلقه (یا شاید بازگشت) احتمالاً از تلاش برای استفاده از توابع مرتبه‌بالا ساده‌تر است.
  - پیام‌های رمزگذاری‌شده معمولاً از پیام خام بلندترند (بایت‌های بیشتر)، چون برای هر بایت به یک بیت توازن نیاز است.


  [concept-bitwise-operations]: https://exercism.org/tracks/julia/concepts/bitwise-operations
  [ref-bitwise-operators]: https://docs.julialang.org/en/v1/manual/mathematical-operations/#Bitwise-Operators
  [count_ones]: https://docs.julialang.org/en/v1/base/numbers/#Base.count_ones
  [trailing_zeros]: https://docs.julialang.org/en/v1/base/numbers/#Base.trailing_zeros
  [uint8]: https://docs.julialang.org/en/v1/base/numbers/#Core.UInt8
  [bitstring]: https://docs.julialang.org/en/v1/base/numbers/#Base.bitstring
