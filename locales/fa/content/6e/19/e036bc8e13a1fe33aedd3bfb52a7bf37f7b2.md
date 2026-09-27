# مقدمه

## Option

از نوع `Option` برای نمایش مقدارهایی استفاده می‌شود که ممکن است موجود باشند یا نباشند.

این نوع در ماژول `gleam/option` به شکل زیر تعریف شده است:

```gleam
type Option(a) {
  Some(a)
  None
}
```

از سازنده‌ی `Some` برای بسته‌بندی مقدار در زمانی که موجود است استفاده می‌شود و از سازنده‌ی `None` برای نمایش نبود یک مقدار.

دسترسی به محتوای یک `Option` اغلب با تطبیق الگو انجام می‌شود.

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

ماژول `gleam/option` همچنین تعدادی تابع مفید برای کار با انواع `Option` تعریف می‌کند، مانند `unwrap` که محتوای یک `Option` را برمی‌گرداند یا اگر `None` باشد، یک مقدار پیش‌فرض را برمی‌گرداند.

```gleam
import gleam/option.{type Option}

pub fn say_hello_again(person: Option(String)) -> String {
  let name = option.unwrap(person, "Friend")
  "Hello, " <> name <> "!"
}
```
