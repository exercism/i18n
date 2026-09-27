# Ergänzung zur Anleitung

## Wie diese Übung in Python aufgebaut ist

Während `stacks` und `queues` mit `lists`, `collections.deque`, `queue.LifoQueue` und `multiprocessing.Queue` implementiert werden können, erwartet diese Übung einen [„Last in, First Out"-(`LIFO`)-Stack][baeldung: the stack data structure] mit einer _selbstgebauten_ [einfach verketteten Liste][singly linked list]:

<br>

![Diagramm, das einen mit einer verketteten Liste implementierten Stack darstellt. Ein Kreis mit gestricheltem Rand namens New_Node befindet sich ganz links, mit zwei gepunkteten Pfeillinien, die nach rechts zeigen. New_Node zeigt „(becomes head) - New_Node - next = node_6". Die obere gepunktete Pfeillinie ist mit „push" beschriftet und zeigt nach oben rechts auf Node_6. Node_6 zeigt „(current) head - Node_6 - next = node_5". Die untere gepunktete Pfeillinie ist mit „pop" beschriftet und zeigt auf eine Box, in der „gets removed on pop()" steht. Node_6 hat einen durchgezogenen Pfeil, der nach rechts auf Node_5 zeigt, und dieser zeigt „Node_5 - next = node_4". Node_5 hat einen durchgezogenen Pfeil, der nach rechts auf Node_4 zeigt, und dieser zeigt „Node_4 - next = node_3". Dieses Muster setzt sich fort bis Node_1, das „(current) tail - Node_1 - next = None" zeigt. Node_1 hat einen gepunkteten Pfeil, der nach rechts auf einen Knoten zeigt, auf dem „None" steht.](https://assets.exercism.org/images/tracks/python/simple-linked-list/linked-list.svg)

<br>

Das sollte nicht mit einem [`LIFO`-Stack verwechselt werden, der auf einem dynamischen Array oder einer Liste basiert][lifo stack array] und darunter eine `list`, `queue` oder ein `array` verwenden kann.
Auf dynamischen Arrays basierende `stacks` haben eine andere `head`-Position und eine andere Zeitkomplexität (Big-O) sowie einen anderen Speicherbedarf.

<br>

![Diagramm, das einen mit einem Array/dynamischen Array implementierten Stack darstellt. Eine Box mit gestricheltem Rand namens New_Node befindet sich ganz rechts, mit zwei gepunkteten Pfeillinien, die nach links zeigen. New_Node zeigt „(becomes head) -  New_Node". Die obere gepunktete Pfeillinie ist mit „append" beschriftet und zeigt nach oben links auf Node_6. Node_6 zeigt „(current) head - Node_6". Die untere gepunktete Pfeillinie ist mit „pop" beschriftet und zeigt auf eine Box mit gepunktetem Umriss, in der „gets removed on pop()" steht. Node_6 hat einen durchgezogenen Pfeil, der nach links auf Node_5 zeigt. Node_5 hat einen durchgezogenen Pfeil, der nach links auf Node_4 zeigt. Dieses Muster setzt sich fort bis Node_1, das „(current) tail - Node_1" zeigt.](https://assets.exercism.org/images/tracks/python/simple-linked-list/linked_list_array.svg)

<br>

Zu einigen Überlegungen sieh dir diese beiden Stack-Overflow-Fragen an: [Array-basierte vs. listenbasierte Stacks und Queues][stack overflow: array-based vs list-based stacks and queues] und [Unterschiede zwischen Array-Stack, verkettetem Stack und Stack][stack overflow: what is the difference between array stack, linked stack, and stack].
Mehr Details zu verketteten Listen, `LIFO`-Stacks und anderen abstrakten Datentypen (`ADT`) in Python findest du hier:

- [Baeldung: Datenstrukturen für verkettete Listen][baeldung linked lists] (_behandelt mehrere Implementierungen_)
- [Geeks for Geeks: Stack mit verketteter Liste][geeks for geeks stack with linked list]
- [Mosh über abstrakte Datenstrukturen][mosh data structures in python] (_behandelt viele `ADT`s, nicht nur verkettete Listen_)

<br>

## Klassen in Python

Die „kanonische" Implementierung einer verketteten Liste in Python erfordert normalerweise eine oder mehrere `classes`.
Für eine gute Einführung in `classes` schau dir [concept:python/classes]() und die begleitende Übung [exercise:python/ellens-alien-game]() an, oder den [Abschnitt über Klassen im offiziellen Python-Tutorial][classes tutorial].

<br>

## Spezielle Methoden in Python

Die Tests für diese Übung rufen `len()` für deine `LinkedList` auf.
Damit `len()` funktioniert, musst du eine spezielle Methode `__len__` erstellen.
Details zur Implementierung spezieller oder „Dunder"-Methoden in Python findest du unter [Python Docs: Grundlegende Anpassung von Objekten][basic customization] und [Python Docs: object.**len**(self)][__len__].

<br>

## Einen Iterator erstellen

Damit du deine `LinkedList` durchlaufen oder umkehren kannst, musst du die spezielle Methode `__iter__` implementieren.
Details zur Implementierung findest du unter [einen Iterator für eine Klasse implementieren][custom iterators].

<br>

## Ausnahmen anpassen und auslösen

Manchmal ist es nötig, Ausnahmen in deinem Code sowohl [anzupassen][customize errors] als auch sie mit [`raise`][raising exceptions] auszulösen.
Dabei solltest du immer eine **aussagekräftige Fehlermeldung** angeben, die angibt, wo die Fehlerquelle liegt.
Das macht deinen Code lesbarer und hilft beim Debuggen erheblich.

Eigene Ausnahmen lassen sich über neue Ausnahmeklassen erstellen (siehe [`classes`][classes tutorial] für mehr Details), die typischerweise Unterklassen von [`Exception`][exception base class] sind.

Wenn du weißt, dass die Fehlerquelle von einem bestimmten Ausnahme-_Typ_ abgeleitet ist, kannst du von einem der [`built in error types`][built-in errors] unter der _Exception_-Klasse erben.
Wenn du den Fehler auslöst, solltest du trotzdem eine aussagekräftige Meldung angeben.

Diese Übung verlangt, dass du eine _eigene Ausnahme_ erstellst, die [ausgelöst][raise statement]/„geworfen" wird, wenn deine verkettete Liste **leer** ist.
Die Tests bestehen nur, wenn du passende Ausnahmen anpasst, diese Ausnahmen mit `raise` auslöst und passende Fehlermeldungen angibst.

Um eine generische _Ausnahme_ anzupassen, erstelle eine `class`, die von `Exception` erbt.
Wenn du die eigene Ausnahme mit einer Meldung auslöst, schreibst du die Meldung als Argument für den `exception`-Typ:

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
