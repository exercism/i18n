# Pistas

## 1. Define tipos personalizados

Los tipos abstractos y la herencia de tipos se trataron en el concepto [Tipos compuestos][composite].

## 2. Obtén el nombre de la mascota.

- Esto es trivial para perros y gatos, pero resulta útil para los tests de los métodos de reserva.

## 3. Define qué ocurre cuando se encuentran gatos y perros

- ¿Cuántas combinaciones de encuentros entre gatos y perros hay?
- Recuerda que cuando un gato se encuentra con un perro reacciona de forma distinta a cuando un perro se encuentra con un gato.
- Necesitamos la respuesta del primer argumento: `a` en `meet(a, b)`.

## 4. Define un encuentro entre dos entidades.

- El valor devuelto es un string más largo que el de `meet()`.
- Usa un solo método para `encounter()`.
- La [interpolación de strings][interpolation] es tu aliada cuando montas un valor devuelto.

## 5. Define una reacción de reserva para los encuentros entre mascotas

- El segundo argumento ahora es un `Pet` distinto de `Cat` o `Dog`, así que añade un método `meet`.
- Declarar tipos de parámetros abstractos o restringirlos mediante métodos paramétricos son dos formas de conseguirlo.

## 6. Define una reserva para cuando una mascota se encuentra con algo que no conoce

- El segundo argumento ahora puede ser cualquier cosa.

## 7. Define una reserva genérica

- Ahora ambos argumentos pueden ser cualquier cosa.
- Al final del ejercicio, tendrás 7 métodos para `meet`.

[composite]: https://exercism.org/tracks/julia/concepts/composite-types
[interpolation]: https://docs.julialang.org/en/v1/manual/strings/#string-interpolation
