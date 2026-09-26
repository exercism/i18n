# 浮点数

浮点数是实数：它们可以带小数部分。在机器中，浮点数使用 [IEEE-754 规范](https://en.wikipedia.org/wiki/IEEE_754) 表示为二进制位模式。
人们通常把它们叫作 float。

浮点数总是有符号的。有符号意味着，用该数字其中的一位来指示它是否为负数。

浮点数有一个**位宽**，也就是组成这个数字的位数。位宽会影响这种类型能表示的取值范围和精度。

Rust 有 2 种浮点基本类型：`f32`和`f64`。`f`后面的数字表示位宽。在其他语言中，`f32`有时被称为“单精度”，`f64`有时被称为“双精度”。

## 该用哪一个？

一般来说，用`f64`：在大多数现代消费级硬件上，它和`f32`一样快，还能显著减少[浮点不精确](https://0.30000000000000004.com/)的情况。

如果你需要无限精度的有理数，可以使用 [`num-rational` crate](https://crates.io/crates/num-rational)，它提供了 `BigRational` 类型。如果你需要固定精度的小数，可以使用 [`rust_decimal` crate](https://crates.io/crates/rust_decimal)，它提供了 `Decimal` 类型。

## 浮点数之间的转换

Rust 没有隐式数值转换。如果你需要在浮点类型之间转换，有两种基本策略：`as`关键字，以及 `From` 和 `TryFrom` trait。

使用 `as` 关键字很简单：`expr as Type`。不过，使用 `as` 转换时，有许多[注意事项和细节](https://doc.rust-lang.org/nomicon/casts.html)需要牢记。

基于 trait 的转换稍微复杂一些，但更安全：转换 trait 只会在安全的情况下才实现。例如，[`f32`](https://doc.rust-lang.org/std/primitive.f32.html)实现了`From<u8>`、`From<u16>`、`From<i8>`和`From<i16>`：这些类型能表示的任何一个值，都保证可以用`f32`表示。它的用法是`f32::from(expr)`或者`expr.into()`，其中`expr`会解析为上述类型之一。

在转换浮点值时，通常更倾向于用 `as` 转换，原因很简单：基于 trait 的转换实现相对较少。截至 2020 年 10 月，`TryFrom` 还没有为浮点数实现。从 `f32` 转换到 `f64` 是无损的；反过来则有损，但有一套明确定义的转换规则，用来尽量减少损失。
