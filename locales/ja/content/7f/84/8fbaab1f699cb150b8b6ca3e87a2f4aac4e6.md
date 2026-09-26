# 指示の補足

## Pythonでのこの演習の構成

`stacks`や`queues`は`lists`、`collections.deque`、`queue.LifoQueue`、`multiprocessing.Queue`を使って実装できますが、この演習では、_自作の_[単方向連結リスト][singly linked list]を使った[「後入れ先出し」（`LIFO`）スタック][baeldung: the stack data structure]を想定しています。

<br>

![連結リストで実装されたスタックを表す図。破線の枠が付いたNew_Nodeという円が一番左側にあり、そこから右向きに2本の点線の矢印が伸びています。New_Nodeには「(becomes head) - New_Node - next = node_6」と書かれています。上の点線の矢印には「push」というラベルが付いていて、右上のNode_6を指しています。Node_6には「(current) head - Node_6 - next = node_5」と書かれています。下の点線の矢印には「pop」というラベルが付いていて、「gets removed on pop()」と書かれたボックスを指しています。Node_6からは実線の矢印が右向きに伸びてNode_5を指しています。Node_5には「Node_5 - next = node_4」と書かれています。Node_5からも実線の矢印が右向きに伸びてNode_4を指しています。Node_4には「Node_4 - next = node_3」と書かれています。このパターンはNode_1まで続き、Node_1には「(current) tail - Node_1 - next = None」と書かれています。Node_1からは点線の矢印が右向きに伸びて、「None」と書かれたノードを指しています。](https://assets.exercism.org/images/tracks/python/simple-linked-list/linked-list.svg)

<br>

これは、内部で`list`や`queue`、`array`を使うかもしれない[動的配列やリストを使った`LIFO`スタック][lifo stack array]と混同しないでください。動的配列ベースの`stacks`は、`head`の位置が異なり、時間計算量（Big-O）やメモリ使用量も異なります。

<br>

![配列または動的配列で実装されたスタックを表す図。破線の枠が付いたNew_Nodeというボックスが一番右側にあり、そこから左向きに2本の点線の矢印が伸びています。New_Nodeには「(becomes head) - New_Node」と書かれています。上の点線の矢印には「append」というラベルが付いていて、左上のNode_6を指しています。Node_6には「(current) head - Node_6」と書かれています。下の点線の矢印には「pop」というラベルが付いていて、点線の輪郭を持つ「gets removed on pop()」と書かれたボックスを指しています。Node_6からは実線の矢印が左向きに伸びてNode_5を指しています。Node_5からも実線の矢印が左向きに伸びてNode_4を指しています。このパターンはNode_1まで続き、Node_1には「(current) tail - Node_1」と書かれています。](https://assets.exercism.org/images/tracks/python/simple-linked-list/linked_list_array.svg)

<br>

これらの考慮点については、Stack Overflowの次の2つの質問を参照してください：[配列ベースとリストベースのスタックとキュー][stack overflow: array-based vs list-based stacks and queues]と、[配列スタック、連結スタック、スタックの違い][stack overflow: what is the difference between array stack, linked stack, and stack]。
Pythonにおける連結リスト、`LIFO`スタック、その他の抽象データ型（`ADT`）の詳細については、次の資料をご覧ください：

- [Baeldung: 連結リストのデータ構造][baeldung linked lists]（_複数の実装を扱っています_）
- [Geeks for Geeks: 連結リストを使ったスタック][geeks for geeks stack with linked list]
- [Moshによる抽象データ構造の解説][mosh data structures in python]（_連結リストだけでなく、多くの`ADT`を扱っています_）

<br>

## Pythonのクラス

Pythonで連結リストを「標準的」に実装するには、通常1つ以上の`classes`が必要です。
`classes`のよい入門としては、[concept:python/classes]()とその関連演習である[exercise:python/ellens-alien-game]()、あるいは[Python公式チュートリアルのクラスの節][classes tutorial]をご覧ください。

<br>

## Pythonの特殊メソッド

この演習のテストでは、`LinkedList`に対して`len()`を呼び出します。
`len()`を機能させるには、`__len__`という特殊メソッドを作成する必要があります。
Pythonで特殊メソッドや"dunder"メソッドを実装する方法の詳細については、[Pythonドキュメント: 基本的なオブジェクトのカスタマイズ][basic customization]と[Pythonドキュメント: object.**len**(self)][__len__]をご覧ください。

<br>

## イテレーターを作る

`LinkedList`をループでたどったり逆順にしたりできるようにするには、`__iter__`特殊メソッドを実装する必要があります。
実装の詳細については、[クラスにイテレーターを実装する方法][custom iterators]をご覧ください。

<br>

## 例外のカスタマイズと送出

コードの中で例外を[カスタマイズ][customize errors]したり[`raise`][raising exceptions]したりする必要がある場合があります。
その際は、エラーの原因を示す**意味のあるエラーメッセージ**を必ず含めてください。
そうするとコードが読みやすくなり、デバッグにも大いに役立ちます。

カスタム例外は、新しい例外クラスを作ることで作成できます（詳しくは[`classes`][classes tutorial]をご覧ください）。こうしたクラスは通常、[`Exception`][exception base class]のサブクラスです。

エラーの原因が特定の例外_型_から派生したものであるとわかっている場合は、_Exception_クラスの下にある[`built in error types`][built-in errors]のいずれかを継承するという選択肢があります。
エラーを送出するときも、意味のあるメッセージを含めるようにしてください。

この演習では、連結リストが**空**のときに[送出][raise statement]される（"thrown"）_カスタム例外_を作成する必要があります。
テストに合格するには、適切な例外をカスタマイズし、その例外を`raise`し、適切なエラーメッセージを含める必要があります。

汎用的な_例外_をカスタマイズするには、`Exception`を継承した`class`を作成します。
メッセージ付きでカスタム例外を送出するときは、メッセージを`exception`型の引数として書きます：

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
