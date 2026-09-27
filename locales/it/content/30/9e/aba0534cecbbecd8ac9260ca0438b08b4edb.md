# Appendice alle istruzioni

## Frequenza delle lettere in parallelo in Rust

Per saperne di più sulla concorrenza in Rust:

- [Concorrenza](https://doc.rust-lang.org/book/ch16-00-concurrency.html)

## Bonus

Questo esercizio include anche un benchmark, con un'implementazione sequenziale come base di riferimento. Puoi confrontare la soluzione con il benchmark. Osserva l'effetto che input di dimensioni diverse hanno sulle prestazioni di ciascuno. Riesci a superare il benchmark usando tecniche di programmazione concorrente?

Al momento in cui scriviamo, test::Bencher è instabile ed è disponibile solo su Rust *nightly*. Esegui i benchmark con Cargo:

```
cargo bench
```

Se usi rustup.rs:

```
rustup run nightly cargo bench
```

- [Test di benchmark](https://doc.rust-lang.org/stable/unstable-book/library-features/test.html)

Per saperne di più su Rust nightly:

- [Rust nightly](https://doc.rust-lang.org/book/appendix-07-nightly-rust.html)
- [Installare Rust nightly](https://rust-lang.github.io/rustup/concepts/channels.html#working-with-nightly-rust)
