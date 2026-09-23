# Aide

Si tu rencontres des difficultés et que tu as besoin d'aide, tu peux utiliser l'une des ressources suivantes :

- [/r/WebAssembly](https://www.reddit.com/r/WebAssembly/) est le subreddit dédié à WebAssembly.
- [Le suivi des tickets GitHub](https://github.com/exercism/wasm/issues) est l'endroit où nous gérons le développement et la maintenance des exercices JavaScript sur Exercism. Mais si aucun des liens ci-dessus ne t'aide, n'hésite pas à y ouvrir un ticket.

## Comment déboguer

Contrairement à beaucoup d'autres langages, le code WebAssembly n'a pas automatiquement accès à des ressources globales comme la console. Ce type de fonctionnalité doit donc être fourni sous forme d'imports.

Pour offrir des fonctionnalités comparables à `console.log` et quelques autres commodités, le parcours WebAssembly d'Exercism expose une bibliothèque standard de fonctions dans tous les exercices.

Ces fonctions doivent être importées en haut du module WebAssembly, puis peuvent être appelées depuis le code WebAssembly.

Les fonctions `log_mem_*` ont besoin d'accéder à la mémoire linéaire du module WebAssembly. Par défaut, celle-ci est un état privé ; pour la rendre accessible, tu dois donc exporter la mémoire linéaire sous le nom d'export `mem`. Voici comment faire :

```wasm
(memory (export "mem") 1)
```

## Journalise les variables locales et globales

Nous fournissons des fonctions de journalisation pour chacun des types primitifs de WebAssembly, ce qui est utile pour journaliser les variables globales et locales.

### log_i32_s - Journalise un entier signé de 32 bits dans la console

```wasm
(module
  (import "console" "log_i32_s" (func $log_i32_s (param i32)))
  (func $main
    ;; logs -1
    (call $log_i32_s (i32.const -1))
  )
)
```

### log_i32_u - Journalise un entier non signé de 32 bits dans la console

```wasm
(module
  (import "console" "log_i32_u" (func $log_i32_u (param i32)))
  (func $main
    ;; Logs 42 to console
    (call $log_i32_u (i32.const 42))
  )
)
```

### log_i64_s - Journalise un entier signé de 64 bits dans la console

```wasm
(module
  (import "console" "log_i64_s" (func $log_i64_s (param i64)))
  (func $main
    ;; Logs -99 to console
    (call $log_i32_u (i64.const -99))
  )
)
```

### log_i64_u - Journalise un entier non signé de 64 bits dans la console

```wasm
(module
  (import "console" "log_i64_u" (func $log_i64_u (param i64)))
  (func $main
    ;; Logs 42 to console
    (call $log_i64_u (i32.const 42))
  )
)
```

### log_f32 - Journalise un nombre à virgule flottante de 32 bits dans la console

```wasm
(module
  (import "console" "log_f32" (func $log_f32 (param f32)))
  (func $main
    ;; Logs 3.140000104904175 to console
    (call $log_f32 (f32.const 3.14))
  )
)
```

### log_f64 - Journalise un nombre à virgule flottante de 64 bits dans la console

```wasm
(module
  (import "console" "log_f64" (func $log_f64 (param f64)))
  (func $main
    ;; Logs 3.14 to console
    (call $log_f64 (f64.const 3.14))
  )
)
```

## Journalise depuis la mémoire linéaire

La mémoire linéaire de WebAssembly est un tableau de valeurs adressable octet par octet. Elle joue le rôle de mémoire virtuelle pour les programmes WebAssembly.

Nous fournissons des fonctions de journalisation pour interpréter une plage d'adresses de la mémoire linéaire comme des tableaux statiques de certains types. Cela fonctionne comme les TypedArrays de JavaScript. Les paramètres de longueur ne sont pas mesurés en octets, mais en nombre d'éléments consécutifs du type associé à la fonction.

**Pour que ces fonctions fonctionnent, ton module WebAssembly doit déclarer et exporter sa mémoire linéaire à l'aide du nom d'export "mem"**

```wasm
(memory (export "mem") 1)
```

### log_mem_as_utf8 - Journalise une séquence de caractères UTF-8 dans la console

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

### log_mem_as_i8 - Journalise une séquence d'entiers signés de 8 bits dans la console

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

### log_mem_as_u8 - Journalise une séquence d'entiers non signés de 8 bits dans la console

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

### log_mem_as_i16 - Journalise une séquence d'entiers signés de 16 bits dans la console

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

### log_mem_as_u16 - Journalise une séquence d'entiers non signés de 16 bits dans la console

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

### log_mem_as_i32 - Journalise une séquence d'entiers signés de 32 bits dans la console

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

### log_mem_as_u32 - Journalise une séquence d'entiers non signés de 32 bits dans la console

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

### log_mem_as_i64 - Journalise une séquence d'entiers signés de 64 bits dans la console

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

### log_mem_as_u64 - Journalise une séquence d'entiers non signés de 64 bits dans la console

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

### log_mem_as_u64 - Journalise une séquence de nombres à virgule flottante de 32 bits dans la console

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

### log_mem_as_f64 - Journalise une séquence de nombres à virgule flottante de 64 bits dans la console

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
