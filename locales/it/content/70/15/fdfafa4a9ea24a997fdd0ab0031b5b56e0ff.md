# Approfondimento

Python rappresenta i valori vero e falso con il tipo [`bool`][bools], che è una sottoclasse di `int`.
 In questo tipo ci sono solo due valori booleani: `True` e `False`.
  Questi valori si possono assegnare a una variabile e combinare con gli [operatori booleani][boolean-operators] (`and`, `or`, `not`):


```python
>>> true_variable = True and True
>>> false_variable = True and False

>>> true_variable = False or True
>>> false_variable = False or False

>>> true_variable = not False
>>> false_variable = not True
```

Gli [operatori booleani][boolean-operators] usano la _valutazione a cortocircuito_: l'espressione a destra dell'operatore viene valutata solo se serve.

Ogni operatore ha una precedenza diversa: `not` viene valutato prima di `and` e `or`.
 Le parentesi si possono usare per valutare una parte dell'espressione prima delle altre:

```python
>>> not True and True
False

>>> not (True and False)
True
```

Tutti gli `boolean operators` hanno una precedenza inferiore rispetto agli [`comparison operators`][comparisons] di Python, come `==`, `>`, `<`, `is` e `is not`.


## Coercizione dei tipi e veridicità

La funzione `bool` ([`bool()`][bool-function]) converte qualsiasi oggetto in un valore booleano.
 Per impostazione predefinita tutti gli oggetti restituiscono `True`, a meno che non sia definito che restituiscano `False`.

Alcuni `built-ins` sono sempre considerati `False` per definizione:

- le costanti `None` e `False`
- lo zero di qualsiasi _tipo numerico_ (`int`, `float`, `complex`, `decimal` o `fraction`)
- le _sequenze_ e le _collezioni_ vuote (`str`, `list`, `set`, `tuple`, `dict`, `range(0)`)


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

Quando un oggetto viene usato in un _contesto booleano_, viene valutato in modo trasparente come _truthy_ o _falsey_ tramite `bool()`:


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


Le classi possono definire come vengono valutate nelle situazioni _truthy_ se sovrascrivono e implementano un metodo `__bool__()` e/o un metodo `__len__()`.


## Come funzionano i booleani dietro le quinte

Il tipo `bool` è implementato come _sottotipo_ di _int_.
 Questo significa che `True` è _numericamente uguale_ a `1` e `False` è _numericamente uguale_ a `0`.
  Lo si osserva confrontandoli con un _operatore di uguaglianza_:


```python
>>> 1 == True
True

>>> 0 == False
True
```

Tuttavia, i `bools` sono **comunque diversi** dagli `ints`, come si nota confrontandoli con l'_operatore di identità_, `is`:


```python
>>> 1 is True
False

>>> 0 is False
False
```

> Nota: in python >= 3.8, usare un letterale (come `1`, `''`, `[]` o `{}`) sul _lato sinistro_ di `is` genera un avviso.


Usare l'operatore di uguaglianza per confrontare una variabile booleana con `True` o `False` è considerato un [anti-pattern di Python][comparing to true in the wrong way].
 Al suo posto, conviene usare l'operatore di identità `is`:


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
