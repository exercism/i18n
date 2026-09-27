# 關於

當自訂型別的變體帶有資料時，就稱為記錄，其中每一個包含的值都位於一個_欄位_之中。

```gleam
pub type Rectangle {
  Rectangle(
    Float, // The first field
    Float, // The second field
  )
}
```

為了提升可讀性，Gleam 允許用名稱為欄位加上標籤。

```gleam
pub type Rectangle {
  Rectangle(
    width: Float,
    height: Float,
  )
}
```

標籤可以用來以任意順序把引數傳給記錄的建構子。

```gleam
let a = Rectangle(height: 10.0, width: 20.0)
let b = Rectangle(width: 20.0, height: 10.0)

a == b
// -> True
```

當自訂型別只有一個變體時，就可以使用`.label`存取語法來取得記錄的欄位。

```gleam
let rect = Rectangle(height: 10.0, width: 20.0)

rect.height // -> 10.0
rect.width  // -> 20.0
```

當自訂型別只有一個變體時，可以使用記錄更新語法，從既有的記錄建立新的記錄，但把其中一些欄位替換成新的值。

```gleam
let rect = Rectangle(height: 10.0, width: 20.0)
let tall_rect = Rectangle(..rect, height: 50.0)

tall_rect.height // -> 50.0
tall_rect.width  // -> 20.0
```

在模式比對時，也可以使用標籤來從記錄中取出值。

```gleam
pub fn is_tall(rect: Rectangle) {
  case rect {
    Rectangle(height: h, width: _) if h > 20.0 -> True
    _ -> False
  }
}
```

如果只想比對其中一些欄位，我們可以使用展開運算子`..`來忽略其餘的欄位。

```gleam
pub fn is_tall(rect: Rectangle) {
  case rect {
    Rectangle(height: h, ..) if h > 20.0 -> True
    _ -> False
  }
}
```
