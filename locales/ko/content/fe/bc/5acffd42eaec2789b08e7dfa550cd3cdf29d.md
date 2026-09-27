# 힌트

## 일반

- `entry` 메서드로 항목을 가져오면, 역참조한 뒤에 그 항목을 제자리에서 수정할 수 있어요.

- `or_insert` [메서드](https://doc.rust-lang.org/std/collections/hash_map/enum.Entry.html#method.or_insert)는 항목이 비어 있을 때 주어진 값을 삽입하고, 항목 안의 값에 대한 가변 참조를 반환해요.

```rust
*counter.entry(key).or_insert(0) += 1;
```

- `or_default` [메서드](https://doc.rust-lang.org/std/collections/hash_map/enum.Entry.html#method.or_default)는 항목이 비어 있으면 기본값을 삽입해서 항목에 값이 있도록 하고, 항목 안의 값에 대한 가변 참조를 반환해요.

```rust
*counter.entry(key).or_default() += 1;
```
