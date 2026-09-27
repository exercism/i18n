# 도움말

문제가 생겼을 때 도움을 받으려면 다음 자료 중 하나를 이용해 봐요:

- [/r/WebAssembly](https://www.reddit.com/r/WebAssembly/)는 WebAssembly 서브레딧이에요.
- [Github 이슈 트래커](https://github.com/exercism/wasm/issues)는 Exercism에서 Javascript 연습 문제의 개발과 유지 관리를 추적하는 곳이에요. 하지만 위의 링크가 도움이 되지 않는다면, 여기에 자유롭게 이슈를 남겨 주세요.

## 디버그하는 방법

많은 언어와 달리, WebAssembly 코드는 콘솔과 같은 전역 자원에 자동으로 접근할 수 없어요. 그런 기능은 대신 임포트로 제공해야 해요.

`console.log`와 비슷한 기능과 몇 가지 편의 기능을 제공하기 위해, Exercism WebAssembly 트랙은 모든 연습 문제에서 사용할 수 있는 표준 함수 라이브러리를 제공해요.

이 함수들은 WebAssembly 모듈의 맨 위에서 임포트해야 하고, 그런 다음 WebAssembly 코드 안에서 호출할 수 있어요.

`log_mem_*` 함수들은 WebAssembly 모듈의 선형 메모리에 접근할 수 있어야 해요. 기본적으로 선형 메모리는 비공개 상태이므로, 접근할 수 있게 하려면 선형 메모리를 `mem`이라는 내보내기 이름으로 내보내야 해요. 방법은 다음과 같아요:

```wasm
(memory (export "mem") 1)
```

## 지역 변수와 전역 변수 로깅하기

저희는 WebAssembly의 각 원시 타입마다 로깅 함수를 제공해요. 이 함수들은 전역 변수와 지역 변수를 로그로 남길 때 유용해요.

### log_i32_s - 32비트 부호 있는 정수를 콘솔에 로그로 남기기

```wasm
(module
  (import "console" "log_i32_s" (func $log_i32_s (param i32)))
  (func $main
    ;; logs -1
    (call $log_i32_s (i32.const -1))
  )
)
```

### log_i32_u - 32비트 부호 없는 정수를 콘솔에 로그로 남기기

```wasm
(module
  (import "console" "log_i32_u" (func $log_i32_u (param i32)))
  (func $main
    ;; Logs 42 to console
    (call $log_i32_u (i32.const 42))
  )
)
```

### log_i64_s - 64비트 부호 있는 정수를 콘솔에 로그로 남기기

```wasm
(module
  (import "console" "log_i64_s" (func $log_i64_s (param i64)))
  (func $main
    ;; Logs -99 to console
    (call $log_i32_u (i64.const -99))
  )
)
```

### log_i64_u - 64비트 부호 없는 정수를 콘솔에 로그로 남기기

```wasm
(module
  (import "console" "log_i64_u" (func $log_i64_u (param i64)))
  (func $main
    ;; Logs 42 to console
    (call $log_i64_u (i32.const 42))
  )
)
```

### log_f32 - 32비트 부동 소수점 수를 콘솔에 로그로 남기기

```wasm
(module
  (import "console" "log_f32" (func $log_f32 (param f32)))
  (func $main
    ;; Logs 3.140000104904175 to console
    (call $log_f32 (f32.const 3.14))
  )
)
```

### log_f64 - 64비트 부동 소수점 수를 콘솔에 로그로 남기기

```wasm
(module
  (import "console" "log_f64" (func $log_f64 (param f64)))
  (func $main
    ;; Logs 3.14 to console
    (call $log_f64 (f64.const 3.14))
  )
)
```

## 선형 메모리에서 로깅하기

WebAssembly 선형 메모리는 바이트 단위로 주소를 지정할 수 있는 값의 배열이에요. 이는 WebAssembly 프로그램의 가상 메모리에 해당하는 역할을 해요.

저희는 선형 메모리 안의 주소 범위를 특정 타입의 정적 배열로 해석하는 로깅 함수를 제공해요. 이는 JavaScript의 TypedArray와 비슷하게 동작해요. length 매개변수는 바이트 단위가 아니라, 함수와 연결된 타입의 연속된 원소 개수로 측정해요.

**이 함수들이 동작하려면, WebAssembly 모듈이 선형 메모리를 "mem"이라는 이름의 내보내기로 선언하고 내보내야 해요**

```wasm
(memory (export "mem") 1)
```

### log_mem_as_utf8 - 일련의 UTF8 문자를 콘솔에 로그로 남기기

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

### log_mem_as_i8 - 일련의 부호 있는 8비트 정수를 콘솔에 로그로 남기기

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

### log_mem_as_u8 - 일련의 부호 없는 8비트 정수를 콘솔에 로그로 남기기

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

### log_mem_as_i16 - 일련의 부호 있는 16비트 정수를 콘솔에 로그로 남기기

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

### log_mem_as_u16 - 일련의 부호 없는 16비트 정수를 콘솔에 로그로 남기기

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

### log_mem_as_i32 - 일련의 부호 있는 32비트 정수를 콘솔에 로그로 남기기

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

### log_mem_as_u32 - 일련의 부호 없는 32비트 정수를 콘솔에 로그로 남기기

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

### log_mem_as_i64 - 일련의 부호 있는 64비트 정수를 콘솔에 로그로 남기기

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

### log_mem_as_u64 - 일련의 부호 없는 64비트 정수를 콘솔에 로그로 남기기

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

### log_mem_as_u64 - 일련의 32비트 부동 소수점 수를 콘솔에 로그로 남기기

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

### log_mem_as_f64 - 일련의 64비트 부동 소수점 수를 콘솔에 로그로 남기기

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
