# 补充说明

## Rust 中的并行字母频率

在这里进一步了解 Rust 中的并发：

- [并发](https://doc.rust-lang.org/book/ch16-00-concurrency.html)

## 加分练习

这个练习还包含一个基准测试，并提供一个串行实现作为基线。你可以把自己的提交的解答与基准测试进行比较。观察不同大小的输入对二者性能的影响。你能用并发编程技术超越这个基准测试吗？

在撰写本文时，`test::Bencher`还不稳定，只在*nightly*版的 Rust 上可用。用 Cargo 运行基准测试：

```
cargo bench
```

如果你使用 rustup.rs：

```
rustup run nightly cargo bench
```

- [基准测试](https://doc.rust-lang.org/stable/unstable-book/library-features/test.html)

进一步了解 nightly Rust：

- [Nightly 版 Rust](https://doc.rust-lang.org/book/appendix-07-nightly-rust.html)
- [安装 Nightly 版 Rust](https://rust-lang.github.io/rustup/concepts/channels.html#working-with-nightly-rust)
