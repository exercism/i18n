# Instrucciones

En este ejercicio vas a procesar líneas de log.

Cada línea de log es un string con el siguiente formato: `"[<LEVEL>]: <MESSAGE>"`.

Hay tres niveles de log diferentes:

- `INFO`
- `WARNING`
- `ERROR`

Tienes tres tareas, y cada una recibe una línea de log y te pide hacer algo con ella.

## 1. Obtén el mensaje de una línea de log

Implementa la función `message` para que devuelva el mensaje de una línea de log:

```julia-repl
julia> message("[ERROR]: Invalid operation")
"Invalid operation"
```

Se debe eliminar cualquier espacio en blanco al inicio o al final:

```julia-repl
julia> message("[WARNING]:  Disk almost full\r\n")
"Disk almost full"
```

## 2. Obtén el nivel de log de una línea de log

Implementa la función `log_level` para que devuelva el nivel de log de una línea de log, el cual debe devolverse en minúsculas:

```julia-repl
julia> log_level("[ERROR]: Invalid operation")
"error"
```

## 3. Reformatea una línea de log

Implementa la función `reformat` que reformatea la línea de log, poniendo el mensaje primero y el nivel de log después, entre paréntesis:

```julia-repl
julia> reformat("[INFO]: Operation completed")
"Operation completed (info)"
```

----

***Nota:***  Todos los strings de este ejercicio están en inglés y se limitan al conjunto de caracteres ASCII.
Más adelante, los conceptos te darán la oportunidad de trabajar con caracteres Unicode.
