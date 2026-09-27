# راهنما

## کلی

- پس از واکشی یک درایه با استفاده از متد `entry`، می‌توانید آن را پس از ارجاع‌زدایی در جای خود تغییر دهید.

- [متد](https://doc.rust-lang.org/std/collections/hash_map/enum.Entry.html#method.or_insert) `or_insert` در صورتی که درایه خالی باشد مقدار داده‌شده را درج می‌کند و ارجاعی تغییرپذیر به مقدار موجود در درایه برمی‌گرداند.

```rust
*counter.entry(key).or_insert(0) += 1;
```

- [متد](https://doc.rust-lang.org/std/collections/hash_map/enum.Entry.html#method.or_default) `or_default` با درج مقدار پیش‌فرض در صورت خالی بودن، تضمین می‌کند که مقداری در درایه وجود داشته باشد و ارجاعی تغییرپذیر به مقدار موجود در درایه برمی‌گرداند.

```rust
*counter.entry(key).or_default() += 1;
```
