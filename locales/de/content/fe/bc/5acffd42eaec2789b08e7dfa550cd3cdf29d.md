# Hinweise

## Allgemein

- Wenn du einen Eintrag mit der `entry`-Methode holst, kannst du den Eintrag nach dem Dereferenzieren direkt verändern.

- Die `or_insert`-[Methode](https://doc.rust-lang.org/std/collections/hash_map/enum.Entry.html#method.or_insert) fügt den angegebenen Wert ein, wenn der Eintrag leer ist, und gibt eine veränderliche Referenz auf den Wert im Eintrag zurück.

```rust
*counter.entry(key).or_insert(0) += 1;
```

- Die `or_default`-[Methode](https://doc.rust-lang.org/std/collections/hash_map/enum.Entry.html#method.or_default) stellt sicher, dass ein Wert im Eintrag vorhanden ist, indem sie den Standardwert einfügt, wenn er leer ist, und gibt eine veränderliche Referenz auf den Wert im Eintrag zurück.

```rust
*counter.entry(key).or_default() += 1;
```
