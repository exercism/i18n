# Kiegészítés az utasításokhoz

## Párhuzamos betűgyakoriság Rustban

Tudj meg többet a konkurenciáról Rustban:

- [Konkurencia](https://doc.rust-lang.org/book/ch16-00-concurrency.html)

## Bónusz

Ez a feladat egy benchmarkot is tartalmaz, amelynek egy szekvenciális
implementáció a kiindulási alapja. Összehasonlíthatod a megoldásodat a
benchmarkkal. Figyeld meg, milyen hatással van a különböző méretű bemenet az
egyes változatok teljesítményére. Felül tudod múlni a benchmarkot párhuzamos
programozási technikákkal?

E sorok írásakor a test::Bencher instabil, és csak a *nightly* Rustban érhető
el. Futtasd a benchmarkokat a Cargo segítségével:

```
cargo bench
```

Ha a rustup.rs-t használod:

```
rustup run nightly cargo bench
```

- [Benchmark tesztek](https://doc.rust-lang.org/stable/unstable-book/library-features/test.html)

Tudj meg többet a nightly Rustról:

- [Nightly Rust](https://doc.rust-lang.org/book/appendix-07-nightly-rust.html)
- [A Rust nightly telepítése](https://rust-lang.github.io/rustup/concepts/channels.html#working-with-nightly-rust)
