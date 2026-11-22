# Introducción

Un programa de `jq` que se encuentra con un problema mientras procesa un valor (por ejemplo, indexar un número con un string, analizar texto JSON no válido o llamar a una función con un argumento de tipo incorrecto) lanza un **error en tiempo de ejecución**.
Un error en tiempo de ejecución no capturado hace que `jq` imprima un mensaje en la _salida de error estándar_ y salga con el estado `5`.

## Lanzar errores: `error` y `error(message)`

- `error` lanza un error cuyo valor es el valor de **entrada**.
- `error(message)` lanza un error cuyo valor es el resultado de `message`.

El valor del error puede ser _cualquier_ valor JSON, no solo un string.

```jq
42 | error("invalid value: \(.)")
# => "invalid value: 42"

42 | error
(not a string): 42
```

## Capturar errores: `try` y `catch`

Los errores se pueden capturar con `try EXP catch HANDLER`.
La primera expresión se ejecuta; si lanza un error, la expresión `HANDLER` se ejecuta **con el valor del error como su entrada**.
La salida de `try catch` es la salida de la expresión que se ejecutó en último lugar (ya sea `EXP` o `HANDLER`).

```jq
{a: 42} | try .a catch "no index a in \(.)"
# => 42

true | try .a catch "cannot index a \(type)"
# => "cannot index a boolean"

true | try error("some exception") catch .
# => "some exception"
```

La forma abreviada `try EXP` equivale a `try EXP catch empty`: el error se descarta y no se produce ninguna salida.

```jq
[{}, true, {"a": 1}] | [.[] | try .a]
# => [null, 1]
```

## Suprimir errores: el operador `?`

El operador `?`, usado como `EXP?`, es una forma abreviada de `try EXP`.
Convierte una expresión que falla en una que simplemente no produce ninguna salida.

```jq
["1", "invalid", "3", 4] | [.[] | tonumber?]
# => [1, 3, 4]
```

Se suele ver junto a los operadores de indexación: `.foo?` y `.[]?`.

## Detener el programa: `halt_error` y `halt`

`halt_error` detiene el programa, imprime su entrada en la _salida de error estándar_ como texto sin formato y sale con el estado indicado, que por defecto es `5`.
El filtro `halt`, relacionado con el anterior, detiene el programa de forma silenciosa con el estado de salida `0`.

```jq
"Error: something went wrong" | halt_error(1)
```
