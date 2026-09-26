# Anexo a las instrucciones

## Frecuencia de letras en paralelo en Rust

Aquí puedes aprender más sobre la concurrencia en Rust:

- [Concurrencia](https://doc.rust-lang.org/book/ch16-00-concurrency.html)

## Extra

Este ejercicio también incluye un benchmark, con una implementación secuencial
como base. Puedes comparar tu solución con el benchmark. Observa el efecto que
tienen distintos tamaños de entrada en el rendimiento de cada uno. ¿Puedes
superar el benchmark usando técnicas de programación concurrente?

Al momento de escribir esto, test::Bencher es inestable y solo está disponible
en Rust *nightly*. Ejecuta los benchmarks con Cargo:

```
cargo bench
```

Si usas rustup.rs:

```
rustup run nightly cargo bench
```

- [Pruebas de benchmark](https://doc.rust-lang.org/stable/unstable-book/library-features/test.html)

Aprende más sobre Rust nightly:

- [Rust nightly](https://doc.rust-lang.org/book/appendix-07-nightly-rust.html)
- [Instalar Rust nightly](https://rust-lang.github.io/rustup/concepts/channels.html#working-with-nightly-rust)
