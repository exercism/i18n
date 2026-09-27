# Anexo às instruções

## Frequência de letras em paralelo no Rust

Sabe mais sobre concorrência em Rust aqui:

- [Concorrência](https://doc.rust-lang.org/book/ch16-00-concurrency.html)

## Bónus

Este exercício inclui também um benchmark, com uma implementação sequencial como
referência. Podes comparar a tua solução com o benchmark. Observa o efeito
que entradas de tamanhos diferentes têm no desempenho de cada uma. Consegues
superar o benchmark com técnicas de programação concorrente?

Neste momento, test::Bencher é instável e só está disponível no Rust
*nightly*. Corre os benchmarks com o Cargo:

```
cargo bench
```

Se estiveres a usar o rustup.rs:

```
rustup run nightly cargo bench
```

- [Testes de benchmark](https://doc.rust-lang.org/stable/unstable-book/library-features/test.html)

Sabe mais sobre o Rust nightly:

- [Rust nightly](https://doc.rust-lang.org/book/appendix-07-nightly-rust.html)
- [Instalar o Rust nightly](https://rust-lang.github.io/rustup/concepts/channels.html#working-with-nightly-rust)
