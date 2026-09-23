# Υποδείξεις

## Γενικά

- Όταν ανακτάς μια καταχώριση με τη μέθοδο `entry`, μπορείς να την τροποποιήσεις επιτόπου, αφού της κάνεις αποαναφορά.

- Η `or_insert` [μέθοδος](https://doc.rust-lang.org/std/collections/hash_map/enum.Entry.html#method.or_insert) εισάγει την τιμή που δίνεις στην περίπτωση που η καταχώριση είναι κενή και επιστρέφει μια μεταβλητή αναφορά στην τιμή της καταχώρισης.

```rust
*counter.entry(key).or_insert(0) += 1;
```

- Η `or_default` [μέθοδος](https://doc.rust-lang.org/std/collections/hash_map/enum.Entry.html#method.or_default) διασφαλίζει ότι υπάρχει μια τιμή στην καταχώριση, εισάγοντας την προεπιλεγμένη τιμή αν είναι κενή, και επιστρέφει μια μεταβλητή αναφορά στην τιμή της καταχώρισης.

```rust
*counter.entry(key).or_default() += 1;
```
