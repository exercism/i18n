# 提示

## 概述

## 1. 实现 `new()` 方法

- `new()`方法接收我们用来实例化`User`实例的实参。
  它应返回一个`User`实例，其中包含指定的名称、年龄和体重。

- 关于定义和实例化结构体的示例，参见[结构体文档][structs]。

## 2. 实现 getter 方法

- `name()`、`age()`和`weight()`方法是 getter。
  换句话说，它们负责返回结构体实例中对应的字段。

- 在 Cairo 中，除非你明确希望函数或方法提前返回，否则不需要使用`return`语句。
  更多时候，更符合惯用写法的是：省略想要返回的结果后面的分号，利用_隐式_返回。
  使用显式返回并不算_错误_，但在可能的情况下利用隐式返回会更简洁。

```rust
fn foo() -> i32 {
    1
}
```

- 关于在结构体上定义方法的更多示例，参见[方法文档][methods]。

## 3. 实现 setter 方法

- `set_age()`和`set_weight()`方法是 setter，负责用输入的实参更新结构体实例上对应的字段。

- 正如这些方法的签名所示，setter 方法不应返回任何内容。

[structs]: https://book.cairo-lang.org/ch05-01-defining-and-instantiating-structs.html
[methods]: https://book.cairo-lang.org/ch05-03-method-syntax.html
