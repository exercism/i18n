# Bevezetés

## Opciók

Az `Option` típus olyan értékek ábrázolására szolgál, amelyek vagy jelen vannak, vagy hiányoznak.

A `gleam/option` modulban a következőképpen van definiálva:

```gleam
type Option(a) {
  Some(a)
  None
}
```

A `Some` konstruktor egy értéket csomagol be, amikor az jelen van, a `None` konstruktor pedig egy érték hiányát jelöli.

Egy `Option` tartalmához gyakran mintaillesztéssel férünk hozzá.

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

A `gleam/option` modul számos hasznos függvényt is definiál az `Option` típusok kezeléséhez, például az `unwrap`-ot, amely visszaadja az `Option` tartalmát, vagy egy alapértelmezett értéket, ha az `None`.

```gleam
import gleam/option.{type Option}

pub fn say_hello_again(person: Option(String)) -> String {
  let name = option.unwrap(person, "Friend")
  "Hello, " <> name <> "!"
}
```
