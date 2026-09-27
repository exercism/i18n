# Introducción

Los slices de Go son similares a las listas o los arrays de otros lenguajes.
Contienen varios elementos de un tipo concreto (o de una interfaz).

Los slices de Go se basan en los arrays.
Los arrays tienen un tamaño fijo.
Un slice, en cambio, es una vista flexible y de tamaño dinámico de los elementos de un array.

Un slice se escribe como `[]T`, donde `T` es el tipo de los elementos del slice:

```go
var empty []int                 // an empty slice
withData := []int{0,1,2,3,4,5}  // a slice pre-filled with some data
```

Puedes obtener o asignar un elemento en un índice concreto, empezando a contar desde cero, usando la notación de corchetes:

```go
withData[1] = 5
x := withData[1] // x is now 5
```

Puedes crear un slice nuevo a partir de un slice existente obteniendo un rango de elementos.
De nuevo con la notación de corchetes, pero especificando tanto un índice inicial (inclusive) como uno final (exclusive).
Si no especificas un índice inicial, su valor predeterminado es 0.
Si no especificas un índice final, su valor predeterminado es la longitud del slice.

```go
newSlice := withData[2:4]
// => []int{2,3}
newSlice := withData[:2]
// => []int{0,1}
newSlice := withData[2:]
// => []int{2,3,4,5}
newSlice := withData[:]
// => []int{0,1,2,3,4,5}
```

Puedes añadir elementos a un slice con la función `append`.
A continuación añadimos `4` y `2` al slice `a`.

```go
a := []int{1, 3}
a = append(a, 4, 2)
// => []int{1,3,4,2}
```

`append` siempre devuelve un slice nuevo y, cuando solo queremos añadir elementos a un slice existente, es habitual reasignarlo a la variable del slice que pasamos como primer argumento, como hicimos antes.

`append` también sirve para fusionar dos slices:

```go
nextSlice := []int{100,101,102}
newSlice  := append(withData, nextSlice...)
// => []int{0,1,2,3,4,5,100,101,102}
```

## Índices en los slices

Cuando trabajes con índices de slices, debes protegerlos siempre de alguna forma con una comprobación que garantice que el índice existe de verdad.
Si no lo haces, toda la aplicación se caerá.

## Slices vacíos

Los slices `nil` son el slice vacío por defecto.
No tienen ninguna desventaja frente a un slice sin valores.
La función `len` funciona con slices `nil`, se pueden añadir elementos sin inicializarlo, etc.
Si vas a crear un slice nuevo, prefiere `var s []int` (un slice `nil`) a `s := []int{}` (un slice vacío que no es `nil`).

## Rendimiento

Cuando creas slices que se van a rellenar de forma iterativa, hay una mejora fácil de aplicar para aumentar el rendimiento, si conoces el tamaño final del slice.
La clave está en minimizar el número de veces que hay que asignar memoria, algo bastante costoso que ocurre cuando el slice crece más allá del espacio de memoria que tiene asignado.
La forma más segura de hacerlo es especificar una capacidad `cap` para el slice con `s := make([]int, 0, cap)` y luego usar `append` con el slice como de costumbre.
De esta forma, se asigna de inmediato el espacio para `cap` elementos mientras la longitud del slice es cero.
En la práctica, `cap` suele ser la longitud de otro slice: `s := make([]int, 0, len(otherSlice))`.

## `append` no es una función pura

La función `append` de Go está optimizada para el rendimiento y, por lo tanto, no hace una copia del slice de entrada.
Esto significa que el slice original (el primer parámetro de `append`) a veces se modifica.
