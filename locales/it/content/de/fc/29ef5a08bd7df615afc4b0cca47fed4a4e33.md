# Introduzione

La stampa in Cairo ti permette di visualizzare messaggi o informazioni di debug durante l'esecuzione del programma.

## Le basi

Cairo fornisce due macro per la stampa:

- `println!`: Stampa un messaggio e poi va a capo.
- `print!`: Stampa un messaggio senza andare a capo.

```rust
println!("Hello, Cairo!"); 
println!("x = {}, y = {}", 10, 20); 
```

I segnaposto `{}` vengono sostituiti con i valori forniti.

## Formattazione delle stringhe

Usa `format!` per creare un `ByteArray` senza stamparlo subito:

```rust
let result = format!("{}-{}-{}", "tic", "tac", "toe");
println!("{}", result); // Output: tic-tac-toe
```

## Tipi di dati personalizzati

Per i tipi personalizzati, implementa `Display` o deriva `Debug` per stamparli:

```rust
#[derive(Debug)]
struct Point { x: u8, y: u8 }

let p = Point { x: 3, y: 4 };
println!("{:?}", p); // Debug output: Point { x: 3, y: 4 }
```

## Stampa esadecimale

Usa `{:x}` per stampare i numeri interi in esadecimale:

```rust
println!("{:x}", 255); // Output: ff
```
