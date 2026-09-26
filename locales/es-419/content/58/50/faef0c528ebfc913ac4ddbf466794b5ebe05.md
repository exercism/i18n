# Introducción

Los slices en Go son similares a las listas o los arrays de otros lenguajes.
Contienen varios elementos de un tipo específico (o de una interfaz).

Los slices en Go se basan en arrays.
Los arrays tienen un tamaño fijo.
Un slice, en cambio, es una vista flexible y de tamaño dinámico de los elementos de un array.

Un slice se escribe como `[]T`, donde `T` es el tipo de los elementos del slice:

```go
var empty []int                 // an empty slice
withData := []int{0,1,2,3,4,5}  // a slice pre-filled with some data
```

Puedes obtener o establecer un elemento en un índice dado, con base cero, usando la notación de corchetes:

```go
withData[1] = 5
x := withData[1] // x is now 5
```

Puedes crear un slice nuevo a partir de un slice existente obteniendo un rango de elementos.
De nuevo con la notación de corchetes, pero especificando tanto un índice inicial (incluido) como uno final (excluido).
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

Puedes agregar elementos a un slice con la función `append`.
A continuación agregamos `4` y `2` al slice `a`.

```go
a := []int{1, 3}
a = append(a, 4, 2)
// => []int{1,3,4,2}
```

`append` siempre devuelve un slice nuevo, y cuando solo queremos agregar elementos a un slice existente, es común reasignarlo a la variable del slice que pasamos como primer argumento, tal como hicimos arriba.

`append` también se puede usar para fusionar dos slices:

```go
nextSlice := []int{100,101,102}
newSlice  := append(withData, nextSlice...)
// => []int{0,1,2,3,4,5,100,101,102}
```

## Índices en los slices

Trabajar con índices de slices siempre debe protegerse de alguna manera con una comprobación que asegure que el índice realmente existe.
Si no lo haces, provocarás que toda la aplicación se caiga.

## Slices vacíos

Los slices `nil` son el slice vacío predeterminado.
No tienen ninguna desventaja frente a un slice que no tiene valores.
La función `len` funciona con slices `nil`, se pueden agregar elementos sin inicializarlo, y así sucesivamente.
Si vas a crear un slice nuevo, prefiere `var s []int` (slice `nil`) en lugar de `s := []int{}` (slice vacío y no `nil`).

## Rendimiento

Cuando creas slices que se van a llenar de forma iterativa, hay una mejora fácil para aumentar el rendimiento, si conoces el tamaño final del slice.
La clave es minimizar la cantidad de veces que hay que asignar memoria, algo bastante costoso que ocurre si el slice crece más allá del espacio de memoria que tiene asignado.
La forma más segura de hacerlo es especificar una capacidad `cap` para el slice con `s := make([]int, 0, cap)` y luego usar `append` en el slice como siempre.
Así, el espacio para `cap` cantidad de elementos se asigna de inmediato mientras la longitud del slice es cero.
En la práctica, `cap` suele ser la longitud de otro slice: `s := make([]int, 0, len(otherSlice))`.

## `append` no es una función pura

La función `append` de Go está optimizada para el rendimiento y, por lo tanto, no hace una copia del slice de entrada.
Esto significa que el slice original (el primer parámetro de `append`) a veces se modificará.
