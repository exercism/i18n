# Introduzione

A volte un certo pezzo di codice deve essere usato più di una volta. Se è così, potrebbe essere conveniente mettere il codice in una funzione. Di solito una funzione esegue una sola azione specifica. In Rust, la parola chiave ```fn``` si usa per definire le funzioni. Il codice che appartiene alla funzione è sempre tra parentesi graffe (cioè `{}`). La funzione chiamata `main` è speciale perché è il punto di ingresso dei programmi. Da quella funzione puoi chiamare altre funzioni.

```rust
fn say_my_name(name: &str) -> &str {
    name
}
```

Le funzioni possono anche accettare parametri, come ```name: &str``` in ```say_my_name()```. Le funzioni possono anche restituire valori, come `-> &str` qui sopra.
