# ヒント

## 全般

- 関数本体の中の1つの文だけでそれぞれのタスクを解くこともできますが、必須ではありません。


## 1. カードがあるかどうかを判定する

- カードは山札に[含まれている][ref-match]かどうかを確認しましょう。

## 2. カードの位置を見つける

- カードは山札にありますか？
- あるなら、[どの][ref-which]位置にありますか？
- カードはすべて異なることが保証されているので、このタスクは簡単です。
- 位置か`-1`のどちらかを返します。
  - 何かが`TRUE`か`FALSE`かで分岐するいろいろな方法については、[条件分岐のコンセプト][concept-conditionals]を参照してください。
  - [`if_else`][ref-if_else]（最も現代的ですが、ここでは必須ではありません）を使う場合は、両方の分岐が同じ型の結果を返すことに厳格である点に注意してください。空になる可能性のあるベクターではなく、1つの要素を明示的に返す必要があるかもしれません。
  - ベクターの最初の要素を取得するには、ベクターを返すものの後に`[1]`を付けるだけです。

## 3. それぞれのカードが偶数かどうかを判定する

- 余りを求める演算子は`%%`です。
- `x %% 2 == 0`なら、`x`は偶数です。
- カードは[すべて][ref-all]この条件に当てはまりますか？

## 4. 山札に奇数の値のカードが含まれているかどうかを確認する

- カードは偶数でなければ奇数なので、前のタスクを参照してください。
- [いずれか][ref-any]のカードがこの条件に当てはまりますか？

## 5. 山札から最初の奇数カードを取得する

- 山札に奇数カードはありますか？
- あるなら、最初の_カード_（位置ではありません）を返します。

## 6. 最初の偶数カードの位置を判定する

- 山札に偶数カードはありますか？
- あるなら、最初の偶数カードの_位置_を返します。

[ref-match]: https://www.rdocumentation.org/packages/base/versions/3.6.2/topics/match
[ref-which]: https://www.rdocumentation.org/packages/base/versions/3.3.0/topics/which
[concept-conditionals]: https://exercism.org/tracks/r/concepts/conditionals
[ref-all]: https://www.rdocumentation.org/packages/base/versions/3.3.0/topics/all
[ref-any]: https://www.rdocumentation.org/packages/base/versions/3.3.0/topics/any
[ref-if_else]: https://dplyr.tidyverse.org/reference/if_else.html
