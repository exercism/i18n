# 指令補充


## 這個練習在 Python Track 上如何實作


這個練習的測試預期你的時鐘會以一個 Clock `class` 來實作。
如果你不熟悉 Python 的類別，`[concept:python/classes]()` 和 [類別][classes in python]（_出自 Python 官方文件_）都是很好的起點。


## 為你的類別建立表示方式

在操作和除錯[物件][what-is-an-object]時，有一個良好的物件表示方式很重要。
舉例來說，如果你在 Python [REPL][REPL] 環境中建立一個新的 [`datetime.datetime`][datetime] 物件，你就可以查看它的[字串表示方式][str-rep-classes]：


```python
>>> from datetime import datetime
>>> new_date = datetime(2022, 5, 4)
>>> new_date
datetime.datetime(2022, 5, 4, 0, 0)
```

你的 Clock `class` 應該建立一個自訂的 `object`，用來處理_不含_日期的時間。
這個 `class` 的一個重要面向，就是它如何以_字串_表示。
其他使用或呼叫由 Clock `class` 建立的 Clock `objects` 的開發者，會為了除錯和其他活動而參考這個字串表示方式。
不過，自訂 `class` 的預設表示方式幫助不大：


```python
>>> Clock(12, 34)
<Clock object st 0x102807b20 >
```

若要建立更有幫助的表示方式，你可以在 `class` 上定義一個[特殊方法][dunder-methods] [`__repr__`][repr-method]。

理想情況下，那個 `__repr__` 方法會回傳有效的 Python 程式碼，這段程式碼傳給 [`eval()`][eval-built-in] 後可以用來重新建立該物件，正如[`__repr__` 方法的規格][repr-docs]所描述的那樣。
回傳有效的 Python 程式碼，可以讓其他開發者把 `str` 直接複製貼上到程式碼或 REPL 中。
一個代表上午 11:30 的 `Clock` 可能長這樣：

```python
 `Clock(11, 30)`
```

為所有自訂類別定義 `__repr__` 方法都是好習慣。
還有一些額外的事情可以考慮：

- 這個方法回傳的資訊，應該在除錯問題時有幫助。
- _理想上_，該方法會回傳一段有效的 Python 程式碼字串，雖然這不一定總是可行。
- 如果有效的 Python 程式碼不切實際，慣例是回傳一段放在角括號之間的描述：`< ...a practical description... >`。


### 字串轉換

除了 `__repr__` 方法之外，有時也會需要另一種「人類可讀」的字串表示方式來表示這個 `class`。
這可能用來為程式輸出或文件格式化該物件。
這可以透過撰寫一個[特殊方法][str-dunder] [`__str__`][str-dunder] 來達成。
再看一次 `datetime.datetime`：


```python
>>> str(datetime.datetime(2022, 5, 4))
'2022-05-04 00:00:00'
```

當要求一個 `datetime` 物件將自己轉換成字串表示時，它會回傳一個依照 [ISO 8601 標準][ISO 8601]格式化的 `str`，大多數 datetime 函式庫都能將它解析成人類可讀的日期和時間。

在這個練習中，你將有機會為你的 Clock 撰寫 `__str__` 方法，以及 `__repr__` 方法。

```python
>>> str(Clock(11, 30))
'11:30'
```

為了支援這種字串轉換，你需要在你的 `class` 上建立一個 `__str__` 特殊方法，回傳一個更具「人類可讀」性、顯示時鐘時間的字串。

如果你沒有建立 `__str__` 方法，卻對你的類別呼叫 `str()`，Python 會退而嘗試呼叫你類別上的 `__repr__`。
所以如果你只想實作這兩個特殊方法的其中一個，最好建立 `__repr__`，而不是只建立 `__str__`。


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
