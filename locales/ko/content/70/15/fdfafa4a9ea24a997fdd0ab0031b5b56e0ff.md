# 개요

Python은 참과 거짓 값을 [`bool`][bools] 타입으로 표현해요.
이 타입은 `int`의 하위 클래스예요.
이 타입에는 `True`와 `False` 두 개의 불리언 값만 있어요.
이 값들은 변수에 할당할 수 있고, [불리언 연산자][boolean-operators] (`and`, `or`, `not`)와 결합할 수 있어요:


```python
>>> true_variable = True and True
>>> false_variable = True and False

>>> true_variable = False or True
>>> false_variable = False or False

>>> true_variable = not False
>>> false_variable = not True
```

[불리언 연산자][boolean-operators]는 _단축 평가_를 사용해요. 즉, 연산자 오른쪽의 표현식은 필요할 때만 평가돼요.

각 연산자는 우선순위가 달라요. `not`은 `and`와 `or`보다 먼저 평가돼요.
괄호를 사용하면 표현식의 일부를 다른 부분보다 먼저 평가할 수 있어요:

```python
>>> not True and True
False

>>> not (True and False)
True
```

모든 `boolean operators`는 `==`, `>`, `<`, `is`, `is not` 같은 Python의 [`comparison operators`][comparisons]보다 우선순위가 낮아요.


## 타입 강제 변환과 진릿값

`bool` 함수([`bool()`][bool-function])는 모든 객체를 불리언 값으로 변환해요.
기본적으로 모든 객체는 `False`를 반환하도록 정의되지 않는 한 `True`를 반환해요.

몇몇 `built-ins`는 정의상 항상 `False`로 간주돼요:

- 상수 `None`과 `False`
- 모든 _숫자형_의 0 (`int`, `float`, `complex`, `decimal`, `fraction`)
- 비어 있는 _시퀀스_와 _컬렉션_ (`str`, `list`, `set`, `tuple`, `dict`, `range(0)`)


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

객체가 _불리언 문맥_에서 사용되면, `bool()`을 사용해 _참 같은 값_ 또는 _거짓 같은 값_으로 묵시적으로 평가돼요:


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


클래스가 `__bool__()` 메서드 그리고/또는 `__len__()` 메서드를 재정의해 구현하면, 참으로 평가되는 상황에서 자신이 어떻게 평가될지 정의할 수 있어요.


## 불리언은 내부적으로 어떻게 동작할까요

`bool` 타입은 _int_의 _하위 타입_으로 구현돼요.
즉, `True`는 `1`과 _수치적으로 같고_, `False`는 `0`과 _수치적으로 같아요_.
이는 _동등 연산자_로 비교하면 확인할 수 있어요:


```python
>>> 1 == True
True

>>> 0 == False
True
```

하지만 `bools`는 `ints`와 **여전히 달라요**. _식별 연산자_ `is`로 비교하면 알 수 있어요:


```python
>>> 1 is True
False

>>> 0 is False
False
```

> 참고: Python 3.8 이상에서는 `is`의 _왼쪽_에 리터럴(`1`, `''`, `[]`, `{}` 등)을 사용하면 경고가 발생해요.


동등 연산자로 불리언 변수를 `True`나 `False`와 비교하는 것은 [Python 안티패턴][comparing to true in the wrong way]으로 여겨져요.
대신 식별 연산자 `is`를 사용해야 해요:


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
