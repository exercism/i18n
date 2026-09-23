# Додаток до інструкцій


## Як цю вправу реалізовано для треку Python


Тести цієї вправи очікують, що годинник буде реалізовано як `class` Clock.
Якщо ми ще не працювали з класами в Python, варто почати з [concept:python/classes]() та [classes][classes in python] (_з документації Python_).


## Представлення класу

Коли ми працюємо з [обʼєктами][what-is-an-object] і налагоджуємо їх, важливо мати добре представлення цих обʼєктів.
Наприклад, якщо створити новий обʼєкт [`datetime.datetime`][datetime] у середовищі [REPL][REPL] Python, можна побачити його [рядкове представлення][str-rep-classes]:


```python
>>> from datetime import datetime
>>> new_date = datetime(2022, 5, 4)
>>> new_date
datetime.datetime(2022, 5, 4, 0, 0)
```

`class` Clock має створювати власний `object`, який працює з часом _без_ дат.
Один важливий аспект цього `class` - те, як його представлено у вигляді _рядка тексту_ (англ. string).
Інші програмісти, які використовують або викликають Clock `objects`, створені з `class` Clock, будуть звертатися до цього рядкового представлення для налагодження та інших завдань.
Однак типове представлення для власного `class` не дуже допомагає:


```python
>>> Clock(12, 34)
<Clock object st 0x102807b20 >
```

Щоб створити корисніше представлення, можна визначити [`__repr__`][repr-method] [спеціальний метод][dunder-methods] у `class`.

У ідеалі метод `__repr__` повертає коректний код Python, який можна використати, щоб відтворити обʼєкт, передавши його в [`eval()`][eval-built-in], як описано в [специфікації методу `__repr__`][repr-docs].
Повертаючи коректний код Python, ми даємо іншому розробнику змогу скопіювати `str` безпосередньо в код або в REPL.
`Clock`, який представляє 11:30 AM, може мати такий вигляд:

```python
 `Clock(11, 30)`
```

Визначати метод `__repr__` - добра практика для всіх власних класів.
Ще кілька речей, які варто врахувати:

- Інформація, яку повертає цей метод, має допомагати під час налагодження проблем.
- _В ідеалі_ метод повертає рядок тексту, який є коректним кодом Python, хоча це не завжди можливо.
- Якщо коректний код Python недоречний, прийнято повертати опис у кутових дужках: `< ...a practical description... >`.


### Перетворення на рядок тексту

Крім методу `__repr__`, може знадобитися й альтернативне, «зрозуміле для людини», рядкове представлення `class`.
Його можна використати, щоб відформатувати обʼєкт для виведення програми або документації.
Це робиться за допомогою спеціального методу [`__str__`][str-dunder].
Погляньмо ще раз на `datetime.datetime`:


```python
>>> str(datetime.datetime(2022, 5, 4))
'2022-05-04 00:00:00'
```

Коли обʼєкт `datetime` перетворює себе на рядкове представлення, він повертає `str`, відформатований відповідно до [стандарту ISO 8601][ISO 8601], який більшість бібліотек для роботи з датами й часом можуть розібрати у зрозумілі для людини дату й час.

У цій вправі ми матимемо нагоду написати для свого годинника метод `__str__`, а також метод `__repr__`.

```python
>>> str(Clock(11, 30))
'11:30'
```

Щоб підтримати це перетворення на рядок, потрібно створити спеціальний метод `__str__` у своєму `class`, який повертає «зрозуміліший для людини» рядок тексту із часом годинника.

Якщо не створити метод `__str__` і викликати `str()` для свого класу, Python спробує як запасний варіант викликати `__repr__` для цього класу.
Тож якщо з цих двох спеціальних методів ми реалізуємо лише один, краще створити `__repr__`, а не тільки `__str__`.


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
