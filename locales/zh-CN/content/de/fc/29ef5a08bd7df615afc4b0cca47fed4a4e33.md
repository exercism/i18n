# 简介

在 Cairo 中，打印让你可以在程序运行期间显示消息或调试信息。

## 基础

Cairo 提供了两个用于打印的宏：

- `println!`：输出一条消息，并在末尾换行。
- `print!`：输出一条消息，末尾不换行。

```rust
println!("Hello, Cairo!"); 
println!("x = {}, y = {}", 10, 20); 
```

占位符`{}`会被替换为传入的值。

## 格式化字符串

使用`format!`创建一个`ByteArray`，而不立即打印：

```rust
let result = format!("{}-{}-{}", "tic", "tac", "toe");
println!("{}", result); // Output: tic-tac-toe
```

## 自定义数据类型

对于自定义类型，实现`Display`或者派生`Debug`来进行打印：

```rust
#[derive(Debug)]
struct Point { x: u8, y: u8 }

let p = Point { x: 3, y: 4 };
println!("{:?}", p); // Debug output: Point { x: 3, y: 4 }
```

## 十六进制打印

使用`{:x}`将整数打印为十六进制：

```rust
println!("{:x}", 255); // Output: ff
```
