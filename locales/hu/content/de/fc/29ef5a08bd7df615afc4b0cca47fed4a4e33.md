# Bevezetés

A Cairoban a nyomtatás segítségével üzeneteket vagy hibakeresési információkat jeleníthetsz meg a program futása közben.

## Alapok

A Cairo két makrót biztosít a nyomtatáshoz:

- `println!`: Egy üzenetet ír ki, amelyet egy sortörés követ.
- `print!`: Egy üzenetet ír ki sortörés nélkül.

```rust
println!("Hello, Cairo!"); 
println!("x = {}, y = {}", 10, 20); 
```

A `{}` helyőrzők helyére a megadott értékek kerülnek.

## Stringek formázása

A `format!` segítségével anélkül hozhatsz létre `ByteArray`-t, hogy azonnal kiírnád:

```rust
let result = format!("{}-{}-{}", "tic", "tac", "toe");
println!("{}", result); // Output: tic-tac-toe
```

## Egyéni adattípusok

Egyéni típusoknál a nyomtatáshoz vagy valósítsd meg a `Display`-t, vagy származtasd a `Debug`-ot:

```rust
#[derive(Debug)]
struct Point { x: u8, y: u8 }

let p = Point { x: 3, y: 4 };
println!("{:?}", p); // Debug output: Point { x: 3, y: 4 }
```

## Hexadecimális nyomtatás

A `{:x}` segítségével hexadecimális formában írhatsz ki egészeket:

```rust
println!("{:x}", 255); // Output: ff
```
