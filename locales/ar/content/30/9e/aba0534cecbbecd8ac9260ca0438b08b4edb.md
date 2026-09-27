# تعليمات إضافية

## تردد الحروف المتوازي في Rust

تعلّم المزيد عن التزامن في Rust هنا:

- [التزامن](https://doc.rust-lang.org/book/ch16-00-concurrency.html)

## إضافي

يتضمن هذا التمرين أيضًا اختبارًا مرجعيًا، مع تطبيق تسلسلي كخط أساس. يمكنك مقارنة حلك بالاختبار المرجعي. لاحظ تأثير المدخلات ذات الأحجام المختلفة على أداء كل منهما. هل يمكنك تجاوز الاختبار المرجعي باستخدام تقنيات البرمجة المتزامنة؟

حتى كتابة هذه السطور، يُعد `test::Bencher` غير مستقر ومتاح فقط على Rust *nightly*. شغّل الاختبارات المرجعية باستخدام Cargo:

```
cargo bench
```

إذا كنت تستخدم rustup.rs:

```
rustup run nightly cargo bench
```

- [الاختبارات المرجعية](https://doc.rust-lang.org/stable/unstable-book/library-features/test.html)

تعلّم المزيد عن Rust nightly:

- [Rust nightly](https://doc.rust-lang.org/book/appendix-07-nightly-rust.html)
- [تثبيت Rust nightly](https://rust-lang.github.io/rustup/concepts/channels.html#working-with-nightly-rust)
