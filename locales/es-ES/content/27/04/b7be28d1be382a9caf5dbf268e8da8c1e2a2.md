# Introducción

Básicamente hay dos tipos de bucles:

1. Repetir hasta que se cumpla una condición.
2. Recorrer los elementos de una colección.

Ambos son posibles en Julia, aunque el segundo puede ser más habitual.

## El bucle `while`

Para problemas abiertos en los que no se sabe de antemano cuántas veces habrá que repetir el bucle, Julia tiene el bucle `while`.

La forma básica es bastante sencilla:

```julia
while condition
    do_something()
end
```

En este caso, el programa seguirá dando vueltas al bucle hasta que `condition` deje de ser `true`.

Hay dos formas de salir del bucle antes de tiempo:

- Un `break` hace que se salga del bucle y que la ejecución continúe en la línea siguiente al `end` del bucle.
- Un `return x` detiene la ejecución de la función actual y devuelve el valor `x` a quien la haya llamado.

Con estas opciones disponibles, a veces puede resultar cómodo crear un bucle «infinito» con `while true ... end` y confiar en encontrar una condición de parada dentro del cuerpo del bucle que active un `break` o un `return`.

## Recorrer una colección

El ejemplo más sencillo es recorrer un rango.

Si queremos hacer algo 10 veces:

```julia
for n in 1:10
    do_something(n)
end
```

Si la iteración actual no cumple alguna condición, es posible pasar inmediatamente a la siguiente iteración con un `continue`:

```julia
for n in 1:10
    if is_useless(n)
        continue
    end
    
    # we decided this iteration could be useful
    do_something_slow(n)
end
```

En una forma más corta, el bloque `if` podría sustituirse por `is_useless(n) && continue`.

Se pueden recorrer muchos otros tipos de colecciones: los elementos de un array, los caracteres de un string, las claves de un diccionario...

Los ejemplos anteriores recorren el rango `1:10`, donde el valor es también el índice del bucle.

En general, puede que se necesite el índice y no solo el valor.
Para eso se usa la función `eachindex()`, por ejemplo `for i in eachindex(my_array) ... end`.

## Comprensión de arrays

Escribir bucles explícitos suele ser menos habitual en Julia que en muchos lenguajes tradicionales, porque hay varias opciones más concisas.

Una situación especialmente habitual es cuando necesitamos construir un vector nuevo a partir de los elementos de otra colección (un vector, un string, un conjunto... hay muchas posibilidades).

A quien le gusten las listas por comprensión de Python le alegrará saber que Julia puede usar una sintaxis similar.

La esencia de esto es crear un bucle muy compacto dentro de un vector.

La sintaxis más sencilla tiene la forma `result = [f(x) for x in some_collection]`.

Con un bucle tradicional, eso podría escribirse así:

```julia
result = []
for x in some_collection
    push!(result, f(x))
end
```

Opcionalmente, se puede añadir un condicional al final para seleccionar solo los elementos de la colección que cumplan la condición:

```julia-repl
# multiples of 3
julia> [n^2 for n in 1:10 if n%3 == 0]
3-element Vector{Int64}:
  9
 36
 81
```
