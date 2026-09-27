# مقدمه

در یک مفهوم قبلی اشاره شد که هم برچسب‌های محلی و هم توابع فقط آدرس‌هایی در یک بخش با کد اجرایی هستند، مانند `section .text`.

در واقع، توابع را می‌توان مانند هر آدرس حافظه‌ای دستکاری کرد، یعنی می‌توان آن‌ها را در ثبات‌ها بارگذاری کرد، آن‌ها را جابه‌جا کرد و در حافظه ذخیره کرد.
همچنین می‌توان از `call` یا `jmp` برای انتقال اجرا به تابعی که در یک ثبات یا حافظه ذخیره شده است استفاده کرد:

```x86asm
section .text
sum_op:
    lea rax, [rdi + rsi] ; loads the sum rdi + rsi into rax
    ret

apply_sum:
    lea rax, [rel sum_op]
    jmp rax   ; tail call
```

به آدرس تابعی که به عنوان یک مقدار جابه‌جا می‌شود، **«thunk»** می‌گویند.
thunkها یکی از بلوک‌های سازنده‌ی **برنامه‌نویسی مرتبه‌بالا** در اسمبلی هستند: کدی که روی کد دیگر عمل می‌کند.

## کد به عنوان داده

آدرس‌های توابع را می‌توان در حافظه ذخیره کرد و بعداً بازیابی کرد:

```x86asm
section .bss
    cached_fn resq 1

section .text
save_op:
    mov qword [rel cached_fn], rdi
    ret

apply_op:
    ; arguments are already set up according to the ABI
    jmp qword [rel cached_fn] ; tail call
```

`save_op` آدرس تابعی را که دریافت می‌کند در `cached_fn` می‌نویسد.
این مقدار پس از بازگشت `save_op` باقی می‌ماند، بنابراین هر فراخوانی بعدی `apply_op` به آدرسی که آخرین بار ذخیره شده است، پرش انتهایی می‌کند.
این کار امکان می‌دهد تا در زمان اجرا تغییر دهید که `apply_op` کدام تابع را فراخوانی کند.

## جدول توزیع

ذخیره‌ی آدرس‌های توابع در یک آرایه این امکان را فراهم می‌کند که توابع مختلف را بر اساس یک اندیس، که ممکن است به یک شرط زمان اجرا بستگی داشته باشد، انتخاب کنید.
به این یک **«جدول توزیع»** می‌گویند:

```x86asm
section .data
    dispatch_table dq add_op, sub_op, mul_op

section .text
dispatch:
    ; this function takes two arguments in rdi and rsi, and an index in rdx
    ; it then applies the function corresponding to the index in rdx to the arguments
    lea rax, [rel dispatch_table]
    jmp qword [rax + 8*rdx]   ; tail-call the function address for the index
```

## thunkهای حالت‌دار

thunkی که بین فراخوانی‌ها حافظه‌ای پایدار را می‌خواند یا به‌روزرسانی می‌کند، ممکن است بسته به آنچه قبلاً اتفاق افتاده، رفتار متفاوتی داشته باشد.
نتیجه‌ی آن ممکن است به چیزی بیش از فقط آرگومان‌هایش بستگی داشته باشد.

برای مثال، یک _شمارنده_ که یک تابع می‌گیرد و آن را با شمارش فعلی فراخوانی می‌کند و هر بار شمارش را جلو می‌برد:

```x86asm
section .data
    count dq 0

section .text
tick:
    mov rax, rdi               ; saves the function address
    mov rdi, [rel count]       ; loads the current count as the function's argument
    inc qword [rel count]      ; advances the count
    jmp rax                    ; tail-calls the function
```

`tick` تابع داده‌شده را با شمارش فعلی به عنوان آرگومان آن فراخوانی می‌کند، سپس شمارش را جلو می‌برد.
بنابراین اولین فراخوانی `tick(square)`، `square(0)` را فراخوانی می‌کند، فراخوانی بعدی `tick(square)`، `square(1)` را فراخوانی می‌کند، بعدی `square(2)`، و به همین ترتیب.

مثال دیگر یک _محاسبه‌ی به‌تعویق‌افتاده_ است:

```x86asm
section .bss
    captured_fn resq 1
    argument resq 1

section .text
delay:
    mov qword [rel captured_fn], rdi ; saves the function
    mov qword [rel argument], rsi    ; saves the argument
    lea rax, [rel invoke]            ; returns the `invoke` function
    ret

invoke:
    mov rdi, qword [rel argument]    ; loads the saved argument into `rdi`
    jmp qword [rel captured_fn]      ; tail-calls the saved function
```

`delay` یک تابع و یک مقدار می‌گیرد، آن‌ها را ذخیره می‌کند و `invoke` را برمی‌گرداند.
وقتی `invoke` فراخوانی شود، تابع گرفته‌شده را با آرگومان ذخیره‌شده اجرا می‌کند.

بسیاری از الگوهای رایج در زبان‌های سطح بالاتر، مانند کالبک‌ها، متدهای مجازی، مولدها، کاری‌سازی، ترکیب توابع و بسیاری دیگر، بر پایه‌ی thunkهای همراه با حالت پایدار ساخته شده‌اند.
