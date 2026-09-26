# Pistas

## 1. Determina si vas a necesitar una licencia de conducir

- Usa el [operador de igualdad estricta][mdn-equality-operators] para verificar si tu argumento es igual a cierto string.
- Usa uno de los dos [operadores lógicos][mdn-logical-operators] que aprendiste en el concepto de Boolean para combinar los dos requisitos.
- **No** necesitas un condicional para resolver esta tarea. Puedes devolver directamente la expresión de tipo Boolean que construyas.

## 2. Elige entre dos vehículos posibles para comprar

- Usa un [operador relacional][mdn-relational-operators] para determinar cuál opción aparece primero en orden alfabético.
- Luego, asigna el valor de una variable auxiliar según el resultado de esa comparación con la ayuda de un [condicional][mdn-if-statement].
- Por último, construye la oración de recomendación. Para eso, puedes usar el [operador de suma][mdn-addition] para concatenar los dos strings.

## 3. Calcula una estimación del precio de un vehículo usado

- Empieza por determinar el porcentaje según la antigüedad del vehículo. Guárdalo en una variable auxiliar. Usa un [condicional][mdn-if-statement] como se menciona en las instrucciones.
- En las dos condiciones, usa [operadores relacionales][mdn-relational-operators] para comparar la antigüedad del vehículo con los valores límite.
- Para calcular el resultado, aplica el porcentaje al precio original. Por ejemplo, `30% of x` se puede calcular dividiendo `30` entre `100` y multiplicando por `x`.

[mdn-equality-operators]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators#equality_operators
[mdn-logical-operators]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators#binary_logical_operators
[mdn-relational-operators]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators#relational_operators
[mdn-addition]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Addition
[mdn-if-statement]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else
