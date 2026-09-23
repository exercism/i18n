# Astuces

## Général

- Les [ensembles][sets] sont des collections mutables, non ordonnées, sans éléments en double.
- Les ensembles peuvent contenir n'importe quel type de données, tant que tous les éléments sont [hachables][hashable].
- Les ensembles sont [itérables][iterable].
- Les ensembles servent le plus souvent à dédupliquer rapidement d'autres collections ou à tester l'appartenance d'un élément.
- Les ensembles prennent aussi en charge des opérations mathématiques comme `union`, `intersection`, `difference` et `symmetric difference`

## 1. Nettoie les ingrédients des plats

- Le constructeur `set()` peut prendre n'importe quel [itérable][iterable] comme argument. Les [concept : listes](/tracks/python/concepts/lists) sont itérables.
- Rappel : les [concept : tuples](/tracks/python/concepts/tuples) peuvent être créés avec `(<element_1>, <element_2>)` ou via le constructeur `tuple()`.

## 2. Cocktails et mocktails

- Un `set` est _disjoint_ d'un autre ensemble si les deux n'ont aucun élément en commun.
- Le constructeur `set()` peut prendre n'importe quel [itérable][iterable] comme argument. Les [concept : listes](/tracks/python/concepts/lists) sont itérables.
- En Python, les [concept : chaînes de caractères](/tracks/python/concepts/strings) peuvent être concaténées avec le signe `+`.

## 3. Classe les plats par catégorie

- Utiliser le [concept : boucles](/tracks/python/concepts/loops) pour parcourir les catégories de plats disponibles pourrait être utile ici.
- Si tous les éléments de `<set_1>` sont contenus dans `<set_2>`, alors `<set_1> <= <set_2>`.
- La méthode équivalente à `<=` est `<set>.issubset(<iterable>)`
- Les [concept : tuples](/tracks/python/concepts/tuples) peuvent contenir n'importe quel type de données, y compris d'autres tuples. Les tuples peuvent être créés avec `(<element_1>, <element_2>)` ou via le constructeur `tuple()`.
- Dans le [concept : tuples](/tracks/python/concepts/tuples), les éléments sont accessibles depuis la gauche avec un indice commençant à 0, ou depuis la droite avec un indice commençant à -1.
- Le constructeur `set()` peut prendre n'importe quel [itérable][iterable] comme argument. Les [concept : listes](/tracks/python/concepts/lists) sont itérables.
- Les [concept : chaînes de caractères](/tracks/python/concepts/strings) peuvent être concaténées avec le signe `+`.

## 4. Étiquette les allergènes et les aliments restreints

- L'_intersection_ de deux ensembles, ce sont les éléments communs à `<set_1>` et `<set_2>`.
- La méthode d'ensemble équivalente à `&` est `<set>.intersection(<iterable>)`
- Dans le [concept : tuples](/tracks/python/concepts/tuples), les éléments sont accessibles depuis la gauche avec un indice commençant à 0, ou depuis la droite avec un indice commençant à -1.
- Le constructeur `set()` peut prendre n'importe quel [itérable][iterable] comme argument. Les [concept : listes](/tracks/python/concepts/lists) sont itérables.
- Les [concept : tuples](/tracks/python/concepts/tuples) peuvent être créés avec `(<element_1>, <element_2>)` ou via le constructeur `tuple()`.

## 5. Compile une « liste principale » d'ingrédients

- Une _union_ d'ensembles, c'est quand `<set_1`> et `<set_2>` sont combinés en un seul `set`
- La méthode d'ensemble équivalente à `|` est `<set>.union(<iterable>)`
- Utiliser le [concept : boucles](/tracks/python/concepts/loops) pour parcourir les différents plats pourrait être utile ici.

## 6. Sors les entrées à passer sur les plateaux

- Une _différence_ d'ensembles, c'est quand les éléments de `<set_2>` sont retirés de `<set_1>`, par exemple `<set_1> - <set_2>`.
- La méthode d'ensemble équivalente à `-` est `<set>.difference(<iterable>)`
- Le constructeur `set()` peut prendre n'importe quel [itérable][iterable] comme argument. Les [concept : listes](/tracks/python/concepts/lists) sont itérables.
- Le constructeur du [concept : liste](/tracks/python/concepts/lists) peut prendre n'importe quel [itérable][iterable] comme argument. Les ensembles sont itérables.

## 7. Trouve les ingrédients utilisés dans une seule recette

- Une _différence symétrique_ d'ensembles, c'est quand des éléments apparaissent dans `<set_1>` ou `<set_2>`, mais pas dans **_les deux_** ensembles.
- Une _différence symétrique_ d'ensembles revient à soustraire l'_intersection_ du `set` de son _union_, par exemple `(<set_1> | <set_2>) - (<set_1> & <set_2>)`
- Une _différence symétrique_ de plus de deux `sets` inclut les éléments qui se répètent plus de deux fois parmi les `sets` d'entrée. Pour supprimer ces éléments répétés d'un ensemble à l'autre, il faut soustraire les _intersections_ entre les paires d'ensembles de la différence symétrique.
- Utiliser le [concept : boucles](/tracks/python/concepts/loops) pour parcourir les différents plats pourrait être utile ici.


[hashable]: https://docs.python.org/3.7/glossary.html#term-hashable
[iterable]: https://docs.python.org/3/glossary.html#term-iterable
[sets]: https://docs.python.org/3/tutorial/datastructures.html#sets