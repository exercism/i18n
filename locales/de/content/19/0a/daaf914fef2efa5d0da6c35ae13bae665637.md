# Hilfe

Wenn du nicht weiterkommst und Hilfe brauchst, kannst du eine der folgenden Ressourcen nutzen:

- [/r/WebAssembly](https://www.reddit.com/r/WebAssembly/) ist das WebAssembly-Subreddit.
- Der [GitHub-Issue-Tracker](https://github.com/exercism/wasm/issues) ist der Ort, an dem wir die Entwicklung und Pflege der JavaScript-Übungen bei Exercism verfolgen. Wenn dir keiner der obigen Links weiterhilft, kannst du dort gerne ein Issue erstellen.

## Debuggen

Anders als in vielen anderen Sprachen hat WebAssembly-Code nicht automatisch Zugriff auf globale Ressourcen wie die Konsole. Solche Funktionen müssen stattdessen als Imports bereitgestellt werden.

Um eine Funktionalität ähnlich wie `console.log` und ein paar weitere Annehmlichkeiten bereitzustellen, stellt der WebAssembly-Track von Exercism in allen Übungen eine Standardbibliothek mit Funktionen bereit.

Diese Funktionen musst du am Anfang deines WebAssembly-Moduls importieren, danach kannst du sie aus deinem WebAssembly-Code heraus aufrufen.

Die Funktionen `log_mem_*` erwarten Zugriff auf den linearen Speicher deines WebAssembly-Moduls. Standardmäßig ist dieser privat, deshalb musst du deinen linearen Speicher unter dem Exportnamen `mem` exportieren, damit er zugänglich wird. Das machst du so:

```wasm
(memory (export "mem") 1)
```

## Lokale und globale Variablen ausgeben

Für jeden der primitiven WebAssembly-Typen bieten wir eine Logging-Funktion. Das ist nützlich, um globale und lokale Variablen auszugeben.

### log_i32_s: eine vorzeichenbehaftete 32-Bit-Ganzzahl in der Konsole ausgeben

```wasm
(module
  (import "console" "log_i32_s" (func $log_i32_s (param i32)))
  (func $main
    ;; logs -1
    (call $log_i32_s (i32.const -1))
  )
)
```

### log_i32_u: eine vorzeichenlose 32-Bit-Ganzzahl in der Konsole ausgeben

```wasm
(module
  (import "console" "log_i32_u" (func $log_i32_u (param i32)))
  (func $main
    ;; Logs 42 to console
    (call $log_i32_u (i32.const 42))
  )
)
```

### log_i64_s: eine vorzeichenbehaftete 64-Bit-Ganzzahl in der Konsole ausgeben

```wasm
(module
  (import "console" "log_i64_s" (func $log_i64_s (param i64)))
  (func $main
    ;; Logs -99 to console
    (call $log_i32_u (i64.const -99))
  )
)
```

### log_i64_u: eine vorzeichenlose 64-Bit-Ganzzahl in der Konsole ausgeben

```wasm
(module
  (import "console" "log_i64_u" (func $log_i64_u (param i64)))
  (func $main
    ;; Logs 42 to console
    (call $log_i64_u (i32.const 42))
  )
)
```

### log_f32: eine 32-Bit-Gleitkommazahl in der Konsole ausgeben

```wasm
(module
  (import "console" "log_f32" (func $log_f32 (param f32)))
  (func $main
    ;; Logs 3.140000104904175 to console
    (call $log_f32 (f32.const 3.14))
  )
)
```

### log_f64: eine 64-Bit-Gleitkommazahl in der Konsole ausgeben

```wasm
(module
  (import "console" "log_f64" (func $log_f64 (param f64)))
  (func $main
    ;; Logs 3.14 to console
    (call $log_f64 (f64.const 3.14))
  )
)
```

## Aus dem linearen Speicher ausgeben

Der lineare Speicher von WebAssembly ist ein byte-adressierbares Array von Werten. Er dient als das Äquivalent des virtuellen Speichers für WebAssembly-Programme.

Wir bieten Logging-Funktionen, die einen Bereich von Adressen im linearen Speicher als statische Arrays bestimmter Typen interpretieren. Das funktioniert ähnlich wie die TypedArrays von JavaScript. Die Längenparameter werden nicht in Bytes gemessen, sondern in der Anzahl aufeinanderfolgender Elemente des Typs, der zur jeweiligen Funktion gehört.

**Damit diese Funktionen funktionieren, muss dein WebAssembly-Modul seinen linearen Speicher deklarieren und ihn unter dem Exportnamen "mem" exportieren**

```wasm
(memory (export "mem") 1)
```

### log_mem_as_utf8: eine Folge von UTF8-Zeichen in der Konsole ausgeben

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

### log_mem_as_i8: eine Folge vorzeichenbehafteter 8-Bit-Ganzzahlen in der Konsole ausgeben

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

### log_mem_as_u8: eine Folge vorzeichenloser 8-Bit-Ganzzahlen in der Konsole ausgeben

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

### log_mem_as_i16: eine Folge vorzeichenbehafteter 16-Bit-Ganzzahlen in der Konsole ausgeben

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

### log_mem_as_u16: eine Folge vorzeichenloser 16-Bit-Ganzzahlen in der Konsole ausgeben

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

### log_mem_as_i32: eine Folge vorzeichenbehafteter 32-Bit-Ganzzahlen in der Konsole ausgeben

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

### log_mem_as_u32: eine Folge vorzeichenloser 32-Bit-Ganzzahlen in der Konsole ausgeben

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

### log_mem_as_i64: eine Folge vorzeichenbehafteter 64-Bit-Ganzzahlen in der Konsole ausgeben

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

### log_mem_as_u64: eine Folge vorzeichenloser 64-Bit-Ganzzahlen in der Konsole ausgeben

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

### log_mem_as_u64: eine Folge von 32-Bit-Gleitkommazahlen in der Konsole ausgeben

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

### log_mem_as_f64: eine Folge von 64-Bit-Gleitkommazahlen in der Konsole ausgeben

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
