# Tippek

## Általános

- Ha az `entry` metódussal lekérsz egy bejegyzést, akkor a bejegyzést a dereferálás után helyben is módosíthatod.

- Az `or_insert` [metódus](https://doc.rust-lang.org/std/collections/hash_map/enum.Entry.html#method.or_insert) akkor szúrja be a megadott értéket, ha a bejegyzés üres, és egy módosítható hivatkozást ad vissza a bejegyzésben lévő értékre.

```rust
*counter.entry(key).or_insert(0) += 1;
```

- Az `or_default` [metódus](https://doc.rust-lang.org/std/collections/hash_map/enum.Entry.html#method.or_default) gondoskodik arról, hogy legyen érték a bejegyzésben: ha üres, beilleszti az alapértelmezett értéket, majd egy módosítható hivatkozást ad vissza a bejegyzésben lévő értékre.

```rust
*counter.entry(key).or_default() += 1;
```
