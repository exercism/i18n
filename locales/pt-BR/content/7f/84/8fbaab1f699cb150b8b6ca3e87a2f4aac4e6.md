# Apêndice das instruções

## Como este exercício é estruturado em Python

Embora `stacks` e `queues` possam ser implementadas com `lists`, `collections.deque`, `queue.LifoQueue` e `multiprocessing.Queue`, este exercício espera uma pilha ["Last in, First Out" (`LIFO`)][baeldung: the stack data structure] usando uma [lista simplesmente encadeada][singly linked list] _feita sob medida_:

<br>

![Diagrama que representa uma pilha implementada com uma lista encadeada. Um círculo com borda tracejada chamado New_Node fica bem à esquerda, com duas linhas de seta pontilhadas apontando para a direita. New_Node mostra "(becomes head) - New_Node - next = node_6". A linha de seta pontilhada de cima tem o rótulo "push" e aponta para Node_6, acima e à direita. Node_6 mostra "(current) head - Node_6 - next = node_5". A linha de seta pontilhada de baixo tem o rótulo "pop" e aponta para uma caixa que mostra "gets removed on pop()". Node_6 tem uma seta sólida que aponta para a direita, para Node_5, que mostra "Node_5 - next = node_4". Node_5 tem uma seta sólida apontando para a direita, para Node_4, que mostra "Node_4 - next = node_3". Esse padrão continua até Node_1, que mostra "(current) tail - Node_1 - next = None". Node_1 tem uma seta pontilhada apontando para a direita, para um nó que diz "None".](https://assets.exercism.org/images/tracks/python/simple-linked-list/linked-list.svg)

<br>

Isso não deve ser confundido com uma [pilha `LIFO` usando um array dinâmico ou uma lista][lifo stack array], que pode usar por baixo uma `list`, uma `queue` ou um `array`.
`stacks` baseadas em array dinâmico têm uma posição de `head` diferente, assim como complexidade de tempo (Big-O) e consumo de memória diferentes.

<br>

![Diagrama que representa uma pilha implementada com um array/array dinâmico. Uma caixa com borda tracejada chamada New_Node fica bem à direita, com duas linhas de seta pontilhadas apontando para a esquerda. New_Node mostra "(becomes head) - New_Node". A linha de seta pontilhada de cima tem o rótulo "append" e aponta para Node_6, acima e à esquerda. Node_6 mostra "(current) head - Node_6". A linha de seta pontilhada de baixo tem o rótulo "pop" e aponta para uma caixa com contorno pontilhado que mostra "gets removed on pop()". Node_6 tem uma seta sólida que aponta para a esquerda, para Node_5. Node_5 tem uma seta sólida apontando para a esquerda, para Node_4. Esse padrão continua até Node_1, que mostra "(current) tail - Node_1".](https://assets.exercism.org/images/tracks/python/simple-linked-list/linked_list_array.svg)

<br>

Veja estas duas perguntas do Stack Overflow para algumas considerações: [Array-Based vs List-Based Stacks and Queues][stack overflow: array-based vs list-based stacks and queues] e [Differences between Array Stack, Linked Stack, and Stack][stack overflow: what is the difference between array stack, linked stack, and stack].
Para mais detalhes sobre listas encadeadas, pilhas `LIFO` e outros tipos abstratos de dados (`ADT`) em Python:

- [Baeldung: Linked-list Data Structures][baeldung linked lists] (_aborda várias implementações_)
- [Geeks for Geeks: Stack with Linked List][geeks for geeks stack with linked list]
- [Mosh on Abstract Data Structures][mosh data structures in python] (_aborda muitos `ADT`s, não apenas listas encadeadas_)

<br>

## Classes em Python

A implementação "canônica" de uma lista encadeada em Python normalmente exige uma ou mais `classes`.
Para uma boa introdução a `classes`, veja [concept:python/classes]() e o exercício complementar [exercise:python/ellens-alien-game](), ou a [seção de classes do Tutorial Oficial de Python][classes tutorial].

<br>

## Métodos especiais em Python

Os testes deste exercício vão chamar `len()` na sua `LinkedList`.
Para que `len()` funcione, você vai precisar criar um método especial `__len__`.
Para detalhes sobre como implementar métodos especiais, ou "dunder", em Python, veja [Python Docs: Basic Object Customization][basic customization] e [Python Docs: object.**len**(self)][__len__].

<br>

## Construindo um iterador

Para permitir que você percorra ou inverta sua `LinkedList`, você vai precisar implementar o método especial `__iter__`.
Veja [como implementar um iterador para uma classe][custom iterators] para detalhes de implementação.

<br>

## Personalizando e lançando exceções

Às vezes é preciso tanto [personalizar][customize errors] quanto [`raise`][raising exceptions] exceções no seu código.
Quando fizer isso, inclua sempre uma **mensagem de erro significativa** que indique qual é a origem do erro.
Isso deixa seu código mais legível e ajuda bastante na depuração.

Exceções personalizadas podem ser criadas por meio de novas classes de exceção (veja [`classes`][classes tutorial] para mais detalhes), que normalmente são subclasses de [`Exception`][exception base class].

Em situações em que você sabe que a origem do erro será uma derivada de um certo _tipo_ de exceção, você pode escolher herdar de um dos [`built in error types`][built-in errors] sob a classe _Exception_.
Ao lançar o erro, você ainda deve incluir uma mensagem significativa.

Este exercício em particular exige que você crie uma _exceção personalizada_ para ser [lançada][raise statement]/"disparada" quando sua lista encadeada estiver **vazia**.
Os testes só vão passar se você personalizar as exceções adequadas, fizer o `raise` dessas exceções e incluir mensagens de erro adequadas.

Para personalizar uma _exceção_ genérica, crie uma `class` que herde de `Exception`.
Ao lançar a exceção personalizada com uma mensagem, escreva a mensagem como argumento do tipo `exception`:

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
