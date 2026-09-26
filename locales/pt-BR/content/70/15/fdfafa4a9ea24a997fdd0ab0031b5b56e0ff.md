# Sobre

O Python representa os valores verdadeiro e falso com o tipo [`bool`][bools], que é uma subclasse de `int`. Nesse tipo existem apenas dois valores Boolean: `True` e `False`. Esses valores podem ser atribuídos a uma variável e combinados com os [operadores Boolean][boolean-operators] (`and`, `or`, `not`):

```python
>>> true_variable = True and True
>>> false_variable = True and False

>>> true_variable = False or True
>>> false_variable = False or False

>>> true_variable = not False
>>> false_variable = not True
```

Os [operadores Boolean][boolean-operators] usam _avaliação de curto-circuito_, ou seja, a expressão do lado direito do operador só é avaliada se for necessário.

Cada operador tem uma precedência diferente, e `not` é avaliado antes de `and` e `or`. Os parênteses podem ser usados para avaliar uma parte da expressão antes das outras:

```python
>>> not True and True
False

>>> not (True and False)
True
```

Todos os `boolean operators` são considerados de precedência menor que os [`comparison operators`][comparisons] do Python, como `==`, `>`, `<`, `is` e `is not`.

## Coerção de tipos e truthiness

A função `bool` ([`bool()`][bool-function]) converte qualquer objeto em um valor Boolean. Por padrão, todos os objetos retornam `True`, a menos que sejam definidos para retornar `False`.

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

Quando um objeto é usado em um _contexto Boolean_, ele é avaliado de forma transparente como _truthy_ ou _falsey_ usando `bool()`:

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

As classes podem definir como são avaliadas em situações _truthy_ se sobrescreverem e implementarem um método `__bool__()` e/ou um método `__len__()`.

## Como os Boolean funcionam por baixo do capô

O tipo `bool` é implementado como um _subtipo_ de _int_. Isso significa que `True` é _numericamente igual_ a `1` e `False` é _numericamente igual_ a `0`. Isso fica visível ao compará-los com um _operador de igualdade_:

```python
>>> 1 == True
True

>>> 0 == False
True
```

No entanto, os `bools` **ainda são diferentes** dos `ints`, como se nota ao compará-los com o _operador de identidade_, `is`:

```python
>>> 1 is True
False

>>> 0 is False
False
```

> Observação: no Python >= 3.8, usar um literal (como `1`, `''`, `[]` ou `{}`) no _lado esquerdo_ de `is` vai gerar um aviso.

É considerado um [antipadrão do Python][comparing to true in the wrong way] usar o operador de igualdade para comparar uma variável Boolean com `True` ou `False`. Em vez disso, deve-se usar o operador de identidade `is`:

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
