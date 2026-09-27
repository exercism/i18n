# 方法語法

Cairo 中的方法與函式類似，但方法是透過 trait 與特定型別綁在一起的。

方法的第一個參數永遠是 `self`，代表呼叫該方法的實例。

雖然 Cairo 不允許直接在型別上定義方法，但你可以定義一個 trait 並為該型別實作它，藉此達到同樣的效果。

以下範例透過 trait 在 `Rectangle` 型別上定義方法：

```rust
#[derive(Copy, Drop)]
struct Rectangle {
    width: u64,
    height: u64,
}

#[generate_trait]
impl RectangleImpl of RectangleTrait {
    fn area(self: @Rectangle) -> u64 {
        (*self.width) * (*self.height)
    }
}

fn main() {
    let rect = Rectangle { width: 30, height: 50 };
    println!("Area is {}", rect.area());
}
```

在上面的範例中，`area` 方法會計算矩形的面積。

使用 `#[generate_trait]` 屬性可以自動為你建立所需的 trait，讓整個過程更簡單。

這讓你的程式碼更簡潔，同時仍能讓方法與特定型別產生關聯。

## 關聯函式

關聯函式與方法類似，但不會作用於型別的實例，也就是說，它們不以 `self` 作為參數。

這類函式通常用來當作與該型別相關的建構子或工具函式。

```rust
#[generate_trait]
impl RectangleImpl of RectangleTrait {
    fn square(size: u64) -> Rectangle {
        Rectangle { width: size, height: size }
    }
}

fn main() {
    let square = RectangleTrait::square(10);
    println!("Square dimensions: {}x{}", square.width, square.height);
}
```

關聯函式（例如 `Rectangle::square`）使用 `::` 語法，並隸屬於該型別。

它們讓你不需要先有現成的物件，就能輕鬆建立或操作實例。

Cairo 將相關的功能組織成 trait 與實作，藉此打造出簡潔、模組化且易於擴充的程式碼結構。
