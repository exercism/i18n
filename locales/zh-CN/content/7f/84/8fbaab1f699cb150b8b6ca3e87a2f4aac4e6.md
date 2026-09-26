# 说明附录

## 这个练习在 Python 中的结构

虽然`stacks`和`queues`可以用`lists`、`collections.deque`、`queue.LifoQueue`和`multiprocessing.Queue`来实现，但这个练习要求的是用_自制_的[单链表][singly linked list]实现的[“后进先出”（`LIFO`）栈][baeldung: the stack data structure]：

<br>

![表示用链表实现的栈的示意图。最左侧是一个带虚线边框的圆，名为 New_Node，还有两条指向右侧的点线箭头。New_Node 上写着“(becomes head) - New_Node - next = node_6”。上方那条点线箭头标着“push”，指向位于右上方的 Node_6。Node_6 上写着“(current) head - Node_6 - next = node_5”。下方那条点线箭头标着“pop”，指向一个方块，方块上写着“gets removed on pop()”。Node_6 有一条实线箭头向右指向 Node_5，Node_5 上写着“Node_5 - next = node_4”。Node_5 有一条实线箭头向右指向 Node_4，Node_4 上写着“Node_4 - next = node_3”。这个模式一直延续到 Node_1，Node_1 上写着“(current) tail - Node_1 - next = None”。Node_1 有一条点线箭头向右指向一个写着“None”的节点。](https://assets.exercism.org/images/tracks/python/simple-linked-list/linked-list.svg)

<br>

不要把它和[用动态数组或列表实现的`LIFO`栈][lifo stack array]搞混，后者底层可能用的是`list`、`queue`或`array`。
基于动态数组的`stacks`，`head`位置不同，时间复杂度（Big-O）和内存占用也不同。

<br>

![表示用数组/动态数组实现的栈的示意图。最右侧是一个带虚线边框的方块，名为 New_Node，还有两条指向左侧的点线箭头。New_Node 上写着“(becomes head) -  New_Node”。上方那条点线箭头标着“append”，指向位于左上方的 Node_6。Node_6 上写着“(current) head - Node_6”。下方那条点线箭头标着“pop”，指向一个带点线轮廓的方块，方块上写着“gets removed on pop()”。Node_6 有一条实线箭头向左指向 Node_5。Node_5 有一条实线箭头向左指向 Node_4。这个模式一直延续到 Node_1，Node_1 上写着“(current) tail - Node_1”。](https://assets.exercism.org/images/tracks/python/simple-linked-list/linked_list_array.svg)

<br>

关于一些需要考虑的地方，可以参考这两个 Stack Overflow 问题：[基于数组 vs 基于列表的栈和队列][stack overflow: array-based vs list-based stacks and queues] 和 [数组栈、链式栈和栈之间的区别][stack overflow: what is the difference between array stack, linked stack, and stack]。
想进一步了解链表、`LIFO`栈以及 Python 中其他抽象数据类型（`ADT`）：

- [Baeldung：链表数据结构][baeldung linked lists]（_涵盖多种实现_）
- [Geeks for Geeks：用链表实现栈][geeks for geeks stack with linked list]
- [Mosh 谈抽象数据结构][mosh data structures in python]（_涵盖许多`ADT`，不只是链表_）

<br>

## Python 中的类

在 Python 中，链表的“经典”实现通常需要一个或多个`classes`。
想好好入门`classes`，可以看[concept:python/classes]()和配套练习[exercise:python/ellens-alien-game]()，或者[官方 Python 教程的类部分][classes tutorial]。

<br>

## Python 中的特殊方法

这个练习的测试会对你的`LinkedList`调用`len()`。
为了让`len()`正常工作，你需要创建一个`__len__`特殊方法。
关于在 Python 中实现特殊方法或“dunder”方法的细节，请参阅[Python 文档：对象的基本定制][basic customization]和[Python 文档：object.**len**(self)][__len__]。

<br>

## 构建迭代器

想支持对`LinkedList`进行循环遍历或反转，你需要实现`__iter__`特殊方法。
关于实现细节，请参阅[为类实现迭代器][custom iterators]。

<br>

## 自定义异常和抛出异常

有时候，在你的代码里既需要[自定义][customize errors]异常，也需要用[`raise`][raising exceptions]来抛出异常。
这样做时，一定要附上**有意义的错误信息**，说明错误的来源是什么。
这能让你的代码更易读，对调试也有很大帮助。

自定义异常可以通过新的异常类来创建（详见[`classes`][classes tutorial]），它们通常是[`Exception`][exception base class]的子类。

如果你知道错误来源会是某种异常_类型_的派生，可以选择继承 _Exception_ 类下的某个[`built in error types`][built-in errors]。
抛出错误时，仍然应该附上有意义的信息。

这个练习要求你创建一个_自定义异常_，当链表为**空**时将它[抛出][raise statement]／“throw”。
只有自定义了合适的异常、用`raise`抛出这些异常，并附上合适的错误信息，测试才会通过。

要自定义一个通用的_异常_，可以创建一个继承自`Exception`的`class`。
抛出带信息的自定义异常时，把这条信息作为参数传给`exception`类型：

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
