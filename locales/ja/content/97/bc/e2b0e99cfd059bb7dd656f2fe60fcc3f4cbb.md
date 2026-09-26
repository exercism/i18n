# ヒント

## 1. 承認を定義する

- 必要な選択肢のコンストラクターを持つ`Approval`を[代数的データ型として定義します][ADT]。

## 2. 料理を定義する

- 必要な選択肢のコンストラクターを持つ`Cuisine`を[代数的データ型として定義します][ADT]。

## 3. 映画のジャンルを定義する

- 必要な選択肢のコンストラクターを持つ`Genre`を[代数的データ型として定義します][ADT]。

## 4. アクティビティを定義する

- さまざまなアクティビティをまとめるには、[関連データを持つ代数的データ型を定義します][ADT-with-data]。

## 5. アクティビティを評価する

- アクティビティの値に応じてロジックを実行するには、[`case`式][case-expression]を使うのが一番です。
- 代数的データ型の`case`をパターンマッチすると、その関連データにアクセスできます。
- パターンに条件を追加するには、`case`の中で[ガード][guards]を使えます。
- 1つの`case`で他のすべての値をまとめて受け取りたいときは、ワイルドカードパターン`_`を使えます。

[ADT]: https://www.schoolofhaskell.com/school/starting-with-haskell/introduction-to-haskell/2-algebraic-data-types#enumeration-types
[ADT-with-data]: https://www.schoolofhaskell.com/school/starting-with-haskell/introduction-to-haskell/2-algebraic-data-types#beyond-enumerations
[case-expression]: https://www.schoolofhaskell.com/school/starting-with-haskell/introduction-to-haskell/2-algebraic-data-types#case-expessions
[guards]: https://learnyouahaskell.github.io/syntax-in-functions.html#guards-guards
