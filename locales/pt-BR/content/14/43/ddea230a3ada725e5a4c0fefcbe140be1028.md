# Anexo das instruções

## Tópicos

Alguns tópicos de Rust que você pode querer ler enquanto resolve este problema:

- Traits, tanto o trait From quanto [implementar seus próprios traits](https://doc.rust-lang.org/book/ch10-02-traits.html)
- [Implementações padrão de métodos](https://doc.rust-lang.org/book/ch10-02-traits.html#default-implementations) para traits
- Macros: usar uma macro pode reduzir o código repetitivo e aumentar a legibilidade
  deste exercício. Por exemplo,
  [uma macro pode implementar um trait para vários tipos de uma vez](https://stackoverflow.com/questions/39150216/implementing-a-trait-for-multiple-types-at-once),
  embora não haja problema em implementar `years_during` no próprio trait Planet. Uma macro pode
  definir tanto as structs quanto suas implementações. Informações para começar com macros podem
  ser encontradas em:

  - [O capítulo sobre macros em The Rust Programming Language](https://doc.rust-lang.org/stable/book/ch19-06-macros.html)
  - [uma versão mais antiga do capítulo sobre macros, com detalhes úteis](https://doc.rust-lang.org/1.30.0/book/first-edition/macros.html)
  - [Rust By Example](https://doc.rust-lang.org/stable/rust-by-example/macros.html)
