# 简介

`Maybe`类型是 Elm 语言中处理可选值的方案。因此，它会出现在大量 Elm 核心函数的类型签名中，理解它至关重要。`Maybe`类型的定义如下：

```elm
type Maybe a = Nothing | Just a
```

在 Elm 的术语中，这被称为“自定义类型”定义。它表示这种类型的值要么是`Nothing`，要么是`Just`某个类型为`a`的值。创建`Maybe`值要通过它的两个构造器`Nothing`和`Just`之一来完成。读取`Maybe`的内容则通过模式匹配来完成。

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

`Maybe`模块中还提供了许多有用的函数，用来操作`Maybe`类型。

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
