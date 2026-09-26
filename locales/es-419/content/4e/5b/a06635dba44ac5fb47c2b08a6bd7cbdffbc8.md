# Introducción

Cuando trabajas con arrays, a veces quieres ejecutar código para cada valor del array. A esto se le llama iterar o recorrer el array.

Aquí veremos el caso en el que no quieres modificar el array durante el proceso. Para transformar arrays, consulta el [concepto Transformaciones de arrays][concept-array-transformations].

## El bucle `for`

La forma más básica de iterar sobre un array es usar un bucle `for`; consulta el [concepto Bucles `for`][concept-for-loops].

```javascript
const numbers = [6.0221515, 10, 23];

for (let i = 0; i < numbers.length; i++) {
  console.log(numbers[i]);
}
// => 6.0221515
// => 10
// => 23
```

## El bucle `for...of`

Cuando quieres trabajar directamente con el valor en cada iteración y no necesitas el índice para nada, puedes usar un bucle `for...of`.

`for...of` funciona como el bucle `for` básico que mostramos arriba, pero en lugar de tener que lidiar con el _índice_ como una variable del bucle, se te da el _valor_ directamente.

```javascript
const numbers = [6.0221515, 10, 23];

// Because re-assigning number inside the loop will be very
// confusing, disallowing that via const is preferable.
for (const number of numbers) {
  console.log(number);
}
// => 6.0221515
// => 10
// => 23
```

Igual que en los bucles `for` normales, puedes usar `continue` para detener la iteración actual y `break` para detener por completo la ejecución del bucle.

## El método `forEach`

Todos los arrays incluyen un método `forEach` que se puede usar para recorrer los elementos del array.

`forEach` acepta un [callback][concept-callbacks] como parámetro.
La función callback se llama una vez por cada elemento del array.
El elemento actual, su índice y el array completo se pasan al callback como argumentos.
A menudo solo se usan el elemento actual o el índice.

```javascript
const numbers = [6.0221515, 10, 23];

numbers.forEach((number, index) => console.log(number, index));
// => 6.0221515 0
// => 10 1
// => 23 2
```

No hay forma de detener la iteración una vez que el bucle `forEach` ha comenzado.
Las sentencias `break` y `continue` no existen en este contexto.

[concept-array-transformations]: /tracks/javascript/concepts/array-transformations
[concept-for-loops]: /tracks/javascript/concepts/for-loops
[concept-callbacks]: /tracks/javascript/concepts/callbacks
