# Suggerimenti

## Generale

- Dopo aver recuperato un entry con il metodo `entry`, puoi modificare l'entry sul posto dopo averlo dereferenziato.

- Il [metodo](https://doc.rust-lang.org/std/collections/hash_map/enum.Entry.html#method.or_insert) `or_insert` inserisce il valore dato nel caso in cui l'entry sia vacante e restituisce un riferimento mutabile al valore nell'entry.

```rust
*counter.entry(key).or_insert(0) += 1;
```

- Il [metodo](https://doc.rust-lang.org/std/collections/hash_map/enum.Entry.html#method.or_default) `or_default` garantisce che nell'entry ci sia un valore, inserendo quello predefinito se l'entry è vuoto, e restituisce un riferimento mutabile al valore nell'entry.

```rust
*counter.entry(key).or_default() += 1;
```
