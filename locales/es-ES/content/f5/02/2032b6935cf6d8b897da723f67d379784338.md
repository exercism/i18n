# Instrucciones

Implementa operaciones básicas con listas.

En los lenguajes funcionales, las operaciones con listas como `length`, `map` y `reduce` son muy habituales. Implementa una serie de operaciones básicas con listas, sin usar las funciones que ya existen.

El número y los nombres exactos de las operaciones que hay que implementar dependerán de cada track, para evitar conflictos con nombres ya existentes, pero las operaciones generales que vas a implementar son:

- `append` (_dadas dos listas, añade todos los elementos de la segunda lista al final de la primera_);
- `concatenate` (_dada una serie de listas, combina todos los elementos de todas las listas en una sola lista aplanada_);
- `filter` (_dados un predicado y una lista, devuelve la lista de todos los elementos para los que `predicate(item)` es True_);
- `length` (_dada una lista, devuelve el número total de elementos que contiene_);
- `map` (_dadas una función y una lista, devuelve la lista de los resultados de aplicar `function(item)` a todos los elementos_);
- `foldl` (_dadas una función, una lista y un acumulador inicial, pliega (reduce) cada elemento dentro del acumulador desde la izquierda_);
- `foldr` (_dadas una función, una lista y un acumulador inicial, pliega (reduce) cada elemento dentro del acumulador desde la derecha_);
- `reverse` (_dada una lista, devuelve una lista con todos los elementos originales, pero en orden inverso_).

Ten en cuenta que el orden en el que se pasan los argumentos a las funciones de plegado (`foldl`, `foldr`) es significativo.
