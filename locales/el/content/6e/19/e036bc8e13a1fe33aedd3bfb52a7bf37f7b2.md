# Εισαγωγή

## Επιλογές

Ο τύπος `Option` χρησιμοποιείται για να αναπαραστήσει τιμές που μπορεί είτε να απουσιάζουν είτε να υπάρχουν.

Ορίζεται στην ενότητα `gleam/option` ως εξής:

```gleam
type Option(a) {
  Some(a)
  None
}
```

Ο κατασκευαστής `Some` χρησιμοποιείται για να τυλίξει μια τιμή όταν αυτή υπάρχει, και ο κατασκευαστής `None` χρησιμοποιείται για να αναπαραστήσει την απουσία μιας τιμής.

Η πρόσβαση στο περιεχόμενο ενός `Option` γίνεται συχνά μέσω αντιστοίχισης προτύπων.

```gleam
import gleam/option.{type Option, None, Some}

pub fn say_hello(person: Option(String)) -> String {
  case person {
    Some(name) -> "Hello, " <> name <> "!"
    None -> "Hello, Friend!"
  }
}
```

```gleam
say_hello(Some("Matthieu"))
// -> "Hello, Matthieu!"

say_hello(None)
// -> "Hello, Friend!"
```

Η ενότητα `gleam/option` ορίζει επίσης μια σειρά από χρήσιμες συναρτήσεις για να δουλεύεις με τύπους `Option`, όπως η `unwrap`, η οποία επιστρέφει το περιεχόμενο ενός `Option` ή μια προεπιλεγμένη τιμή αν αυτό είναι `None`.

```gleam
import gleam/option.{type Option}

pub fn say_hello_again(person: Option(String)) -> String {
  let name = option.unwrap(person, "Friend")
  "Hello, " <> name <> "!"
}
```
