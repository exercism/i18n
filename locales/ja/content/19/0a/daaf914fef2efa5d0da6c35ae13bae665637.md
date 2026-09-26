# ヘルプ

問題が起きたときに助けを得るには、次のリソースのいずれかを利用してください。

- [/r/WebAssembly](https://www.reddit.com/r/WebAssembly/)は、WebAssemblyのサブレディットです。
- [GitHubのイシュートラッカー](https://github.com/exercism/wasm/issues)は、ExercismにおけるJavaScriptの演習の開発と保守を進めている場所です。上のどのリンクでも解決しない場合は、ここにイシューを気軽に投稿してください。

## デバッグの方法

多くの言語とは異なり、WebAssemblyのコードは、コンソールのようなグローバルなリソースに自動的にアクセスすることはできません。そうした機能は、代わりにインポートとして用意する必要があります。

`console.log`のような機能や、そのほかいくつかの便利な機能を提供するために、ExercismのWebAssemblyトラックでは、すべての演習で共通して使える標準ライブラリの関数を公開しています。

これらの関数は、WebAssemblyモジュールの先頭でインポートする必要があり、その後、WebAssemblyのコードの中から呼び出すことができます。

`log_mem_*`関数は、WebAssemblyモジュールの線形メモリにアクセスできることを前提としています。線形メモリは既定ではプライベートな状態なので、アクセスできるようにするには、`mem`というエクスポート名で線形メモリをエクスポートする必要があります。これは次のようにして行います。

```wasm
(memory (export "mem") 1)
```

## ローカル変数とグローバル変数のログ出力

WebAssemblyのプリミティブ型ごとに、ログ出力用の関数を用意しています。これはグローバル変数やローカル変数のログ出力に便利です。

### log_i32_s - 32ビット符号付き整数をコンソールに出力

```wasm
(module
  (import "console" "log_i32_s" (func $log_i32_s (param i32)))
  (func $main
    ;; logs -1
    (call $log_i32_s (i32.const -1))
  )
)
```

### log_i32_u - 32ビット符号なし整数をコンソールに出力

```wasm
(module
  (import "console" "log_i32_u" (func $log_i32_u (param i32)))
  (func $main
    ;; Logs 42 to console
    (call $log_i32_u (i32.const 42))
  )
)
```

### log_i64_s - 64ビット符号付き整数をコンソールに出力

```wasm
(module
  (import "console" "log_i64_s" (func $log_i64_s (param i64)))
  (func $main
    ;; Logs -99 to console
    (call $log_i32_u (i64.const -99))
  )
)
```

### log_i64_u - 64ビット符号なし整数をコンソールに出力

```wasm
(module
  (import "console" "log_i64_u" (func $log_i64_u (param i64)))
  (func $main
    ;; Logs 42 to console
    (call $log_i64_u (i32.const 42))
  )
)
```

### log_f32 - 32ビット浮動小数点数をコンソールに出力

```wasm
(module
  (import "console" "log_f32" (func $log_f32 (param f32)))
  (func $main
    ;; Logs 3.140000104904175 to console
    (call $log_f32 (f32.const 3.14))
  )
)
```

### log_f64 - 64ビット浮動小数点数をコンソールに出力

```wasm
(module
  (import "console" "log_f64" (func $log_f64 (param f64)))
  (func $main
    ;; Logs 3.14 to console
    (call $log_f64 (f64.const 3.14))
  )
)
```

## 線形メモリからのログ出力

WebAssemblyの線形メモリは、バイト単位でアドレス指定できる値の配列です。これは、WebAssemblyプログラムにとっての仮想メモリに相当する役割を果たします。

線形メモリ内のアドレスの範囲を、特定の型の静的な配列として解釈するためのログ出力用の関数を用意しています。これはJavaScriptのTypedArrayに似た働きをします。`length`パラメータは、バイト数ではなく、その関数に対応する型の連続した要素の数で表します。

**これらの関数が動作するには、WebAssemblyモジュールが"mem"という名前のエクスポートを使って線形メモリを宣言し、エクスポートする必要があります。**

```wasm
(memory (export "mem") 1)
```

### log_mem_as_utf8 - UTF8文字の並びをコンソールに出力

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

### log_mem_as_i8 - 符号付き8ビット整数の並びをコンソールに出力

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

### log_mem_as_u8 - 符号なし8ビット整数の並びをコンソールに出力

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

### log_mem_as_i16 - 符号付き16ビット整数の並びをコンソールに出力

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

### log_mem_as_u16 - 符号なし16ビット整数の並びをコンソールに出力

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

### log_mem_as_i32 - 符号付き32ビット整数の並びをコンソールに出力

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

### log_mem_as_u32 - 符号なし32ビット整数の並びをコンソールに出力

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

### log_mem_as_i64 - 符号付き64ビット整数の並びをコンソールに出力

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

### log_mem_as_u64 - 符号なし64ビット整数の並びをコンソールに出力

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

### log_mem_as_u64 - 32ビット浮動小数点数の並びをコンソールに出力

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

### log_mem_as_f64 - 64ビット浮動小数点数の並びをコンソールに出力

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
