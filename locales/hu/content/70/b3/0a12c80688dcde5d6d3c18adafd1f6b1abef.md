# Utasítások

Ebben a feladatban naplósorokat dolgozol fel.

Minden naplósor egy karakterlánc, amelynek formátuma a következő: `"[<LEVEL>]: <MESSAGE>"`.

Három különböző naplózási szint van:

- `INFO`
- `WARNING`
- `ERROR`

Három részfeladat vár rád, és mindegyik kap egy naplósort, amelyikkel valamit tenned kell.

## 1. Üzenet kinyerése egy naplósorból

Valósítsd meg a `message` függvényt, amely visszaadja a naplósor üzenetét:

```julia-repl
julia> message("[ERROR]: Invalid operation")
"Invalid operation"
```

A vezető és a záró szóközt el kell távolítani:

```julia-repl
julia> message("[WARNING]:  Disk almost full\r\n")
"Disk almost full"
```

## 2. Naplózási szint kinyerése egy naplósorból

Valósítsd meg a `log_level` függvényt, amely visszaadja a naplósor naplózási szintjét, méghozzá kisbetűvel:

```julia-repl
julia> log_level("[ERROR]: Invalid operation")
"error"
```

## 3. Naplósor újraformázása

Valósítsd meg a `reformat` függvényt, amely újraformázza a naplósort: az üzenetet előre teszi, a naplózási szintet pedig utána, zárójelben:

```julia-repl
julia> reformat("[INFO]: Operation completed")
"Operation completed (info)"
```

----

***Megjegyzés:***  Ebben a feladatban minden karakterlánc angol nyelvű, és az ASCII-karakterkészletre korlátozódik.
A későbbi fogalmak során lehetőséged nyílik majd Unicode-karakterekkel dolgozni.
