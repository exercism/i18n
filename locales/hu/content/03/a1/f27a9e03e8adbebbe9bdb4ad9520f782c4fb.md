# Bevezetés

A `Maybe` típus az Elm nyelv megoldása az opcionális értékekre. Így számos alapvető Elm-függvény típusszignatúráiban megtalálható, és kulcsfontosságú megérteni. A `Maybe` típus definíciója a következő:

```elm
type Maybe a = Nothing | Just a
```

Ez „egyedi típus” definícióként ismert az Elm terminológiában. Ez azt jelzi, hogy egy ilyen típusú érték vagy `Nothing`, vagy `Just` valami `a` típusú. Egy `Maybe` érték létrehozása a két konstruktorának egyikével, a `Nothing`-gal vagy a `Just`-tal történik. A `Maybe` tartalmának kiolvasása mintaillesztéssel történik.

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

A `Maybe` modulban számos hasznos függvény található a `Maybe` típusok kezelésére.

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
