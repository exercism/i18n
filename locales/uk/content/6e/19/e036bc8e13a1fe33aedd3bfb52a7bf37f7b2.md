# Вступ

## Опції

Тип `Option` використовується для подання значень, які можуть бути відсутніми або наявними.

Його визначено в модулі `gleam/option` так:

```gleam
type Option(a) {
  Some(a)
  None
}
```

Конструктор `Some` використовується, щоб обгорнути значення, коли воно наявне, а конструктор `None` використовується для позначення відсутності значення.

До вмісту `Option` часто звертаються за допомогою зіставлення зі зразком.

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

Модуль `gleam/option` також визначає низку корисних функцій для роботи з типами `Option`, як-от `unwrap`, яка повертає вміст `Option` або типове значення, якщо він `None`.

```gleam
import gleam/option.{type Option}

pub fn say_hello_again(person: Option(String)) -> String {
  let name = option.unwrap(person, "Friend")
  "Hello, " <> name <> "!"
}
```
