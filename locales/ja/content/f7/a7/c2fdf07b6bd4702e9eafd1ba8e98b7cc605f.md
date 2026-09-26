# はじめに

Goには、`fmt`（formatパッケージ）という標準パッケージが用意されています。このパッケージには、入力と出力の形式を操作するためのさまざまな関数がそろっています。
もっともよく使われるのは`Sprintf`です。`Sprintf`は、`%s`のような_動詞_を使って値を文字列に埋め込み、その文字列を返します。

```go
import "fmt"

food := "taco"
fmt.Sprintf("Bring me a %s", food)
// Returns: Bring me a taco
```

Goでは、浮動小数点数を`Sprintf`の動詞で手軽に整形できます。`%g`（簡潔な表現）、`%e`（指数表記）、`%f`（指数なしの表記）です。これらの動詞を使うと、フィールドの幅と数値の位置を制御できます。

```go
import "fmt"

number := 4.3242
fmt.Sprintf("%.2f", number)
// Returns: 4.32
```

使える動詞の一覧は、[formatパッケージのドキュメント][fmt-docs]にあります。

`fmt`には、文字列を扱うためのほかの関数もあります。たとえば`Println`は、受け取った引数をそのままコンソールに出力します。`Printf`は、`Sprintf`と同じ方法で入力を整形してから出力します。

[fmt-docs]: https://pkg.go.dev/fmt
