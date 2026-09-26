# Apéndice de instrucciones

## Cómo está estructurado este ejercicio en Python

Aunque las `stacks` y las `queues` se pueden implementar con `lists`, `collections.deque`, `queue.LifoQueue` y `multiprocessing.Queue`, este ejercicio espera una pila ["último en entrar, primero en salir" (`LIFO`)][baeldung: the stack data structure] que use una [lista enlazada simple][singly linked list] _hecha a medida_:

<br>

![Diagrama que representa una pila implementada con una lista enlazada. A la izquierda del todo hay un círculo con borde discontinuo llamado New_Node, con dos líneas de flechas punteadas que apuntan hacia la derecha. New_Node dice «(becomes head) - New_Node - next = node_6». La línea de flecha punteada de arriba está etiquetada como «push» y apunta a Node_6, arriba y a la derecha. Node_6 dice «(current) head - Node_6 - next = node_5». La línea de flecha punteada de abajo está etiquetada como «pop» y apunta a un recuadro que dice «gets removed on pop()». Node_6 tiene una flecha sólida que apunta hacia la derecha a Node_5, que dice «Node_5 - next = node_4». Node_5 tiene una flecha sólida que apunta hacia la derecha a Node_4, que dice «Node_4 - next = node_3». Este patrón continúa hasta Node_1, que dice «(current) tail - Node_1 - next = None». Node_1 tiene una flecha punteada que apunta hacia la derecha a un nodo que dice «None».](https://assets.exercism.org/images/tracks/python/simple-linked-list/linked-list.svg)

<br>

Esto no debe confundirse con una [pila `LIFO` que usa un array dinámico o una lista][lifo stack array], que puede usar por debajo un `list`, un `queue` o un `array`.
Las `stacks` basadas en arrays dinámicos tienen una posición de `head` distinta, y también distinta complejidad temporal (Big-O) y distinto consumo de memoria.

<br>

![Diagrama que representa una pila implementada con un array/arreglo dinámico. A la derecha del todo hay un recuadro con borde discontinuo llamado New_Node, con dos líneas de flechas punteadas que apuntan hacia la izquierda. New_Node dice «(becomes head) - New_Node». La línea de flecha punteada de arriba está etiquetada como «append» y apunta a Node_6, arriba y a la izquierda. Node_6 dice «(current) head - Node_6». La línea de flecha punteada de abajo está etiquetada como «pop» y apunta a un recuadro con contorno punteado que dice «gets removed on pop()». Node_6 tiene una flecha sólida que apunta hacia la izquierda a Node_5. Node_5 tiene una flecha sólida que apunta hacia la izquierda a Node_4. Este patrón continúa hasta Node_1, que dice «(current) tail - Node_1».](https://assets.exercism.org/images/tracks/python/simple-linked-list/linked_list_array.svg)

<br>

Consulta estas dos preguntas de Stack Overflow para tener en cuenta algunas consideraciones: [Pilas y colas basadas en arrays frente a basadas en listas][stack overflow: array-based vs list-based stacks and queues] y [Diferencias entre pila basada en array, pila enlazada y pila][stack overflow: what is the difference between array stack, linked stack, and stack].
Para más detalles sobre listas enlazadas, pilas `LIFO` y otros tipos de datos abstractos (`ADT`) en Python:

- [Baeldung: estructuras de datos de listas enlazadas][baeldung linked lists] (_cubre varias implementaciones_)
- [Geeks for Geeks: pila con lista enlazada][geeks for geeks stack with linked list]
- [Mosh sobre estructuras de datos abstractas][mosh data structures in python] (_cubre muchos `ADT`, no solo listas enlazadas_)

<br>

## Las clases en Python

La implementación «canónica» de una lista enlazada en Python normalmente requiere una o más `classes`.
Para una buena introducción a `classes`, consulta la [concept:python/classes]() y el ejercicio complementario [exercise:python/ellens-alien-game](), o la [sección de clases del tutorial oficial de Python][classes tutorial].

<br>

## Métodos especiales en Python

Los tests de este ejercicio llamarán a `len()` sobre tu `LinkedList`.
Para que `len()` funcione, tendrás que crear un método especial `__len__`.
Para más detalles sobre cómo implementar métodos especiales o "dunder" en Python, consulta la [documentación de Python: personalización básica de objetos][basic customization] y la [documentación de Python: object.**len**(self)][__len__].

<br>

## Cómo construir un iterador

Para poder recorrer tu `LinkedList` en un bucle o invertirla, tendrás que implementar el método especial `__iter__`.
Consulta [cómo implementar un iterador para una clase][custom iterators] para ver los detalles de implementación.

<br>

## Cómo personalizar y lanzar excepciones

A veces es necesario tanto [personalizar][customize errors] como [`raise`][raising exceptions] excepciones en tu código.
Cuando lo hagas, siempre debes incluir un **mensaje de error significativo** que indique cuál es el origen del error.
Esto hace que tu código sea más legible y ayuda mucho a la hora de depurar.

Las excepciones personalizadas se pueden crear mediante nuevas clases de excepción (consulta [`classes`][classes tutorial] para más detalles) que normalmente son subclases de [`Exception`][exception base class].

Cuando sepas que el origen del error será una derivada de cierto _tipo_ de excepción, puedes optar por heredar de uno de los [`built in error types`][built-in errors] que están bajo la clase _Exception_.
Cuando lances el error, igual debes incluir un mensaje significativo.

Este ejercicio en particular requiere que crees una _excepción personalizada_ que se [lance][raise statement]/«arroje» cuando tu lista enlazada esté **vacía**.
Los tests solo pasarán si personalizas las excepciones adecuadas, las lanzas con `raise` e incluyes mensajes de error adecuados.

Para personalizar una _excepción_ genérica, crea una `class` que herede de `Exception`.
Cuando lances la excepción personalizada con un mensaje, escribe el mensaje como argumento del tipo `exception`:

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
