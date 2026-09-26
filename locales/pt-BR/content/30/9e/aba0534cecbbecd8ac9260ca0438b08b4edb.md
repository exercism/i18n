# Anexo às instruções

## Frequência de letras em paralelo em Rust

Saiba mais sobre concorrência em Rust aqui:

- [Concorrência](https://doc.rust-lang.org/book/ch16-00-concurrency.html)

## Bônus

Este exercício também inclui um benchmark, com uma implementação sequencial como
linha de base. Você pode comparar sua solução com o benchmark. Observe o
efeito que entradas de tamanhos diferentes têm sobre o desempenho de cada um. Você
consegue superar o benchmark usando técnicas de programação concorrente?

Até o momento em que isto foi escrito, test::Bencher é instável e só está disponível no
Rust *nightly*. Rode os benchmarks com o Cargo:

```
cargo bench
```

Se você estiver usando rustup.rs:

```
rustup run nightly cargo bench
```

- [Testes de benchmark](https://doc.rust-lang.org/stable/unstable-book/library-features/test.html)

Saiba mais sobre o Rust nightly:

- [Rust nightly](https://doc.rust-lang.org/book/appendix-07-nightly-rust.html)
- [Instalar o Rust nightly](https://rust-lang.github.io/rustup/concepts/channels.html#working-with-nightly-rust)
