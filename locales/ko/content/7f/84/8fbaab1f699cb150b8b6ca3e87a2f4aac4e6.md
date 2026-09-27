# 추가 지침

## Python에서 이 연습 문제를 구성하는 방식

`stacks`와 `queues`는 `lists`, `collections.deque`, `queue.LifoQueue`, `multiprocessing.Queue`로 구현할 수 있지만, 이 연습 문제에서는 _직접 만든_ [단일 연결 리스트][singly linked list]를 사용하는 ["후입선출"(`LIFO`) 스택][baeldung: the stack data structure]을 기대해요:

<br>

![연결 리스트로 구현한 스택을 나타내는 다이어그램. 점선 테두리가 있는 New_Node라는 원이 맨 왼쪽에 있고, 두 개의 점선 화살표가 오른쪽을 가리켜요. New_Node에는 "(head가 됨) - New_Node - next = node_6"이라고 적혀 있어요. 맨 위 점선 화살표에는 "push"라고 표시되어 있고 오른쪽 위의 Node_6을 가리켜요. Node_6에는 "(현재) head - Node_6 - next = node_5"라고 적혀 있어요. 맨 아래 점선 화살표에는 "pop"이라고 표시되어 있고 "pop() 하면 제거됨"이라고 적힌 상자를 가리켜요. Node_6에서 오른쪽의 Node_5로 향하는 실선 화살표가 있고, Node_5에는 "Node_5 - next = node_4"라고 적혀 있어요. Node_5에서 오른쪽의 Node_4로 향하는 실선 화살표가 있고, Node_4에는 "Node_4 - next = node_3"이라고 적혀 있어요. 이 패턴이 Node_1까지 이어져요. Node_1에는 "(현재) tail - Node_1 - next = None"이라고 적혀 있어요. Node_1에서 오른쪽으로 점선 화살표가 있어 "None"이라고 쓰인 노드를 가리켜요.](https://assets.exercism.org/images/tracks/python/simple-linked-list/linked-list.svg)

<br>

이것은 내부적으로 `list`, `queue`, `array`를 사용할 수도 있는 [동적 배열이나 리스트를 사용하는 `LIFO` 스택][lifo stack array]과 혼동하면 안 돼요.
동적 배열 기반 `stacks`는 `head` 위치가 다르고 시간 복잡도(Big-O)와 메모리 사용량도 달라요.

<br>

![배열/동적 배열로 구현한 스택을 나타내는 다이어그램. 점선 테두리가 있는 New_Node라는 상자가 맨 오른쪽에 있고, 두 개의 점선 화살표가 왼쪽을 가리켜요. New_Node에는 "(head가 됨) - New_Node"라고 적혀 있어요. 맨 위 점선 화살표에는 "append"라고 표시되어 있고 왼쪽 위의 Node_6을 가리켜요. Node_6에는 "(현재) head - Node_6"이라고 적혀 있어요. 맨 아래 점선 화살표에는 "pop"이라고 표시되어 있고 점선 윤곽의 상자를 가리키며, 그 상자에는 "pop() 하면 제거됨"이라고 적혀 있어요. Node_6에서 왼쪽의 Node_5로 향하는 실선 화살표가 있어요. Node_5에서 왼쪽의 Node_4로 향하는 실선 화살표가 있어요. 이 패턴이 Node_1까지 이어져요. Node_1에는 "(현재) tail - Node_1"이라고 적혀 있어요.](https://assets.exercism.org/images/tracks/python/simple-linked-list/linked_list_array.svg)

<br>

몇 가지 고려 사항은 다음 두 Stack Overflow 질문을 참고해요: [배열 기반 vs 리스트 기반 스택과 큐][stack overflow: array-based vs list-based stacks and queues], 그리고 [배열 스택, 연결 스택, 스택의 차이점][stack overflow: what is the difference between array stack, linked stack, and stack].
Python에서 연결 리스트, `LIFO` 스택, 그리고 다른 추상 자료형(`ADT`)에 대한 더 자세한 내용은 다음과 같아요:

- [Baeldung: 연결 리스트 자료 구조][baeldung linked lists] (_여러 구현을 다뤄요_)
- [Geeks for Geeks: 연결 리스트를 사용한 스택][geeks for geeks stack with linked list]
- [Mosh의 추상 자료 구조][mosh data structures in python] (_연결 리스트뿐만 아니라 다양한 `ADT`를 다뤄요_)

<br>

## Python의 클래스

Python에서 연결 리스트를 "정석" 방식으로 구현하려면 보통 하나 이상의 `classes`가 필요해요.
`classes`에 대한 좋은 입문 자료로는 [concept:python/classes]()와 함께 제공되는 연습 문제 [exercise:python/ellens-alien-game](), 또는 [공식 Python 튜토리얼의 클래스 섹션][classes tutorial]을 참고해요.

<br>

## Python의 특수 메서드

이 연습 문제의 테스트는 작성한 `LinkedList`에 `len()`을 호출해요.
`len()`이 동작하게 하려면 `__len__` 특수 메서드를 만들어야 해요.
Python에서 특수 메서드, 즉 "dunder" 메서드를 구현하는 자세한 방법은 [Python 문서: 기본 객체 사용자 정의][basic customization]와 [Python 문서: object.**len**(self)][__len__]을 참고해요.

<br>

## 이터레이터 만들기

`LinkedList`를 순회하거나 뒤집으려면 `__iter__` 특수 메서드를 구현해야 해요.
구현 세부 사항은 [클래스의 이터레이터 구현하기][custom iterators]를 참고해요.

<br>

## 예외 사용자 정의와 발생시키기

때로는 코드에서 예외를 [사용자 정의][customize errors]하고 [`raise`][raising exceptions]해야 할 때가 있어요.
이럴 때는 오류의 원인이 무엇인지 알려 주는 **의미 있는 오류 메시지**를 항상 포함해야 해요.
이렇게 하면 코드가 더 읽기 쉬워지고 디버깅에 큰 도움이 돼요.

사용자 정의 예외는 보통 [`Exception`][exception base class]의 서브클래스인 새로운 예외 클래스를 통해 만들 수 있어요(자세한 내용은 [`classes`][classes tutorial] 참고).

오류의 원인이 특정 예외 _타입_ 에서 파생된 것임을 아는 경우에는 _Exception_ 클래스 아래에 있는 [`built in error types`][built-in errors] 중 하나를 상속받도록 선택할 수 있어요.
오류를 발생시킬 때도 여전히 의미 있는 메시지를 포함해야 해요.

이 연습 문제에서는 연결 리스트가 **비어 있을 때** [발생][raise statement]되는, 즉 "던져지는" _사용자 정의 예외_ 를 만들어야 해요.
테스트를 통과하려면 적절한 예외를 사용자 정의하고, 그 예외를 `raise`하고, 적절한 오류 메시지를 포함해야 해요.

일반 _예외_ 를 사용자 정의하려면 `Exception`을 상속받는 `class`를 만들어요.
사용자 정의 예외를 메시지와 함께 발생시킬 때는 메시지를 `exception` 타입의 인자로 작성해요:

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
