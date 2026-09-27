# Pistas

## 1. Determina si necesitarás un permiso de conducir

- Usa el [operador de igualdad estricta][mdn-equality-operators] para comprobar si tu entrada es igual a un string determinado.
- Usa uno de los dos [operadores lógicos][mdn-logical-operators] que aprendiste en el concepto de booleanos para combinar los dos requisitos.
- **No** necesitas una sentencia condicional para resolver esta tarea. Puedes devolver directamente la expresión booleana que construyas.

## 2. Elige entre dos posibles vehículos para comprar

- Usa un [operador relacional][mdn-relational-operators] para determinar qué opción va primero en orden alfabético.
- Después, asigna el valor de una variable auxiliar según el resultado de esa comparación, con la ayuda de una [sentencia if-else][mdn-if-statement].
- Por último, construye la frase de recomendación. Para ello, puedes usar el [operador de suma][mdn-addition] para concatenar los dos strings.

## 3. Calcula una estimación del precio de un vehículo de segunda mano

- Empieza por determinar el porcentaje en función de la antigüedad del vehículo. Guárdalo en una variable auxiliar. Usa una [sentencia if-else if-else][mdn-if-statement] como se menciona en las instrucciones.
- En las dos condiciones if, usa [operadores relacionales][mdn-relational-operators] para comparar la antigüedad del coche con los valores umbral.
- Para calcular el resultado, aplica el porcentaje al precio original. Por ejemplo, `30% of x` se puede calcular dividiendo `30` entre `100` y multiplicando por `x`.

[mdn-equality-operators]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators#equality_operators
[mdn-logical-operators]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators#binary_logical_operators
[mdn-relational-operators]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators#relational_operators
[mdn-addition]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Addition
[mdn-if-statement]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else
