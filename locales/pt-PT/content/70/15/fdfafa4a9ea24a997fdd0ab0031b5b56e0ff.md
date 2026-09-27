# Sobre

O Python representa valores verdadeiros e falsos com o tipo [`bool`][bools], que é uma subclasse de `int`. Existem apenas dois valores Boolean neste tipo: `True` e `False`. Estes valores podem ser atribuídos a uma variável e combinados com os [operadores Boolean][boolean-operators] (`and`, `or`, `not`):

```python
>>> true_variable = True and True
>>> false_variable = True and False

>>> true_variable = False or True
>>> false_variable = False or False

>>> true_variable = not False
>>> false_variable = not True
```

Os [operadores Boolean][boolean-operators] usam _avaliação de curto-circuito_. Isto significa que a expressão do lado direito do operador só é avaliada se for necessário.

Cada um dos operadores tem uma precedência diferente: o `not` é avaliado antes do `and` e do `or`. Podes usar parênteses para avaliar uma parte da expressão antes das outras:

```python
>>> not True and True
False

>>> not (True and False)
True
```

Todos os `boolean operators` têm uma precedência mais baixa do que os [`comparison operators`][comparisons] do Python, como `==`, `>`, `<`, `is` e `is not`.

## Coerção de tipos e valores verdadeiros ou falsos

A função `bool` ([`bool()`][bool-function]) converte qualquer objeto num valor Boolean. Por predefinição, todos os objetos devolvem `True`, a menos que estejam definidos para devolver `False`.

Alguns `built-ins` são sempre considerados `False` por definição:

- as constantes `None` e `False`
- o zero de qualquer _tipo numérico_ (`int`, `float`, `complex`, `decimal` ou `fraction`)
- _sequências_ e _coleções_ vazias (`str`, `list`, `set`, `tuple`, `dict`, `range(0)`)

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

Quando um objeto é usado num _contexto Boolean_, é avaliado de forma transparente como _verdadeiro_ ou _falso_ através de `bool()`:

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

As classes podem definir como são avaliadas em situações em que contam como verdadeiras, se sobrepuserem e implementarem um método `__bool__()` e/ou um método `__len__()`.

## Como funcionam os valores Boolean por dentro

O tipo `bool` está implementado como um _subtipo_ de _int_. Isto significa que `True` é _numericamente igual_ a `1` e que `False` é _numericamente igual_ a `0`. Isto nota-se quando os comparamos com um _operador de igualdade_:

```python
>>> 1 == True
True

>>> 0 == False
True
```

No entanto, os `bools` são **ainda diferentes** dos `ints`, como se nota quando os comparamos com o _operador de identidade_, o `is`:

```python
>>> 1 is True
False

>>> 0 is False
False
```

> Nota: no Python >= 3.8, usar um literal (como `1`, `''`, `[]` ou `{}`) no _lado esquerdo_ do `is` gera um aviso.

É considerado um [anti-padrão do Python][comparing to true in the wrong way] usar o operador de igualdade para comparar uma variável do tipo Boolean com `True` ou `False`. Em vez disso, deves usar o operador de identidade `is`:

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
