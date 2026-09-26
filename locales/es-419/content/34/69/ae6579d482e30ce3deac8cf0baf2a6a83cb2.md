# Instrucciones

Implementa las operaciones `keep` y `discard` en colecciones.
Dada una colección y un predicado sobre los elementos de la colección, `keep` devuelve una nueva colección que contiene aquellos elementos donde el predicado es verdadero, mientras que `discard` devuelve una nueva colección que contiene aquellos elementos donde el predicado es falso.

Por ejemplo, dada la colección de números:

- 1, 2, 3, 4, 5

Y el predicado:

- ¿el número es par?

Entonces tu operación keep debería producir:

- 2, 4

Mientras que tu operación discard debería producir:

- 1, 3, 5

Ten en cuenta que la unión de keep y discard es todos los elementos.

Las funciones pueden llamarse `keep` y `discard`, o pueden necesitar nombres diferentes para no chocar con funciones o conceptos existentes en tu lenguaje.

## Restricciones

¡No toques esa funcionalidad de filter/reject/cómo se llame que ofrece tu biblioteca estándar!
Resuélvelo por tu cuenta usando otras herramientas básicas.
