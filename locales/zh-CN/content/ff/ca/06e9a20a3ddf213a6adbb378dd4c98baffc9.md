# 关于

当自定义类型的变体持有数据时，它被称为记录，其中包含的每个值都位于一个_字段_中。

```gleam
pub type Rectangle {
  Rectangle(
    Float, // The first field
    Float, // The second field
  )
}
```

为了便于阅读，Gleam 允许给字段加上名称标签。

```gleam
pub type Rectangle {
  Rectangle(
    width: Float,
    height: Float,
  )
}
```

标签可以用来按任意顺序把实参传给记录的构造函数。

```gleam
let a = Rectangle(height: 10.0, width: 20.0)
let b = Rectangle(width: 20.0, height: 10.0)

a == b
// -> True
```

当自定义类型只有一个变体时，可以用`.label`访问器语法获取记录的各字段。

```gleam
let rect = Rectangle(height: 10.0, width: 20.0)

rect.height // -> 10.0
rect.width  // -> 20.0
```

当自定义类型只有一个变体时，可以用记录更新语法基于已有的记录创建一个新记录，只是把其中一些字段换成新的值。

```gleam
let rect = Rectangle(height: 10.0, width: 20.0)
let tall_rect = Rectangle(..rect, height: 50.0)

tall_rect.height // -> 50.0
tall_rect.width  // -> 20.0
```

标签也可以用在模式匹配中，从记录里提取值。

```gleam
pub fn is_tall(rect: Rectangle) {
  case rect {
    Rectangle(height: h, width: _) if h > 20.0 -> True
    _ -> False
  }
}
```

如果我们只想匹配其中部分字段，可以用展开运算符`..`忽略其余的字段。

```gleam
pub fn is_tall(rect: Rectangle) {
  case rect {
    Rectangle(height: h, ..) if h > 20.0 -> True
    _ -> False
  }
}
```
