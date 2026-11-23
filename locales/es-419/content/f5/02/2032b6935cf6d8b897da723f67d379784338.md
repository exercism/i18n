# Instrucciones

Implementa operaciones básicas de arrays.

En los lenguajes funcionales, las operaciones de arrays como `length`, `map` y `reduce` son muy comunes.
Implementa una serie de operaciones básicas de arrays, sin usar funciones existentes.

El número exacto y los nombres de las operaciones que debes implementar dependerán del track, para evitar conflictos con nombres existentes, pero las operaciones generales que implementarás incluyen:

- `append` (_dados dos arrays, agrega todos los elementos del segundo array al final del primero_);
- `concatenate` (_dada una serie de arrays, combina todos los elementos de todos los arrays en un solo array aplanado_);
- `filter` (_dado un predicado y un array, devuelve el array de todos los elementos para los que `predicate(item)` es True_);
- `length` (_dado un array, devuelve el número total de elementos que contiene_);
- `map` (_dada una función y un array, devuelve el array de los resultados de aplicar `function(item)` a todos los elementos_);
- `foldl` (_dadas una función, un array y un acumulador inicial, fold (reduce) cada elemento en el acumulador desde la izquierda_);
- `foldr` (_dadas una función, un array y un acumulador inicial, fold (reduce) cada elemento en el acumulador desde la derecha_);
- `reverse` (_dado un array, devuelve un array con todos los elementos originales, pero en orden inverso_).

Ten en cuenta que el orden en el que se pasan los argumentos a las funciones fold (`foldl`, `foldr`) es importante.
