# 关于

Python 用[`bool`][bools]类型来表示 true 和 false 这两种值，它是`int`的子类。这个类型里只有两个布尔值：`True`和`False`。这些值可以赋值给变量，也可以和[布尔运算符][boolean-operators]（`and`、`or`、`not`）组合使用：


```python
>>> true_variable = True and True
>>> false_variable = True and False

>>> true_variable = False or True
>>> false_variable = False or False

>>> true_variable = not False
>>> false_variable = not True
```

[布尔运算符][boolean-operators]使用_短路求值_，也就是说，只有当需要时，才会对运算符右侧的表达式求值。

每个运算符的优先级都不同，`not`的求值先于`and`和`or`。可以用括号让表达式中的某一部分先于其他部分求值：

```python
>>> not True and True
False

>>> not (True and False)
True
```

所有`boolean operators`的优先级都低于 Python 的[`comparison operators`][comparisons]，比如`==`、`>`、`<`、`is`和`is not`。


## 类型强制转换与真值性

`bool`函数（[`bool()`][bool-function]）可以把任何对象转换成布尔值。默认情况下，所有对象都会返回`True`，除非被定义为返回`False`。

有几个`built-ins`按定义始终被视为`False`：

- 常量`None`和`False`
- 任何_数值类型_的零值（`int`、`float`、`complex`、`decimal`或`fraction`）
- 空的_序列_和_集合_（`str`、`list`、`set`、`tuple`、`dict`、`range(0)`）


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

当对象用于_布尔上下文_时，会通过`bool()`透明地求值为_真值_或_假值_：


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


如果类重写并实现了`__bool__()`方法和/或`__len__()`方法，就可以定义它们在真值场景下如何求值。


## 布尔值在底层是如何工作的

`bool`类型被实现为_int_的_子类型_。这意味着`True`与`1`_数值相等_，`False`与`0`_数值相等_。用_相等运算符_比较它们时，就能观察到这一点：


```python
>>> 1 == True
True

>>> 0 == False
True
```

不过，`bools`与`ints`**仍然不同**，用_身份运算符_`is`比较它们时就能看出来：


```python
>>> 1 is True
False

>>> 0 is False
False
```

> 注意：在 python >= 3.8 中，在`is`的_左侧_使用字面量（比如`1`、`''`、`[]`或`{}`）会触发警告。


用相等运算符把布尔变量与`True`或`False`比较，被认为是一种[Python 反模式][comparing to true in the wrong way]。而应该使用身份运算符`is`：


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
