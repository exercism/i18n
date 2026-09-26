# Acerca de

Python representa los valores verdadero y falso con el tipo [`bool`][bools], que es una subclase de `int`. En este tipo solo hay dos valores Boolean: `True` y `False`. Estos valores se pueden asignar a una variable y combinar con los [operadores Boolean][boolean-operators] (`and`, `or`, `not`):

```python
>>> true_variable = True and True
>>> false_variable = True and False

>>> true_variable = False or True
>>> false_variable = False or False

>>> true_variable = not False
>>> false_variable = not True
```

Los [operadores Boolean][boolean-operators] usan la _evaluación de cortocircuito_, lo que significa que la expresión del lado derecho del operador solo se evalúa si es necesario.

Cada uno de los operadores tiene una precedencia diferente: `not` se evalúa antes que `and` y `or`. Se pueden usar paréntesis para evaluar una parte de la expresión antes que las demás:

```python
>>> not True and True
False

>>> not (True and False)
True
```

Todos los `boolean operators` se consideran de menor precedencia que los [`comparison operators`][comparisons] de Python, como `==`, `>`, `<`, `is` e `is not`.

## Coerción de tipos y veracidad

La función `bool` ([`bool()`][bool-function]) convierte cualquier objeto en un valor Boolean. De forma predeterminada, todos los objetos devuelven `True` a menos que estén definidos para devolver `False`.

Algunos `built-ins` siempre se consideran `False` por definición:

- las constantes `None` y `False`
- el cero de cualquier _tipo numérico_ (`int`, `float`, `complex`, `decimal` o `fraction`)
- las _secuencias_ y _colecciones_ vacías (`str`, `list`, `set`, `tuple`, `dict`, `range(0)`)

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

Cuando un objeto se usa en un _contexto Boolean_, se evalúa de forma transparente como _truthy_ o _falsey_ usando `bool()`:

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

Las clases pueden definir cómo se evalúan en situaciones _truthy_ si sobrescriben e implementan un método `__bool__()` y/o un método `__len__()`.

## Cómo funcionan los valores Boolean por dentro

El tipo `bool` está implementado como un _subtipo_ de _int_. Eso significa que `True` es _numéricamente igual_ a `1` y que `False` es _numéricamente igual_ a `0`. Esto se puede observar al compararlos con un _operador de igualdad_:

```python
>>> 1 == True
True

>>> 0 == False
True
```

Sin embargo, los `bools` **siguen siendo diferentes** de los `ints`, como se nota al compararlos con el _operador de identidad_, `is`:

```python
>>> 1 is True
False

>>> 0 is False
False
```

> Nota: en Python >= 3.8, usar un literal (como `1`, `''`, `[]` o `{}`) al _lado izquierdo_ de `is` lanzará una advertencia.

Se considera un [antipatrón de Python][comparing to true in the wrong way] usar el operador de igualdad para comparar una variable Boolean con `True` o `False`. En su lugar, se debe usar el operador de identidad `is`:

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
