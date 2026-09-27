# Consejos

## General

- Es posible, aunque no obligatorio, resolver todas las tareas con una única instrucción dentro del cuerpo de la función.


## 1. Determina si una carta está presente

- ¿Está la carta [en][ref-match] la pila?

## 2. Determina la posición de una carta

- ¿Está la carta en la pila?
- Si es así, ¿en [qué][ref-which] posición?
- Se garantiza que todas las cartas son diferentes, lo que simplifica la tarea.
- Devuelve la posición o `-1`.
  - Consulta el [concepto de condicionales][concept-conditionals] para ver las distintas formas de ramificar si algo es `TRUE` o `FALSE`.
  - Si usas [`if_else`][ref-if_else] (el enfoque más moderno, aunque aquí no es realmente necesario), ten en cuenta que es estricta en cuanto a que ambas ramas devuelvan el mismo tipo de resultado. Es posible que tengas que devolver explícitamente un único elemento en lugar de un vector que podría estar vacío.
  - Para obtener el primer elemento de un vector, basta con añadir `[1]` después de cualquier cosa que devuelva un vector.

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

## 6. Determina la posición de la primera carta que sea par

- ¿Hay alguna carta par en la pila?
- Si es así, devuelve la _posición_ de la primera carta par.

[ref-match]: https://www.rdocumentation.org/packages/base/versions/3.6.2/topics/match
[ref-which]: https://www.rdocumentation.org/packages/base/versions/3.3.0/topics/which
[concept-conditionals]: https://exercism.org/tracks/r/concepts/conditionals
[ref-all]: https://www.rdocumentation.org/packages/base/versions/3.3.0/topics/all
[ref-any]: https://www.rdocumentation.org/packages/base/versions/3.3.0/topics/any
[ref-if_else]: https://dplyr.tidyverse.org/reference/if_else.html
