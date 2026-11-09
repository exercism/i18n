# Introducción

Un `vector` en R es una colección de valores del mismo `mode`: `numeric`, `character`, etc. Si se le dan entradas de tipos mezclados, R las convertirá en silencio a un tipo común, normalmente character, lo que puede dar lugar a resultados inesperados.

## Crear vectores

Si ya tienes todos los valores, usa `c()` (abreviatura de «concatenate» o «combine»):

```R
x <- 10
v <- c(4, 7, x)
```

La función `c()` es muy flexible, y sus entradas pueden incluir otros vectores y rangos.
`c()` acepta cualquier número y variedad de entradas y las aplana en un único vector.

## Rangos

Para un rango de valores consecutivos (crecientes o decrecientes) puedes usar la notación `:`

```R
v <- 1:5 # equivalent to c(1, 2, 3, 4, 5)
w <- 10:7 # c(10, 9, 8, 7)
```

## Acceder a los elementos de un vector

Como en muchos lenguajes, podemos usar el índice entre corchetes:

```R
> v <- 4:7
> v[2]
[1] 5
> v[2:4]
[1] 5 6 7
```

Pero cuidado: ***R usa por defecto indexación basada en 1***.

Esto es habitual en los lenguajes científicos (Fortran, Matlab, Julia), pero difiere de la indexación basada en cero de C y de sus muchos sucesores.

Se pueden usar rangos, como en el ejemplo anterior, pero también en la función `c()`, que es muy flexible:

```R
v <- c(4, 7, 10)
w <- c(2, v[2:3], 11) # c(2, 7, 10, 11)
```

Los `vectors` (como casi todo en R) se pueden tratar como mutables, usando una sintaxis flexible similar para escribir en uno o varios elementos:

```R
> v <- 1:10
> v[2] <- 42
> v[4:6] <- c(11, 12, 13)
> v
 [1]  1 42  3 11 12 13  7  8  9 10
```

## Índices negativos

Si estás familiarizado con otros lenguajes, podrías pensar que `v[-1]` es una forma de acceder al último elemento de un vector.
¡Error!

Los índices negativos son en realidad una forma de ***eliminar*** un elemento, devolviendo un vector más corto:

```R
> v <- c(2, 4, 6)
> v[-2]
[1] 2 6  # second element gone
```
