# Einführung

Der Typ `Maybe` ist in Elm die Lösung für optionale Werte.
Er kommt deshalb in den Typsignaturen vieler Elm-Kernfunktionen vor, und ihn zu verstehen ist entscheidend.
Der Typ `Maybe` ist wie folgt definiert:

```elm
type Maybe a = Nothing | Just a
```

In der Elm-Terminologie spricht man hier von einem benutzerdefinierten Typ.
Das bedeutet, dass ein Wert dieses Typs entweder `Nothing` sein kann ODER `Just` etwas vom Typ `a`.
Einen `Maybe`-Wert erzeugst du über einen seiner beiden Konstruktoren `Nothing` und `Just`.
Den Inhalt eines `Maybe` liest du über Pattern Matching aus.

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

Außerdem gibt es im Modul `Maybe` eine Reihe nützlicher Funktionen, mit denen du `Maybe`-Typen bearbeiten kannst.

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
