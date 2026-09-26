# Introducción

## Operadores aritméticos

JavaScript ofrece 6 operadores distintos para realizar operaciones aritméticas básicas con números.

- `+`: El operador de suma se usa para hallar la suma de números.
- `-`: El operador de resta se usa para hallar la diferencia entre dos números
- `*`: El operador de multiplicación se usa para hallar el producto de dos números.
- `/`: El operador de división se usa para dividir dos números.

```javascript
2 - 1.5; //=> 0.5
19 / 2; //=> 9.5
```

- `%`: El operador de residuo se usa para hallar el residuo de una división.

  ```javascript
  40 % 4; // => 0
  -11 % 4; // => -3
  ```

- `**`: El operador de exponenciación se usa para elevar un número a una potencia.

  ```javascript
  4 ** 3; // => 64
  4 ** 1 / 2; // => 2
  ```

## Orden de las operaciones

Cuando usas varios operadores en una misma línea, JavaScript sigue un orden de precedencia como se muestra en [esta tabla de precedencia][mdn-operator-precedence].
Para simplificarlo a nuestro contexto, JavaScript usa la regla PEDMAS (Paréntesis, Exponentes, División/Multiplicación, Suma/Resta) que aprendimos en las clases de matemáticas de la primaria.

<!-- prettier-ignore-start -->
```javascript
const result = 3 ** 3 + 9 * 4 / (3 - 1);
// => 3 ** 3 + 9 * 4/2
// => 27 + 9 * 4/2
// => 27 + 18
// => 45
```
<!-- prettier-ignore-end -->

## Operadores de asignación abreviados

Los operadores de asignación abreviados son una forma más corta de escribir código que realiza operaciones aritméticas sobre una variable y asigna el nuevo valor a esa misma variable.
Por ejemplo, considera dos variables `x` y `y`.
Entonces, `x += y` es lo mismo que `x = x + y`.
A menudo, esto se usa con un número en lugar de una variable `y`.
Las otras 5 operaciones también se pueden realizar de forma similar.

```javascript
let x = 5;
x += 25; // x is now 30

let y = 31;
y %= 3; // y is now 1
```

[mdn-operator-precedence]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence#table
