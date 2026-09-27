# 簡介

`Maybe` 型別是 Elm 語言中用來處理選擇性值的解決方案。因此，它出現在許多核心 Elm 函式的型別簽章中，理解它非常重要。`Maybe` 型別的定義如下：

```elm
type Maybe a = Nothing | Just a
```

這在 Elm 的術語中稱為「custom type」定義。它表示這個型別的值可以是 `Nothing`，也可以是某個型別為 `a` 的 `Just` 值。建立 `Maybe` 值的方式，是透過它的兩個建構子 `Nothing` 和 `Just` 其中之一。讀取 `Maybe` 的內容則是透過模式比對。

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

`Maybe` 模組中還有許多實用的函式，可以用來操作 `Maybe` 型別。

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
