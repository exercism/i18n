# Apéndice de instrucciones

## Temas

Algunos temas de Rust sobre los que quizás quieras leer mientras resuelves este problema:

- Los traits, tanto el trait From como [implementar tus propios traits](https://doc.rust-lang.org/book/ch10-02-traits.html)
- [Implementaciones de métodos por defecto](https://doc.rust-lang.org/book/ch10-02-traits.html#default-implementations) para los traits
- Las macros. Usar una macro podría reducir el código repetitivo y aumentar la legibilidad
  de este ejercicio. Por ejemplo,
  [una macro puede implementar un trait para varios tipos a la vez](https://stackoverflow.com/questions/39150216/implementing-a-trait-for-multiple-types-at-once),
  aunque está bien implementar `years_during` en el propio trait Planet. Una macro podría
  definir tanto los structs como sus implementaciones. Puedes encontrar información para
  empezar con las macros en:

  - [El capítulo sobre macros de The Rust Programming Language](https://doc.rust-lang.org/stable/book/ch19-06-macros.html)
  - [una versión anterior del capítulo sobre macros, con detalles útiles](https://doc.rust-lang.org/1.30.0/book/first-edition/macros.html)
  - [Rust By Example](https://doc.rust-lang.org/stable/rust-by-example/macros.html)
