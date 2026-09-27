# Appendice alle istruzioni

## Come è strutturato questo esercizio in Python

Mentre `stacks` e `queues` possono essere implementati usando `lists`, `collections.deque`, `queue.LifoQueue` e `multiprocessing.Queue`, questo esercizio richiede uno [stack «Last in, First Out» (`LIFO`)][baeldung: the stack data structure] che usa una [lista concatenata singola][singly linked list] _fatta su misura_:

<br>

![Diagramma che rappresenta uno stack implementato con una lista concatenata. Un cerchio con il bordo tratteggiato, chiamato New_Node, si trova all'estrema sinistra, con due linee tratteggiate a freccia rivolte verso destra. New_Node dice "(becomes head) - New_Node - next = node_6". La linea tratteggiata superiore è etichettata "push" e punta a Node_6, in alto a destra. Node_6 dice "(current) head - Node_6 - next = node_5". La linea tratteggiata inferiore è etichettata "pop" e punta a un riquadro che dice "gets removed on pop()". Node_6 ha una freccia continua che punta verso destra a Node_5, che dice "Node_5 - next = node_4". Node_5 ha una freccia continua che punta verso destra a Node_4, che dice "Node_4 - next = node_3". Questo schema prosegue fino a Node_1, che dice "(current) tail - Node_1 - next = None". Node_1 ha una freccia tratteggiata che punta verso destra a un nodo che dice "None".](https://assets.exercism.org/images/tracks/python/simple-linked-list/linked-list.svg)

<br>

Non va confuso con uno [`stack` `LIFO` che usa un array dinamico o una lista][lifo stack array], che sotto può usare una `list`, una `queue` o un `array`.
Gli `stacks` basati su array dinamici hanno una posizione di `head` diversa, una diversa complessità temporale (Big-O) e un diverso consumo di memoria.

<br>

![Diagramma che rappresenta uno stack implementato con un array/array dinamico. Un riquadro con il bordo tratteggiato, chiamato New_Node, si trova all'estrema destra, con due linee tratteggiate a freccia rivolte verso sinistra. New_Node dice "(becomes head) - New_Node". La linea tratteggiata superiore è etichettata "append" e punta a Node_6, in alto a sinistra. Node_6 dice "(current) head - Node_6". La linea tratteggiata inferiore è etichettata "pop" e punta a un riquadro con il contorno tratteggiato che dice "gets removed on pop()". Node_6 ha una freccia continua che punta verso sinistra a Node_5. Node_5 ha una freccia continua che punta verso sinistra a Node_4. Questo schema prosegue fino a Node_1, che dice "(current) tail - Node_1".](https://assets.exercism.org/images/tracks/python/simple-linked-list/linked_list_array.svg)

<br>

Dai un'occhiata a queste due domande su Stack Overflow per alcune considerazioni: [Array-Based vs List-Based Stacks and Queues][stack overflow: array-based vs list-based stacks and queues] e [Differences between Array Stack, Linked Stack, and Stack][stack overflow: what is the difference between array stack, linked stack, and stack].
Per maggiori dettagli sulle liste concatenate, sugli `stack` `LIFO` e su altri tipi di dati astratti (`ADT`) in Python:

- [Baeldung: Linked-list Data Structures][baeldung linked lists] (_copre più implementazioni_)
- [Geeks for Geeks: Stack with Linked List][geeks for geeks stack with linked list]
- [Mosh on Abstract Data Structures][mosh data structures in python] (_copre molti `ADT`, non solo le liste concatenate_)

<br>

## Le classi in Python

L'implementazione «canonica» di una lista concatenata in Python di solito richiede una o più `classes`.
Per una buona introduzione alle `classes`, vedi [concept:python/classes]() e l'esercizio abbinato [exercise:python/ellens-alien-game](), oppure [Class section of the Official Python Tutorial][classes tutorial].

<br>

## I metodi speciali in Python

I test di questo esercizio chiameranno `len()` sulla `LinkedList`.
Perché `len()` funzioni, dovrai creare un metodo speciale `__len__`.
Per i dettagli su come implementare i metodi speciali o "dunder" in Python, vedi [Python Docs: Basic Object Customization][basic customization] e [Python Docs: object.**len**(self)][__len__].

<br>

## Costruire un iteratore

Per poter scorrere o invertire la `LinkedList`, dovrai implementare il metodo speciale `__iter__`.
Vedi [implementing an iterator for a class][custom iterators] per i dettagli di implementazione.

<br>

## Personalizzare e sollevare eccezioni

A volte è necessario sia [personalizzare][customize errors] sia [`raise`][raising exceptions] le eccezioni nel codice.
Quando lo fai, includi sempre un **messaggio di errore significativo** che indichi qual è l'origine dell'errore.
Questo rende il codice più leggibile e aiuta molto nel debug.

Le eccezioni personalizzate si possono creare tramite nuove classi di eccezione (vedi [`classes`][classes tutorial] per maggiori dettagli) che sono in genere sottoclassi di [`Exception`][exception base class].

Nei casi in cui sai che l'origine dell'errore sarà una derivazione di un certo _tipo_ di eccezione, puoi scegliere di ereditare da uno dei [`built in error types`][built-in errors] sotto la classe _Exception_.
Quando sollevi l'errore, includi comunque un messaggio significativo.

Questo particolare esercizio richiede di creare un'_eccezione personalizzata_ da [sollevare][raise statement]/«lanciare» quando la lista concatenata è **vuota**.
I test passeranno solo se personalizzi le eccezioni appropriate, `raise` quelle eccezioni e includi messaggi di errore appropriati.

Per personalizzare un'_eccezione_ generica, crea una `class` che eredita da `Exception`.
Quando sollevi l'eccezione personalizzata con un messaggio, scrivi il messaggio come argomento del tipo `exception`:

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
