# Instrucciones

En este ejercicio vas a procesar líneas de registro.

Cada línea de registro es un string con el siguiente formato: `"[<LEVEL>]: <MESSAGE>"`.

Hay tres niveles de registro distintos:

- `INFO`
- `WARNING`
- `ERROR`

Tienes tres tareas, y cada una recibe una línea de registro y te pide hacer algo con ella.

## 1. Obtén el mensaje de una línea de registro

Implementa la función `message` para que devuelva el mensaje de una línea de registro:

```julia-repl
julia> message("[ERROR]: Invalid operation")
"Invalid operation"
```

Hay que eliminar cualquier espacio en blanco sobrante al principio o al final:

```julia-repl
julia> message("[WARNING]:  Disk almost full\r\n")
"Disk almost full"
```

## 2. Obtén el nivel de registro de una línea de registro

Implementa la función `log_level` para que devuelva el nivel de registro de una línea de registro, que debe devolverse en minúsculas:

```julia-repl
julia> log_level("[ERROR]: Invalid operation")
"error"
```

## 3. Cambia el formato de una línea de registro

Implementa la función `reformat`, que cambia el formato de la línea de registro colocando primero el mensaje y después el nivel de registro entre paréntesis:

```julia-repl
julia> reformat("[INFO]: Operation completed")
"Operation completed (info)"
```

----

***Nota:***  Todos los strings de este ejercicio están en inglés y se limitan al conjunto de caracteres ASCII.
Los conceptos posteriores te darán la oportunidad de trabajar con caracteres Unicode.
