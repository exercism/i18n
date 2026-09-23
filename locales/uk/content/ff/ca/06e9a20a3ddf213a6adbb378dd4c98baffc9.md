# Про це

Коли варіант власного типу містить дані, він називається записом, а кожне збережене значення міститься в _полі_.

```gleam
pub type Rectangle {
  Rectangle(
    Float, // The first field
    Float, // The second field
  )
}
```

Щоб полегшити читання, Gleam дозволяє позначати поля назвою.

```gleam
pub type Rectangle {
  Rectangle(
    width: Float,
    height: Float,
  )
}
```

Позначки можна використовувати, щоб передавати аргументи конструктору запису в будь-якому порядку.

```gleam
let a = Rectangle(height: 10.0, width: 20.0)
let b = Rectangle(width: 20.0, height: 10.0)

a == b
// -> True
```

Коли власний тип має лише один варіант, синтаксис доступу `.label` можна використати, щоб отримати поля запису.

```gleam
let rect = Rectangle(height: 10.0, width: 20.0)

rect.height // -> 10.0
rect.width  // -> 20.0
```

Синтаксис оновлення запису можна використати, коли власний тип має єдиний варіант, щоб створити новий запис на основі наявного, але з деякими полями, заміненими новими значеннями.

```gleam
let rect = Rectangle(height: 10.0, width: 20.0)
let tall_rect = Rectangle(..rect, height: 50.0)

tall_rect.height // -> 50.0
tall_rect.width  // -> 20.0
```

Позначки також можна використовувати під час зіставлення зі зразком, щоб видобути значення із записів.

```gleam
pub fn is_tall(rect: Rectangle) {
  case rect {
    Rectangle(height: h, width: _) if h > 20.0 -> True
    _ -> False
  }
}
```

Якщо ми хочемо зіставити лише деякі з полів, можна використати оператор розгортання `..`, щоб проігнорувати решту полів.

```gleam
pub fn is_tall(rect: Rectangle) {
  case rect {
    Rectangle(height: h, ..) if h > 20.0 -> True
    _ -> False
  }
}
```
