# Доповнення до інструкцій

## Теми

Кілька тем Rust, про які варто почитати, розвʼязуючи цю задачу:

- Трейти, зокрема трейт From і [реалізація власних трейтів](https://doc.rust-lang.org/book/ch10-02-traits.html)
- [Типові реалізації методів](https://doc.rust-lang.org/book/ch10-02-traits.html#default-implementations) для трейтів
- Макроси: використання макросу могло б зменшити обсяг шаблонного коду та підвищити
  читабельність цієї задачі. Наприклад,
  [макрос може реалізувати трейт одразу для кількох типів](https://stackoverflow.com/questions/39150216/implementing-a-trait-for-multiple-types-at-once),
  хоча цілком нормально реалізувати `years_during` у самому трейті `Planet`. Макрос міг би
  визначити і структури, і їхні реалізації. Початкову інформацію про макроси можна
  знайти тут:

  - [Розділ про макроси в книзі The Rust Programming Language](https://doc.rust-lang.org/stable/book/ch19-06-macros.html)
  - [старіша версія розділу про макроси з корисними подробицями](https://doc.rust-lang.org/1.30.0/book/first-edition/macros.html)
  - [Rust By Example](https://doc.rust-lang.org/stable/rust-by-example/macros.html)
