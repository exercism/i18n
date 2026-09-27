# 關於

Python 使用[`bool`][bools]型別來表示 true 和 false 值，這個型別是`int`的子類別。
 這個型別裡只有兩個布林值：`True`和`False`。
 這些值可以指定給變數，也可以與[布林運算子][boolean-operators]（`and`、`or`、`not`）結合：


```python
>>> true_variable = True and True
>>> false_variable = True and False

>>> true_variable = False or True
>>> false_variable = False or False

>>> true_variable = not False
>>> false_variable = not True
```

[布林運算子][boolean-operators]使用_短路求值_，這表示運算子右側的運算式只會在需要時才被求值。

每個運算子的優先順序都不同，其中`not`會比`and`和`or`先求值。
 括號可以用來讓運算式的某個部分比其他部分先求值：

```python
>>> not True and True
False

>>> not (True and False)
True
```

所有`boolean operators`的優先順序都低於 Python 的[`comparison operators`][comparisons]，例如`==`、`>`、`<`、`is`和`is not`。


## 型別強制轉換與真值性

`bool`函式（[`bool()`][bool-function]）會把任何物件轉換成布林值。
 預設情況下，所有物件都會回傳`True`，除非它被定義為回傳`False`。

有幾個`built-ins`依定義一律被視為`False`：

- 常數`None`和`False`
- 任何_數值型別_的零（`int`、`float`、`complex`、`decimal`或`fraction`）
- 空的_序列_和_容器_（`str`、`list`、`set`、`tuple`、`dict`、`range(0)`）


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

當物件被用在_布林情境_中時，會透過`bool()`以透明的方式評估它是_真值_還是_假值_：


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


類別只要覆寫並實作`__bool__()`方法，或是`__len__()`方法（或兩者），就可以定義自己在真值情境下的評估方式。


## 布林值的底層運作方式

`bool`型別是以_int_的_子型別_形式實作。
 也就是說，`True`在_數值上等於_`1`，而`False`在_數值上等於_`0`。
 使用_相等運算子_比較它們時，就可以觀察到這點：


```python
>>> 1 == True
True

>>> 0 == False
True
```

不過，`bools`和`ints`**仍然不同**，用_身分運算子_`is`比較它們時就能看出這點：


```python
>>> 1 is True
False

>>> 0 is False
False
```

> 注意：在 python >= 3.8 中，把字面值（例如`1`、`''`、`[]`或`{}`）放在`is`的_左側_會發出警告。


使用相等運算子把布林變數拿來和`True`或`False`比較，被視為一種 [Python 反模式][comparing to true in the wrong way]。
 應該改用身分運算子`is`：


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
