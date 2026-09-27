# Anexo a las instrucciones

## Frecuencia de letras en paralelo en Rust

Aprende más sobre la concurrencia en Rust aquí:

- [Concurrencia](https://doc.rust-lang.org/book/ch16-00-concurrency.html)

## Extra

Este ejercicio también incluye un benchmark, con una implementación secuencial como referencia. Puedes comparar tu solución con el benchmark. Observa el efecto que tienen las entradas de distintos tamaños en el rendimiento de cada una. ¿Puedes superar el benchmark utilizando técnicas de programación concurrente?

A día de hoy, test::Bencher es inestable y solo está disponible en Rust *nightly*. Ejecuta los benchmarks con Cargo:

```
cargo bench
```

Si utilizas rustup.rs:

```
rustup run nightly cargo bench
```

- [Pruebas de benchmark](https://doc.rust-lang.org/stable/unstable-book/library-features/test.html)

Aprende más sobre Rust nightly:

- [Rust nightly](https://doc.rust-lang.org/book/appendix-07-nightly-rust.html)
- [Instalar Rust nightly](https://rust-lang.github.io/rustup/concepts/channels.html#working-with-nightly-rust)
