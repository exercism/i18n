# Вступ

Тип `Maybe` у мові Elm призначений для роботи з необовʼязковими значеннями.
Тож він присутній у сигнатурах типів багатьох базових функцій Elm, і розуміти його вкрай важливо.
Тип `Maybe` визначається так:

```elm
type Maybe a = Nothing | Just a
```

У термінології Elm це називають визначенням «власного типу».
Це означає, що значення цього типу може бути або `Nothing`, або `Just` чимось типу `a`.
Значення `Maybe` створюють за допомогою одного з двох його конструкторів: `Nothing` або `Just`.
Щоб прочитати вміст `Maybe`, використовують зіставлення зі зразком.

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

У модулі `Maybe` також є чимало корисних функцій для роботи з типами `Maybe`.

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
