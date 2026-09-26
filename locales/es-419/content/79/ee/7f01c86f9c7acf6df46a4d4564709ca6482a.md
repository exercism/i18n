# Introducción

Un `vector` en R es una colección de valores del mismo `mode`: `numeric`, `character`, etc. Si le das valores mezclados, R los convierte en silencio a un tipo común, normalmente character, lo que puede llevar a resultados inesperados.

## Crear vectores

Si ya tienes todos los valores, usa `c()` (abreviatura de «concatenate» o «combine»):

```R
x <- 10
v <- c(4, 7, x)
```

La función `c()` es muy flexible, y sus argumentos pueden incluir otros vectores y rangos.
`c()` acepta cualquier cantidad y variedad de argumentos, y los aplana en un solo vector.

## Rangos

Para un rango de valores consecutivos (ascendentes o descendentes) puedes usar la notación `:`

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

Pero cuidado: ***R usa indexación basada en 1 por defecto***.

Esto es común en los lenguajes científicos (Fortran, Matlab, Julia), pero es distinto de la indexación basada en cero de C y de sus muchos sucesores.

Los rangos se pueden usar como en el ejemplo anterior, pero también en la muy flexible función `c()`:

```R
v <- c(4, 7, 10)
w <- c(2, v[2:3], 11) # c(2, 7, 10, 11)
```

A los `vectors` (como a casi todo en R) se los puede tratar como mutables, usando una sintaxis flexible similar para escribir en uno o varios elementos:

```R
> v <- 1:10
> v[2] <- 42
> v[4:6] <- c(11, 12, 13)
> v
 [1]  1 42  3 11 12 13  7  8  9 10
```

## Índices negativos

Quienes ya programan en otros lenguajes podrían suponer que `v[-1]` es una forma de acceder al último elemento de un vector.
¡Error!

En realidad, los índices negativos son una forma de ***eliminar*** un elemento, y devuelven un vector más corto:

```R
> v <- c(2, 4, 6)
> v[-2]
[1] 2 6  # second element gone
```
