# ヒント

## 全般

- 電卓のスタックは、単なるFactorの配列です。*操作*とは、クォーテーション`( stack -- new-stack )`のことです。
- [`sequences`][sequences]の`head*`は、最後の`n`個の要素を除くすべてを返します。`last2`は最後の2つを返します。

## 1. 足し算を実装する

- [`kernel`][kernel]の`bi`を使って、入力を2つの計算に分岐させます。「配列から最後の2つの要素を除いたもの」と「最後の2つの要素の合計」です。その後、`suffix`が両者を結合します。

## 2. 掛け算を実装する

- タスク1と同じ形で、`+`の代わりに`*`を使います。

## 3. 1つの操作を適用する

- クォーテーションの効果は`( stack -- new-stack )`です。コンパイラが型チェックできるように、`call`にそれを宣言します：`call( stack -- new-stack )`。

## 4. プログラムを評価する

- [`sequences`][sequences]にある`each`は、クォーテーションをシーケンスに対して繰り返し適用します。繰り返しのたびに、その時点のスタックを見て、プログラムから次の操作を取り出し、それを適用します。

## 5. 名前で評価する

- [`assocs`][assocs]の`at`を使って各名前を連想配列から調べ、その操作を取得します。その後、`evaluate`を再利用します。
- [`curry-compose-fry`][fry]のfryクォーテーション`'[ _ at ]`は連想配列をクロージャとして取り込むので、`map`が1回の走査で各名前をその操作に置き換えられます。

## 6. 安全に割り算する

- [`kernel`][kernel]の`throw`はエラーを発生させます。`zero-divisor-error`はすでに宣言されているので、`zero-divisor-error throw`がその呼び出しです。
- 一番下の除数が`0`かどうかをチェックする`if`で、割り算の経路をガードします。

[sequences]: https://docs.factorcode.org/content/vocab-sequences.html
[kernel]: https://docs.factorcode.org/content/vocab-kernel.html
[assocs]: https://docs.factorcode.org/content/vocab-assocs.html
[fry]: https://docs.factorcode.org/content/vocab-fry.html
