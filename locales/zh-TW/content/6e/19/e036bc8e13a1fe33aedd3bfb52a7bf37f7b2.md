# 簡介

## 選項

`Option`型別用來表示可能不存在或存在的值。

它定義在`gleam/option`模組中，如下所示：

```gleam
type Option(a) {
  Some(a)
  None
}
```

當值存在時，會用`Some`建構子將它包裝起來；而`None`建構子則用來表示值不存在。

要存取`Option`的內容，通常會透過模式比對來完成。

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

`gleam/option`模組也定義了許多實用的函式來處理`Option`型別，例如`unwrap`，它會回傳`Option`的內容；如果值是`None`，則回傳預設值。

```gleam
import gleam/option.{type Option}

pub fn say_hello_again(person: Option(String)) -> String {
  let name = option.unwrap(person, "Friend")
  "Hello, " <> name <> "!"
}
```
