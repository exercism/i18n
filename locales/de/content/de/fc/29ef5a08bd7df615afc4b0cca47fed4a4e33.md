# Einführung

Die Ausgabe in Cairo ermöglicht es dir, während der Programmausführung Nachrichten oder Debug-Informationen anzuzeigen.

## Grundlagen

Cairo bietet zwei Makros für die Ausgabe:

- `println!`: Gibt eine Nachricht gefolgt von einem Zeilenumbruch aus.
- `print!`: Gibt eine Nachricht ohne Zeilenumbruch aus.

```rust
println!("Hello, Cairo!"); 
println!("x = {}, y = {}", 10, 20); 
```

Platzhalter `{}` werden durch die übergebenen Werte ersetzt.

## Strings formatieren

Verwende `format!`, um ein `ByteArray` zu erzeugen, ohne es sofort auszugeben:

```rust
let result = format!("{}-{}-{}", "tic", "tac", "toe");
println!("{}", result); // Output: tic-tac-toe
```

## Eigene Datentypen

Für eigene Typen implementierst du `Display` oder leitest `Debug` ab, um sie auszugeben:

```rust
#[derive(Debug)]
struct Point { x: u8, y: u8 }

let p = Point { x: 3, y: 4 };
println!("{:?}", p); // Debug output: Point { x: 3, y: 4 }
```

## Hexadezimale Ausgabe

Verwende `{:x}`, um Ganzzahlen hexadezimal auszugeben:

```rust
println!("{:x}", 255); // Output: ff
```
