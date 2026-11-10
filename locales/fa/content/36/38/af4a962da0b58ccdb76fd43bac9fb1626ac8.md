# مقدمه

«آمار» موضوعی بزرگ و پیچیده است که جنبه‌های زیادی دارد.

برخی از جنبه‌ها در مفهوم [`Randomness`][randomness] بررسی شده‌اند، که موضوعی جداگانه اما مرتبط است.

در ساده‌ترین حالت، آمار می‌تواند شامل روش‌هایی برای خلاصه کردن یک مجموعه‌ی قابل پیمایش از داده‌ها در یک مقدار واحد باشد.
تازه‌واردان به Julia ممکن است شگفت‌زده شوند که چه تعداد کمی تابع به‌صورت پیش‌فرض در زبان تعبیه شده است:

- [`sum`][sum]، برای جمع کردن اعداد.
- [`min`][min] و [`max`][max]، برای گرفتن مقادیر حدی پارامترهای داده‌شده.
- [`extrema`][extrema]، برای گرفتن تاپل (min, max) از یک مجموعه‌ی قابل پیمایش.
- [`length`][length]، برای شمردن همه‌ی مقادیر.
- [`count`][count]، برای شمردن فقط مقادیری که معیاری را برآورده می‌کنند.

```julia-repl
julia> v = collect(1:0.2:3)
11-element Vector{Float64}:
 1.0
 1.2
 ... # display truncated
 3.0

julia> mean(v)
2.0

julia> extrema(v)
(1.0, 3.0)

julia> length(v)
11

julia> min('g', 'a', 'c')
'a': ASCII/Unicode U+0061 (category Ll: Letter, lowercase)

julia> count(isodd, 1:5)  # 1, 3, and 5 are odd
3
```

این مجموعه‌ی محدود از توابع، تصمیمی آگاهانه برای کم‌کردن حجم اضافی در Julia پایه است، با انتقال سایر توابع به زنجیره‌ای از ماژول‌ها و بسته‌های دیگر.

## ماژول `Statistics`

به‌عنوان بخشی از کتابخانه‌ی استاندارد، [`Statistics`][statistics] احتمالاً از پیش نصب شده است، بنابراین فقط کافی است `using Statistics` را به بالای برنامه اضافه کنید تا آن را به فضای نام بیاورد.

این ماژول شامل رده‌ی بعدی توابع رایج است که احتمالاً توسط زیرمجموعه‌ای از برنامه‌نویسان به‌طور گسترده استفاده می‌شوند.

بسیاری از توابع در `Statistics` فرض می‌کنند که مقداری دانش زمینه‌ای درباره‌ی این موضوع وجود دارد.
ساده‌ترین نمونه‌ها عبارت‌اند از:

- [`mean`][mean]، که بسیاری آن را میانگین می‌نامند (همان نتیجه‌ی `sum / length`).
- [`median`][median]، مقدار میانی پس از مرتب‌سازی.
- [`std`][std]، [انحراف معیار][stddev]: معیاری از میزان پراکندگی مقادیر.
- [`var`][var]، واریانس: مربع `std`، که عموماً محاسبه‌ی آن سریع‌تر است.

هر تابع معمولاً گزینه‌های مختلفی دارد و توابع _بسیار_ بیشتری وجود دارد، بنابراین اگر علاقه‌مند هستید، [مستندات][statistics] را بررسی کنید.

## بسته‌های دیگر

همان‌طور که ممکن است انتظار داشته باشید، آمار یکی از کاربردهای اصلی Julia است و بسته‌های زیادی برای پشتیبانی از کارهای تخصصی‌تر وجود دارد.

گروه JuliaStats به‌طور مفید [فهرست آنلاین][juliastats] را نگه‌داری می‌کند.

[statistics]: https://docs.julialang.org/en/v1/stdlib/Statistics/
[randomness]: https://exercism.org/tracks/julia/concepts/randomness
[sum]: https://docs.julialang.org/en/v1/base/collections/#Base.sum
[min]: https://docs.julialang.org/en/v1/base/math/#Base.min
[max]: https://docs.julialang.org/en/v1/base/math/#Base.max
[extrema]: https://docs.julialang.org/en/v1/base/collections/#Base.extrema
[length]: https://docs.julialang.org/en/v1/base/collections/#Base.length
[count]: https://docs.julialang.org/en/v1/base/collections/#Base.count
[mean]: https://docs.julialang.org/en/v1/stdlib/Statistics/#Statistics.mean
[median]: https://docs.julialang.org/en/v1/stdlib/Statistics/#Statistics.median
[std]: https://docs.julialang.org/en/v1/stdlib/Statistics/#Statistics.std
[var]: https://docs.julialang.org/en/v1/stdlib/Statistics/#Statistics.var
[stddev]: https://en.wikipedia.org/wiki/Standard_deviation
[juliastats]: https://juliapackages.com/u/juliastats
