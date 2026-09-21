# Kiegészítés az utasításokhoz

## Témák

Néhány Rust-téma, amiről érdemes olvasnod a feladat megoldása közben:

- Trait-ek: egyrészt a From trait, másrészt [a saját trait-jeid implementálása](https://doc.rust-lang.org/book/ch10-02-traits.html)
- [Alapértelmezett metódusimplementációk](https://doc.rust-lang.org/book/ch10-02-traits.html#default-implementations) trait-ekhez
- Makrók: egy makró használata csökkentheti a boilerplate kódot és növelheti az olvashatóságot
  ennél a feladatnál. Például
  [egy makró egyszerre több típusra is implementálhat egy traitet](https://stackoverflow.com/questions/39150216/implementing-a-trait-for-multiple-types-at-once),
  bár az is teljesen rendben van, ha a `years_during` metódust magában a Planet traitben
  implementálod. Egy makró akár a structokat és azok implementációit is definiálhatná.
  A makrók használatának elkezdéséhez az alábbi helyeken találsz információkat:

  - [A Macros fejezet a The Rust Programming Language című könyvben](https://doc.rust-lang.org/stable/book/ch19-06-macros.html)
  - [a Macros fejezet egy régebbi, hasznos részletekkel teli változata](https://doc.rust-lang.org/1.30.0/book/first-edition/macros.html)
  - [Rust By Example](https://doc.rust-lang.org/stable/rust-by-example/macros.html)
