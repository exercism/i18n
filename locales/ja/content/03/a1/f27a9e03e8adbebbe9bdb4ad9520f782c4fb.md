# はじめに

`Maybe`型は、値があるかもしれないし、ないかもしれないという状況に対応するためにElmが用意した型です。そのため、Elmの多くのコア関数の型シグネチャに現れ、これを理解することはとても重要です。`Maybe`型は次のように定義されています。

```elm
type Maybe a = Nothing | Just a
```

これは、Elmの用語で「カスタム型」の定義と呼ばれます。この定義は、この型の値が`Nothing`であるか、あるいは型`a`の何かを持つ`Just`であるかの、どちらかであることを示しています。`Maybe`の値を作るには、2つのコンストラクター`Nothing`と`Just`のどちらかを使います。`Maybe`の中身を取り出すには、パターンマッチングを使います。

```elm
matthieu : Maybe String
matthieu = Just "Matthieu"

anon : Maybe String
anon = Nothing

sayHello : Maybe String -> String
sayHello maybeName =
    case maybeName of
        Nothing -> "Hello, World!"
        Just someName -> "Hello, " ++ someName ++ "!"

sayHello matthieu
    --> "Hello, Matthieu!"

sayHello anon
    --> "Hello, World!"
```

`Maybe`モジュールには、`Maybe`型を操作するための便利な関数もいくつか用意されています。

```elm
sayHelloAgain : Maybe String -> String
sayHelloAgain name = "Hello, " ++ Maybe.withDefault "World" name ++ "!"

capitalizeName : Maybe String -> Maybe String
capitalizeName name = Maybe.map String.toUpper name

capitalizeName matthieu
    --> Just "MATTHIEU"

capitalizeName anon
    --> Nothing
```
