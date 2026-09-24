# Підказки

## Загальне

- Запис, отриманий за допомогою методу `entry`, після розіменування можна змінити на місці.

- `or_insert` [метод](https://doc.rust-lang.org/std/collections/hash_map/enum.Entry.html#method.or_insert) вставляє передане значення, якщо запис порожній, і повертає змінне посилання на значення в записі.

```rust
*counter.entry(key).or_insert(0) += 1;
```

- `or_default` [метод](https://doc.rust-lang.org/std/collections/hash_map/enum.Entry.html#method.or_default) гарантує, що в записі є значення, вставляючи типове значення, якщо запис порожній, і повертає змінне посилання на значення в записі.

```rust
*counter.entry(key).or_default() += 1;
```
