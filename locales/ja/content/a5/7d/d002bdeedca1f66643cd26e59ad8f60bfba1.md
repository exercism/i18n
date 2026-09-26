# ヒント

## 1. 運転免許証が必要かどうかを判断する

- 入力が特定の文字列と等しいかどうかを確認するには、[厳密等価演算子][mdn-equality-operators]を使います。
- 真偽値のコンセプトで学んだ2つの[論理演算子][mdn-logical-operators]のうち1つを使って、2つの条件を組み合わせます。
- このタスクを解くのに`if`文は**必要ありません**。組み立てた真偽値の式をそのまま返すことができます。

## 2. 購入する候補の2台の車から1台を選ぶ

- どちらの選択肢が辞書順で先に来るかを判断するには、[関係演算子][mdn-relational-operators]を使います。
- 次に、その比較の結果に応じて、[if-else文][mdn-if-statement]を使ってヘルパー変数の値を設定します。
- 最後に、おすすめの文を組み立てます。そのためには、[加算演算子][mdn-addition]を使って2つの文字列を連結します。

## 3. 中古車の価格の見積もりを計算する

- まず、車の経過年数に基づいて割合を決めます。それをヘルパー変数に保存します。手順で説明したとおり、[if-else if-else文][mdn-if-statement]を使います。
- 2つの`if`の条件では、[関係演算子][mdn-relational-operators]を使って車の経過年数としきい値を比較します。
- 結果を計算するには、元の価格に割合を適用します。たとえば、`30% of x`は、`30`を`100`で割って`x`を掛けると求められます。

[mdn-equality-operators]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators#equality_operators
[mdn-logical-operators]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators#binary_logical_operators
[mdn-relational-operators]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators#relational_operators
[mdn-addition]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Addition
[mdn-if-statement]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else
