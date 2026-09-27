# Introducción

Imprimir en Cairo te permite mostrar mensajes o información de depuración durante la ejecución del programa.

## Conceptos básicos

Cairo proporciona dos macros para imprimir:

- `println!`: muestra un mensaje seguido de un salto de línea.
- `print!`: muestra un mensaje sin un salto de línea.

```rust
println!("Hello, Cairo!"); 
println!("x = {}, y = {}", 10, 20); 
```

Los marcadores de posición `{}` se sustituyen por los valores proporcionados.

## Dar formato a strings

Usa `format!` para crear un `ByteArray` sin imprimirlo inmediatamente:

```rust
let result = format!("{}-{}-{}", "tic", "tac", "toe");
println!("{}", result); // Output: tic-tac-toe
```

## Tipos de datos personalizados

Para los tipos personalizados, implementa `Display` o deriva `Debug` para imprimirlos:

```rust
#[derive(Debug)]
struct Point { x: u8, y: u8 }

let p = Point { x: 3, y: 4 };
println!("{:?}", p); // Debug output: Point { x: 3, y: 4 }
```

## Impresión en hexadecimal

Usa `{:x}` para imprimir números enteros en hexadecimal:

```rust
println!("{:x}", 255); // Output: ff
```
