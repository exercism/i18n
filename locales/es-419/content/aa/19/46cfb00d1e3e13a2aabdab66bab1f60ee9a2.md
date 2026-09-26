# Instrucciones

Tu tarea es implementar un algoritmo de búsqueda binaria.

Un algoritmo de búsqueda binaria encuentra un valor en un array dividiéndolo repetidamente a la mitad y conservando solo la mitad que contiene el valor que buscamos.
Nos permite acotar rápidamente las posibles ubicaciones de nuestro valor hasta encontrarlo, o hasta descartar todas las posibles ubicaciones.

~~~~exercism/caution
La búsqueda binaria solo funciona cuando un array está ordenado.
~~~~

El algoritmo funciona así:

- Encuentra el elemento del medio de un array *ordenado* y compáralo con el valor que buscamos.
- Si el elemento del medio es el valor que buscamos, ¡ya terminamos!
- Si el elemento del medio es mayor que el valor que buscamos, podemos descartar ese elemento y todos los elementos que están **después** de él.
- Si el elemento del medio es menor que el valor que buscamos, podemos descartar ese elemento y todos los elementos que están **antes** de él.
- Si se han descartado todos los elementos del array, entonces el valor no está en el array.
- De lo contrario, repite el proceso en la parte del array que no se haya descartado.

Aquí tienes un ejemplo:

Supongamos que buscamos el número 23 en el siguiente array ordenado: `[4, 8, 12, 16, 23, 28, 32]`.

- Empezamos comparando 23 con el elemento del medio, 16.
- Como 23 es mayor que 16, podemos descartar la mitad izquierda del array, y nos queda `[23, 28, 32]`.
- Luego comparamos 23 con el nuevo elemento del medio, 28.
- Como 23 es menor que 28, podemos descartar la mitad derecha del array: `[23]`.
- ¡Encontramos el valor que buscábamos!
