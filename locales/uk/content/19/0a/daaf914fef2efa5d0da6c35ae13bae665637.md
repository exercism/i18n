# Довідка

Щоб отримати допомогу, якщо виникли труднощі, можна скористатися одним із наведених нижче ресурсів:

- [/r/WebAssembly](https://www.reddit.com/r/WebAssembly/) - це сабредіт WebAssembly.
- [Трекер завдань на Github](https://github.com/exercism/wasm/issues) - тут ми відстежуємо розробку та підтримку вправ з JavaScript в Exercism. А якщо жодне з наведених вище посилань не допомогло, можна сміливо створити тут відповідне issue.

## Як налагоджувати

На відміну від багатьох мов, код WebAssembly не має автоматичного доступу до глобальних ресурсів, як-от консоль. Натомість таку функціональність потрібно надавати через імпорти.

Щоб забезпечити функціональність, подібну до `console.log`, та ще кілька зручних дрібниць, трек WebAssembly від Exercism надає стандартну бібліотеку функцій для всіх вправ.

Ці функції потрібно імпортувати на початку модуля WebAssembly, і тоді їх можна викликати з коду WebAssembly.

Функції `log_mem_*` потребують доступу до лінійної памʼяті модуля WebAssembly. Типово це приватний стан, тож щоб зробити його доступним, потрібно експортувати лінійну памʼять під назвою експорту `mem`. Це робиться так:

```wasm
(memory (export "mem") 1)
```

## Логування локальних і глобальних змінних

Ми надаємо функції логування для кожного з примітивних типів WebAssembly. Це стає в пригоді для логування глобальних і локальних змінних.

### log_i32_s - Логування 32-бітного цілого числа зі знаком у консоль

```wasm
(module
  (import "console" "log_i32_s" (func $log_i32_s (param i32)))
  (func $main
    ;; logs -1
    (call $log_i32_s (i32.const -1))
  )
)
```

### log_i32_u - Логування 32-бітного цілого числа без знаку в консоль

```wasm
(module
  (import "console" "log_i32_u" (func $log_i32_u (param i32)))
  (func $main
    ;; Logs 42 to console
    (call $log_i32_u (i32.const 42))
  )
)
```

### log_i64_s - Логування 64-бітного цілого числа зі знаком у консоль

```wasm
(module
  (import "console" "log_i64_s" (func $log_i64_s (param i64)))
  (func $main
    ;; Logs -99 to console
    (call $log_i32_u (i64.const -99))
  )
)
```

### log_i64_u - Логування 64-бітного цілого числа без знаку в консоль

```wasm
(module
  (import "console" "log_i64_u" (func $log_i64_u (param i64)))
  (func $main
    ;; Logs 42 to console
    (call $log_i64_u (i32.const 42))
  )
)
```

### log_f32 - Логування 32-бітного числа з плаваючою комою в консоль

```wasm
(module
  (import "console" "log_f32" (func $log_f32 (param f32)))
  (func $main
    ;; Logs 3.140000104904175 to console
    (call $log_f32 (f32.const 3.14))
  )
)
```

### log_f64 - Логування 64-бітного числа з плаваючою комою в консоль

```wasm
(module
  (import "console" "log_f64" (func $log_f64 (param f64)))
  (func $main
    ;; Logs 3.14 to console
    (call $log_f64 (f64.const 3.14))
  )
)
```

## Логування з лінійної памʼяті

Лінійна памʼять WebAssembly - це масив значень із байтовою адресацією. Вона відіграє роль віртуальної памʼяті для програм WebAssembly.

Ми надаємо функції логування, які інтерпретують діапазон адрес у лінійній памʼяті як статичні масиви певних типів. Це працює подібно до TypedArrays у JavaScript. Параметри довжини вимірюються не в байтах, а в кількості послідовних елементів типу, повʼязаного з функцією.

**Щоб ці функції працювали, модуль WebAssembly має оголосити й експортувати свою лінійну памʼять під назвою експорту «mem»**

```wasm
(memory (export "mem") 1)
```

### log_mem_as_utf8 - Логування послідовності символів UTF8 у консоль

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

### log_mem_as_i8 - Логування послідовності 8-бітних цілих чисел зі знаком у консоль

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

### log_mem_as_u8 - Логування послідовності 8-бітних цілих чисел без знаку в консоль

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

### log_mem_as_i16 - Логування послідовності 16-бітних цілих чисел зі знаком у консоль

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

### log_mem_as_u16 - Логування послідовності 16-бітних цілих чисел без знаку в консоль

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

### log_mem_as_i32 - Логування послідовності 32-бітних цілих чисел зі знаком у консоль

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

### log_mem_as_u32 - Логування послідовності 32-бітних цілих чисел без знаку в консоль

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

### log_mem_as_i64 - Логування послідовності 64-бітних цілих чисел зі знаком у консоль

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

### log_mem_as_u64 - Логування послідовності 64-бітних цілих чисел без знаку в консоль

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

### log_mem_as_u64 - Логування послідовності 32-бітних чисел з плаваючою комою в консоль

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

### log_mem_as_f64 - Логування послідовності 64-бітних чисел з плаваючою комою в консоль

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
