# Anexo às instruções

## Como este exercício está estruturado em Python

Embora `stacks` e `queues` possam ser implementadas com `lists`, `collections.deque`, `queue.LifoQueue` e `multiprocessing.Queue`, este exercício espera uma [pilha "o último a entrar, o primeiro a sair" (`LIFO`)][baeldung: the stack data structure] que usa uma [lista simplesmente ligada][singly linked list] _feita à medida_:

<br>

![Diagrama que representa uma pilha implementada com uma lista ligada. Um círculo com contorno tracejado chamado New_Node está no extremo esquerdo, com duas linhas pontilhadas com setas a apontar para a direita. New_Node diz "(becomes head) - New_Node - next = node_6". A linha pontilhada superior está etiquetada como "push" e aponta para Node_6, acima e à direita. Node_6 diz "(current) head - Node_6 - next = node_5". A linha pontilhada inferior está etiquetada como "pop" e aponta para uma caixa que diz "gets removed on pop()". Node_6 tem uma seta sólida que aponta para a direita para Node_5, que diz "Node_5 - next = node_4". Node_5 tem uma seta sólida a apontar para a direita para Node_4, que diz "Node_4 - next = node_3". Este padrão continua até Node_1, que diz "(current) tail - Node_1 - next = None". Node_1 tem uma seta pontilhada a apontar para a direita para um nó que diz "None".](https://assets.exercism.org/images/tracks/python/simple-linked-list/linked-list.svg)

<br>

Isto não deve ser confundido com uma [pilha `LIFO` que usa um array dinâmico ou uma lista][lifo stack array], que pode usar `list`, `queue` ou `array` por baixo.
As `stacks` baseadas em arrays dinâmicos têm uma posição de `head` diferente e uma complexidade temporal (Big-O) e ocupação de memória diferentes.

<br>

![Diagrama que representa uma pilha implementada com um array/array dinâmico. Uma caixa com contorno tracejado chamada New_Node está no extremo direito, com duas linhas pontilhadas com setas a apontar para a esquerda. New_Node diz "(becomes head) - New_Node". A linha pontilhada superior está etiquetada como "append" e aponta para Node_6, acima e à esquerda. Node_6 diz "(current) head - Node_6". A linha pontilhada inferior está etiquetada como "pop" e aponta para uma caixa com contorno pontilhado que diz "gets removed on pop()". Node_6 tem uma seta sólida que aponta para a esquerda para Node_5. Node_5 tem uma seta sólida a apontar para a esquerda para Node_4. Este padrão continua até Node_1, que diz "(current) tail - Node_1".](https://assets.exercism.org/images/tracks/python/simple-linked-list/linked_list_array.svg)

<br>

Consulta estas duas perguntas do Stack Overflow para teres algumas considerações: [Array-Based vs List-Based Stacks and Queues][stack overflow: array-based vs list-based stacks and queues] e [Differences between Array Stack, Linked Stack, and Stack][stack overflow: what is the difference between array stack, linked stack, and stack].
Para mais detalhes sobre listas ligadas, pilhas `LIFO` e outros tipos de dados abstratos (`ADT`) em Python:

- [Baeldung: Linked-list Data Structures][baeldung linked lists] (_abrange várias implementações_)
- [Geeks for Geeks: Stack with Linked List][geeks for geeks stack with linked list]
- [Mosh on Abstract Data Structures][mosh data structures in python] (_abrange muitos `ADT`s, não apenas listas ligadas_)

<br>

## Classes em Python

A implementação "canónica" de uma lista ligada em Python exige normalmente uma ou mais `classes`.
Para uma boa introdução às `classes`, consulta o [concept:python/classes]() e o exercício complementar [exercise:python/ellens-alien-game](), ou a [secção sobre classes do Tutorial Oficial de Python][classes tutorial].

<br>

## Métodos especiais em Python

Os testes deste exercício vão chamar `len()` ao teu `LinkedList`.
Para que `len()` funcione, tens de criar um método especial `__len__`.
Para detalhes sobre como implementar métodos especiais ou "dunder" em Python, consulta [Documentação Python: personalização básica de objetos][basic customization] e [Documentação Python: object.**len**(self)][__len__].

<br>

## Construir um iterador

Para permitir percorrer ou inverter o teu `LinkedList`, tens de implementar o método especial `__iter__`.
Consulta [implementar um iterador para uma classe][custom iterators] para obteres detalhes de implementação.

<br>

## Personalizar e lançar exceções

Por vezes, é necessário [personalizar][customize errors] e [`raise`][raising exceptions] exceções no teu código.
Quando o fazes, deves incluir sempre uma **mensagem de erro significativa** que indique qual é a origem do erro.
Isto torna o teu código mais legível e ajuda imenso na depuração.

Podes criar exceções personalizadas através de novas classes de exceção (consulta [`classes`][classes tutorial] para mais detalhes) que são normalmente subclasses de [`Exception`][exception base class].

Nas situações em que sabes que a origem do erro será uma derivada de um certo _tipo_ de exceção, podes optar por herdar de um dos [`built in error types`][built-in errors] sob a classe _Exception_.
Ao lançar o erro, deves continuar a incluir uma mensagem significativa.

Este exercício em particular exige que cries uma _exceção personalizada_ para ser [lançada][raise statement]/"thrown" quando a tua lista ligada estiver **vazia**.
Os testes só passam se personalizares as exceções adequadas, fizeres `raise` dessas exceções e incluíres mensagens de erro adequadas.

Para personalizar uma _exceção_ genérica, cria uma `class` que herde de `Exception`.
Ao lançar a exceção personalizada com uma mensagem, escreve a mensagem como argumento para o tipo `exception`:

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
