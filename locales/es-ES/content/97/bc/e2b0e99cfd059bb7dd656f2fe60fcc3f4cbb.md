# Pistas

## 1. Define la aprobación

- [Define el tipo de dato algebraico][ADT] `Approval` con constructores para las opciones requeridas.

## 2. Define la cocina

- [Define el tipo de dato algebraico][ADT] `Cuisine` con constructores para las opciones requeridas.

## 3. Define los géneros de películas

- [Define el tipo de dato algebraico][ADT] `Genre` con constructores para las opciones requeridas.

## 4. Define la actividad

- [Define un tipo de dato algebraico con datos asociados][ADT-with-data] para encapsular las distintas actividades.

## 5. Puntúa la actividad

- La mejor forma de ejecutar lógica basada en el valor de la actividad es usar [expresiones case][case-expression].
- El emparejamiento de patrones sobre un caso de un tipo de dato algebraico permite acceder a sus datos asociados.
- Para añadir una condición adicional a un patrón, puedes usar una [guarda][guards] dentro de un case.
- Si quieres capturar todos los demás valores posibles en un solo caso, puedes usar el patrón comodín `_`.

[ADT]: https://www.schoolofhaskell.com/school/starting-with-haskell/introduction-to-haskell/2-algebraic-data-types#enumeration-types
[ADT-with-data]: https://www.schoolofhaskell.com/school/starting-with-haskell/introduction-to-haskell/2-algebraic-data-types#beyond-enumerations
[case-expression]: https://www.schoolofhaskell.com/school/starting-with-haskell/introduction-to-haskell/2-algebraic-data-types#case-expessions
[guards]: https://learnyouahaskell.github.io/syntax-in-functions.html#guards-guards
