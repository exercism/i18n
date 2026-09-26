# 説明の補足

## トピック

この問題を解くときに読んでみるとよいRustのトピックをいくつか挙げます：

- トレイト。`From`トレイトと、[独自のトレイトを実装する方法](https://doc.rust-lang.org/book/ch10-02-traits.html)の両方
- トレイトの[デフォルトのメソッド実装](https://doc.rust-lang.org/book/ch10-02-traits.html#default-implementations)
- マクロ。マクロを使うと、この演習の定型コードを減らして読みやすくできます。たとえば、[1つのマクロで複数の型にまとめてトレイトを実装する](https://stackoverflow.com/questions/39150216/implementing-a-trait-for-multiple-types-at-once)こともできますが、`years_during`は`Planet`トレイト自体に実装しても構いません。マクロを使えば、構造体とその実装の両方を定義できます。マクロを始めるための情報はこちらです：

  - [The Rust Programming Languageのマクロの章](https://doc.rust-lang.org/stable/book/ch19-06-macros.html)
  - [マクロの章の、役立つ詳細が載った古いバージョン](https://doc.rust-lang.org/1.30.0/book/first-edition/macros.html)
  - [Rust By Example](https://doc.rust-lang.org/stable/rust-by-example/macros.html)
