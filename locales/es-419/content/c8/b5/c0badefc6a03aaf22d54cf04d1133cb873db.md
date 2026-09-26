# Hints

## General

- Los [conjuntos][sets] son colecciones mutables y sin orden, sin elementos duplicados.
- Los conjuntos pueden contener cualquier tipo de dato, siempre que todos los elementos sean [hashable][hashable].
- Los conjuntos son [iterables][iterable].
- Los conjuntos se usan sobre todo para eliminar duplicados de otras colecciones rápidamente o para comprobar si un elemento pertenece a ellos.
- Los conjuntos también admiten operaciones matemáticas como `union`, `intersection`, `difference` y `symmetric difference`.

## 1. Limpia los ingredientes de los platillos

- El constructor `set()` puede tomar cualquier [iterable][iterable] como argumento. Los [concepto: arrays](/tracks/python/concepts/lists) son iterables.
- Recuerda: puedes formar [concepto: tuplas](/tracks/python/concepts/tuples) usando `(<element_1>, <element_2>)` o con el constructor `tuple()`.

## 2. Cócteles y bebidas sin alcohol

- Un `set` es _disjunto_ de otro conjunto si los dos conjuntos no comparten ningún elemento.
- El constructor `set()` puede tomar cualquier [iterable][iterable] como argumento. Los [concepto: arrays](/tracks/python/concepts/lists) son iterables.
- En Python, puedes concatenar [concepto: strings](/tracks/python/concepts/strings) con el signo `+`.

## 3. Clasifica los platillos

- Usar [concepto: bucles](/tracks/python/concepts/loops) para recorrer las categorías de comidas disponibles podría ser útil aquí.
- Si todos los elementos de `<set_1>` están contenidos en `<set_2>`, entonces `<set_1> <= <set_2>`.
- El método equivalente a `<=` es `<set>.issubset(<iterable>)`
- Las [concepto: tuplas](/tracks/python/concepts/tuples) pueden contener cualquier tipo de dato, incluidas otras tuplas. Puedes formar tuplas usando `(<element_1>, <element_2>)` o con el constructor `tuple()`.
- Se puede acceder a los elementos dentro de [concepto: tuplas](/tracks/python/concepts/tuples) desde la izquierda usando un índice con base 0, o desde la derecha usando un índice con base -1.
- El constructor `set()` puede tomar cualquier [iterable][iterable] como argumento. Los [concepto: arrays](/tracks/python/concepts/lists) son iterables.
- Puedes concatenar [concepto: strings](/tracks/python/concepts/strings) con el signo `+`.

## 4. Etiqueta los alérgenos y los alimentos restringidos

- La _intersección_ de dos conjuntos son los elementos que comparten `<set_1>` y `<set_2>`.
- El método de conjunto equivalente a `&` es `<set>.intersection(<iterable>)`
- Se puede acceder a los elementos dentro de [concepto: tuplas](/tracks/python/concepts/tuples) desde la izquierda usando un índice con base 0, o desde la derecha usando un índice con base -1.
- El constructor `set()` puede tomar cualquier [iterable][iterable] como argumento. Los [concepto: arrays](/tracks/python/concepts/lists) son iterables.
- Puedes formar [concepto: tuplas](/tracks/python/concepts/tuples) usando `(<element_1>, <element_2>)` o con el constructor `tuple()`.

## 5. Compila una «lista maestra» de ingredientes

- La _unión_ de conjuntos es cuando `<set_1`> y `<set_2>` se combinan en un solo `set`
- El método de conjunto equivalente a `|` es `<set>.union(<iterable>)`
- Usar [concepto: bucles](/tracks/python/concepts/loops) para recorrer los distintos platillos podría ser útil aquí.

## 6. Extrae los aperitivos para pasarlos en bandejas

- La _diferencia_ de conjuntos es cuando los elementos de `<set_2>` se eliminan de `<set_1>`, por ejemplo `<set_1> - <set_2>`.
- El método de conjunto equivalente a `-` es `<set>.difference(<iterable>)`
- El constructor `set()` puede tomar cualquier [iterable][iterable] como argumento. Los [concepto: arrays](/tracks/python/concepts/lists) son iterables.
- El constructor de [concepto: arrays](/tracks/python/concepts/lists) puede tomar cualquier [iterable][iterable] como argumento. Los conjuntos son iterables.

## 7. Encuentra los ingredientes que se usan en una sola receta

- La _diferencia simétrica_ de conjuntos es cuando los elementos aparecen en `<set_1>` o en `<set_2>`, pero no en **_ambos_** conjuntos.
- La _diferencia simétrica_ de conjuntos es lo mismo que restar la _intersección_ de conjuntos a la _unión_ de conjuntos, por ejemplo `(<set_1> | <set_2>) - (<set_1> & <set_2>)`
- Una _diferencia simétrica_ de más de dos `sets` incluirá los elementos que se repiten más de dos veces a lo largo de los `sets` de entrada. Para eliminar estos elementos repetidos entre conjuntos, hay que restar las _intersecciones_ entre pares de conjuntos a la diferencia simétrica.
- Usar [concepto: bucles](/tracks/python/concepts/loops) para recorrer los distintos platillos podría ser útil aquí.


[hashable]: https://docs.python.org/3.7/glossary.html#term-hashable
[iterable]: https://docs.python.org/3/glossary.html#term-iterable
[sets]: https://docs.python.org/3/tutorial/datastructures.html#sets