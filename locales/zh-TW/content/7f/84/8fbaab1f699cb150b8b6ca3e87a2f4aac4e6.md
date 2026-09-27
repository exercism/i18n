# 補充說明

## 這個練習在 Python 中的結構

雖然`stacks`和`queues`可以用`lists`、`collections.deque`、`queue.LifoQueue`和`multiprocessing.Queue`來實作，但這個練習預期的是以 _自製的_ [單向鏈結串列][singly linked list]實作的[「後進先出」（`LIFO`）堆疊][baeldung: the stack data structure]：

<br>

![以鏈結串列實作堆疊的示意圖。最左側是一個虛線邊框的圓形，名為 New_Node，有兩條虛線箭頭指向右方。New_Node 標示著「(becomes head) - New_Node - next = node_6」。上方那條虛線箭頭標示為「push」，指向右上方的 Node_6。Node_6 標示著「(current) head - Node_6 - next = node_5」。下方那條虛線箭頭標示為「pop」，指向一個寫著「gets removed on pop()」的方塊。Node_6 有一條實線箭頭指向右方的 Node_5，Node_5 標示著「Node_5 - next = node_4」。Node_5 有一條實線箭頭指向右方的 Node_4，Node_4 標示著「Node_4 - next = node_3」。這個模式一直持續到 Node_1，Node_1 標示著「(current) tail - Node_1 - next = None」。Node_1 有一條虛線箭頭指向右方一個寫著「None」的節點。](https://assets.exercism.org/images/tracks/python/simple-linked-list/linked-list.svg)

<br>

這不應該與[使用動態陣列的`LIFO`堆疊][lifo stack array]混為一談，後者底層可能使用`list`、`queue`或`array`。
以動態陣列為基礎的`stacks`有不同的`head`位置，以及不同的時間複雜度（Big-O）與記憶體佔用量。

<br>

![以陣列／動態陣列實作堆疊的示意圖。最右側是一個虛線邊框的方塊，名為 New_Node，有兩條虛線箭頭指向左方。New_Node 標示著「(becomes head) -  New_Node」。上方那條虛線箭頭標示為「append」，指向左上方的 Node_6。Node_6 標示著「(current) head -  Node_6」。下方那條虛線箭頭標示為「pop」，指向一個虛線外框、寫著「gets removed on pop()」的方塊。Node_6 有一條實線箭頭指向左方的 Node_5。Node_5 有一條實線箭頭指向左方的 Node_4。這個模式一直持續到 Node_1，Node_1 標示著「(current) tail - Node_1」。](https://assets.exercism.org/images/tracks/python/simple-linked-list/linked_list_array.svg)

<br>

有幾個考量點可以參考這兩篇 Stack Overflow 問答：[以陣列為基礎與以鏈結串列為基礎的堆疊與佇列][stack overflow: array-based vs list-based stacks and queues]，以及[陣列堆疊、鏈結堆疊與堆疊之間的差異][stack overflow: what is the difference between array stack, linked stack, and stack]。
關於鏈結串列、`LIFO`堆疊，以及 Python 中其他抽象資料型態（`ADT`）的更多細節：

- [Baeldung：鏈結串列資料結構][baeldung linked lists]（_涵蓋多種實作_）
- [Geeks for Geeks：以鏈結串列實作堆疊][geeks for geeks stack with linked list]
- [Mosh 談抽象資料結構][mosh data structures in python]（_涵蓋許多`ADT`，不只是鏈結串列_）

<br>

## Python 中的類別

Python 中「正統」的鏈結串列實作通常需要一個或多個`classes`。
如果想好好認識`classes`，請參閱 [concept:python/classes]() 與搭配的練習 [exercise:python/ellens-alien-game]()，或是 [Python 官方教學的類別章節][classes tutorial]。

<br>

## Python 中的特殊方法

這個練習的測試會對你的`LinkedList`呼叫`len()`。
為了讓`len()`能運作，你需要建立`__len__`特殊方法。
關於在 Python 中實作特殊方法或「dunder」方法的細節，請參閱 [Python 文件：基本物件自訂][basic customization] 與 [Python 文件：object.**len**(self)][__len__]。

<br>

## 建立疊代器

若要支援對你的`LinkedList`進行迴圈或反轉，你需要實作`__iter__`特殊方法。
實作細節請參閱[為類別實作疊代器][custom iterators]。

<br>

## 自訂與引發例外

有時候，你的程式碼需要同時[自訂][customize errors]與[`raise`][raising exceptions]例外。
這麼做時，你應該總是在其中加上**有意義的錯誤訊息**，指出錯誤的來源是什麼。
這會讓你的程式碼更容易閱讀，對除錯也有很大的幫助。

自訂例外可以透過新的例外類別來建立（詳情請參閱[`classes`][classes tutorial]），這些類別通常是[`Exception`][exception base class]的子類別。

如果你知道錯誤來源會是某種例外_型別_的衍生物，可以選擇繼承 _Exception_ 類別底下的其中一種[`built in error types`][built-in errors]。
引發錯誤時，你還是應該附上有意義的訊息。

這個練習要求你建立一個_自訂例外_，在鏈結串列為**空**時[引發][raise statement]／「拋出」它。
只有當你自訂適當的例外、`raise`這些例外，並加上適當的錯誤訊息時，測試才會通過。

若要自訂一般的_例外_，請建立一個繼承自`Exception`的`class`。
引發自訂例外並附上訊息時，請將訊息寫成`exception`型別的引數：

```python
# subclassing Exception to create EmptyListException
class EmptyListException(Exception):
    """Exception raised when the linked list is empty.

    message: explanation of the error.

    """
    def __init__(self, message):
        self.message = message

# raising an EmptyListException
raise EmptyListException("The list is empty.")
```

[__len__]: https://docs.python.org/3/reference/datamodel.html#object.__len__
[baeldung linked lists]: https://www.baeldung.com/cs/linked-list-data-structure
[baeldung: the stack data structure]: https://www.baeldung.com/cs/stack-data-structure
[basic customization]: https://docs.python.org/3/reference/datamodel.html#basic-customization
[built-in errors]: https://docs.python.org/3/library/exceptions.html#base-classes
[classes tutorial]: https://docs.python.org/3/tutorial/classes.html#tut-classes
[custom iterators]: https://docs.python.org/3/tutorial/classes.html#iterators
[customize errors]: https://docs.python.org/3/tutorial/errors.html#user-defined-exceptions
[exception base class]: https://docs.python.org/3/library/exceptions.html#Exception
[geeks for geeks stack with linked list]: https://www.geeksforgeeks.org/implement-a-stack-using-singly-linked-list/
[lifo stack array]: https://www.scaler.com/topics/stack-in-python/
[mosh data structures in python]: https://programmingwithmosh.com/data-structures/data-structures-in-python-stacks-queues-linked-lists-trees/
[raise statement]: https://docs.python.org/3/reference/simple_stmts.html#the-raise-statement
[raising exceptions]: https://docs.python.org/3/tutorial/errors.html#raising-exceptions
[singly linked list]: https://blog.boot.dev/computer-science/building-a-linked-list-in-python-with-examples/
[stack overflow: array-based vs list-based stacks and queues]: https://stackoverflow.com/questions/7477181/array-based-vs-list-based-stacks-and-queues?rq=1
[stack overflow: what is the difference between array stack, linked stack, and stack]: https://stackoverflow.com/questions/22995753/what-is-the-difference-between-array-stack-linked-stack-and-stack
