# Introducción

Las tablas hash en Factor son *arrays asociativos*: colecciones de pares `key/value` con búsqueda en O(1). Forman parte de la familia más amplia de [`assocs`][assocs].

## Literales de tabla hash

```factor
H{ { "coal" 1 } { "wood" 2 } } .
```

`H{ }` es una tabla hash vacía. Las tablas hash son *mutables*: crecen y se encogen a medida que añades y eliminas claves. Si necesitas dejar intacta la original, `clone` primero. Imprimir una tabla hash muestra sus entradas, pero el orden no está ligado al orden de inserción: las tablas hash no tienen orden.

## Lectura

`at` (en [`assocs`][assocs]) lee un valor y devuelve `f` si la clave no está:

```
at      ( key assoc -- value/f )
key?    ( key assoc -- ? )
```

```factor
"coal" H{ { "coal" 1 } { "wood" 2 } } at .   ! => 1
"gold" H{ { "coal" 1 } { "wood" 2 } } at .   ! => f
```

## Escritura

`set-at` añade o sobrescribe; `delete-at` elimina; `change-at` ejecuta una quotation sobre el valor actual. Las tres *mutan*:

```
set-at     ( value key assoc -- )
delete-at  ( key assoc -- )
change-at  ( key assoc quot: ( old -- new ) -- )
```

```factor
H{ } clone 5 "coal" pick set-at .
! => H{ { "coal" 5 } }
```

## `inc-at`: el atajo para contar

`inc-at` (también en [`assocs`][assocs]) suma 1 al valor existente de una clave y la inserta con valor 1 cuando falta. Perfecto para llevar la cuenta:

```
inc-at ( key assoc -- )
```

```factor
H{ } clone "coal" over inc-at .
! => H{ { "coal" 1 } }
```

## Iteración e inserción diferida

`assoc-each` recorre cada par `( key value -- )`; `cache` devuelve el valor de una clave y lo calcula una sola vez con la quotation proporcionada si la clave no está.

```
assoc-each ( assoc quot: ( key value -- ) -- )
cache      ( key assoc quot: ( key -- value ) -- value )
```

`cache` es el patrón «buscar o crear» en una sola palabra: resulta muy útil cuando construyes una tabla hash a partir de un flujo de claves y no quieres gestionar el caso de la entrada ausente en cada punto de llamada.

## Aplicar una actualización de tabla hash a lo largo de una secuencia de claves

Cuando la entrada es una secuencia de claves y quieres actualizar la tabla hash una vez por clave, itera la *secuencia* con `each` y usa una quotation frita `'[ _ … ]` (de [`fry`][fry]) para incorporar la tabla hash al cuerpo del bucle. Por ejemplo, para eliminar varias claves:

```factor
{ "wood" "iron" } H{ { "coal" 5 } { "wood" 3 } { "iron" 2 } } clone
[ '[ _ delete-at ] each ] keep .
! => H{ { "coal" 5 } }
```

`'[ _ delete-at ]` captura la tabla hash que tiene encima en la pila, de modo que en cada iteración `each` solo necesita aportar la clave. `keep` ejecuta la quotation a la vez que conserva la tabla hash para el `.` final.

## Construir una tabla hash a partir de una secuencia

`map>assoc` (en [`assocs`][assocs]) aplica una quotation a lo largo de una secuencia y recoge los resultados `( elt -- key value )` en un assoc del tipo del exemplar:

```
map>assoc ( seq quot: ( elt -- key value ) exemplar -- assoc )
```

```factor
{ "wood" } [ dup length ] H{ } map>assoc .
! => H{ { "wood" 4 } }
```

## Claves, valores y pares

`keys` y `values` (en [`assocs`][assocs]) devuelven solo las claves o solo los valores; `>alist` devuelve los pares `{ key value }`.

```
keys   ( assoc -- keys )
values ( assoc -- values )
>alist ( assoc -- alist )
```

```factor
H{ { "wood" 11 } { "coal" 7 } } keys .     ! the keys (order not guaranteed)
H{ { "wood" 11 } { "coal" 7 } } values .   ! the matching values
```

`keys` y `values` se corresponden: el valor de una posición dada pertenece a la clave de esa misma posición.

`sort-keys` (en [`sorting`][sorting]) devuelve los pares `{ key value }` ordenados por clave:

```factor
H{ { "wood" 11 } { "coal" 7 } } sort-keys .
! => { { "coal" 7 } { "wood" 11 } }
```

## De pares de vuelta a una tabla hash

`>hashtable` (en [`hashtables`][hashtables]) es la inversa de `>alist`: convierte cualquier assoc (lo más habitual, un alist de pares `{ key value }`) en una tabla hash con búsqueda en O(1).

```
>hashtable ( assoc -- hashtable )
```

```factor
{ { "coal" 7 } { "wood" 11 } } >hashtable .
! => H{ { "wood" 11 } { "coal" 7 } }   (entry order not guaranteed)
```

Resulta útil cuando has reunido o transformado una serie de pares y quieres volver a convertirla en una tabla hash para buscar entradas por clave.

[assocs]: https://docs.factorcode.org/content/vocab-assocs.html
[fry]: https://docs.factorcode.org/content/article-fry.html
[hashtables]: https://docs.factorcode.org/content/vocab-hashtables.html
[sorting]: https://docs.factorcode.org/content/vocab-sorting.html
