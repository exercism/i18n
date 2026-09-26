# 説明の補足

## Rustでの並列文字頻度

Rustでの並行処理について詳しくは、こちらをご覧ください：

- [並行処理](https://doc.rust-lang.org/book/ch16-00-concurrency.html)

## ボーナス

この演習にはベンチマークも含まれており、比較の基準として逐次実装が用意されています。自分の解答をベンチマークと比べてみましょう。入力のサイズが変わると、それぞれのパフォーマンスにどんな影響が出るかを観察してみてください。並行処理のテクニックを使って、ベンチマークを上回ることはできるでしょうか？

なお、これを書いている時点では、test::Bencherは不安定で、*nightly*版のRustでしか使えません。ベンチマークはCargoで実行します：

```
cargo bench
```

rustup.rsを使っている場合は：

```
rustup run nightly cargo bench
```

- [ベンチマークテスト](https://doc.rust-lang.org/stable/unstable-book/library-features/test.html)

nightly版のRustについて詳しくは：

- [nightly版のRust](https://doc.rust-lang.org/book/appendix-07-nightly-rust.html)
- [nightly版Rustのインストール](https://rust-lang.github.io/rustup/concepts/channels.html#working-with-nightly-rust)
