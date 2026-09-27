# Ergänzung zu den Anweisungen

## Parallele Buchstabenhäufigkeit in Rust

Mehr über Nebenläufigkeit in Rust erfährst du hier:

- [Nebenläufigkeit](https://doc.rust-lang.org/book/ch16-00-concurrency.html)

## Bonus

Diese Übung enthält außerdem einen Benchmark, mit einer sequenziellen Implementierung als
Basis. Du kannst deine Lösung mit dem Benchmark vergleichen. Beobachte, welchen
Effekt unterschiedlich große Eingaben auf die Leistung von beiden haben. Kannst du
den Benchmark mit nebenläufigen Programmiertechniken übertreffen?

Zum Zeitpunkt dieses Textes ist test::Bencher instabil und nur in
*nightly* Rust verfügbar. Führe die Benchmarks mit Cargo aus:

```
cargo bench
```

Wenn du rustup.rs verwendest:

```
rustup run nightly cargo bench
```

- [Benchmark-Tests](https://doc.rust-lang.org/stable/unstable-book/library-features/test.html)

Mehr über nightly Rust erfährst du hier:

- [Nightly Rust](https://doc.rust-lang.org/book/appendix-07-nightly-rust.html)
- [Rust nightly installieren](https://rust-lang.github.io/rustup/concepts/channels.html#working-with-nightly-rust)
