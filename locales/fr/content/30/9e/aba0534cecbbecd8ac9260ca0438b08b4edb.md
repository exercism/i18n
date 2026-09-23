# Instructions complémentaires

## Fréquence des lettres en parallèle en Rust

Pour en savoir plus sur la concurrence en Rust :

- [Concurrence](https://doc.rust-lang.org/book/ch16-00-concurrency.html)

## Bonus

Cet exercice comprend aussi un benchmark, avec une implémentation séquentielle comme point de comparaison. Tu peux comparer ta solution au benchmark. Observe l'effet de la taille des entrées sur les performances de chacune. Peux-tu dépasser le benchmark grâce à des techniques de programmation concurrente ?

À l'heure où nous écrivons ces lignes, test::Bencher est instable et n'est disponible que sur Rust *nightly*. Lance les benchmarks avec Cargo :

```
cargo bench
```

Si tu utilises rustup.rs :

```
rustup run nightly cargo bench
```

- [Tests de benchmark](https://doc.rust-lang.org/stable/unstable-book/library-features/test.html)

Pour en savoir plus sur Rust *nightly* :

- [Rust nightly](https://doc.rust-lang.org/book/appendix-07-nightly-rust.html)
- [Installer Rust nightly](https://rust-lang.github.io/rustup/concepts/channels.html#working-with-nightly-rust)
