# Indices

## Généralités

- Quand on récupère une entrée avec la méthode `entry`, on peut la modifier sur place après l'avoir déréférencée.

- La [méthode](https://doc.rust-lang.org/std/collections/hash_map/enum.Entry.html#method.or_insert) `or_insert` insère la valeur donnée lorsque l'entrée est vacante et renvoie une référence mutable vers la valeur de l'entrée.

```rust
*counter.entry(key).or_insert(0) += 1;
```

- La [méthode](https://doc.rust-lang.org/std/collections/hash_map/enum.Entry.html#method.or_default) `or_default` garantit qu'une valeur est présente dans l'entrée en y insérant la valeur par défaut si elle est vide, et renvoie une référence mutable vers la valeur de l'entrée.

```rust
*counter.entry(key).or_default() += 1;
```
