# Instrucciones

Como futura maga, Elyse necesita practicar algunos conceptos básicos.
Tiene una pila de cartas que quiere manipular.

Para que todo sea un poco más fácil, solo usa las cartas del 1 al 10, así que su pila de cartas se puede representar con un array de números.
La posición de una carta determinada corresponde al índice en el array.
Eso significa que la posición 0 se refiere a la primera carta, la posición 1 a la segunda, etc.

~~~~exercism/note
Todas las funciones deben actualizar el array de cartas y luego devolver el array modificado. Esta es una forma de trabajar muy común, conocida como patrón Builder, que te permite encadenar funciones de manera muy cómoda.
~~~~

## 1. Obtén una carta de la pila

Para elegir una carta, devuelve la carta que está en el índice `position` de la pila dada.

Implementa la función `getCard(at:from:)`, que recibe dos argumentos: `at`, que es la posición de la carta en la pila, y `from`, que es la pila de cartas.
La función debe devolver la carta que está en la posición `index` de la pila dada.

```swift
let index = 2
getCard(at: index, from: [1, 2, 4, 1])
// returns 4
```

## 2. Cambia una carta de la pila

Haz un poco de prestidigitación e intercambia la carta que está en el índice `position` por la carta de reemplazo que se proporciona.

Implementa la función `setCard(at:in:to)`, que recibe tres argumentos: `at`, que es la posición de la carta en la pila; `in`, que es la pila de cartas; y `to`, que es la nueva carta que va a reemplazar a la carta que está en la posición `index`.
La función debe devolver una copia de la pila con la carta que está en la posición `index` reemplazada por la nueva carta.
Si el `index` dado no es un índice válido en la pila, se debe devolver la pila original, sin cambios.

```swift
let index = 2
let newCard = 6
setCard(at: index, in: [1, 2, 4, 1], to: newCard)
// returns [1, 2, 6, 1]
```

## 3. Inserta una carta en la parte superior de la pila

Haz aparecer una carta insertando una nueva carta en la parte superior de la pila.

Implementa la función `insert(_:atTopOf:)`, que recibe dos argumentos: la nueva carta que se va a insertar y la pila de cartas.
La función debe devolver una copia de la pila con la nueva carta proporcionada agregada en la parte superior de la pila.

```swift
let newCard = 8
insert(newCard, atTopOf: [5, 9, 7, 1])
// returns [5, 9, 7, 1, 8]
```

## 4. Elimina una carta de la pila

Haz desaparecer una carta eliminando de la pila la carta que está en la `position` dada.

Implementa la función `removeCard(at:from:)`, que recibe dos argumentos: `at`, que es la posición de la carta en la pila, y `from`, que es la pila de cartas.
La función debe devolver una copia de la pila con la carta que está en la posición `index` eliminada.
Si el `index` dado no es un índice válido en la pila, se debe devolver la pila original, sin cambios.

```swift
let index = 2
removeCard(at: index, from: [3, 2, 6, 4, 8])
// returns [3, 2, 4, 8]
```

## 5. Inserta una carta en la pila

Haz aparecer una carta insertando una nueva carta en la `position` dada dentro de la pila.

Implementa la función `insert(_:at:from:)`, que recibe tres argumentos: la nueva carta que se va a insertar, la posición en la que se debe insertar la nueva carta y la pila de cartas.
La función debe devolver una copia de la pila con la nueva carta proporcionada agregada en la posición dada.
Si el `index` dado no es un índice válido en la pila, se debe devolver la pila original, sin cambios.

```swift
let newCard = 8
insert(newCard, at: 2, from: [5, 9, 7, 1])
// returns [5, 9, 8, 7, 1]
```

## 6. Comprueba el tamaño de la pila

Comprueba si el tamaño de la pila es igual a `stackSize` o no.

Implementa la función `checkSizeOfStack(_:_:)`, que recibe dos argumentos: `stack`, que es la pila de cartas, y `stackSize`, que es el tamaño de la pila.
La función debe devolver `true` si el tamaño de la pila es igual a `stackSize` y `false` en caso contrario.

```swift
let stackSize = 4
checkSizeOfStack([3, 2, 6, 4, 8], stackSize)
// returns false
```
