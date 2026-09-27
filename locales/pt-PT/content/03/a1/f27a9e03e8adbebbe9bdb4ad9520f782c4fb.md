# Introdução

O tipo `Maybe` é a solução da linguagem Elm para valores opcionais.
Por isso, aparece nas assinaturas de tipos de muitas funções essenciais do Elm, e compreendê-lo é fundamental.
O tipo `Maybe` é definido da seguinte forma:

```elm
type Maybe a = Nothing | Just a
```

Em terminologia Elm, isto é o que se chama uma definição de "tipo personalizado".
Indica que um valor deste tipo pode ser `Nothing` OU ser `Just` algo do tipo `a`.
Criar um valor `Maybe` faz-se através de um dos seus dois construtores, `Nothing` e `Just`.
Ler o conteúdo de um `Maybe` faz-se através de correspondência de padrões.

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

Há também várias funções úteis no módulo `Maybe` para manipular tipos `Maybe`.

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
