# 提示

## 通用

- 使用`entry`方法获取条目后，解引用即可就地修改该条目。

- 当条目为空时，`or_insert`[方法](https://doc.rust-lang.org/std/collections/hash_map/enum.Entry.html#method.or_insert)会插入给定的值，并返回指向该条目中值的可变引用。

```rust
*counter.entry(key).or_insert(0) += 1;
```

- `or_default`[方法](https://doc.rust-lang.org/std/collections/hash_map/enum.Entry.html#method.or_default)会在条目为空时插入默认值，从而确保条目中有值，并返回指向该条目中值的可变引用。

```rust
*counter.entry(key).or_default() += 1;
```
