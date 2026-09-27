# সহায়তা

সমস্যায় পড়লে সহায়তা পাওয়ার জন্য আপনি নিচের রিসোর্সগুলোর যেকোনো একটি ব্যবহার করতে পারেন:

- [/r/WebAssembly](https://www.reddit.com/r/WebAssembly/) হলো WebAssembly-এর সাবরেডিট।
- [Github issue tracker](https://github.com/exercism/wasm/issues) হলো যেখানে আমরা exercism-এ Javascript অনুশীলনীগুলোর ডেভেলপমেন্ট ও মেইনটেনেন্স ট্র্যাক করি। কিন্তু উপরের কোনো লিংকই যদি আপনার কাজে না আসে, তাহলে নির্দ্বিধায় এখানে একটি ইস্যু পোস্ট করতে পারেন।

## কীভাবে ডিবাগ করবেন

অনেক ভাষার মতো নয়, WebAssembly কোড স্বয়ংক্রিয়ভাবে কনসোলের মতো গ্লোবাল রিসোর্সে অ্যাক্সেস পায় না। এই ধরনের ফাংশনালিটি বরং ইমপোর্ট হিসেবে দিতে হয়।

`console.log`-এর মতো ফাংশনালিটি ও আরও কিছু সুবিধা দেওয়ার জন্য, Exercism WebAssembly ট্র্যাক সব অনুশীলনীর জন্য একটি স্ট্যান্ডার্ড ফাংশন লাইব্রেরি দেয়।

এই ফাংশনগুলো আপনার WebAssembly মডিউলের উপরে ইমপোর্ট করতে হবে, এরপর আপনার WebAssembly কোডের ভেতর থেকে সেগুলো কল করা যাবে।

`log_mem_*` ফাংশনগুলো আপনার WebAssembly মডিউলের লিনিয়ার মেমোরিতে অ্যাক্সেস পেতে চায়। ডিফল্টভাবে এটি প্রাইভেট অবস্থা, তাই এটি অ্যাক্সেসযোগ্য করতে আপনার লিনিয়ার মেমোরি `mem` এক্সপোর্ট নামে এক্সপোর্ট করতে হবে। এটি এভাবে করা হয়:

```wasm
(memory (export "mem") 1)
```

## লোকাল ও গ্লোবাল লগ করা

আমরা প্রতিটি প্রিমিটিভ WebAssembly টাইপের জন্য লগিং ফাংশন দিই। এটি গ্লোবাল ও লোকাল ভ্যারিয়েবল লগ করার জন্য কাজে লাগে।

### log_i32_s - ৩২-বিট সাইনড ইন্টিজার কনসোলে লগ করা

```wasm
(module
  (import "console" "log_i32_s" (func $log_i32_s (param i32)))
  (func $main
    ;; logs -1
    (call $log_i32_s (i32.const -1))
  )
)
```

### log_i32_u - ৩২-বিট আনসাইনড ইন্টিজার কনসোলে লগ করা

```wasm
(module
  (import "console" "log_i32_u" (func $log_i32_u (param i32)))
  (func $main
    ;; Logs 42 to console
    (call $log_i32_u (i32.const 42))
  )
)
```

### log_i64_s - ৬৪-বিট সাইনড ইন্টিজার কনসোলে লগ করা

```wasm
(module
  (import "console" "log_i64_s" (func $log_i64_s (param i64)))
  (func $main
    ;; Logs -99 to console
    (call $log_i32_u (i64.const -99))
  )
)
```

### log_i64_u - ৬৪-বিট আনসাইনড ইন্টিজার কনসোলে লগ করা

```wasm
(module
  (import "console" "log_i64_u" (func $log_i64_u (param i64)))
  (func $main
    ;; Logs 42 to console
    (call $log_i64_u (i32.const 42))
  )
)
```

### log_f32 - ৩২-বিট ফ্লোটিং পয়েন্ট সংখ্যা কনসোলে লগ করা

```wasm
(module
  (import "console" "log_f32" (func $log_f32 (param f32)))
  (func $main
    ;; Logs 3.140000104904175 to console
    (call $log_f32 (f32.const 3.14))
  )
)
```

### log_f64 - ৬৪-বিট ফ্লোটিং পয়েন্ট সংখ্যা কনসোলে লগ করা

```wasm
(module
  (import "console" "log_f64" (func $log_f64 (param f64)))
  (func $main
    ;; Logs 3.14 to console
    (call $log_f64 (f64.const 3.14))
  )
)
```

## লিনিয়ার মেমোরি থেকে লগ করা

WebAssembly লিনিয়ার মেমোরি হলো মানের একটি বাইট-অ্যাড্রেসেবল অ্যারে। এটি WebAssembly প্রোগ্রামের জন্য ভার্চুয়াল মেমোরির সমতুল্য হিসেবে কাজ করে।

লিনিয়ার মেমোরির ভেতরে ঠিকানার একটি রেঞ্জকে নির্দিষ্ট টাইপের স্ট্যাটিক অ্যারে হিসেবে ব্যাখ্যা করার জন্য আমরা লগিং ফাংশন দিই। এটি JavaScript-এর TypedArray-এর মতো কাজ করে। length প্যারামিটারগুলো বাইটে মাপা হয় না। এগুলো ফাংশনের সাথে যুক্ত টাইপের ধারাবাহিক এলিমেন্টের সংখ্যায় মাপা হয়।

**এই ফাংশনগুলো কাজ করার জন্য, আপনার WebAssembly মডিউলকে অবশ্যই `mem` নামক এক্সপোর্ট ব্যবহার করে এর লিনিয়ার মেমোরি ডিক্লেয়ার ও এক্সপোর্ট করতে হবে**

```wasm
(memory (export "mem") 1)
```

### log_mem_as_utf8 - কনসোলে UTF8 ক্যারেক্টারের একটি সিকোয়েন্স লগ করা

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

### log_mem_as_i8 - ৮-বিট সাইনড ইন্টিজারের একটি সিকোয়েন্স কনসোলে লগ করা

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

### log_mem_as_u8 - ৮-বিট আনসাইনড ইন্টিজারের একটি সিকোয়েন্স কনসোলে লগ করা

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

### log_mem_as_i16 - ১৬-বিট সাইনড ইন্টিজারের একটি সিকোয়েন্স কনসোলে লগ করা

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

### log_mem_as_u16 - ১৬-বিট আনসাইনড ইন্টিজারের একটি সিকোয়েন্স কনসোলে লগ করা

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

### log_mem_as_i32 - ৩২-বিট সাইনড ইন্টিজারের একটি সিকোয়েন্স কনসোলে লগ করা

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

### log_mem_as_u32 - ৩২-বিট আনসাইনড ইন্টিজারের একটি সিকোয়েন্স কনসোলে লগ করা

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

### log_mem_as_i64 - ৬৪-বিট সাইনড ইন্টিজারের একটি সিকোয়েন্স কনসোলে লগ করা

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

### log_mem_as_u64 - ৬৪-বিট আনসাইনড ইন্টিজারের একটি সিকোয়েন্স কনসোলে লগ করা

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

### log_mem_as_u64 - ৩২-বিট ফ্লোটিং পয়েন্ট সংখ্যার একটি সিকোয়েন্স কনসোলে লগ করা

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

### log_mem_as_f64 - ৬৪-বিট ফ্লোটিং পয়েন্ট সংখ্যার একটি সিকোয়েন্স কনসোলে লগ করা

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
