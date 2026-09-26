# Pistas

## General

- Es posible, aunque no obligatorio, resolver cada tarea con una sola sentencia dentro del cuerpo de la función.


## 1. Determina si una carta está presente

- ¿Está la carta [en][ref-match] la pila?

## 2. Encuentra la posición de una carta

- ¿Está la carta en la pila?
- Si es así, ¿en [qué][ref-which] posición?
- Se garantiza que todas las cartas son diferentes, lo que simplifica la tarea.
- Devuelve la posición, o `-1`.
  - Consulta el [concepto de condicionales][concept-conditionals] para ver distintas formas de ramificar si algo es `TRUE` o `FALSE`.
  - Si usas [`if_else`][ref-if_else] (el enfoque más moderno, aunque en realidad no es necesario aquí), ten en cuenta que es estricto respecto a que ambas ramas devuelvan el mismo tipo de resultado. Es posible que necesites devolver explícitamente un solo elemento, en lugar de un vector que podría estar vacío.
  - Para obtener el primer elemento de un vector, solo agrega `[1]` después de cualquier cosa que devuelva un vector.

## 3. Determina si cada carta es par

- El operador de residuo es `%%`.
- `x` es par si `x %% 2 == 0`.
- ¿Cumplen [todas][ref-all] las cartas este criterio?

## 4. Comprueba si la pila contiene una carta de valor impar

- Una carta es impar si no es par, así que consulta la tarea anterior.
- ¿Cumple [alguna][ref-any] carta este criterio?

## 5. Obtén la primera carta impar de la pila

- ¿Hay alguna carta impar en la pila?
- Si es así, devuelve la primera _carta_ (no la posición).

## 6. Determina la posición de la primera carta que es par

- ¿Hay alguna carta par en la pila?
- Si es así, devuelve la _posición_ de la primera carta par.

[ref-match]: https://www.rdocumentation.org/packages/base/versions/3.6.2/topics/match
[ref-which]: https://www.rdocumentation.org/packages/base/versions/3.3.0/topics/which
[concept-conditionals]: https://exercism.org/tracks/r/concepts/conditionals
[ref-all]: https://www.rdocumentation.org/packages/base/versions/3.3.0/topics/all
[ref-any]: https://www.rdocumentation.org/packages/base/versions/3.3.0/topics/any
[ref-if_else]: https://dplyr.tidyverse.org/reference/if_else.html
