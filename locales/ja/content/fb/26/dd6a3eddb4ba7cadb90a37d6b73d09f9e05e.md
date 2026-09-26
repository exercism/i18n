# 説明の補足

## Arturoでの説明

この演習では、`stringify`というワードを2通りの方法で呼び出せるようにする必要があります。

1. `roman`属性を付けて呼び出す場合（例：`stringify.roman 3999`）
2. `roman`属性を付けずに呼び出す場合（例：`stringify 3999`）

詳しくは、[attributes][attributes]のドキュメントと、[`attr`][attr]のドキュメントを参照してください。

~~~~exercism/caution
`attr`に加えて、`attrs`関数も便利です。関数呼び出しのすべての属性を辞書として返してくれます。

ただし、この2つの関数は破壊的であることに注意してください。

Arturoの実装では、["attributes table"][createAttrsStack]を使っています。

* `attrs`は、属性を取得したあとに[明示的にテーブルを空にします][getAttrsDict]。
* `attr`は、テーブルから属性を[取り除きます（ポップします）][builtinAttr]。

例を見てみましょう。

```arturo
showAttributes: function [x][
    print attr 'question
    print attrs
    print attrs
]

showAttributes .question:"6 * 9" .answer:42 'arg
```
出力結果は次のとおりです。
```
6 * 9
[answer:42]
[]
```

ステップを追うごとに、属性の辞書が小さくなっていくのがわかります。

**結論**：属性を取得できるのは一度だけであることに注意してください。
属性をあとから参照する必要がある場合は、関数の最初にまとめて取得しておきましょう。

[getAttrsDict]: https://github.com/arturo-lang/arturo/blob/2ef0081570feb6ab752404c32bbf85132df379fb/src/vm/stack.nim#L187
[builtinAttr]: https://github.com/arturo-lang/arturo/blob/2ef0081570feb6ab752404c32bbf85132df379fb/src/library/Reflection.nim#L85
[createAttrsStack]: https://github.com/arturo-lang/arturo/blob/2ef0081570feb6ab752404c32bbf85132df379fb/src/vm/stack.nim#L136
~~~~

[attributes]: https://arturo-lang.io/documentation/language/#attributes
[attr]: https://arturo-lang.io/documentation/library/reflection/attr/
