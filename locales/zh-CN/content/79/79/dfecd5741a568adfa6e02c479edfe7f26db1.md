# 说明补充


## 本练习在 Python 学习路径中如何实现


本练习的测试期望你的时钟会用一个 Clock `class` 来实现。
如果你还不熟悉 Python 里的类，可以先看看 [concept:python/classes]() 和[类][classes in python]（_出自 Python 文档_）。


## 表示你的类

在使用和调试[对象][what-is-an-object]时，为对象准备一个良好的表示形式很重要。
例如，如果你在 Python 的 [REPL][REPL] 环境中新建一个 [`datetime.datetime`][datetime] 对象，就可以查看它的[字符串表示][str-rep-classes]：


```python
>>> from datetime import datetime
>>> new_date = datetime(2022, 5, 4)
>>> new_date
datetime.datetime(2022, 5, 4, 0, 0)
```

你的 Clock `class` 应该创建一个自定义的 `object`，用来处理_不含_日期的时间。
这个 `class` 的一个重要之处在于它如何表示为_字符串_。
其他使用或调用由 Clock `class` 创建的 Clock `objects` 的程序员，都会借助这个字符串表示来调试，或做其他事情。
不过，自定义 `class` 的默认表示形式并不太有用：


```python
>>> Clock(12, 34)
<Clock object st 0x102807b20 >
```

要创建更有用的表示形式，你可以在 `class` 上定义一个 [`__repr__`][repr-method] [特殊方法][dunder-methods]。

理想情况下，这个 `__repr__` 方法返回的是有效的 Python 代码，把它传给 [`eval()`][eval-built-in] 就能重建该对象，正如 [`__repr__` 方法的规范][repr-docs]中所描述的那样。
返回有效的 Python 代码，另一位开发者就能把 `str` 直接复制粘贴到代码或 REPL 里。
一个表示 11:30 AM 的 `Clock` 可能长这样：

```python
 `Clock(11, 30)`
```

为所有自定义类定义 `__repr__` 方法都是一种好习惯。
另外还有几点值得考虑：

- 这个方法返回的信息，在调试问题时应该有用。
- 该方法_理想情况下_返回的字符串是有效的 Python 代码，尽管这并不总能做到。
- 如果有效的 Python 代码不现实，按惯例应返回尖括号之间的一段描述：`< ...a practical description... >`。


### 字符串转换

除了 `__repr__` 方法之外，有时还需要 `class` 的另一种“人类可读”的字符串表示形式。
这种表示形式可以用来把对象格式化成程序输出或文档。
要做到这一点，需要写一个 [`__str__`][str-dunder] 特殊方法。
再来看 `datetime.datetime`：


```python
>>> str(datetime.datetime(2022, 5, 4))
'2022-05-04 00:00:00'
```

当一个 `datetime` 对象被要求转换成字符串表示时，它会返回一个按 [ISO 8601 标准][ISO 8601]格式化的`str`，大多数 datetime 库都能把它解析成人类可读的日期和时间。

在这个练习中，你将有机会为你的 Clock 编写 `__str__` 方法，以及 `__repr__` 方法。

```python
>>> str(Clock(11, 30))
'11:30'
```

为了支持这种字符串转换，你需要在 `class` 上创建一个 `__str__` 特殊方法，返回一个更“人类可读”的字符串，用来显示 Clock 的时间。

如果你没有创建 `__str__` 方法，却对类调用了 `str()`，Python 会退而调用类上的 `__repr__`。
所以，如果你只实现这两个特殊方法中的一个，那么创建 `__repr__` 会比只创建 `__str__` 更好。


[ISO 8601]: https://www.iso.org/iso-8601-date-and-time-format.html
[REPL]: https://pythonprogramminglanguage.com/repl/
[classes in python]: https://docs.python.org/3/tutorial/classes.html
[datetime]: https://docs.python.org/3/library/datetime.html#available-types
[dunder-methods]: https://www.pythonmorsels.com/every-dunder-method/
[eval-built-in]: https://docs.python.org/3/library/functions.html#eval
[repr-docs]: https://docs.python.org/3/reference/datamodel.html#object.__repr__
[repr-method]: https://docs.python.org/3/library/functions.html#repr
[str-dunder]: https://docs.python.org/3/reference/datamodel.html#object.__str__
[str-rep-classes]: https://www.digitalocean.com/community/tutorials/python-str-repr-functions#introduction
[what-is-an-object]: https://realpython.com/ref/glossary/object/
