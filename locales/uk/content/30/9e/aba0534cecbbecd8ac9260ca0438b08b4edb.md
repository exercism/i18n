# Додаток до інструкцій

## Паралельна частота літер у Rust

Дізнайтеся більше про конкурентність у Rust тут:

- [Конкурентність](https://doc.rust-lang.org/book/ch16-00-concurrency.html)

## Бонус

Ця вправа також містить бенчмарк, у якому послідовна реалізація слугує базовим рівнем. Порівняйте своє рішення з бенчмарком. Простежте, як різний розмір вхідних даних впливає на продуктивність кожного з них. Чи вдасться перевершити бенчмарк, використовуючи техніки конкурентного програмування?

На момент написання цього тексту test::Bencher нестабільний і доступний лише в *nightly* Rust. Запустіть бенчмарки за допомогою Cargo:

```
cargo bench
```

Якщо ми використовуємо rustup.rs:

```
rustup run nightly cargo bench
```

- [Бенчмарк-тести](https://doc.rust-lang.org/stable/unstable-book/library-features/test.html)

Дізнайтеся більше про nightly Rust:

- [Nightly Rust](https://doc.rust-lang.org/book/appendix-07-nightly-rust.html)
- [Встановлення nightly Rust](https://rust-lang.github.io/rustup/concepts/channels.html#working-with-nightly-rust)
