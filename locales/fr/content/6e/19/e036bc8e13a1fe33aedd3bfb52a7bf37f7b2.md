# Introduction

## Options

Le type `Option` sert à représenter des valeurs qui peuvent être soit absentes, soit présentes.

Il est défini dans le module `gleam/option` comme suit :

```gleam
type Option(a) {
  Some(a)
  None
}
```

Le constructeur `Some` sert à envelopper une valeur lorsqu'elle est présente, et le constructeur `None` sert à représenter l'absence de valeur.

On accède souvent au contenu d'une `Option` par filtrage par motif.

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

Le module `gleam/option` définit aussi un certain nombre de fonctions utiles pour manipuler les types `Option`, comme `unwrap`, qui renvoie le contenu d'une `Option` ou une valeur par défaut si celle-ci vaut `None`.

```gleam
import gleam/option.{type Option}

pub fn say_hello_again(person: Option(String)) -> String {
  let name = option.unwrap(person, "Friend")
  "Hello, " <> name <> "!"
}
```
