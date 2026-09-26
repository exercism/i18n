# Pistas

## General

- Al obtener una entrada con el método `entry`, puedes modificar la entrada en el mismo lugar después de desreferenciarla.

- El [método](https://doc.rust-lang.org/std/collections/hash_map/enum.Entry.html#method.or_insert) `or_insert` inserta el valor dado cuando la entrada está vacía y devuelve una referencia mutable al valor de la entrada.

```rust
*counter.entry(key).or_insert(0) += 1;
```

- El [método](https://doc.rust-lang.org/std/collections/hash_map/enum.Entry.html#method.or_default) `or_default` asegura que haya un valor en la entrada insertando el valor predeterminado si está vacía, y devuelve una referencia mutable al valor de la entrada.

```rust
*counter.entry(key).or_default() += 1;
```
