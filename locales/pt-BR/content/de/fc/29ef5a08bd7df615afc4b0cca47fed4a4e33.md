# Introdução

A impressão em Cairo permite que você exiba mensagens ou informações de depuração durante a execução do programa.

## Noções básicas

Cairo fornece duas macros para impressão:

- `println!`: Exibe uma mensagem seguida de uma nova linha.
- `print!`: Exibe uma mensagem sem uma nova linha.

```rust
println!("Hello, Cairo!"); 
println!("x = {}, y = {}", 10, 20); 
```

Os placeholders `{}` são substituídos pelos valores fornecidos.

## Formatação de strings

Use `format!` para criar um `ByteArray` sem imprimir imediatamente:

```rust
let result = format!("{}-{}-{}", "tic", "tac", "toe");
println!("{}", result); // Output: tic-tac-toe
```

## Tipos de dados personalizados

Para tipos personalizados, implemente `Display` ou derive `Debug` para impressão:

```rust
#[derive(Debug)]
struct Point { x: u8, y: u8 }

let p = Point { x: 3, y: 4 };
println!("{:?}", p); // Debug output: Point { x: 3, y: 4 }
```

## Impressão em hexadecimal

Use `{:x}` para imprimir inteiros em hexadecimal:

```rust
println!("{:x}", 255); // Output: ff
```
