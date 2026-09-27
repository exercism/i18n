# درباره

وقتی یک «گونه» از یک «نوع سفارشی» داده نگه می‌دارد، به آن «رکورد» می‌گویند و هر مقدار موجود در آن در یک _فیلد_ قرار می‌گیرد.

```gleam
pub type Rectangle {
  Rectangle(
    Float, // The first field
    Float, // The second field
  )
}
```

برای کمک به خوانایی، Gleam اجازه می‌دهد فیلدها با یک اسم برچسب‌گذاری شوند.

```gleam
pub type Rectangle {
  Rectangle(
    width: Float,
    height: Float,
  )
}
```

از «برچسب‌ها» می‌توان برای دادن آرگومان‌ها با هر ترتیبی به «سازنده»ی یک رکورد استفاده کرد.

```gleam
let a = Rectangle(height: 10.0, width: 20.0)
let b = Rectangle(width: 20.0, height: 10.0)

a == b
// -> True
```

وقتی یک نوع سفارشی فقط یک گونه دارد، می‌توان از نحوه‌ی نگارش دسترسی `.label` برای گرفتن فیلدهای یک رکورد استفاده کرد.

```gleam
let rect = Rectangle(height: 10.0, width: 20.0)

rect.height // -> 10.0
rect.width  // -> 20.0
```

وقتی یک نوع سفارشی یک گونه دارد، می‌توان از نحوه‌ی نگارش به‌روزرسانی رکورد برای ساختن یک رکورد جدید از روی یک رکورد موجود استفاده کرد، اما با جایگزین شدن بعضی از فیلدها با مقادیر جدید.

```gleam
let rect = Rectangle(height: 10.0, width: 20.0)
let tall_rect = Rectangle(..rect, height: 50.0)

tall_rect.height // -> 50.0
tall_rect.width  // -> 20.0
```

از برچسب‌ها همچنین می‌توان هنگام «تطبیق الگو» برای استخراج مقادیر از رکوردها استفاده کرد.

```gleam
pub fn is_tall(rect: Rectangle) {
  case rect {
    Rectangle(height: h, width: _) if h > 20.0 -> True
    _ -> False
  }
}
```

اگر بخواهیم فقط روی بعضی از فیلدها تطبیق دهیم، می‌توانیم از «عملگر گسترش» `..` برای نادیده گرفتن فیلدهای باقی‌مانده استفاده کنیم.

```gleam
pub fn is_tall(rect: Rectangle) {
  case rect {
    Rectangle(height: h, ..) if h > 20.0 -> True
    _ -> False
  }
}
```
