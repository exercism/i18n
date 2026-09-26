# Introducción

## Opciones

El tipo `Option` se usa para representar valores que pueden estar ausentes o presentes.

Se define en el módulo `gleam/option` de la siguiente manera:

```gleam
type Option(a) {
  Some(a)
  None
}
```

El constructor `Some` se usa para envolver un valor cuando está presente, y el constructor `None` se usa para representar la ausencia de un valor.

Acceder al contenido de un `Option` suele hacerse mediante coincidencia de patrones.

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

El módulo `gleam/option` también define una serie de funciones útiles para trabajar con tipos `Option`, como `unwrap`, que devuelve el contenido de un `Option` o un valor predeterminado si es `None`.

```gleam
import gleam/option.{type Option}

pub fn say_hello_again(person: Option(String)) -> String {
  let name = option.unwrap(person, "Friend")
  "Hello, " <> name <> "!"
}
```
