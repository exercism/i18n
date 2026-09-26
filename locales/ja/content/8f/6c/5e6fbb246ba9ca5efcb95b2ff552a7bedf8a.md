# はじめに

関数が別の関数（またはクロージャ）を仮引数として受け取るとき、渡されたクロージャはデフォルトで*ノンエスケープ*と呼ばれます。
クロージャが関数を*エスケープする*と言うのは、その関数自体がすでに戻ったあとにクロージャが呼び出される場合です。

この状況は、次のようなときによく起こります。

- クロージャが外部の変数やプロパティに格納される場合。
- 何らかの処理が完了したあとに、クロージャが非同期で実行される場合。
- 関数からクロージャが返され、あとで呼び出される場合。

次の例を見てみましょう。

```swift
func emptyKitchen(_ order: String) -> String {
    "Sorry, we're all out of \(order)."
}

func prepare(order: String, kitchen: (String) -> String) -> (String) -> String {
    func newKitchen(_ newOrder: String) -> String {
        if newOrder == order {
            return "One \(order) coming up!"
        } else {
            return kitchen(newOrder)
        }
    }
    return newKitchen
}
```

このコードでは、`prepare`は`kitchen`という名前の関数を受け取り、`kitchen`を呼び出す新しい関数`newKitchen`を作り、`newKitchen`を返します。
このコードをコンパイルしようとすると、エラーが発生します。`Escaping local function captures non-escaping parameter 'kitchen'`

`newKitchen`は`prepare`より長く存続するため、`kitchen`クロージャはエスケープします。
これを可能にするには、仮引数の型に`@escaping`属性を付けます。

```swift
func prepare(order: String, kitchen: @escaping (String) -> String) -> (String) -> String {
    func newKitchen(_ newOrder: String) -> String {
        if newOrder == order {
            return "One \(order) coming up!"
        } else {
            return kitchen(newOrder)
        }
    }
    return newKitchen
}

let restaurant = prepare(
    order: "sandwich",
    kitchen: prepare(
        order: "chicken",
        kitchen: prepare(order: "steak", kitchen: emptyKitchen)
    )
)

print(restaurant("pork chop"))
// Prints "Sorry, we're all out of pork chop."

print(restaurant("chicken"))
// Prints "One chicken coming up!"
```

`@escaping`属性は、そのクロージャが関数呼び出しより長く存続することをSwiftコンパイラーに伝え、Swiftがメモリーとキャプチャした参照を適切に管理できるようにします。

[escaping]: https://docs.swift.org/swift-book/LanguageGuide/Closures.html#ID546
