# Instrucciones

Implementa las operaciones `keep` y `discard` sobre colecciones.
Dada una colección y un predicado sobre los elementos de la colección, `keep` devuelve una nueva colección que contiene aquellos elementos para los que el predicado es verdadero, mientras que `discard` devuelve una nueva colección que contiene aquellos elementos para los que el predicado es falso.

Por ejemplo, dada la colección de números:

- 1, 2, 3, 4, 5

Y el predicado:

- ¿es el número par?

Entonces tu operación keep debería producir:

- 2, 4

Mientras que tu operación discard debería producir:

- 1, 3, 5

Ten en cuenta que la unión de keep y discard abarca todos los elementos.

Es posible que las funciones se llamen `keep` y `discard`, o que necesiten nombres diferentes para no entrar en conflicto con funciones o conceptos que ya existan en tu lenguaje.

## Restricciones

¡No toques esa funcionalidad de filter/reject/como se llame que te ofrece la biblioteca estándar!
Resuélvelo tú mismo con otras herramientas más básicas.
