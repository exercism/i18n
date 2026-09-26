# ヒント

## 全般

- `entry`メソッドを使って要素を取得すると、参照を外したあとにその要素を直接書き換えられます。

- `or_insert`[メソッド](https://doc.rust-lang.org/std/collections/hash_map/enum.Entry.html#method.or_insert)は、要素が空の場合に指定した値を挿入し、その要素の値への可変参照を返します。

```rust
*counter.entry(key).or_insert(0) += 1;
```

- `or_default`[メソッド](https://doc.rust-lang.org/std/collections/hash_map/enum.Entry.html#method.or_default)は、要素が空であればデフォルト値を挿入して値を入れた状態にし、その要素の値への可変参照を返します。

```rust
*counter.entry(key).or_default() += 1;
```
