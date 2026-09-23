# À propos

Python représente les valeurs vrai et faux avec le type [`bool`][bools], qui est une sous-classe de `int`. Ce type ne comporte que deux valeurs booléennes : `True` et `False`. Ces valeurs peuvent être affectées à une variable et combinées avec les [opérateurs booléens][boolean-operators] (`and`, `or`, `not`) :


```python
>>> true_variable = True and True
>>> false_variable = True and False

>>> true_variable = False or True
>>> false_variable = False or False

>>> true_variable = not False
>>> false_variable = not True
```

Les [opérateurs booléens][boolean-operators] utilisent l'_évaluation par court-circuit_, ce qui signifie que l'expression à droite de l'opérateur n'est évaluée que si c'est nécessaire.

Chaque opérateur a une priorité différente : `not` est évalué avant `and` et `or`. Les parenthèses permettent d'évaluer une partie de l'expression avant les autres :

```python
>>> not True and True
False

>>> not (True and False)
True
```

Tous les `boolean operators` sont considérés comme ayant une priorité inférieure à celle des [`comparison operators`][comparisons] de Python, comme `==`, `>`, `<`, `is` et `is not`.


## Conversion de type et _truthiness_

La fonction `bool` ([`bool()`][bool-function]) convertit n'importe quel objet en une valeur booléenne. Par défaut, tous les objets renvoient `True`, sauf s'ils sont définis pour renvoyer `False`.

Quelques `built-ins` sont toujours considérés comme `False` par définition :

- les constantes `None` et `False`
- le zéro de n'importe quel _type numérique_ (`int`, `float`, `complex`, `decimal` ou `fraction`)
- les _séquences_ et _collections_ vides (`str`, `list`, `set`, `tuple`, `dict`, `range(0)`)


```python
>>> bool(None)
False

>>> bool(1)
True

>>> bool(0)
False

>>> bool([1,2,3])
True

>>> bool([])
False

>>> bool({"Pig" : 1, "Cow": 3})
True

>>> bool({})
False
```

Lorsqu'un objet est utilisé dans un _contexte booléen_, il est évalué de façon transparente comme _truthy_ ou _falsey_ avec `bool()` :


```python
>>> a = "is this true?"
>>> b = []

# This will print "True", as a non-empty string is considered a "truthy" value
>>> if a:
...  print("True")

# This will print "False", as an empty list is considered a "falsey" value
>>> if not b:
...   print("False")
```


Une classe peut définir la façon dont elle est évaluée dans des situations _truthy_ si elle redéfinit et implémente une méthode `__bool__()`, et/ou une méthode `__len__()`.


## Comment les booléens fonctionnent en interne

Le type `bool` est implémenté comme un _sous-type_ de _int_. Cela signifie que `True` est _numériquement égal_ à `1` et que `False` est _numériquement égal_ à `0`. On peut le constater en les comparant avec un _opérateur d'égalité_ :


```python
>>> 1 == True
True

>>> 0 == False
True
```

Cependant, les `bools` sont **toujours différents** des `ints`, comme on le constate en les comparant avec l'_opérateur d'identité_, `is` :


```python
>>> 1 is True
False

>>> 0 is False
False
```

> Remarque : dans Python >= 3.8, utiliser un littéral (comme `1`, `''`, `[]` ou `{}`) du _côté gauche_ de `is` déclenche un avertissement.


Utiliser l'opérateur d'égalité pour comparer une variable booléenne à `True` ou `False` est considéré comme un [anti-patron Python][comparing to true in the wrong way]. Il faut plutôt utiliser l'opérateur d'identité `is` :


```python

>>> flag = True

# Not "Pythonic"
>>> if flag == True:
...    print("This works, but it's not considered Pythonic.")

# A better way
>>> if flag:
...    print("Pythonistas prefer this pattern as more Pythonic.")
```


[Boolean-operators]: https://docs.python.org/3/library/stdtypes.html#boolean-operations-and-or-not
[bool-function]: https://docs.python.org/3/library/functions.html#bool
[bools]: https://docs.python.org/3/library/stdtypes.html#typebool
[comparing to true in the wrong way]: https://docs.quantifiedcode.com/python-anti-patterns/readability/comparison_to_true.html
[comparisons]: https://docs.python.org/3/library/stdtypes.html#comparisons
