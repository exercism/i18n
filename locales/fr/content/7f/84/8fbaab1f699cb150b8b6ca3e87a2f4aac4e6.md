# Instructions complémentaires

## Comment cet exercice est structuré en Python

Bien que les `stacks` et les `queues` puissent être implémentés à l'aide de `lists`, `collections.deque`, `queue.LifoQueue` et `multiprocessing.Queue`, cet exercice attend une [pile « dernier entré, premier sorti » (`LIFO`)][baeldung: the stack data structure] reposant sur une [liste simplement chaînée][singly linked list] _faite maison_ :

<br>

![Schéma représentant une pile implémentée avec une liste chaînée. Un cercle à bordure en pointillés nommé New_Node se trouve à l'extrême gauche, avec deux flèches en pointillés orientées vers la droite. New_Node indique « (becomes head) - New_Node - next = node_6 ». La flèche en pointillés du haut est étiquetée « push » et pointe vers Node_6, en haut à droite. Node_6 indique « (current) head - Node_6 - next = node_5 ». La flèche en pointillés du bas est étiquetée « pop » et pointe vers une boîte qui indique « gets removed on pop() ». Node_6 a une flèche pleine qui pointe vers la droite vers Node_5, qui indique « Node_5 - next = node_4 ». Node_5 a une flèche pleine pointant vers la droite vers Node_4, qui indique « Node_4 - next = node_3 ». Ce schéma se répète jusqu'à Node_1, qui indique « (current) tail - Node_1 - next = None ». Node_1 a une flèche en pointillés pointant vers la droite vers un nœud qui indique « None ».](https://assets.exercism.org/images/tracks/python/simple-linked-list/linked-list.svg)

<br>

Il ne faut pas la confondre avec une [pile `LIFO` reposant sur un tableau dynamique][lifo stack array], qui peut s'appuyer en interne sur une `list`, une `queue` ou un `array`.
Les `stacks` basées sur un tableau dynamique ont une position de `head`, une complexité temporelle (Big-O) et une empreinte mémoire différentes.

<br>

![Schéma représentant une pile implémentée avec un tableau ou un tableau dynamique. Une boîte à bordure en pointillés nommée New_Node se trouve à l'extrême droite, avec deux flèches en pointillés orientées vers la gauche. New_Node indique « (becomes head) - New_Node ». La flèche en pointillés du haut est étiquetée « append » et pointe vers Node_6, en haut à gauche. Node_6 indique « (current) head - Node_6 ». La flèche en pointillés du bas est étiquetée « pop » et pointe vers une boîte au contour en pointillés qui indique « gets removed on pop() ». Node_6 a une flèche pleine qui pointe vers la gauche vers Node_5. Node_5 a une flèche pleine pointant vers la gauche vers Node_4. Ce schéma se répète jusqu'à Node_1, qui indique « (current) tail - Node_1 ».](https://assets.exercism.org/images/tracks/python/simple-linked-list/linked_list_array.svg)

<br>

Consulte ces deux questions sur Stack Overflow pour quelques points de réflexion : [Piles et files basées sur un tableau vs sur une liste][stack overflow: array-based vs list-based stacks and queues] et [Différences entre pile sur tableau, pile chaînée et pile][stack overflow: what is the difference between array stack, linked stack, and stack].
Pour plus de détails sur les listes chaînées, les piles `LIFO` et les autres types de données abstraits (`ADT`) en Python :

- [Baeldung : structures de données de listes chaînées][baeldung linked lists] (_couvre plusieurs implémentations_)
- [Geeks for Geeks : pile avec une liste chaînée][geeks for geeks stack with linked list]
- [Mosh sur les structures de données abstraites][mosh data structures in python] (_couvre de nombreux `ADT`, pas seulement les listes chaînées_)

<br>

## Les classes en Python

L'implémentation « canonique » d'une liste chaînée en Python nécessite généralement une ou plusieurs `classes`.
Pour une bonne introduction aux `classes`, consulte [concept:python/classes]() et l'exercice complémentaire [exercise:python/ellens-alien-game](), ou la [section sur les classes du tutoriel officiel de Python][classes tutorial].

<br>

## Les méthodes spéciales en Python

Les tests de cet exercice appelleront `len()` sur ta `LinkedList`.
Pour que `len()` fonctionne, tu devras créer une méthode spéciale `__len__`.
Pour plus de détails sur l'implémentation des méthodes spéciales, ou « dunder », en Python, consulte la [documentation Python : personnalisation de base des objets][basic customization] et la [documentation Python : object.**len**(self)][__len__].

<br>

## Construis un itérateur

Pour pouvoir parcourir ou inverser ta `LinkedList`, tu devras implémenter la méthode spéciale `__iter__`.
Consulte [implémenter un itérateur pour une classe][custom iterators] pour les détails d'implémentation.

<br>

## Personnalise et lève des exceptions

Il est parfois nécessaire à la fois de [personnaliser][customize errors] et de [`raise`][raising exceptions] des exceptions dans ton code.
Quand tu le fais, tu dois toujours inclure un **message d'erreur explicite** indiquant quelle est la source de l'erreur.
Cela rend le code plus lisible et aide beaucoup lors du débogage.

On peut créer des exceptions personnalisées au moyen de nouvelles classes d'exception (voir [`classes`][classes tutorial] pour plus de détails), qui sont généralement des sous-classes de [`Exception`][exception base class].

Dans les cas où tu sais que la source de l'erreur sera dérivée d'un certain _type_ d'exception, tu peux choisir d'hériter de l'un des [`built in error types`][built-in errors] sous la classe _Exception_.
Au moment de lever l'erreur, tu dois quand même inclure un message explicite.

Cet exercice particulier demande de créer une _exception personnalisée_ qui sera [levée][raise statement] ou « lancée » quand la liste chaînée est **vide**.
Les tests ne réussiront que si tu personnalises les exceptions appropriées, que tu `raise` ces exceptions et que tu inclus des messages d'erreur appropriés.

Pour personnaliser une _exception_ générique, crée une `class` qui hérite de `Exception`.
Quand tu lèves l'exception personnalisée avec un message, écris ce message comme argument du type `exception` :

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
