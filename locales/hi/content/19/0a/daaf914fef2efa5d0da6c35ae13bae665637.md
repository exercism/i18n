# मदद

अगर आपको कोई दिक्कत आ रही है और मदद चाहिए, तो आप नीचे दिए गए संसाधनों में से किसी एक का इस्तेमाल कर सकते हैं:

- [/r/WebAssembly](https://www.reddit.com/r/WebAssembly/) WebAssembly का सबरेडिट है।
- [Github इश्यू ट्रैकर](https://github.com/exercism/wasm/issues) वह जगह है जहाँ हम exercism में Javascript अभ्यासों के विकास और रखरखाव पर नज़र रखते हैं। लेकिन अगर ऊपर दिए गए लिंक में से कोई भी आपकी मदद न करे, तो यहाँ एक इश्यू पोस्ट करने में संकोच न कीजिए।

## डीबग कैसे करें

बहुत सी भाषाओं के उलट, WebAssembly कोड को कंसोल जैसे ग्लोबल संसाधनों तक अपने आप पहुँच नहीं मिलती। इसके बजाय ऐसी सुविधाएँ इम्पोर्ट के ज़रिए देनी पड़ती हैं।

`console.log` जैसी सुविधा और कुछ और अच्छी चीज़ें देने के लिए, Exercism का WebAssembly ट्रैक सभी अभ्यासों में फंक्शनों की एक स्टैंडर्ड लाइब्रेरी उपलब्ध कराता है।

इन फंक्शनों को आपके WebAssembly मॉड्यूल के ऊपर इम्पोर्ट करना होता है, और उसके बाद उन्हें आपके WebAssembly कोड के अंदर से कॉल किया जा सकता है।

`log_mem_*` फंक्शन आपके WebAssembly मॉड्यूल की लीनियर मेमोरी तक पहुँच पाने की उम्मीद करते हैं। डिफॉल्ट रूप से यह निजी होती है, इसलिए इसे सुलभ बनाने के लिए आपको अपनी लीनियर मेमोरी को `mem` नाम से एक्सपोर्ट करना होगा। यह इस तरह किया जाता है:

```wasm
(memory (export "mem") 1)
```

## लोकल और ग्लोबल वेरिएबलो को लॉग करना

WebAssembly के हर प्रिमिटिव टाइप के लिए हम लॉगिंग फंक्शन देते हैं। यह ग्लोबल और लोकल वेरिएबलो को लॉग करने के लिए काम आता है।

### log_i32_s - कंसोल पर 32-बिट साइन्ड इंटीजर लॉग कीजिए

```wasm
(module
  (import "console" "log_i32_s" (func $log_i32_s (param i32)))
  (func $main
    ;; logs -1
    (call $log_i32_s (i32.const -1))
  )
)
```

### log_i32_u - कंसोल पर 32-बिट अनसाइन्ड इंटीजर लॉग कीजिए

```wasm
(module
  (import "console" "log_i32_u" (func $log_i32_u (param i32)))
  (func $main
    ;; Logs 42 to console
    (call $log_i32_u (i32.const 42))
  )
)
```

### log_i64_s - कंसोल पर 64-बिट साइन्ड इंटीजर लॉग कीजिए

```wasm
(module
  (import "console" "log_i64_s" (func $log_i64_s (param i64)))
  (func $main
    ;; Logs -99 to console
    (call $log_i32_u (i64.const -99))
  )
)
```

### log_i64_u - कंसोल पर 64-बिट अनसाइन्ड इंटीजर लॉग कीजिए

```wasm
(module
  (import "console" "log_i64_u" (func $log_i64_u (param i64)))
  (func $main
    ;; Logs 42 to console
    (call $log_i64_u (i32.const 42))
  )
)
```

### log_f32 - कंसोल पर 32-बिट फ्लोटिंग पॉइंट संख्या लॉग कीजिए

```wasm
(module
  (import "console" "log_f32" (func $log_f32 (param f32)))
  (func $main
    ;; Logs 3.140000104904175 to console
    (call $log_f32 (f32.const 3.14))
  )
)
```

### log_f64 - कंसोल पर 64-बिट फ्लोटिंग पॉइंट संख्या लॉग कीजिए

```wasm
(module
  (import "console" "log_f64" (func $log_f64 (param f64)))
  (func $main
    ;; Logs 3.14 to console
    (call $log_f64 (f64.const 3.14))
  )
)
```

## लीनियर मेमोरी से लॉग करना

WebAssembly की लीनियर मेमोरी वैल्यूओं का एक ऐसा ऐरे है जिसे बाइट के हिसाब से एड्रेस किया जा सकता है। यह WebAssembly प्रोग्रामों के लिए वर्चुअल मेमोरी जैसा काम करती है

हम ऐसे लॉगिंग फंक्शन देते हैं जो लीनियर मेमोरी में एड्रेस की एक रेंज को कुछ खास टाइप के स्टैटिक ऐरे की तरह पढ़ लेते हैं। यह JavaScript के TypedArrays जैसा काम करता है। लंबाई (length) के पैरामीटर बाइट में नहीं नापे जाते। ये उस टाइप के लगातार एलिमेंट की संख्या में नापे जाते हैं जिससे फंक्शन जुड़ा है।

**इन फंक्शनों के काम करने के लिए ज़रूरी है कि आपका WebAssembly मॉड्यूल "mem" नाम के एक्सपोर्ट से अपनी लीनियर मेमोरी को घोषित और एक्सपोर्ट करे**

```wasm
(memory (export "mem") 1)
```

### log_mem_as_utf8 - कंसोल पर UTF8 अक्षरों का एक क्रम लॉग कीजिए

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

### log_mem_as_i8 - कंसोल पर साइन्ड 8-बिट इंटीजर का एक क्रम लॉग कीजिए

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

### log_mem_as_u8 - कंसोल पर अनसाइन्ड 8-बिट इंटीजर का एक क्रम लॉग कीजिए

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

### log_mem_as_i16 - कंसोल पर साइन्ड 16-बिट इंटीजर का एक क्रम लॉग कीजिए

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

### log_mem_as_u16 - कंसोल पर अनसाइन्ड 16-बिट इंटीजर का एक क्रम लॉग कीजिए

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

### log_mem_as_i32 - कंसोल पर साइन्ड 32-बिट इंटीजर का एक क्रम लॉग कीजिए

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

### log_mem_as_u32 - कंसोल पर अनसाइन्ड 32-बिट इंटीजर का एक क्रम लॉग कीजिए

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

### log_mem_as_i64 - कंसोल पर साइन्ड 64-बिट इंटीजर का एक क्रम लॉग कीजिए

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

### log_mem_as_u64 - कंसोल पर अनसाइन्ड 64-बिट इंटीजर का एक क्रम लॉग कीजिए

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

### log_mem_as_u64 - कंसोल पर 32-बिट फ्लोटिंग पॉइंट संख्याओं का एक क्रम लॉग कीजिए

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

### log_mem_as_f64 - कंसोल पर 64-बिट फ्लोटिंग पॉइंट संख्याओं का एक क्रम लॉग कीजिए

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
