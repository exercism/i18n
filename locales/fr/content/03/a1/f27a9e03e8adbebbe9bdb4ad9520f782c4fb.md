# Introduction

Le type `Maybe` est la solution qu'offre le langage Elm pour représenter les valeurs optionnelles.
On le retrouve donc dans les signatures de type d'un grand nombre de fonctions essentielles d'Elm, et il est crucial de le comprendre.
Le type `Maybe` est défini comme suit :

```elm
type Maybe a = Nothing | Just a
```

En terminologie Elm, on parle d'une définition de « type personnalisé ».
Cela signifie qu'une valeur de ce type peut soit être `Nothing`, soit être `Just` quelque chose de type `a`.
On crée une valeur de type `Maybe` à l'aide de l'un de ses deux constructeurs, `Nothing` et `Just`.
On lit le contenu d'un `Maybe` grâce au filtrage par motif.

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

Le module `Maybe` propose également un certain nombre de fonctions utiles pour manipuler les types `Maybe`.

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
