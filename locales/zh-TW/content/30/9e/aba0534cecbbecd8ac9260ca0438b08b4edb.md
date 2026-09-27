# 說明補充

## Rust 中的平行字母頻率

想進一步了解 Rust 的並行處理，可以參考這裡：

- [並行處理](https://doc.rust-lang.org/book/ch16-00-concurrency.html)

## 加分題

這個練習還附有一份基準測試，並提供循序的實作作為基準。你可以把自己的解法拿來和它比較，觀察不同大小的輸入對兩者效能的影響。你能運用並行的程式設計技巧超越這份基準測試嗎？

撰寫本文時，test::Bencher 還不穩定，只能在 *nightly*版本的 Rust 上使用。用 Cargo 執行基準測試：

```
cargo bench
```

如果你使用的是 rustup.rs：

```
rustup run nightly cargo bench
```

- [基準測試](https://doc.rust-lang.org/stable/unstable-book/library-features/test.html)

進一步了解 nightly 版本的 Rust：

- [Nightly Rust](https://doc.rust-lang.org/book/appendix-07-nightly-rust.html)
- [安裝 Rust nightly](https://rust-lang.github.io/rustup/concepts/channels.html#working-with-nightly-rust)
