# Introdução

Imprimir no Cairo permite-te mostrar mensagens ou informação de debug durante a execução do programa.

## Noções básicas

O Cairo disponibiliza duas macros para imprimir:

- `println!`: Escreve uma mensagem seguida de uma nova linha.
- `print!`: Escreve uma mensagem sem uma nova linha.

```rust
println!("Hello, Cairo!"); 
println!("x = {}, y = {}", 10, 20); 
```

Os marcadores `{}` são substituídos pelos valores fornecidos.

## Formatação de strings

Usa `format!` para criar um `ByteArray` sem imprimir de imediato:

```rust
let result = format!("{}-{}-{}", "tic", "tac", "toe");
println!("{}", result); // Output: tic-tac-toe
```

## Tipos de dados personalizados

Para tipos personalizados, implementa `Display` ou deriva `Debug` para imprimir:

```rust
#[derive(Debug)]
struct Point { x: u8, y: u8 }

let p = Point { x: 3, y: 4 };
println!("{:?}", p); // Debug output: Point { x: 3, y: 4 }
```

## Impressão em hexadecimal

Usa `{:x}` para imprimir números inteiros em hexadecimal:

```rust
println!("{:x}", 255); // Output: ff
```
