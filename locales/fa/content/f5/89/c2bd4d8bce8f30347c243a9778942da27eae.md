# مقدمه

`Complex numbers` پیچیده نیستند.
فقط به اسمی کمتر نگران‌کننده نیاز دارند.

آن‌ها چنان مفیدند، به‌ویژه در مهندسی و علوم، که R [اعداد مختلط][web-complex] را به‌عنوان [انواع اتمی][ref-atomic] استاندارد، در کنار `integer`، `double`، `logical`، `character` و `raw` می‌گنجاند.

## مبانی

یک عدد `complex` در R یک مقدار واحد است.
اما در کاربرد، می‌توان آن را جفتی از اعداد در نظر گرفت.
به دلایل تاریخی نامبارک، به این دو بخش «حقیقی» و «موهومی» می‌گویند.
باز هم بهتر است بر سادگی نهفته تمرکز کنید، نه بر این اسم‌های عجیب.

برای ساختن اعداد مختلط از دو عدد حقیقی، کافی است پسوند `i` را به بخش موهومی اضافه کنید.

```r
2+3i
#> [1] 2+3i

typeof(2+3i)
#> [1] "complex"
```

برای ساختن یک عدد مختلط از متغیرهای حقیقی، نحوه‌ی نگارش بالا کار نمی‌کند.
نوشتن `r + imi` تجزیه‌گر را گمراه می‌کند تا `imi` را یک اسم متغیر (ناموجود) بپندارد.

یا بخش موهومی را در `1i` ضرب کنید یا از تابع [`complex()`][ref-complex] استفاده کنید:

```r
r <- 2
im <- 3

r + im * 1i
#> [1] 2+3i

# must include the `real` and `imaginary` keywords
complex(real = r, imaginary = im)
#> [1] 2+3i
```

شاید بپرسید چرا `i` و نه `j`؟

بیشتر مهندسان `j` را ترجیح می‌دهند.
بیشتر دانشمندان و ریاضی‌دانان نماد ریاضی `i` را برای _موهومی_ ترجیح می‌دهند، اما این نماد با کاربرد `i` به معنای _جریان_ در مهندسی برق تعارض دارد.

R `i` را انتخاب کرد و Python `j` را. Julia هم با انتخاب `im` از این جنجال کنار کشید.
هنگام جابه‌جایی میان زبان‌های برنامه‌نویسی [STEM][wiki-STEM] احتیاط کنید.

برای دسترسی جداگانه به بخش‌های یک عدد مختلط:

```r
z <- 2+3i

Re(z)  # real part
#> [1] 2

Im(z)  # imaginary part
#> [1] 3
```

هر یک از این دو بخش می‌تواند صفر باشد و ریاضی‌دانان ممکن است در این حالت، عدد را «تماماً حقیقی» یا «تماماً موهومی» بنامند.
با این حال، همچنان در R یک عدد مختلط است.

```r
1.2 + 0i
#> [1] 1.2+0i

typeof(1.2 + 0i)
#> [1] "complex"

2i
#> [1] 0+2i

typeof(2i)
#> [1] "complex"
```

شاید شنیده باشید که «`i` (یا `j`) جذر ۱- است».

فعلاً تنها معنایش این است که بخش موهومی _بنا به تعریف_ در تساوی زیر صدق می‌کند:

```r
1i * 1i == -1  # more precisely, 1i * 1i == -1 + 0i
#> [1] TRUE
```

این ایده‌ی ساده‌ای است، اما پیامدهای جالبی به دنبال دارد.

## حساب

بیشتر [`operators`][ref-operators] که با اعداد اعشاری و صحیح به کار می‌روند، با اعداد مختلط هم کار می‌کنند:

```r
z1 = 1.5 + 2i
z2 = 2 + 1.5i

z1 + z2  # addition
#> [1] 3.5+3.5i

z1 * z2  # multiplication
#> [1] 0+6.25i

z1 / z2  # division
#> [1] 0.96+0.28i

z1^2  # exponentiation
#> [1] -1.75+6i

2^z1  # another exponentiation
#> [1] 0.518895+2.780422i
```

توضیح قواعد ضرب و تقسیم اعداد مختلط خارج از حیطه‌ی این مفهوم است (_و بعید است که زیاد لازم باشد این عملیات را «دستی» انجام دهید_).

اگر بخواهید در این موضوع عمیق شوید، هر مقدمه‌ی [ریاضی][web-math-complex] یا [مهندسی برق][web-engineering-complex] بر اعداد مختلط این مطلب را پوشش می‌دهد.

در غیر این صورت، Exercism یک تمرین عملی [`Complex Numbers`][exercise-complex-numbers] دارد که می‌توانید در آن یک کلاس عدد مختلط با همین عملیات را از پایه پیاده‌سازی کنید.

تقسیم صحیح عموماً روی اعداد مختلط ___ممکن نیست___، بنابراین عملگرهای `%/%` و `%%` برای نوع عدد مختلط شکست می‌خورند.

## توابع

بیشتر توابع ریاضی با ورودی‌های مختلط کار می‌کنند.

اما دادن ورودی‌های حقیقی و انتظار خروجی مختلط، معمولاً جواب نمی‌دهد.

```r
sqrt(z1)
#> [1] 1.414214+0.707107i

sqrt(-1)  # fails!
#> Warning in sqrt(-1) : NaNs produced
#> [1] NaN

sqrt(-1 + 0i)  # succeeds with complex input
#> [1] 0+1i

sin(z1)
#> [1] 3.752771+0.256554i
```

علاوه بر `Re()` و `Im()`، چندین تابع دیگر هم هستند که ارتباط خاصی با اعداد مختلط دارند.

- `Conj()` به‌سادگی علامت بخش موهومی یک عدد مختلط را برعکس می‌کند (_از + به - یا برعکس_).
  - به دلیل نحوه‌ی کار ضرب مختلط، این کار از آنچه فکر می‌کنید مفیدتر است.
- `abs(<complex number>)` تضمین‌شده یک عدد حقیقی بدون بخش موهومی برمی‌گرداند («اندازه»ی آن) و `Mod(<complex number>)` مترادف آن است.
- `Arg(<complex number>)` زاویه‌ی فاز را بر حسب رادیان برمی‌گرداند.

```r
z1
#> [1] 1.5+2i

abs(z1)
#> [1] 2.5

Mod(z1)  # same as previous
#> [1] 2.5

Conj(z1)  # flip sign
#> [1] 1.5-2i

Arg(z1)
#> [1] 0.9272952
```

[web-complex]: https://www.cfm.brown.edu/people/dobrush/am33/R/intro/complex0.html
[ref-atomic]: https://cran.r-project.org/doc/manuals/r-release/R-lang.html#Vectors
[ref-complex]: https://www.rdocumentation.org/packages/base/versions/3.3.0/topics/complex
[web-math-complex]: https://www.nagwa.com/en/videos/143121736364/
[web-engineering-complex]: https://www.khanacademy.org/science/electrical-engineering/ee-circuit-analysis-topic/ee-ac-analysis/v/ee-complex-numbers
[ref-operators]: https://stat.ethz.ch/R-manual/R-devel/library/base/html/Syntax.html
[wiki-STEM]: https://en.wikipedia.org/wiki/Science,_technology,_engineering,_and_mathematics
[exercise-complex-numbers]: https://exercism.org/tracks/r/exercises/complex-numbers
