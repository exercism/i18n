# 説明の補足

## ヒント

`diamond`関数を実装する必要があります。この関数は、`A`から始まり、与えられた文字を最も幅の広い位置に持つダイヤモンドを出力します。型がよくわからない場合は、用意されているシグネチャを使ってもかまいません。ただし、それに縛られて創造性を制限しないようにしましょう。

```haskell
diamond :: Char -> Maybe [String]
```

この演習ではテキストデータを扱います。歴史的な理由から、Haskellの`String`型は、文字のリストである`[Char]`と同義です。テキストデータをより効率的に扱うには、`Text`型を使うことができます。

この演習の任意の発展として、次のことができます。

- Haskellの[文字列型](https://haskell-lang.org/tutorial/string-types)について読む。
- package.yamlの依存関係のリストに`- text`を追加する。
- `Data.Text`を[次のように](https://hackernoon.com/4-steps-to-a-better-imports-list-in-haskell-43a3d868273c)インポートする。

```haskell
import qualified Data.Text as T
import           Data.Text (Text)
```

- これで、例えば`diamond :: Char -> Maybe [Text]`のように書いたり、`Data.Text`のコンビネーターを例えば`T.pack`のように参照したりできるようになります。
- [`Data.Text`](https://hackage.haskell.org/package/text/docs/Data-Text.html)のドキュメントを調べてみましょう。
- その後、Diamond.hs内の`String`をすべて`Text`に置き換えられます。

```haskell
diamond :: Char -> Maybe [Text]
```

この部分は完全に任意です。
