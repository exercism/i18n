# 提示

## 一般

- 使用`entry`方法取得條目後，只要先解引用，就能原地修改該條目。

- `or_insert`[方法](https://doc.rust-lang.org/std/collections/hash_map/enum.Entry.html#method.or_insert)會在條目為空時插入給定的值，並回傳條目中該值的可變參考。

```rust
*counter.entry(key).or_insert(0) += 1;
```

- `or_default`[方法](https://doc.rust-lang.org/std/collections/hash_map/enum.Entry.html#method.or_default)會在條目為空時插入預設值，確保條目中有值，並回傳條目中該值的可變參考。

```rust
*counter.entry(key).or_default() += 1;
```
