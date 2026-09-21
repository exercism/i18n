# Kiegészítés az utasításokhoz

## Hogyan épül fel ez a feladat Pythonban

Bár a `stacks` és a `queues` megvalósítható `lists`, `collections.deque`, `queue.LifoQueue` és `multiprocessing.Queue` használatával, ez a feladat egy [„Last in, First Out” (`LIFO`) vermet][baeldung: the stack data structure] vár el, amely egy _saját készítésű_ [egyszeresen láncolt listát][singly linked list] használ:

<br>

![Vermet ábrázoló diagram, amely láncolt listával van megvalósítva. Egy szaggatott szegélyű kör, amelynek neve New_Node, a bal szélen található, és két pontozott nyílvonal mutat jobbra. A New_Node felirata: „(becomes head) - New_Node - next = node_6”. A felső pontozott nyílvonal címkéje „push”, és a jobbra feljebb lévő Node_6-ra mutat. A Node_6 felirata: „(current) head - Node_6 - next = node_5”. Az alsó pontozott nyílvonal címkéje „pop”, és egy olyan dobozra mutat, amelynek felirata: „gets removed on pop()”. A Node_6-ból egy folytonos nyíl mutat jobbra a Node_5-re, amelynek felirata: „Node_5 - next = node_4”. A Node_5-ből egy folytonos nyíl mutat jobbra a Node_4-re, amelynek felirata: „Node_4 - next = node_3”. Ez a minta folytatódik egészen a Node_1-ig, amelynek felirata: „(current) tail - Node_1 - next = None”. A Node_1-ből egy pontozott nyíl mutat jobbra egy olyan csomópontra, amelynek felirata: „None”.](https://assets.exercism.org/images/tracks/python/simple-linked-list/linked-list.svg)

<br>

Ezt nem szabad összekeverni a [`LIFO` vermet dinamikus tömbbel vagy listával megvalósító változattal][lifo stack array], amely alul `list`-et, `queue`-t vagy `array`-t használhat.
A dinamikus tömbön alapuló `stacks`-nek más a `head` pozíciója, más az időbonyolultsága (Big-O) és más a memóriaigénye.

<br>

![Vermet ábrázoló diagram, amely tömb/dinamikus tömb segítségével van megvalósítva. Egy szaggatott szegélyű doboz, amelynek neve New_Node, a jobb szélen található, és két pontozott nyílvonal mutat balra. A New_Node felirata: „(becomes head) - New_Node”. A felső pontozott nyílvonal címkéje „append”, és a balra feljebb lévő Node_6-ra mutat. A Node_6 felirata: „(current) head - Node_6”. Az alsó pontozott nyílvonal címkéje „pop”, és egy szaggatott körvonalú dobozra mutat, amelynek felirata: „gets removed on pop()”. A Node_6-ból egy folytonos nyíl mutat balra a Node_5-re. A Node_5-ből egy folytonos nyíl mutat balra a Node_4-re. Ez a minta folytatódik egészen a Node_1-ig, amelynek felirata: „(current) tail - Node_1”.](https://assets.exercism.org/images/tracks/python/simple-linked-list/linked_list_array.svg)

<br>

Nézz meg két Stack Overflow-kérdést néhány szempont átgondolásához: [Tömbalapú vs. listaalapú vermek és sorok][stack overflow: array-based vs list-based stacks and queues] és [Különbségek a tömbalapú verem, a láncolt verem és a verem között][stack overflow: what is the difference between array stack, linked stack, and stack].
A láncolt listákról, a `LIFO` vermekről és más absztrakt adattípusokról (`ADT`) Pythonban további részleteket itt találsz:

- [Baeldung: Láncolt lista adatszerkezetek][baeldung linked lists] (_több implementációt is bemutat_)
- [Geeks for Geeks: Verem láncolt listával][geeks for geeks stack with linked list]
- [Mosh az absztrakt adatszerkezetekről][mosh data structures in python] (_sok `ADT`-t bemutat, nem csak a láncolt listákat_)

<br>

## Osztályok Pythonban

A láncolt lista „kanonikus” implementációja Pythonban általában egy vagy több `class`-t igényel.
A `class`-ek jó bevezetőjéhez lásd a [concept:python/classes]() fogalmat és a hozzá tartozó [exercise:python/ellens-alien-game]() feladatot, vagy a [A hivatalos Python-oktatóanyag osztályokról szóló része][classes tutorial] című részt.

<br>

## Speciális metódusok Pythonban

A feladat tesztjei a `len()` függvényt fogják meghívni a `LinkedList`-eden.
Ahhoz, hogy a `len()` működjön, létre kell hoznod egy `__len__` speciális metódust.
A speciális vagy „dunder” metódusok Pythonbeli megvalósításáról lásd a [Python-dokumentáció: Az objektumok alapvető testreszabása][basic customization] és a [Python-dokumentáció: object.**len**(self)][__len__] című részt.

<br>

## Iterátor készítése

Ahhoz, hogy a `LinkedList`-eden végig lehessen iterálni vagy meg lehessen fordítani, meg kell valósítanod a `__iter__` speciális metódust.
A megvalósítás részleteiért lásd az [iterátor implementálása egy osztályhoz][custom iterators] című részt.

<br>

## Kivételek testreszabása és kiváltása

Néha a kódodban egyszerre kell [testre szabnod][customize errors] és [`raise`][raising exceptions] a kivételeket.
Amikor ezt teszed, mindig adj meg egy **beszédes hibaüzenetet**, amely jelzi, mi a hiba forrása.
Ettől olvashatóbb lesz a kódod, és a hibakeresést is jelentősen megkönnyíti.

Egyedi kivételeket új kivételosztályok létrehozásával hozhatsz létre (részletekért lásd a [`classes`][classes tutorial] részt), amelyek általában a [`Exception`][exception base class] leszármazottai.

Ha tudod, hogy a hiba forrása egy bizonyos kivétel_típus_ leszármazottja lesz, akkor választhatod azt is, hogy az _Exception_ osztály alatti [`built in error types`][built-in errors] egyikéből örökölsz.
A hiba kiváltásakor ilyenkor is adj meg egy beszédes üzenetet.

Ez a feladat azt kéri, hogy hozz létre egy _egyedi kivételt_, amelyet [kiváltani][raise statement]/„dobni” kell, amikor a láncolt listád **üres**.
A tesztek csak akkor lesznek sikeresek, ha testre szabod a megfelelő kivételeket, `raise`-eled őket, és megfelelő hibaüzeneteket adsz meg.

Egy általános _kivétel_ testre szabásához hozz létre egy `class`-t, amely a `Exception`-ből örököl.
Amikor üzenettel együtt váltod ki az egyedi kivételt, az üzenetet a `exception` típus argumentumaként add meg:

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
