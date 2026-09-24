# Додаток до інструкцій

## Як ця вправа побудована в Python

Хоча `stacks` і `queues` можна реалізувати за допомогою `lists`, `collections.deque`, `queue.LifoQueue` і `multiprocessing.Queue`, ця вправа передбачає [стек «останнім прийшов, першим вийшов» (`LIFO`)][baeldung: the stack data structure], побудований на _власноруч створеному_ [однозвʼязному списку][singly linked list]:

<br>

![Діаграма, що зображає стек, реалізований за допомогою звʼязаного списку. Ліворуч, з самого краю, розташовано кружечок зі штриховою рамкою під назвою New_Node, від якого праворуч відходять дві крапкові стрілки. New_Node містить напис «(becomes head) - New_Node - next = node_6». Верхня крапкова стрілка підписана «push» і вказує на Node_6, розташований вище й праворуч. Node_6 містить напис «(current) head - Node_6 - next = node_5». Нижня крапкова стрілка підписана «pop» і вказує на прямокутник із написом «gets removed on pop()». Від Node_6 відходить суцільна стрілка праворуч до Node_5, який містить напис «Node_5 - next = node_4». Від Node_5 відходить суцільна стрілка праворуч до Node_4, який містить напис «Node_4 - next = node_3». Ця закономірність повторюється до Node_1, який містить напис «(current) tail - Node_1 - next = None». Від Node_1 відходить крапкова стрілка праворуч до вузла з написом «None».](https://assets.exercism.org/images/tracks/python/simple-linked-list/linked-list.svg)

<br>

Не варто плутати це з [`LIFO` стеком на основі динамічного масиву чи списку][lifo stack array], який під капотом може використовувати `list`, `queue` або `array`.
У `stacks`, побудованих на динамічному масиві, інша позиція `head`, інша часова складність (Big-O) та інший обсяг памʼяті.

<br>

![Діаграма, що зображає стек, реалізований за допомогою масиву/динамічного масиву. Праворуч, з самого краю, розташовано прямокутник зі штриховою рамкою під назвою New_Node, від якого ліворуч відходять дві крапкові стрілки. New_Node містить напис «(becomes head) -  New_Node». Верхня крапкова стрілка підписана «append» і вказує на Node_6, розташований вище й ліворуч. Node_6 містить напис «(current) head - Node_6». Нижня крапкова стрілка підписана «pop» і вказує на прямокутник із крапковим контуром, який містить напис «gets removed on pop()». Від Node_6 відходить суцільна стрілка ліворуч до Node_5. Від Node_5 відходить суцільна стрілка ліворуч до Node_4. Ця закономірність повторюється до Node_1, який містить напис «(current) tail - Node_1».](https://assets.exercism.org/images/tracks/python/simple-linked-list/linked_list_array.svg)

<br>

Ось два питання на Stack Overflow, які варто взяти до уваги: [Стеки та черги на основі масиву проти списку][stack overflow: array-based vs list-based stacks and queues] і [Різниця між стеком на масиві, стеком на звʼязаному списку та стеком][stack overflow: what is the difference between array stack, linked stack, and stack].
Докладніше про звʼязані списки, `LIFO` стеки та інші абстрактні типи даних (`ADT`) у Python:

- [Baeldung: структури даних звʼязаного списку][baeldung linked lists] (_охоплює кілька реалізацій_)
- [Geeks for Geeks: стек на звʼязаному списку][geeks for geeks stack with linked list]
- [Mosh про абстрактні структури даних][mosh data structures in python] (_охоплює багато `ADT`, не лише звʼязані списки_)

<br>

## Класи в Python

«Канонічна» реалізація звʼязаного списку в Python зазвичай вимагає одного або кількох `classes`.
Щоб добре познайомитися з `classes`, зазирнімо до [concept:python/classes]() та супутньої вправи [exercise:python/ellens-alien-game](), або до [розділу про класи в офіційному туторіалі Python][classes tutorial].

<br>

## Спеціальні методи в Python

Тести цієї вправи викликатимуть `len()` для нашого `LinkedList`.
Щоб `len()` працював, нам потрібно буде створити спеціальний метод `__len__`.
Докладніше про реалізацію спеціальних, або «dunder», методів у Python можна дізнатися з [Документація Python: базове налаштування обʼєктів][basic customization] та [Документація Python: object.**len**(self)][__len__].

<br>

## Створення ітератора

Щоб мати змогу перебирати наш `LinkedList` у циклі або розвертати його, потрібно реалізувати спеціальний метод `__iter__`.
Подробиці реалізації можна знайти тут: [реалізація ітератора для класу][custom iterators].

<br>

## Налаштування та збудження винятків

Іноді в коді доводиться і [налаштовувати][customize errors], і [`raise`][raising exceptions] винятки.
Коли ми це робимо, завжди варто додавати **змістовне повідомлення про помилку**, яке вказує, що стало її джерелом.
Це робить код зрозумілішим і суттєво допомагає з налагодженням.

Власні винятки можна створювати за допомогою нових класів винятків (докладніше про [`classes`][classes tutorial]), які зазвичай є підкласами [`Exception`][exception base class].

Якщо відомо, що джерело помилки буде похідним від певного _типу_ винятку, можна успадкуватися від одного з [`built in error types`][built-in errors] під класом _Exception_.
Коли ми збуджуємо помилку, все одно варто додати змістовне повідомлення.

У цій конкретній вправі потрібно створити _власний виняток_, який буде [збуджено][raise statement]/«кинуто», коли наш звʼязаний список **порожній**.
Тести пройдуть лише тоді, коли ми налаштуємо відповідні винятки, збудимо їх за допомогою `raise` і додамо відповідні повідомлення про помилку.

Щоб налаштувати звичайний _виняток_, створімо `class`, який успадковується від `Exception`.
Збуджуючи власний виняток із повідомленням, запишімо повідомлення як аргумент типу `exception`:

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
