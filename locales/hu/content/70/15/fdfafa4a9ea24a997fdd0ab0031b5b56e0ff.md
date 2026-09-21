# Bemutatás

A Python az igaz és hamis értékeket a [`bool`][bools] típussal ábrázolja, amely az `int` egy altípusa. Ebben a típusban csak két Boolean érték van: a `True` és a `False`. Ezeket az értékeket hozzárendelheted egy változóhoz, és kombinálhatod a [Boolean operátorokkal][boolean-operators] (`and`, `or`, `not`):


```python
>>> true_variable = True and True
>>> false_variable = True and False

>>> true_variable = False or True
>>> false_variable = False or False

>>> true_variable = not False
>>> false_variable = not True
```

A [Boolean operátorok][boolean-operators] _rövidzárásos kiértékelést_ használnak, ami azt jelenti, hogy az operátor jobb oldalán álló kifejezés csak akkor értékelődik ki, ha szükséges.

Mindegyik operátornak más a precedenciája: a `not` kiértékelése megelőzi az `and` és az `or` kiértékelését. Zárójelekkel elérheted, hogy a kifejezés egyik része a többiek előtt értékelődjön ki:

```python
>>> not True and True
False

>>> not (True and False)
True
```

A `boolean operators` mindegyike alacsonyabb precedenciájúnak számít, mint a Python [`comparison operators`][comparisons] operátorai, például a `==`, a `>`, a `<`, az `is` és az `is not`.


## Automatikus típuskonverzió és igazságérték

A `bool` függvény ([`bool()`][bool-function]) bármely objektumot Boolean értékké alakít. Alapértelmezés szerint minden objektum `True`-t ad vissza, kivéve, ha úgy definiálták, hogy `False`-t adjon vissza.

Néhány `built-ins` definíció szerint mindig `False`-nak számít:

- a `None` és a `False` konstans
- bármely _numerikus típus_ nullája (`int`, `float`, `complex`, `decimal` vagy `fraction`)
- üres _szekvenciák_ és _kollekciók_ (`str`, `list`, `set`, `tuple`, `dict`, `range(0)`)


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

Amikor egy objektum _Boolean kontextusba_ kerül, a `bool()` használatával átlátszó módon _igazként_ vagy _hamisként_ értékelődik ki:


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


Az osztályok meghatározhatják, hogyan értékelődjenek ki igaznak számító helyzetekben, ha felülírják és implementálják a `__bool__()` metódust és/vagy a `__len__()` metódust.


## Hogyan működnek a Boolean értékek a háttérben

A `bool` típus az _int_ egy _altípusaként_ van implementálva. Ez azt jelenti, hogy a `True` _numerikusan egyenlő_ az `1`-gyel, a `False` pedig _numerikusan egyenlő_ a `0`-val. Ez akkor figyelhető meg, amikor egy _egyenlőségoperátorral_ hasonlítod össze őket:


```python
>>> 1 == True
True

>>> 0 == False
True
```

A `bools` azonban **továbbra is különböznek** az `ints`-től, amint azt az _identitásoperátorral_, az `is`-szel való összehasonlítás is mutatja:


```python
>>> 1 is True
False

>>> 0 is False
False
```

> Megjegyzés: a Python 3.8-as és újabb verzióiban figyelmeztetést vált ki, ha a `is` _bal oldalán_ literált (például `1`, `''`, `[]` vagy `{}`) használsz.


[Python-antimintának][comparing to true in the wrong way] számít, ha egy Boolean változót az egyenlőségoperátorral hasonlítasz össze a `True` vagy a `False` értékkel. Helyette az `is` identitásoperátort érdemes használni:


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
