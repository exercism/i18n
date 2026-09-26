# Pistas

## General

- Intenta dividir un problema en un caso base y un caso recursivo. Por ejemplo, digamos que quieres contar cuántas galletas hay en el frasco de galletas con un enfoque recursivo. Un caso base es un frasco vacío: tiene cero galletas. Si el frasco no está vacío, entonces la cantidad de galletas que hay en el frasco es igual a una galleta más la cantidad de galletas que quedan en el frasco después de sacar una galleta.

## 1. Define los tipos de pizza y las opciones

- El tipo `Pizza` es un tipo recursivo, con los casos `ExtraSauce` y `ExtraToppings` que contienen una `Pizza`.

## 2. Calcula el precio de la pizza

- Para manejar que el tipo `Pizza` sea un tipo recursivo, define una función recursiva.

## 3. Calcula el precio de un pedido

- Se puede usar la coincidencia de patrones sobre la longitud exacta del array para determinar si se debe aplicar el cargo adicional.
- Usa la recursión de cola para evitar consumir demasiada memoria al calcular el precio de un pedido.
