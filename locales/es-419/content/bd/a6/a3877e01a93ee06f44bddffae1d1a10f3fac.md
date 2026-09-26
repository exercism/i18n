# Pistas

## 1. Define tipos personalizados

Los tipos abstractos y la herencia de tipos se vieron en el concepto [Tipos compuestos][composite].

## 2. Obtén el nombre de la mascota.

- Esto es trivial para Dog y Cat, pero es de ayuda para los tests de los métodos de respaldo.

## 3. Define qué pasa cuando se encuentran gatos y perros

- ¿Cuántas combinaciones de encuentros entre gatos y perros hay?
- Recuerda que un gato que se encuentra con un perro reacciona distinto a un perro que se encuentra con un gato.
- Necesitamos la respuesta del primer argumento: `a` en `meet(a, b)`.

## 4. Define un encuentro entre dos entidades.

- El valor de retorno es un string más largo que el de `meet()`.
- Usa un solo método para `encounter()`.
- La [interpolación de strings][interpolation] te será de gran ayuda cuando armes un valor de retorno.

## 5. Define una reacción de respaldo para los encuentros entre mascotas

- El segundo argumento ahora es un `Pet` que no es `Cat` ni `Dog`, así que agrega un método `meet`.
- Declarar tipos de parámetros abstractos o restringirlos mediante métodos paramétricos son dos formas de lograrlo.

## 6. Define un respaldo por si una mascota se encuentra con algo que no conoce

- El segundo argumento ahora puede ser cualquier cosa.

## 7. Define un respaldo genérico

- Ambos argumentos ahora pueden ser cualquier cosa.
- Al final del ejercicio, tendrás 7 métodos para `meet`.

[composite]: https://exercism.org/tracks/julia/concepts/composite-types
[interpolation]: https://docs.julialang.org/en/v1/manual/strings/#string-interpolation
