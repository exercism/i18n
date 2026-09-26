# はじめに

Cairoでは、プログラムの実行中にメッセージやデバッグ情報を表示できます。

## 基本

Cairoには、出力用のマクロが2つあります。

- `println!`：メッセージを出力し、そのあとに改行します。
- `print!`：改行せずにメッセージを出力します。

```rust
println!("Hello, Cairo!"); 
println!("x = {}, y = {}", 10, 20); 
```

プレースホルダーの`{}`は、渡された値に置き換えられます。

## 文字列のフォーマット

すぐに出力せずに`ByteArray`を作るには、`format!`を使います。

```rust
let result = format!("{}-{}-{}", "tic", "tac", "toe");
println!("{}", result); // Output: tic-tac-toe
```

## 独自のデータ型

独自の型を出力するには、`Display`を実装するか、`Debug`を導出します。

```rust
#[derive(Debug)]
struct Point { x: u8, y: u8 }

let p = Point { x: 3, y: 4 };
println!("{:?}", p); // Debug output: Point { x: 3, y: 4 }
```

## 16進数での出力

整数を16進数で出力するには、`{:x}`を使います。

```rust
println!("{:x}", 255); // Output: ff
```
