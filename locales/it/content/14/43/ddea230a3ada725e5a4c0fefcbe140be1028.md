# Appendice alle istruzioni

## Argomenti

Alcuni argomenti di Rust che potresti voler approfondire mentre risolvi questo problema:

- I trait, sia il trait From sia [l'implementazione dei tuoi trait](https://doc.rust-lang.org/book/ch10-02-traits.html)
- [Implementazioni predefinite dei metodi](https://doc.rust-lang.org/book/ch10-02-traits.html#default-implementations) per i trait
- Le macro: usare una macro potrebbe ridurre il codice ripetitivo e aumentare la leggibilità
  di questo esercizio. Per esempio,
  [una macro può implementare un trait per più tipi contemporaneamente](https://stackoverflow.com/questions/39150216/implementing-a-trait-for-multiple-types-at-once),
  anche se va benissimo implementare `years_during` direttamente nel trait Planet. Una macro
  potrebbe definire sia le struct sia le loro implementazioni. Per iniziare con le macro, puoi
  consultare:

  - [Il capitolo sulle macro in The Rust Programming Language](https://doc.rust-lang.org/stable/book/ch19-06-macros.html)
  - [una versione più vecchia del capitolo sulle macro, con dettagli utili](https://doc.rust-lang.org/1.30.0/book/first-edition/macros.html)
  - [Rust By Example](https://doc.rust-lang.org/stable/rust-by-example/macros.html)
