# Dicas

## Geral

- Ao obteres uma entrada com o método `entry`, podes modificar a entrada no local depois de a desreferenciares.

- O [método](https://doc.rust-lang.org/std/collections/hash_map/enum.Entry.html#method.or_insert) `or_insert` insere o valor fornecido quando a entrada está vazia, e devolve uma referência mutável ao valor na entrada.

```rust
*counter.entry(key).or_insert(0) += 1;
```

- O [método](https://doc.rust-lang.org/std/collections/hash_map/enum.Entry.html#method.or_default) `or_default` garante que há um valor na entrada, inserindo o valor predefinido se esta estiver vazia, e devolve uma referência mutável ao valor na entrada.

```rust
*counter.entry(key).or_default() += 1;
```
