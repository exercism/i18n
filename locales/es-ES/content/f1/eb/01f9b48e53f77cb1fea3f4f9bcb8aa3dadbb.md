# Pistas

## General

- Intenta dividir un problema en un caso base y un caso recursivo. Por ejemplo, supongamos que quieres contar cuántas galletas hay en el bote de galletas con un enfoque recursivo. Un caso base es un bote vacío: tiene cero galletas. Si el bote no está vacío, el número de galletas que hay en él es igual a una galleta más el número de galletas que quedan tras quitar una galleta.

## 1. Define los tipos de pizza y las opciones

- El tipo `Pizza` es un tipo recursivo, en el que los casos `ExtraSauce` y `ExtraToppings` contienen una `Pizza`.

## 2. Calcula el precio de la pizza

- Para manejar que el tipo `Pizza` sea un tipo recursivo, define una función recursiva.

## 3. Calcula el precio de un pedido

- Se puede hacer una coincidencia de patrones sobre la longitud exacta del array para determinar si se debe aplicar el cargo adicional.
- Usa la recursión de cola para no consumir demasiada memoria al calcular el precio de un pedido.
