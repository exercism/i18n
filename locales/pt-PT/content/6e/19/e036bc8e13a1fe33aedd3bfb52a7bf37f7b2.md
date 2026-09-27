# Introdução

## Opções

O tipo `Option` serve para representar valores que podem estar ausentes ou presentes.

Está definido no módulo `gleam/option` da seguinte forma:

```gleam
type Option(a) {
  Some(a)
  None
}
```

O construtor `Some` serve para envolver um valor quando este está presente, e o construtor `None` serve para representar a ausência de um valor.

Aceder ao conteúdo de um `Option` faz-se muitas vezes através de pattern matching.

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

O módulo `gleam/option` também define várias funções úteis para trabalhar com tipos `Option`, como `unwrap`, que devolve o conteúdo de um `Option` ou um valor predefinido, caso este seja `None`.

```gleam
import gleam/option.{type Option}

pub fn say_hello_again(person: Option(String)) -> String {
  let name = option.unwrap(person, "Friend")
  "Hello, " <> name <> "!"
}
```
