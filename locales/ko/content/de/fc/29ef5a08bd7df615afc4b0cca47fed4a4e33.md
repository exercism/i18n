# 소개

Cairo에서 출력을 하면 프로그램을 실행하는 동안 메시지나 디버그 정보를 표시할 수 있어요.

## 기본

Cairo는 출력을 위한 두 가지 매크로를 제공해요.

- `println!`: 메시지를 출력한 뒤 줄바꿈해요.
- `print!`: 줄바꿈 없이 메시지를 출력해요.

```rust
println!("Hello, Cairo!"); 
println!("x = {}, y = {}", 10, 20); 
```

`{}` 자리 표시자는 제공된 값으로 대체돼요.

## 문자열 서식 지정

`format!`을 사용하면 바로 출력하지 않고 `ByteArray`를 만들 수 있어요.

```rust
let result = format!("{}-{}-{}", "tic", "tac", "toe");
println!("{}", result); // Output: tic-tac-toe
```

## 사용자 정의 데이터 타입

사용자 정의 타입을 출력하려면 `Display`를 구현하거나 `Debug`를 파생해야 해요.

```rust
#[derive(Debug)]
struct Point { x: u8, y: u8 }

let p = Point { x: 3, y: 4 };
println!("{:?}", p); // Debug output: Point { x: 3, y: 4 }
```

## 16진수 출력

`{:x}`를 사용하면 정수를 16진수로 출력할 수 있어요.

```rust
println!("{:x}", 255); // Output: ff
```
