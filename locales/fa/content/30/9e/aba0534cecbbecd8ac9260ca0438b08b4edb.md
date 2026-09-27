# ضمیمه‌ی دستورالعمل‌ها

## فراوانی موازی حروف در Rust

درباره‌ی هم‌روندی در Rust بیشتر بدانید:

- [هم‌روندی](https://doc.rust-lang.org/book/ch16-00-concurrency.html)

## امتیاز

این تمرین یک بنچمارک هم دارد که یک پیاده‌سازی ترتیبی را به‌عنوان مبنای مقایسه در خود جای داده است. می‌توانید راه‌حل خود را با بنچمارک مقایسه کنید. ببینید ورودی‌های با اندازه‌های مختلف چه تأثیری بر کارایی هر کدام می‌گذارند. آیا می‌توانید با تکنیک‌های برنامه‌نویسی هم‌روند از بنچمارک پیشی بگیرید؟

در زمان نوشتن این متن، `test::Bencher` ناپایدار است و فقط روی نسخه‌ی *nightly* زبان Rust در دسترس است. بنچمارک‌ها را با Cargo اجرا کنید:

```
cargo bench
```

اگر از rustup.rs استفاده می‌کنید:

```
rustup run nightly cargo bench
```

- [آزمون‌های بنچمارک](https://doc.rust-lang.org/stable/unstable-book/library-features/test.html)

درباره‌ی نسخه‌ی nightly زبان Rust بیشتر بدانید:

- [نسخه‌ی nightly زبان Rust](https://doc.rust-lang.org/book/appendix-07-nightly-rust.html)
- [نصب نسخه‌ی nightly زبان Rust](https://rust-lang.github.io/rustup/concepts/channels.html#working-with-nightly-rust)
