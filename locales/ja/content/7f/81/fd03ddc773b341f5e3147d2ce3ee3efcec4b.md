# メソッドの構文

Cairoのメソッドは関数に似ていますが、トレイトを通じて特定の型に結び付いています。

最初の仮引数は必ず`self`で、メソッドを呼び出す対象のインスタンスを表します。

Cairoでは型に直接メソッドを定義することはできませんが、トレイトを定義してその型に実装すれば、同じ機能を実現できます。

トレイトを使って`Rectangle`型にメソッドを定義する例を見てみましょう。

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

上の例では、`area`メソッドが長方形の面積を計算します。

`#[generate_trait]`属性を使うと、必要なトレイトが自動的に作成されるので、手順が簡単になります。

これによりコードがすっきりし、それでいてメソッドを特定の型に結び付けられます。

## 関連関数

関連関数はメソッドに似ていますが、型のインスタンスを対象に動作しません。`self`を仮引数に取りません。

これらの関数は、コンストラクターや、型に結び付いたユーティリティ関数としてよく使われます。

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

関連関数は、`Rectangle::square`のように`::`の構文を使い、その型の名前空間に属します。

既存のオブジェクトがなくても、インスタンスを簡単に作成したり操作したりできます。

関連する機能をトレイトと実装にまとめることで、Cairoでは、すっきりとしてモジュール化された、拡張しやすいコード構造を実現できます。
