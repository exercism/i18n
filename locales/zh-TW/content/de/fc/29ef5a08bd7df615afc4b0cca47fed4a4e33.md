# 簡介

在 Cairo 中，列印讓你能在程式執行時顯示訊息或除錯資訊。

## 基礎

Cairo 提供兩個用於列印的巨集：

- `println!`：輸出訊息並換行。
- `print!`：輸出訊息，但不換行。

```rust
println!("Hello, Cairo!"); 
println!("x = {}, y = {}", 10, 20); 
```

佔位符`{}`會被替換成提供的值。

## 格式化字串

使用`format!`建立`ByteArray`，而不會立即列印：

```rust
let result = format!("{}-{}-{}", "tic", "tac", "toe");
println!("{}", result); // Output: tic-tac-toe
```

## 自訂資料型態

如果是自訂型態，可以實作`Display`，或衍生`Debug`來列印：

```rust
#[derive(Debug)]
struct Point { x: u8, y: u8 }

let p = Point { x: 3, y: 4 };
println!("{:?}", p); // Debug output: Point { x: 3, y: 4 }
```

## 十六進位列印

使用`{:x}`將整數以十六進位列印：

```rust
println!("{:x}", 255); // Output: ff
```
