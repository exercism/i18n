# Introduzione

Il tipo `Maybe` è la soluzione nel linguaggio Elm per i valori opzionali.
È quindi presente nelle firme di tipo di un gran numero di funzioni principali di Elm e capirlo è fondamentale.
Il tipo `Maybe` è definito come segue:

```elm
type Maybe a = Nothing | Just a
```

Questa è nota come definizione di «tipo personalizzato» nella terminologia di Elm.
Indica che un valore di questo tipo può essere `Nothing` oppure `Just` qualcosa di tipo `a`.
La creazione di un valore `Maybe` avviene tramite uno dei suoi due costruttori, `Nothing` e `Just`.
La lettura del contenuto di un `Maybe` avviene tramite il pattern matching.

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

Ci sono anche diverse funzioni utili nel modulo `Maybe` per manipolare i tipi `Maybe`.

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
