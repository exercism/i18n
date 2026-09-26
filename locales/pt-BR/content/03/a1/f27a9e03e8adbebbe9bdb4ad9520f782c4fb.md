# Introdução

O tipo `Maybe` é a solução da linguagem Elm para valores opcionais.
Por isso, ele aparece nas assinaturas de tipo de muitas funções centrais do Elm, e entendê-lo é fundamental.
O tipo `Maybe` é definido assim:

```elm
type Maybe a = Nothing | Just a
```

Isso é o que se chama de definição de um "custom type" na terminologia do Elm.
Isso indica que um valor desse tipo ou é `Nothing` ou é `Just` alguma coisa do tipo `a`.
Para criar um valor `Maybe`, usamos um de seus dois construtores: `Nothing` e `Just`.
Para ler o conteúdo de um `Maybe`, usamos casamento de padrões.

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

Também há várias funções úteis no módulo `Maybe` para manipular tipos `Maybe`.

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
