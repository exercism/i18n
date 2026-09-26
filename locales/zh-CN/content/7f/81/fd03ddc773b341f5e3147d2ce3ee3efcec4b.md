# 方法语法

Cairo 中的方法与函数类似，但它们通过 trait 与特定类型绑定。

它们的第一个形参始终是`self`，表示调用该方法时所针对的实例。

Cairo 不允许直接在类型上定义方法，但你可以通过定义 trait 并为该类型实现它，达到同样的效果。

下面的例子展示了如何使用 trait 在`Rectangle`类型上定义方法：

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

在上面的例子中，`area`方法计算矩形的面积。

使用`#[generate_trait]`属性可以简化这个过程，它会自动为你创建所需的 trait。

这会让你的代码更简洁，同时仍然允许方法关联到特定类型。

## 关联函数

关联函数与方法类似，但它们不作用于类型的实例，也不把`self`作为形参。

这些函数通常用作与该类型关联的构造函数或工具函数。

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

关联函数（例如`Rectangle::square`）使用`::`语法，并归属于该类型的命名空间。

它们让你无需已有对象，就能轻松创建或操作实例。

通过把相关功能组织到 trait 和实现中，Cairo 能构建出整洁、模块化且可扩展的代码结构。
