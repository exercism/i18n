# Ajout aux instructions


## Comment cet exercice est implémenté pour le parcours Python


Les tests de cet exercice supposent que ton horloge sera implémentée sous la forme d'une `class` Clock.
Si les classes en Python ne te sont pas familières, [concept:python/classes]() et [les classes][classes in python] (_d'après la documentation Python_) sont de bons points de départ.


## Représente ta classe

Lorsqu'on travaille avec des [objets][what-is-an-object] et qu'on les débogue, il est important d'avoir une bonne représentation de cet objet.
Par exemple, si on crée un nouvel objet [`datetime.datetime`][datetime] dans l'environnement [REPL][REPL] de Python, on peut afficher sa [représentation sous forme de _string_][str-rep-classes] :


```python
>>> from datetime import datetime
>>> new_date = datetime(2022, 5, 4)
>>> new_date
datetime.datetime(2022, 5, 4, 0, 0)
```

Ta `class` Clock doit créer un `object` personnalisé qui gère des heures _sans_ dates.
Un aspect important de cette `class` sera la façon dont elle est représentée sous forme de _string_.
Les autres programmeurs qui utilisent ou appellent des `objects` Clock créés à partir de la `class` Clock se référeront à cette représentation sous forme de _string_ pour le débogage et pour d'autres activités.
Cependant, la représentation par défaut d'une `class` personnalisée n'est pas très utile :


```python
>>> Clock(12, 34)
<Clock object st 0x102807b20 >
```

Pour créer une représentation plus utile, tu peux définir une [méthode spéciale][dunder-methods] [`__repr__`][repr-method] sur la `class`.

Dans l'idéal, cette méthode `__repr__` renvoie du code Python valide qui peut servir à recréer l'objet quand on le passe à [`eval()`][eval-built-in], comme le décrit la [spécification d'une méthode `__repr__`][repr-docs].
Renvoyer du code Python valide permet à un autre développeur de copier-coller la `str` directement dans du code ou dans le REPL.
Une `Clock` qui représente 11 h 30 pourrait ressembler à ceci :

```python
 `Clock(11, 30)`
```

Définir une méthode `__repr__` est une bonne pratique pour toutes les classes personnalisées.
Voici quelques points supplémentaires à garder en tête :

- Les informations renvoyées par cette méthode doivent être utiles pour déboguer des problèmes.
- _Dans l'idéal_, la méthode renvoie une _string_ qui est du code Python valide, même si ce n'est pas toujours possible.
- Si du code Python valide n'est pas envisageable, la convention est de renvoyer une description entre chevrons : `< ...a practical description... >`.


### Conversion en _string_

En plus de la méthode `__repr__`, il peut aussi être nécessaire de disposer d'une autre représentation de la `class` sous forme de _string_, « lisible par un humain ».
Celle-ci peut servir à formater l'objet pour la sortie d'un programme ou pour de la documentation.
Pour cela, on écrit une méthode spéciale [`__str__`][str-dunder].
Reprenons `datetime.datetime` :


```python
>>> str(datetime.datetime(2022, 5, 4))
'2022-05-04 00:00:00'
```

Quand on demande à un objet `datetime` de se convertir en une représentation sous forme de _string_, il renvoie une `str` formatée selon la [norme ISO 8601][ISO 8601], que la plupart des bibliothèques de gestion des dates peuvent analyser pour obtenir une date et une heure lisibles par un humain.

Dans cet exercice, tu auras l'occasion d'écrire une méthode `__str__` pour ton horloge, ainsi qu'une méthode `__repr__`.

```python
>>> str(Clock(11, 30))
'11:30'
```

Pour prendre en charge cette conversion en _string_, tu devras créer une méthode spéciale `__str__` sur ta `class` qui renvoie une _string_ plus « lisible par un humain » affichant l'heure de l'horloge.

Si tu ne crées pas de méthode `__str__` et que tu appelles `str()` sur ta classe, Python essaiera d'appeler `__repr__` sur ta classe en dernier recours.
Donc si tu n'implémentes qu'une seule de ces deux méthodes spéciales, mieux vaut créer une `__repr__` plutôt qu'une `__str__`.


[ISO 8601]: https://www.iso.org/iso-8601-date-and-time-format.html
[REPL]: https://pythonprogramminglanguage.com/repl/
[classes in python]: https://docs.python.org/3/tutorial/classes.html
[datetime]: https://docs.python.org/3/library/datetime.html#available-types
[dunder-methods]: https://www.pythonmorsels.com/every-dunder-method/
[eval-built-in]: https://docs.python.org/3/library/functions.html#eval
[repr-docs]: https://docs.python.org/3/reference/datamodel.html#object.__repr__
[repr-method]: https://docs.python.org/3/library/functions.html#repr
[str-dunder]: https://docs.python.org/3/reference/datamodel.html#object.__str__
[str-rep-classes]: https://www.digitalocean.com/community/tutorials/python-str-repr-functions#introduction
[what-is-an-object]: https://realpython.com/ref/glossary/object/
