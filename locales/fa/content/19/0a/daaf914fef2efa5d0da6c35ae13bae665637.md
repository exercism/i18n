# راهنما

اگر به مشکل برخوردید، برای گرفتن کمک می‌توانید از یکی از منابع زیر استفاده کنید:

- [/r/WebAssembly](https://www.reddit.com/r/WebAssembly/) سابردیت WebAssembly است.
- [ردیاب مسئله‌های Github](https://github.com/exercism/wasm/issues) جایی است که توسعه و نگهداری تمرین‌های Javascript در Exercism را پیگیری می‌کنیم. اما اگر هیچ‌یک از پیوندهای بالا به شما کمک نکرد، می‌توانید همین‌جا یک مسئله ثبت کنید.

## چطور Debug کنیم

برخلاف بسیاری از زبان‌ها، کد WebAssembly به‌طور خودکار به منابع سراسری مانند `console` دسترسی ندارد. در عوض، چنین قابلیتی باید در قالب `import` فراهم شود.

ترک WebAssembly در Exercism برای فراهم کردن قابلیتی شبیه `console.log` و چند امکان جانبی دیگر، در همه‌ی تمرین‌ها یک کتابخانه‌ی استاندارد از توابع را در دسترس شما می‌گذارد.

این توابع باید در بالای ماژول WebAssembly شما `import` شوند و سپس می‌توانید آن‌ها را از داخل کد WebAssembly خودتان فراخوانی کنید.

توابع `log_mem_*` انتظار دارند به حافظه‌ی خطی ماژول WebAssembly شما دسترسی داشته باشند. این حافظه به‌طور پیش‌فرض حالت خصوصی دارد، پس برای اینکه در دسترس قرار بگیرد، باید حافظه‌ی خطی خود را با اسم `mem` `export` کنید. این کار به شکل زیر انجام می‌شود:

```wasm
(memory (export "mem") 1)
```

## لاگ گرفتن از متغیرهای محلی و سراسری

ما برای هر یک از انواع اولیه‌ی WebAssembly یک تابع لاگ گرفتن فراهم کرده‌ایم. این توابع برای لاگ گرفتن از متغیرهای سراسری و محلی به کار می‌آیند.

### `log_i32_s` - لاگ یک عدد صحیح علامت‌دار ۳۲ بیتی در `console`

```wasm
(module
  (import "console" "log_i32_s" (func $log_i32_s (param i32)))
  (func $main
    ;; logs -1
    (call $log_i32_s (i32.const -1))
  )
)
```

### `log_i32_u` - لاگ یک عدد صحیح بدون علامت ۳۲ بیتی در `console`

```wasm
(module
  (import "console" "log_i32_u" (func $log_i32_u (param i32)))
  (func $main
    ;; Logs 42 to console
    (call $log_i32_u (i32.const 42))
  )
)
```

### `log_i64_s` - لاگ یک عدد صحیح علامت‌دار ۶۴ بیتی در `console`

```wasm
(module
  (import "console" "log_i64_s" (func $log_i64_s (param i64)))
  (func $main
    ;; Logs -99 to console
    (call $log_i32_u (i64.const -99))
  )
)
```

### `log_i64_u` - لاگ یک عدد صحیح بدون علامت ۶۴ بیتی در `console`

```wasm
(module
  (import "console" "log_i64_u" (func $log_i64_u (param i64)))
  (func $main
    ;; Logs 42 to console
    (call $log_i64_u (i32.const 42))
  )
)
```

### `log_f32` - لاگ یک عدد ممیز شناور ۳۲ بیتی در `console`

```wasm
(module
  (import "console" "log_f32" (func $log_f32 (param f32)))
  (func $main
    ;; Logs 3.140000104904175 to console
    (call $log_f32 (f32.const 3.14))
  )
)
```

### `log_f64` - لاگ یک عدد ممیز شناور ۶۴ بیتی در `console`

```wasm
(module
  (import "console" "log_f64" (func $log_f64 (param f64)))
  (func $main
    ;; Logs 3.14 to console
    (call $log_f64 (f64.const 3.14))
  )
)
```

## لاگ گرفتن از حافظه‌ی خطی

حافظه‌ی خطی WebAssembly آرایه‌ای از مقدارهاست که می‌توان آن را بایت‌به‌بایت آدرس‌دهی کرد. این حافظه معادل حافظه‌ی مجازی برای برنامه‌های WebAssembly است.

ما توابعی برای لاگ گرفتن فراهم کرده‌ایم که بازه‌ای از آدرس‌ها در حافظه‌ی خطی را به‌صورت آرایه‌های ایستایی از انواع مشخص تفسیر می‌کنند. کار این توابع شبیه TypedArrays در JavaScript است. پارامترهای طول بر حسب بایت سنجیده نمی‌شوند؛ آن‌ها بر حسب تعداد عناصر پشت‌سرهم از نوعی سنجیده می‌شوند که به آن تابع مربوط است.

**برای اینکه این توابع کار کنند، ماژول WebAssembly شما باید حافظه‌ی خطی خود را اعلام کند و آن را با اسم `mem` `export` کند.**

```wasm
(memory (export "mem") 1)
```

### `log_mem_as_utf8` - لاگ یک دنباله از نویسه‌های UTF8 در `console`

```wasm
(module
  (import "console" "log_mem_as_utf8" (func $log_mem_as_utf8 (param $byteOffset i32) (param $length i32)))
  (memory (export "mem") 1)
  (data (i32.const 64) "Goodbye, Mars!")
  (func $main
    ;; Logs "Goodbye, Mars!" to console
    (call $log_mem_as_utf8 (i32.const 64) (i32.const 14))
  )
)
```

### `log_mem_as_i8` - لاگ یک دنباله از اعداد صحیح علامت‌دار ۸ بیتی در `console`

```wasm
(module
  (import "console" "log_mem_as_i8" (func $log_mem_as_i8 (param $byteOffset i32) (param $length i32)))
  (memory (export "mem") 1)
  (func $main
    (memory.fill (i32.const 128) (i32.const -42) (i32.const 10))
    ;; Logs an array of 10x -42 to console
    (call $log_mem_as_u8 (i32.const 128) (i32.const 10))
  )
)
```

### `log_mem_as_u8` - لاگ یک دنباله از اعداد صحیح بدون علامت ۸ بیتی در `console`

```wasm
(module
  (import "console" "log_mem_as_u8" (func $log_mem_as_u8 (param $byteOffset i32) (param $length i32)))
  (memory (export "mem") 1)
  (func $main
    (memory.fill (i32.const 128) (i32.const 42) (i32.const 10))
    ;; Logs an array of 10x 42 to console
    (call $log_mem_as_u8 (i32.const 128) (i32.const 10))
  )
)
```

### `log_mem_as_i16` - لاگ یک دنباله از اعداد صحیح علامت‌دار ۱۶ بیتی در `console`

```wasm
(module
  (import "console" "log_mem_as_i16" (func $log_mem_as_i16 (param $byteOffset i32) (param $length i32)))
  (memory (export "mem") 1)
  (func $main
    (i32.store16 (i32.const 128) (i32.const -10000))
    (i32.store16 (i32.const 130) (i32.const -10001))
    (i32.store16 (i32.const 132) (i32.const -10002))
    ;; Logs [-10000, -10001, -10002] to console
    (call $log_mem_as_i16 (i32.const 128) (i32.const 3))
  )
)
```

### `log_mem_as_u16` - لاگ یک دنباله از اعداد صحیح بدون علامت ۱۶ بیتی در `console`

```wasm
(module
  (import "console" "log_mem_as_u16" (func $log_mem_as_u16 (param $byteOffset i32) (param $length i32)))
  (memory (export "mem") 1)
  (func $main
    (i32.store16 (i32.const 128) (i32.const 10000))
    (i32.store16 (i32.const 130) (i32.const 10001))
    (i32.store16 (i32.const 132) (i32.const 10002))
    ;; Logs [10000, 10001, 10002] to console
    (call $log_mem_as_u16 (i32.const 128) (i32.const 3))
  )
)
```

### `log_mem_as_i32` - لاگ یک دنباله از اعداد صحیح علامت‌دار ۳۲ بیتی در `console`

```wasm
(module
  (import "console" "log_mem_as_i32" (func $log_mem_as_i32 (param $byteOffset i32) (param $length i32)))
  (memory (export "mem") 1)
  (func $main
    (i32.store (i32.const 128) (i32.const -10000000))
    (i32.store (i32.const 132) (i32.const -10000001))
    (i32.store (i32.const 136) (i32.const -10000002))
    ;; Logs [-10000000, -10000001, -10000002] to console
    (call $log_mem_as_i32 (i32.const 128) (i32.const 3))
  )
)
```

### `log_mem_as_u32` - لاگ یک دنباله از اعداد صحیح بدون علامت ۳۲ بیتی در `console`

```wasm
(module
  (import "console" "log_mem_as_u32" (func $log_mem_as_u32 (param $byteOffset i32) (param $length i32)))
  (memory (export "mem") 1)
  (func $main
    (i32.store (i32.const 128) (i32.const 100000000))
    (i32.store (i32.const 132) (i32.const 100000001))
    (i32.store (i32.const 136) (i32.const 100000002))
    ;; Logs [100000000, 100000001, 100000002] to console
    (call $log_mem_as_u32 (i32.const 128) (i32.const 3))
  )
)
```

### `log_mem_as_i64` - لاگ یک دنباله از اعداد صحیح علامت‌دار ۶۴ بیتی در `console`

```wasm
(module
  (import "console" "log_mem_as_i64" (func $log_mem_as_i64 (param $byteOffset i32) (param $length i32)))
  (memory (export "mem") 1)
  (func $main
    (i64.store (i32.const 128) (i64.const -10000000000))
    (i64.store (i32.const 136) (i64.const -10000000001))
    (i64.store (i32.const 144) (i64.const -10000000002))
    ;; Logs [-10000000000, -10000000001, -10000000002] to console
    (call $log_mem_as_i64 (i32.const 128) (i32.const 3))
  )
)
```

### `log_mem_as_u64` - لاگ یک دنباله از اعداد صحیح بدون علامت ۶۴ بیتی در `console`

```wasm
(module
  (import "console" "log_mem_as_u64" (func $log_mem_as_u64 (param $byteOffset i32) (param $length i32)))
  (memory (export "mem") 1)
  (func $main
    (i64.store (i32.const 128) (i64.const 10000000000))
    (i64.store (i32.const 136) (i64.const 10000000001))
    (i64.store (i32.const 144) (i64.const 10000000002))
    ;; Logs [10000000000, 10000000001, 10000000002] to console
    (call $log_mem_as_u64 (i32.const 128) (i32.const 3))
  )
)
```

### `log_mem_as_u64` - لاگ یک دنباله از اعداد ممیز شناور ۳۲ بیتی در `console`

```wasm
(module
  (import "console" "log_mem_as_f32" (func $log_mem_as_f32 (param $byteOffset i32) (param $length i32)))
  (memory (export "mem") 1)
  (func $main
    (f32.store (i32.const 128) (f32.const 3.14))
    (f32.store (i32.const 132) (f32.const 3.14))
    (f32.store (i32.const 136) (f32.const 3.14))
    ;; Logs [3.140000104904175, 3.140000104904175, 3.140000104904175] to console
    (call $log_mem_as_u64 (i32.const 128) (i32.const 3))
  )
)
```

### `log_mem_as_f64` - لاگ یک دنباله از اعداد ممیز شناور ۶۴ بیتی در `console`

```wasm
(module
  (import "console" "log_mem_as_f64" (func $log_mem_as_f64 (param $byteOffset i32) (param $length i32)))
  (memory (export "mem") 1)
    (f64.store (i32.const 128) (f64.const 3.14))
    (f64.store (i32.const 136) (f64.const 3.14))
    (f64.store (i32.const 144) (f64.const 3.14))
    ;; Logs [3.14, 3.14, 3.14] to console
    (call $log_mem_as_u64 (i32.const 128) (i32.const 3))
  )
)
```
