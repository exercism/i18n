# المساعدة

للحصول على المساعدة إذا واجهت مشكلة، يمكنك الاستعانة بأحد المصادر التالية:

- [/r/WebAssembly](https://www.reddit.com/r/WebAssembly/) هو المنتدى الفرعي الخاص بـ WebAssembly على Reddit.
- [متعقّب المشكلات على Github](https://github.com/exercism/wasm/issues) هو المكان الذي نتابع فيه تطوير تمارين JavaScript على Exercism وصيانتها. ولكن إن لم تساعدك أي من الروابط أعلاه، فلا تتردد في نشر مشكلة هنا.

## كيفية استخدام Debug

بخلاف كثير من اللغات، لا يستطيع كود WebAssembly الوصول تلقائيًا إلى موارد عامة مثل وحدة التحكم. وبدلًا من ذلك، يجب توفير هذه الوظائف على شكل استيرادات.

لتوفير وظائف شبيهة بـ `console.log` وبعض المزايا الأخرى، يوفّر مسار WebAssembly في Exercism مكتبة قياسية من الدوال في جميع التمارين.

يجب استيراد هذه الدوال في أعلى وحدة WebAssembly الخاصة بك، وبعدها يمكن استدعاؤها من داخل كود WebAssembly.

تفترض دوال `log_mem_*` أن باستطاعتها الوصول إلى الذاكرة الخطية لوحدة WebAssembly الخاصة بك. وهذه حالة خاصة افتراضيًا، لذا لجعلها قابلة للوصول، يجب أن تصدّر ذاكرتك الخطية باسم التصدير "mem". ويتحقق ذلك على النحو التالي:

```wasm
(memory (export "mem") 1)
```

## تسجيل المتغيرات المحلية والعامة

نوفّر دوال تسجيل لكل نوع من الأنواع الأولية في WebAssembly. وهذا مفيد لتسجيل المتغيرات العامة والمحلية.

### log_i32_s - تسجيل عدد صحيح مُوقَّع بطول 32 بت في وحدة التحكم

```wasm
(module
  (import "console" "log_i32_s" (func $log_i32_s (param i32)))
  (func $main
    ;; logs -1
    (call $log_i32_s (i32.const -1))
  )
)
```

### log_i32_u - تسجيل عدد صحيح غير مُوقَّع بطول 32 بت في وحدة التحكم

```wasm
(module
  (import "console" "log_i32_u" (func $log_i32_u (param i32)))
  (func $main
    ;; Logs 42 to console
    (call $log_i32_u (i32.const 42))
  )
)
```

### log_i64_s - تسجيل عدد صحيح مُوقَّع بطول 64 بت في وحدة التحكم

```wasm
(module
  (import "console" "log_i64_s" (func $log_i64_s (param i64)))
  (func $main
    ;; Logs -99 to console
    (call $log_i32_u (i64.const -99))
  )
)
```

### log_i64_u - تسجيل عدد صحيح غير مُوقَّع بطول 64 بت في وحدة التحكم

```wasm
(module
  (import "console" "log_i64_u" (func $log_i64_u (param i64)))
  (func $main
    ;; Logs 42 to console
    (call $log_i64_u (i32.const 42))
  )
)
```

### log_f32 - تسجيل عدد عشري عائم بطول 32 بت في وحدة التحكم

```wasm
(module
  (import "console" "log_f32" (func $log_f32 (param f32)))
  (func $main
    ;; Logs 3.140000104904175 to console
    (call $log_f32 (f32.const 3.14))
  )
)
```

### log_f64 - تسجيل عدد عشري عائم بطول 64 بت في وحدة التحكم

```wasm
(module
  (import "console" "log_f64" (func $log_f64 (param f64)))
  (func $main
    ;; Logs 3.14 to console
    (call $log_f64 (f64.const 3.14))
  )
)
```

## التسجيل من الذاكرة الخطية

الذاكرة الخطية في WebAssembly هي مصفوفة من القيم يمكن عنونتها بالبايت. وهي تقوم مقام الذاكرة الافتراضية لبرامج WebAssembly.

نوفّر دوال تسجيل لتفسير نطاق من العناوين داخل الذاكرة الخطية على أنها مصفوفات ثابتة من أنواع معيّنة. وهذا يعمل بشكل مشابه لـ `mem` في JavaScript. ولا تُقاس معاملات الطول بالبايت، بل تُقاس بعدد العناصر المتتالية من النوع المرتبط بالدالة.

**لكي تعمل هذه الدوال، يجب أن تُعلن وحدة WebAssembly الخاصة بك ذاكرتها الخطية وتُصدّرها باستخدام اسم التصدير "mem"**

```wasm
(memory (export "mem") 1)
```

### log_mem_as_utf8 - تسجيل تسلسل من محارف UTF8 في وحدة التحكم

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

### log_mem_as_i8 - تسجيل تسلسل من الأعداد الصحيحة المُوقَّعة بطول 8 بت في وحدة التحكم

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

### log_mem_as_u8 - تسجيل تسلسل من الأعداد الصحيحة غير المُوقَّعة بطول 8 بت في وحدة التحكم

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

### log_mem_as_i16 - تسجيل تسلسل من الأعداد الصحيحة المُوقَّعة بطول 16 بت في وحدة التحكم

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

### log_mem_as_u16 - تسجيل تسلسل من الأعداد الصحيحة غير المُوقَّعة بطول 16 بت في وحدة التحكم

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

### log_mem_as_i32 - تسجيل تسلسل من الأعداد الصحيحة المُوقَّعة بطول 32 بت في وحدة التحكم

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

### log_mem_as_u32 - تسجيل تسلسل من الأعداد الصحيحة غير المُوقَّعة بطول 32 بت في وحدة التحكم

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

### log_mem_as_i64 - تسجيل تسلسل من الأعداد الصحيحة المُوقَّعة بطول 64 بت في وحدة التحكم

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

### log_mem_as_u64 - تسجيل تسلسل من الأعداد الصحيحة غير المُوقَّعة بطول 64 بت في وحدة التحكم

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

### log_mem_as_u64 - تسجيل تسلسل من الأعداد العشرية العائمة بطول 32 بت في وحدة التحكم

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

### log_mem_as_f64 - تسجيل تسلسل من الأعداد العشرية العائمة بطول 64 بت في وحدة التحكم

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
