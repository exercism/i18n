# Introducción

Las tablas hash en Factor son *arrays asociativos*: colecciones de pares `key/value` con búsqueda en O(1). Forman parte de la familia más amplia de [`assocs`][assocs].

## Literales de tabla hash

```factor
H{ { "coal" 1 } { "wood" 2 } } .
```

`H{ }` es una tabla hash vacía. Las tablas hash son *mutables*: crecen y se encogen a medida que agregas y quitas claves. Haz `clone` primero si necesitas dejar intacta la original. Al imprimir una tabla hash se muestran sus entradas, pero el orden no está ligado al orden de inserción: las tablas hash no tienen orden.

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

`set-at` agrega o sobrescribe; `delete-at` elimina; `change-at` ejecuta una quotation sobre el valor actual. Las tres *mutan*:

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

`inc-at` (también en [`assocs`][assocs]) suma 1 al valor que ya existe para una clave, y la inserta con 1 cuando no está. Perfecto para llevar la cuenta:

```
inc-at ( key assoc -- )
```

```factor
H{ } clone "coal" over inc-at .
! => H{ { "coal" 1 } }
```

## Iteración e inserción perezosa

`assoc-each` recorre cada par `( key value -- )`; `cache` devuelve el valor de una clave y lo calcula una sola vez con la quotation que le pases, si la clave no está.

```
assoc-each ( assoc quot: ( key value -- ) -- )
cache      ( key assoc quot: ( key -- value ) -- value )
```

`cache` es el patrón «buscar o crear» en una sola palabra: útil cuando estás construyendo una tabla hash a partir de un flujo de claves y no quieres manejar el caso de la entrada faltante en cada sitio de llamada.

## Aplicar una actualización de la tabla hash a lo largo de una secuencia de claves

Cuando la entrada es una secuencia de claves y quieres actualizar la tabla hash una vez por clave, itera la *secuencia* con `each` y usa una fried quotation `'[ _ … ]` (de [`fry`][fry]) para incorporar la tabla hash al cuerpo del bucle. Por ejemplo, quitar una lista de claves:

```factor
{ "wood" "iron" } H{ { "coal" 5 } { "wood" 3 } { "iron" 2 } } clone
[ '[ _ delete-at ] each ] keep .
! => H{ { "coal" 5 } }
```

`'[ _ delete-at ]` captura la tabla hash que está por encima en la pila, de modo que en cada iteración `each` solo necesita aportar la clave. `keep` ejecuta la quotation y a la vez conserva la tabla hash para el `.` final.

## Construir una tabla hash a partir de una secuencia

`map>assoc` (en [`assocs`][assocs]) aplica una quotation a una secuencia y reúne los resultados `( elt -- key value )` en un assoc del tipo del ejemplar:

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

`keys` y `values` se corresponden: el valor en una posición dada pertenece a la clave en esa misma posición.

`sort-keys` (en [`sorting`][sorting]) devuelve los pares `{ key value }` ordenados por clave:

```factor
H{ { "wood" 11 } { "coal" 7 } } sort-keys .
! => { { "coal" 7 } { "wood" 11 } }
```

## De los pares de vuelta a una tabla hash

`>hashtable` (en [`hashtables`][hashtables]) es la inversa de `>alist`: convierte cualquier assoc (la mayoría de las veces un alist de pares `{ key value }`) en una tabla hash con búsqueda en O(1).

```
>hashtable ( assoc -- hashtable )
```

```factor
{ { "coal" 7 } { "wood" 11 } } >hashtable .
! => H{ { "wood" 11 } { "coal" 7 } }   (entry order not guaranteed)
```

Es útil cuando armaste o transformaste una lista de pares y quieres volver a convertirla en una tabla hash para buscar entradas por clave.

[assocs]: https://docs.factorcode.org/content/vocab-assocs.html
[fry]: https://docs.factorcode.org/content/article-fry.html
[hashtables]: https://docs.factorcode.org/content/vocab-hashtables.html
[sorting]: https://docs.factorcode.org/content/vocab-sorting.html
