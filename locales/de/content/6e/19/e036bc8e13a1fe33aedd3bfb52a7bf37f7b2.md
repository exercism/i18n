# Einführung

## Optionen

Der `Option`-Typ wird verwendet, um Werte darzustellen, die entweder fehlen oder vorhanden sein können.

Er ist im Modul `gleam/option` wie folgt definiert:

```gleam
type Option(a) {
  Some(a)
  None
}
```

Der Konstruktor `Some` wird verwendet, um einen Wert zu umschließen, wenn er vorhanden ist, und der Konstruktor `None` wird verwendet, um das Fehlen eines Werts darzustellen.

Der Zugriff auf den Inhalt eines `Option`-Werts erfolgt oft über Pattern Matching.

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

Das Modul `gleam/option` definiert außerdem eine Reihe nützlicher Funktionen für die Arbeit mit `Option`-Typen, wie zum Beispiel `unwrap`, das den Inhalt eines `Option`-Werts oder einen Standardwert zurückgibt, wenn es sich um `None` handelt.

```gleam
import gleam/option.{type Option}

pub fn say_hello_again(person: Option(String)) -> String {
  let name = option.unwrap(person, "Friend")
  "Hello, " <> name <> "!"
}
```
