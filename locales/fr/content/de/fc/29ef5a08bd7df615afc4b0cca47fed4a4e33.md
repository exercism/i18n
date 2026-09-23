# Introduction

L'affichage en Cairo permet de montrer des messages ou des informations de débogage pendant l'exécution du programme.

## Les bases

Cairo fournit deux macros pour l'affichage :

- `println!` : affiche un message suivi d'un retour à la ligne.
- `print!` : affiche un message sans retour à la ligne.

```rust
println!("Hello, Cairo!"); 
println!("x = {}, y = {}", 10, 20); 
```

Les espaces réservés `{}` sont remplacés par les valeurs fournies.

## Formatage des chaînes de caractères

Utilise `format!` pour créer un `ByteArray` sans l'afficher immédiatement :

```rust
let result = format!("{}-{}-{}", "tic", "tac", "toe");
println!("{}", result); // Output: tic-tac-toe
```

## Types de données personnalisés

Pour les types personnalisés, implémente `Display` ou dérive `Debug` pour pouvoir les afficher :

```rust
#[derive(Debug)]
struct Point { x: u8, y: u8 }

let p = Point { x: 3, y: 4 };
println!("{:?}", p); // Debug output: Point { x: 3, y: 4 }
```

## Affichage en hexadécimal

Utilise `{:x}` pour afficher les entiers en hexadécimal :

```rust
println!("{:x}", 255); // Output: ff
```
