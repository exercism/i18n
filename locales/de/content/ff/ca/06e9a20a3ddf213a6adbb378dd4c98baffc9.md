# Über

Wenn eine Variante eines benutzerdefinierten Typs Daten enthält, nennt man sie einen Record, und jeder enthaltene Wert liegt in einem _Feld_.

```gleam
pub type Rectangle {
  Rectangle(
    Float, // The first field
    Float, // The second field
  )
}
```

Um die Lesbarkeit zu verbessern, kannst du in Gleam Felder mit einem Label versehen.

```gleam
pub type Rectangle {
  Rectangle(
    width: Float,
    height: Float,
  )
}
```

Mit Labels kannst du die Argumente in beliebiger Reihenfolge an den Konstruktor eines Records übergeben.

```gleam
let a = Rectangle(height: 10.0, width: 20.0)
let b = Rectangle(width: 20.0, height: 10.0)

a == b
// -> True
```

Wenn ein benutzerdefinierter Typ nur eine Variante hat, kannst du mit der `.label`-Syntax auf die Felder eines Records zugreifen.

```gleam
let rect = Rectangle(height: 10.0, width: 20.0)

rect.height // -> 10.0
rect.width  // -> 20.0
```

Wenn ein benutzerdefinierter Typ nur eine Variante hat, kannst du mit der Record-Update-Syntax aus einem vorhandenen Record einen neuen Record erstellen, bei dem einige Felder durch neue Werte ersetzt sind.

```gleam
let rect = Rectangle(height: 10.0, width: 20.0)
let tall_rect = Rectangle(..rect, height: 50.0)

tall_rect.height // -> 50.0
tall_rect.width  // -> 20.0
```

Labels kannst du auch beim Musterabgleich verwenden, um Werte aus Records zu extrahieren.

```gleam
pub fn is_tall(rect: Rectangle) {
  case rect {
    Rectangle(height: h, width: _) if h > 20.0 -> True
    _ -> False
  }
}
```

Wenn du nur einen Teil der Felder abgleichen willst, kannst du mit dem Spread-Operator `..` die übrigen Felder ignorieren.

```gleam
pub fn is_tall(rect: Rectangle) {
  case rect {
    Rectangle(height: h, ..) if h > 20.0 -> True
    _ -> False
  }
}
```
