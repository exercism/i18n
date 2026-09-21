# Bővebben

Amikor egy egyedi típus valamelyik változata adatot tárol, azt rekordnak nevezzük, és a benne lévő értékek egy-egy _mezőben_ helyezkednek el.

```gleam
pub type Rectangle {
  Rectangle(
    Float, // The first field
    Float, // The second field
  )
}
```

A jobb olvashatóság érdekében a Gleam megengedi, hogy a mezőket ellásd egy címkével.

```gleam
pub type Rectangle {
  Rectangle(
    width: Float,
    height: Float,
  )
}
```

A címkékkel tetszőleges sorrendben adhatod meg az argumentumokat egy rekord konstruktorának.

```gleam
let a = Rectangle(height: 10.0, width: 20.0)
let b = Rectangle(width: 20.0, height: 10.0)

a == b
// -> True
```

Ha egy egyedi típusnak csak egy változata van, akkor a `.label` elérési szintaxissal kérheted le egy rekord mezőit.

```gleam
let rect = Rectangle(height: 10.0, width: 20.0)

rect.height // -> 10.0
rect.width  // -> 20.0
```

Ha egy egyedi típusnak egyetlen változata van, a rekordfrissítési szintaxissal új rekordot hozhatsz létre egy meglévőből úgy, hogy néhány mezőt új értékre cserélsz.

```gleam
let rect = Rectangle(height: 10.0, width: 20.0)
let tall_rect = Rectangle(..rect, height: 50.0)

tall_rect.height // -> 50.0
tall_rect.width  // -> 20.0
```

A címkéket mintaillesztésnél is használhatod, hogy értékeket nyerj ki rekordokból.

```gleam
pub fn is_tall(rect: Rectangle) {
  case rect {
    Rectangle(height: h, width: _) if h > 20.0 -> True
    _ -> False
  }
}
```

Ha csak néhány mezőre szeretnénk illeszkedni, a `..` spread operátorral figyelmen kívül hagyhatjuk a többi mezőt.

```gleam
pub fn is_tall(rect: Rectangle) {
  case rect {
    Rectangle(height: h, ..) if h > 20.0 -> True
    _ -> False
  }
}
```
