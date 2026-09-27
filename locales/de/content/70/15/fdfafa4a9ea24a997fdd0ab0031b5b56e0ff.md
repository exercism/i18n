# Über

Python stellt wahre und falsche Werte mit dem Typ [`bool`][bools] dar, der eine Unterklasse von `int` ist.
 In diesem Typ gibt es nur zwei boolesche Werte: `True` und `False`.
  Diese Werte können einer Variablen zugewiesen und mit den [booleschen Operatoren][boolean-operators] (`and`, `or`, `not`) kombiniert werden:


```python
>>> true_variable = True and True
>>> false_variable = True and False

>>> true_variable = False or True
>>> false_variable = False or False

>>> true_variable = not False
>>> false_variable = not True
```

[Boolesche Operatoren][boolean-operators] verwenden die _Kurzschlussauswertung_. Das heißt, der Ausdruck auf der rechten Seite des Operators wird nur ausgewertet, wenn er benötigt wird.

Jeder der Operatoren hat eine andere Priorität, wobei `not` vor `and` und `or` ausgewertet wird.
 Klammern können verwendet werden, um einen Teil des Ausdrucks vor den anderen auszuwerten:

```python
>>> not True and True
False

>>> not (True and False)
True
```

Alle `boolean operators` haben eine niedrigere Priorität als Pythons [`comparison operators`][comparisons], wie `==`, `>`, `<`, `is` und `is not`.


## Typumwandlung und Wahrheitswertigkeit

Die Funktion `bool` ([`bool()`][bool-function]) wandelt jedes Objekt in einen booleschen Wert um.
 Standardmäßig geben alle Objekte `True` zurück, sofern sie nicht so definiert sind, dass sie `False` zurückgeben.

Einige `built-ins` gelten per Definition immer als `False`:

- die Konstanten `None` und `False`
- die Null jedes _numerischen Typs_ (`int`, `float`, `complex`, `decimal` oder `fraction`)
- leere _Sequenzen_ und _Sammlungen_ (`str`, `list`, `set`, `tuple`, `dict`, `range(0)`)


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

Wenn ein Objekt in einem _booleschen Kontext_ verwendet wird, wird es mit `bool()` transparent als _truthy_ oder _falsey_ ausgewertet:


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


Klassen können definieren, wie sie in truthy-Kontexten ausgewertet werden, wenn sie eine `__bool__()`-Methode und/oder eine `__len__()`-Methode überschreiben und implementieren.


## Wie boolesche Werte unter der Haube funktionieren

Der Typ `bool` ist als _Untertyp_ von _int_ implementiert.
 Das bedeutet, dass `True` _numerisch gleich_ `1` und `False` _numerisch gleich_ `0` ist.
  Das lässt sich beobachten, wenn man sie mit einem _Gleichheitsoperator_ vergleicht:


```python
>>> 1 == True
True

>>> 0 == False
True
```

`bools` unterscheiden sich jedoch **immer noch** von `ints`, wie man beim Vergleich mit dem _Identitätsoperator_ `is` sieht:


```python
>>> 1 is True
False

>>> 0 is False
False
```

> Hinweis: In Python >= 3.8 löst die Verwendung eines Literals (wie `1`, `''`, `[]` oder `{}`) auf der _linken Seite_ von `is` eine Warnung aus.


Es gilt als [Python-Antipattern][comparing to true in the wrong way], den Gleichheitsoperator zu verwenden, um eine boolesche Variable mit `True` oder `False` zu vergleichen.
 Stattdessen sollte der Identitätsoperator `is` verwendet werden:


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
