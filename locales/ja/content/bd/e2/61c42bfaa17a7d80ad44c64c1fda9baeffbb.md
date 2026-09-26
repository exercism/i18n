# 概要

ボキャブラリーは、Factorにおける構成の単位です。名前を付けたワード定義の集まりです。

```factor
USING: kernel ;
IN: greetings.formal

: hello ( name -- str ) "Greetings, " prepend ;
```

## ファイルとディレクトリのレイアウト

ボキャブラリーの名前では、区切り文字として`.`を使います。パスはこのドットに対応します。

| ボキャブラリー | ファイル |
| ---                    | ---                                        |
| `greetings`            | `greetings/greetings.factor`               |
| `greetings.formal`     | `greetings/formal/formal.factor`           |
| `greetings.casual`     | `greetings/casual/casual.factor`           |

Factorのローダーは、*ボキャブラリーのルート*（プロジェクトのルートと、同梱されているbasisライブラリー）をたどりながら、各パス要素の名前と一致するディレクトリーを見つけるまでボキャブラリーを探します。最後の要素はファイル名として繰り返されます。

## `USING:`と`IN:`

`USING:`は、ほかのボキャブラリーを現在のファイルの検索パスに読み込みます（一度に1つのボキャブラリーなら`USE:`を使います）。`IN:`は、このファイルで定義するワードが*どのボキャブラリーに属するか*を宣言します。それらの完全修飾名は、その接頭辞で始まります。

```factor
USING: kernel sequences greetings.formal ;
IN: greetings

: greet-everyone ( names -- strs )
    [ hello ] map ;
```

ここでは、`greet-everyone`は`greetings`にあり、`greetings.formal`の`hello`と、`sequences`の`map`を呼び出します。

## 解答を複数のボキャブラリーに分ける理由

コードを複数のボキャブラリーに分けると、次のことができます。

- 小さなヘルパーワードを役割ごとにまとめ、それらを組み合わせる高レベルのルーチンから切り離せます。
- メインのルーチンを引き込むことなく、ほかの場所からヘルパーを再利用できます。
- それぞれのファイルを、1つのまとまりのある抽象化の層として読めます。

Factorのローダーは十分に速く、遅延評価もされるので、より小さなボキャブラリーへと*細かく*分割するのは低コストです。標準ライブラリーでの慣習は、積極的に分割するというものです。
