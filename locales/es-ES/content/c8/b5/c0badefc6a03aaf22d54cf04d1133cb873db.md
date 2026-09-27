# Pistas

## General

- Los [conjuntos][sets] son colecciones mutables y desordenadas que no tienen elementos duplicados.
- Los conjuntos pueden contener cualquier tipo de dato, siempre que todos sus elementos sean [hashables][hashable].
- Los conjuntos son [iterables][iterable].
- Los conjuntos se suelen usar sobre todo para eliminar rápidamente los duplicados de otras colecciones o para hacer pruebas de pertenencia.
- Los conjuntos también admiten operaciones matemáticas como `union`, `intersection`, `difference` y `symmetric difference`.

## 1. Limpiar los ingredientes de los platos

- El constructor `set()` puede tomar cualquier [iterable][iterable] como argumento. Las [concepto: listas](/tracks/python/concepts/lists) son iterables.
- Recuerda: las [concepto: tuplas](/tracks/python/concepts/tuples) se pueden formar con `(<element_1>, <element_2>)` o con el constructor `tuple()`.

## 2. Cócteles y cócteles sin alcohol

- Un conjunto es _disjunto_ de otro conjunto si ambos no comparten ningún elemento.
- El constructor `set()` puede tomar cualquier [iterable][iterable] como argumento. Las [concepto: listas](/tracks/python/concepts/lists) son iterables.
- En Python, las [concepto: strings](/tracks/python/concepts/strings) se pueden concatenar con el signo `+`.

## 3. Categorizar los platos

- Usar [concepto: bucles](/tracks/python/concepts/loops) para recorrer las categorías de comidas disponibles podría ser útil aquí.
- Si todos los elementos de `<set_1>` están contenidos en `<set_2>`, entonces `<set_1> <= <set_2>`.
- El método equivalente de `<=` es `<set>.issubset(<iterable>)`.
- Las [concepto: tuplas](/tracks/python/concepts/tuples) pueden contener cualquier tipo de dato, incluso otras tuplas. Las tuplas se pueden formar con `(<element_1>, <element_2>)` o con el constructor `tuple()`.
- Se puede acceder a los elementos de las [concepto: tuplas](/tracks/python/concepts/tuples) desde la izquierda con un índice que empieza en 0, o desde la derecha con un índice que empieza en -1.
- El constructor `set()` puede tomar cualquier [iterable][iterable] como argumento. Las [concepto: listas](/tracks/python/concepts/lists) son iterables.
- Las [concepto: strings](/tracks/python/concepts/strings) se pueden concatenar con el signo `+`.

## 4. Etiquetar los alérgenos y los alimentos restringidos

- Una _intersección_ de conjuntos son los elementos que comparten `<set_1>` y `<set_2>`.
- El método de conjunto equivalente de `&` es `<set>.intersection(<iterable>)`.
- Se puede acceder a los elementos de las [concepto: tuplas](/tracks/python/concepts/tuples) desde la izquierda con un índice que empieza en 0, o desde la derecha con un índice que empieza en -1.
- El constructor `set()` puede tomar cualquier [iterable][iterable] como argumento. Las [concepto: listas](/tracks/python/concepts/lists) son iterables.
- Las [concepto: tuplas](/tracks/python/concepts/tuples) se pueden formar con `(<element_1>, <element_2>)` o con el constructor `tuple()`.

## 5. Compilar una «lista maestra» de ingredientes

- La _unión_ de conjuntos es el resultado de combinar `<set_1`> y `<set_2>` en un único `set`.
- El método de conjunto equivalente de `|` es `<set>.union(<iterable>)`.
- Usar [concepto: bucles](/tracks/python/concepts/loops) para recorrer los distintos platos podría ser útil aquí.

## 6. Sacar los aperitivos para servirlos en bandejas

- La _diferencia_ de conjuntos es donde los elementos de `<set_2>` se eliminan de `<set_1>`, por ejemplo `<set_1> - <set_2>`.
- El método de conjunto equivalente de `-` es `<set>.difference(<iterable>)`.
- El constructor `set()` puede tomar cualquier [iterable][iterable] como argumento. Las [concepto: listas](/tracks/python/concepts/lists) son iterables.
- El constructor de [concepto: listas](/tracks/python/concepts/lists) puede tomar cualquier [iterable][iterable] como argumento. Los conjuntos son iterables.

## 7. Encontrar los ingredientes que se usan en una sola receta

- La _diferencia simétrica_ de conjuntos es donde los elementos aparecen en `<set_1>` o en `<set_2>`, pero no en **_ambos_** conjuntos.
- La _diferencia simétrica_ de conjuntos es lo mismo que restar la _intersección_ de `set` a la _unión_ de `set`, por ejemplo `(<set_1> | <set_2>) - (<set_1> & <set_2>)`.
- Una _diferencia simétrica_ de más de dos `sets` incluirá los elementos que se repiten más de dos veces en los `sets` de entrada. Para eliminar estos elementos repetidos entre conjuntos, hay que restar a la diferencia simétrica las _intersecciones_ entre los pares de conjuntos.
- Usar [concepto: bucles](/tracks/python/concepts/loops) para recorrer los distintos platos podría ser útil aquí.


[hashable]: https://docs.python.org/3.7/glossary.html#term-hashable
[iterable]: https://docs.python.org/3/glossary.html#term-iterable
[sets]: https://docs.python.org/3/tutorial/datastructures.html#sets