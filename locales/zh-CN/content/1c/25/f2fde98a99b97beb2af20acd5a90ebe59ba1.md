# 简介

把一组条目归到一起、并把这些组当作整体来处理，往往很有用。在 Cairo 中，我们把这样的组叫做 struct，组里的每个条目则是该 struct 的一个字段。struct 定义了有哪些字段，而 struct 的一个具体例子叫做实例。

此外，struct 上还可以定义方法，这些方法能够访问它的字段。这种情况下，struct 本身被称为`self`。当方法使用`ref self: SomeStruct`时，字段可以被修改，也就是可变。当方法使用`self: SomeStruct`或`self: @SomeStruct`时，字段无法修改：它们是不可变的。对可变性的控制能帮助借用检查器确保某些整类并发 bug 在 Cairo 中根本不会发生。

在这个练习中，你会在一个 struct 上实现两种方法。第一种通常称为 getter：它们把 struct 的字段暴露给外部，同时不允许其他人修改这个值。

你还会实现另一种方法，通常称为 setter。它们会改变字段的值。setter 在 Cairo 中并不常见。如果一个字段可以被自由修改，更常见的做法是直接把它设为公开。不过，如果更新字段需要产生副作用，setter 就很有用。

定义 struct 时使用`struct`关键字，后面跟上该 struct 所描述的类型名，首字母要大写：

```rust
struct Item {}
```

接着把其他类型作为 struct 的_字段_放进 struct 体内，每个字段都有自己的类型：

```rust
struct Item {
    name: String,
    weight: f32,
    worth: u32,
}
```

trait 定义了一组可以由某个类型实现的方法（这里我们重点关注 struct，但 trait 也可以实现在枚举上）。当某个类型实现了这个 trait 之后，就可以在它的实例上调用这些方法。trait 使用`trait`关键字定义，我们在 trait 中定义希望类型实现的方法签名。

```rust
trait ImplTrait {
    // Define the method signature
    fn new() -> Item;
}
```

最后，可以在`impl`块中为 struct 定义方法，这个块实现了所定义的 trait：

```rust
impl ItemImpl of ImplTrait {
    // initializes and returns a new instance of our Item struct
    fn new() -> Item {
        Item {}
    }
}
```
