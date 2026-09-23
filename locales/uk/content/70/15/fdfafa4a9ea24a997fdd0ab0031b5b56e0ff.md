# Про

У Python значення правди й неправди мають тип [`bool`][bools], який є підкласом `int`.
 У цьому типі лише два булеві значення (англ. Boolean): `True` і `False`.
  Ці значення можна присвоїти змінній і поєднувати за допомогою [булевих операторів][boolean-operators] (`and`, `or`, `not`):


```python
>>> true_variable = True and True
>>> false_variable = True and False

>>> true_variable = False or True
>>> false_variable = False or False

>>> true_variable = not False
>>> false_variable = not True
```

[Булеві оператори][boolean-operators] використовують _скорочене обчислення_: вираз праворуч від оператора обчислюється лише тоді, коли це потрібно.

Кожен з операторів має свій пріоритет: `not` обчислюється перед `and` та `or`.
 Дужки дають змогу обчислити одну частину виразу перед іншими:

```python
>>> not True and True
False

>>> not (True and False)
True
```

Усі `boolean operators` мають нижчий пріоритет, ніж [`comparison operators`][comparisons] у Python, як-от `==`, `>`, `<`, `is` та `is not`.


## Приведення типів і правдивість

Функція `bool` ([`bool()`][bool-function]) перетворює будь-який обʼєкт на булеве значення.
 Типово всі обʼєкти повертають `True`, якщо для них не визначено повертати `False`.

Кілька `built-ins` за визначенням завжди вважаються `False`:

- константи `None` і `False`
- нуль будь-якого _числового типу_ (`int`, `float`, `complex`, `decimal` або `fraction`)
- порожні _послідовності_ та _колекції_ (`str`, `list`, `set`, `tuple`, `dict`, `range(0)`)


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

Коли обʼєкт використовується в _булевому контексті_, він прозоро оцінюється як _правдивий_ чи _неправдивий_ за допомогою `bool()`:


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


Класи можуть визначати, як їх оцінюють у ситуаціях правдивості, якщо вони перевизначають і реалізують метод `__bool__()` та/або метод `__len__()`.


## Як булеві значення працюють під капотом

Тип `bool` реалізовано як _підтип_ _int_.
 Це означає, що `True` _чисельно дорівнює_ `1`, а `False` _чисельно дорівнює_ `0`.
  Це видно, коли порівнювати їх за допомогою _оператора рівності_:


```python
>>> 1 == True
True

>>> 0 == False
True
```

Однак `bools` **усе ще відрізняються** від `ints`, що видно при порівнянні їх за допомогою _оператора ідентичності_ `is`:


```python
>>> 1 is True
False

>>> 0 is False
False
```

> Примітка: у Python >= 3.8 використання літерала (як-от `1`, `''`, `[]` чи `{}`) _ліворуч_ від `is` спричинить попередження.


Порівнювати булеву змінну з `True` або `False` за допомогою оператора рівності вважається [антипатерном у Python][comparing to true in the wrong way].
 Натомість варто використовувати оператор ідентичності `is`:


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
