# Introducción

Básicamente hay dos tipos de bucles:

1. Repetir hasta que se cumpla una condición.
2. Recorrer los elementos de una colección.

Ambos son posibles en Julia, aunque el segundo suele ser más común.

## El bucle `while`

Para problemas abiertos en los que no se sabe de antemano cuántas veces se repetirá el bucle, Julia tiene el bucle `while`.

La forma básica es bastante simple:

```julia
while condition
    do_something()
end
```

En este caso, el programa seguirá repitiendo el bucle hasta que `condition` deje de ser `true`.

Hay dos maneras de salir del bucle antes de tiempo:

- Un `break` hace que el bucle termine, y la ejecución continúa en la siguiente línea después del `end` del bucle.
- Un `return x` detiene la ejecución de la función actual y devuelve el valor `x` a quien la llamó.

Con estas opciones disponibles, a veces puede ser conveniente crear un bucle «infinito» con `while true ... end` y luego depender de encontrar una condición de parada dentro del cuerpo del bucle para activar un `break` o un `return`.

## Recorrer una colección

El ejemplo más simple es recorrer un rango.

Si queremos hacer algo 10 veces:

```julia
for n in 1:10
    do_something(n)
end
```

Si la iteración actual no cumple alguna condición, es posible saltar de inmediato a la siguiente iteración con un `continue`:

```julia
for n in 1:10
    if is_useless(n)
        continue
    end
    
    # we decided this iteration could be useful
    do_something_slow(n)
end
```

En una forma más corta, el bloque `if` podría reemplazarse por `is_useless(n) && continue`.

Se pueden recorrer muchos otros tipos de colecciones: elementos en un array, caracteres en un string, claves en un diccionario...

Los ejemplos hasta ahora recorren el rango `1:10`, donde el valor también es el índice del bucle.

En general, puede que se necesite el índice y no solo el valor.
Para esto se usa la función `eachindex()`, por ejemplo `for i in eachindex(my_array) ... end`.

## Comprensiones

Escribir bucles explícitos suele ser menos común en Julia que en muchos lenguajes tradicionales, porque hay varias opciones más concisas.

Una situación especialmente común es cuando necesitamos construir un nuevo vector a partir de los elementos de alguna otra colección (vector, string, set... hay muchas posibilidades).

A quien le gusten las comprensiones de listas en Python le alegrará saber que Julia puede usar una sintaxis similar.

La esencia de esto es armar un bucle muy compacto dentro de un vector.

La sintaxis más simple tiene la forma `result = [f(x) for x in some_collection]`.

Con un bucle tradicional, eso podría escribirse así:

```julia
result = []
for x in some_collection
    push!(result, f(x))
end
```

De forma opcional, se puede agregar un condicional al final para seleccionar solo los elementos de la colección que cumplan la condición:

```julia-repl
# multiples of 3
julia> [n^2 for n in 1:10 if n%3 == 0]
3-element Vector{Int64}:
  9
 36
 81
```
