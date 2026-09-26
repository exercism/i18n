# Dicas

## Geral

- Ao obter uma entrada com o método `entry`, você pode modificar a entrada no próprio lugar depois de desreferenciá-la.

- O [método](https://doc.rust-lang.org/std/collections/hash_map/enum.Entry.html#method.or_insert) `or_insert` insere o valor informado quando a entrada está vazia e retorna uma referência mutável ao valor na entrada.

```rust
*counter.entry(key).or_insert(0) += 1;
```

- O [método](https://doc.rust-lang.org/std/collections/hash_map/enum.Entry.html#method.or_default) `or_default` garante que haja um valor na entrada, inserindo o valor padrão se ela estiver vazia, e retorna uma referência mutável ao valor na entrada.

```rust
*counter.entry(key).or_default() += 1;
```
