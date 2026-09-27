# قالب‌بندی فایل‌های JSON

مخزن یک ترک Exercism فایل‌های JSON زیادی دارد، از جمله:

- فایل `config.json` مربوط به ترک.
- برای هر مفهوم، یک فایل `.meta/config.json` و یک فایل `links.json`.
- برای هر تمرین مفهومی یا تمرین عملی، یک فایل `.meta/config.json`.

این فایل‌ها اگر در سراسر Exercism قالب‌بندی یکسانی داشته باشند خواناتر می‌شوند؛ به همین دلیل configlet فرمانی به اسم `fmt` دارد که فایل‌های JSON یک ترک را به شکلی متعارف بازنویسی می‌کند.

فرمان `fmt` این فایل‌ها را قالب‌بندی می‌کند:

- `config.json`
- `exercises/{concept,practice}/*/.approaches/config.json`
- `exercises/{concept,practice}/*/.articles/config.json`
- `exercises/{concept,practice}/*/.meta/config.json`

## کاربرد

فرمان `fmt` فایل‌های `meta/config.json` تمرین‌ها را قالب‌بندی می‌کند.

```
configlet [global-options] fmt [command-options]

Global options:
  -h, --help                   Show this help message and exit
      --version                Show this tool's version information and exit
  -t, --track-dir <dir>        Specify a track directory to use instead of the current directory
  -v, --verbosity <verbosity>  The verbosity of output. Allowed values: q[uiet], n[ormal], d[etailed]

Options for fmt:
  -e, --exercise <slug>        Only operate on this exercise
  -u, --update                 Prompt to write formatted files
  -y, --yes                    Auto-confirm the prompt from --update
```

اجرای `configlet fmt` به‌تنهایی هیچ تغییری در ترک ایجاد نمی‌کند و قالب‌بندی فایل `.meta/config.json` هر تمرین مفهومی و تمرین عملی و فایل `config.json` ترک را بررسی می‌کند.

برای چاپ فهرستی از مسیرهایی که هنوز فایل `.meta/config.json` قالب‌بندی‌شده‌ی تمرین را ندارند (اگر حداقل یک تمرین فایل تنظیمات قالب‌بندی‌شده نداشته باشد، با کد خروج غیرصفر خارج می‌شود):

```shell
configlet fmt
```

برای اینکه از شما خواسته شود فایل‌های تنظیمات قالب‌بندی‌شده بنویسید، گزینه‌ی `--update` (یا به‌صورت کوتاه `-u`) را اضافه کنید:

```shell
configlet fmt --update
```

برای نوشتن غیرتعاملی فایل‌های تنظیمات قالب‌بندی‌شده، گزینه‌ی `--yes` (یا به‌صورت کوتاه `-y`) را اضافه کنید:

```shell
configlet fmt --update --yes
```

برای کار روی یک تمرین تکی، از گزینه‌ی `--exercise` (یا به‌صورت کوتاه `-e`) استفاده کنید.
برای مثال، برای نوشتن غیرتعاملی فایل تنظیمات قالب‌بندی‌شده‌ی تمرین `prime-factors`:

```shell
configlet fmt -uy -e prime-factors
```

هنگام نوشتن فایل‌های JSON، `configlet fmt` این کارها را انجام می‌دهد:

- جفت‌های کلید/مقدار را به ترتیب متعارف می‌نویسد.

- از دو فاصله برای تورفتگی استفاده می‌کند.

- هر عنصر در یک آرایه‌ی JSON و هر کلید در یک شیء JSON را در خطی جداگانه می‌نویسد.

- جفت‌های کلید/مقداری را که کلیدشان اختیاری است و مقدار خالی دارند حذف می‌کند.
  برای مثال، `"source": ""` حذف می‌شود.

- `"test_runner": true` را از فایل‌های تنظیمات تمرین‌های عملی حذف می‌کند.
  این کلید اختیاری است؛ مشخصات می‌گوید که نبودِ کلید `test_runner` به معنای مقدار `true` است.

- وقتی یک شیء JSON بیش از یک جفت کلید/مقدار با نام کلید یکسان داشته باشد، فقط جفت آخر را نگه می‌دارد.

ترتیب متعارف کلیدها در فایل `.meta/config.json` یک تمرین چنین است:

```text
- authors
- [contributors]
- files
  - solution
  - test
  - exemplar           (Concept Exercises only)
  - example            (Practice Exercises only)
  - [editor]
  - [invalidator]
- [language_versions]
- [forked_from]        (Concept Exercises only)
- [icon]               (Concept Exercises only)
- [test_runner]        (Practice Exercises only)
- blurb
- [source]
- [source_url]
- [custom]
```

که در آن کروشه‌ها نشان می‌دهند کلید داخلشان اختیاری است.

توجه داشته باشید که `configlet fmt` فقط روی تمرین‌هایی کار می‌کند که در فایل `config.json` سطح ترک وجود دارند.
بنابراین اگر در حال پیاده‌سازی تمرین جدیدی در یک ترک هستید و می‌خواهید فایل `.meta/config.json` آن را قالب‌بندی کنید، لطفاً ابتدا تمرین را به فایل `config.json` سطح ترک اضافه کنید.
اگر تمرین هنوز آماده‌ی نمایش به کاربران نیست، لطفاً مقدار `status` آن را روی `wip` تنظیم کنید.

کد خروج ۰ است اگر هنگام خروج configlet همه‌ی فایل‌های تنظیماتی که دیده شده‌اند قالب‌بندی‌شده باشند، و در غیر این صورت ۱ است.
