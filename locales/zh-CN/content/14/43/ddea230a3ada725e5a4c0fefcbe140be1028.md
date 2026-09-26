# 补充说明

## 主题

在解决这道题时，你可能想读一些 Rust 相关的主题：

- trait，包括 From trait 和[实现你自己的 trait](https://doc.rust-lang.org/book/ch10-02-traits.html)
- trait 的[默认方法实现](https://doc.rust-lang.org/book/ch10-02-traits.html#default-implementations)
- 宏。使用宏可以减少这道题的样板代码，提高可读性。比如，
  [一个宏可以一次性为多个类型实现一个 trait](https://stackoverflow.com/questions/39150216/implementing-a-trait-for-multiple-types-at-once)，
  当然，直接在 Planet trait 自身里实现 `years_during` 也没问题。宏可以
  同时定义结构体及其实现。宏的入门资料见：

  - [《Rust 程序设计语言》中的宏章节](https://doc.rust-lang.org/stable/book/ch19-06-macros.html)
  - [旧版宏章节，细节很有帮助](https://doc.rust-lang.org/1.30.0/book/first-edition/macros.html)
  - [Rust By Example](https://doc.rust-lang.org/stable/rust-by-example/macros.html)
