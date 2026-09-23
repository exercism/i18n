# Εισαγωγή

Ο τύπος `Maybe` είναι η λύση της γλώσσας Elm για προαιρετικές τιμές.
Γι' αυτό εμφανίζεται στις υπογραφές τύπων ενός μεγάλου αριθμού βασικών συναρτήσεων της Elm, και η κατανόησή του είναι απαραίτητη.
Ο τύπος `Maybe` ορίζεται ως εξής:

```elm
type Maybe a = Nothing | Just a
```

Αυτό είναι γνωστό ως ορισμός "προσαρμοσμένου τύπου" στην ορολογία της Elm.
Υποδεικνύει ότι μια τιμή αυτού του τύπου μπορεί είτε να είναι `Nothing` είτε να είναι `Just` κάτι του τύπου `a`.
Η δημιουργία μιας τιμής `Maybe` γίνεται μέσω ενός από τους δύο κατασκευαστές της, `Nothing` και `Just`.
Η ανάγνωση του περιεχομένου ενός `Maybe` γίνεται μέσω αντιστοίχισης προτύπων.

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

Υπάρχουν επίσης αρκετές χρήσιμες συναρτήσεις στο module `Maybe` για τον χειρισμό τύπων `Maybe`.

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
