# 概要

カスタム型のバリアントがデータを保持する場合、それはレコードと呼ばれ、含まれる値はそれぞれ_フィールド_に入ります。

```gleam
pub type Rectangle {
  Rectangle(
    Float, // The first field
    Float, // The second field
  )
}
```

読みやすくするために、Gleamではフィールドに名前を付けてラベルを付けられます。

```gleam
pub type Rectangle {
  Rectangle(
    width: Float,
    height: Float,
  )
}
```

ラベルを使うと、レコードのコンストラクターに好きな順序で引数を渡せます。

```gleam
let a = Rectangle(height: 10.0, width: 20.0)
let b = Rectangle(width: 20.0, height: 10.0)

a == b
// -> True
```

カスタム型のバリアントが1つだけの場合、`.label`アクセサ構文を使ってレコードのフィールドを取得できます。

```gleam
let rect = Rectangle(height: 10.0, width: 20.0)

rect.height // -> 10.0
rect.width  // -> 20.0
```

カスタム型のバリアントが1つだけの場合、レコード更新構文を使って、既存のレコードから新しいレコードを作成できます。その際、一部のフィールドは新しい値に置き換わります。

```gleam
let rect = Rectangle(height: 10.0, width: 20.0)
let tall_rect = Rectangle(..rect, height: 50.0)

tall_rect.height // -> 50.0
tall_rect.width  // -> 20.0
```

ラベルは、パターンマッチでレコードから値を取り出すときにも使えます。

```gleam
pub fn is_tall(rect: Rectangle) {
  case rect {
    Rectangle(height: h, width: _) if h > 20.0 -> True
    _ -> False
  }
}
```

一部のフィールドだけをマッチさせたい場合は、スプレッド演算子`..`を使って残りのフィールドを無視できます。

```gleam
pub fn is_tall(rect: Rectangle) {
  case rect {
    Rectangle(height: h, ..) if h > 20.0 -> True
    _ -> False
  }
}
```
