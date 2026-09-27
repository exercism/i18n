# ইঙ্গিত

## সাধারণ

- `entry` মেথড দিয়ে কোনো এন্ট্রি ফেচ করার পর, সেটি ডিরেফারেন্স করে সরাসরি পরিবর্তন করা যায়।

- `or_insert` [মেথড](https://doc.rust-lang.org/std/collections/hash_map/enum.Entry.html#method.or_insert) এন্ট্রিটি খালি থাকলে প্রদত্ত মানটি সন্নিবেশ করে, এবং এন্ট্রির মানটির একটি মিউটেবল রেফারেন্স রিটার্ন করে।

```rust
*counter.entry(key).or_insert(0) += 1;
```

- `or_default` [মেথড](https://doc.rust-lang.org/std/collections/hash_map/enum.Entry.html#method.or_default) এন্ট্রি খালি থাকলে ডিফল্ট মানটি সন্নিবেশ করে সেখানে একটি মান থাকা নিশ্চিত করে, এবং এন্ট্রির মানটির একটি মিউটেবল রেফারেন্স রিটার্ন করে।

```rust
*counter.entry(key).or_default() += 1;
```
