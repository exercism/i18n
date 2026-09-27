# 指令補充

## 主題

解決這個問題的過程中，你可能會想讀一些 Rust 的相關主題：

- Trait，包括 From trait，以及[實作自己的 trait](https://doc.rust-lang.org/book/ch10-02-traits.html)
- trait 的[預設方法實作](https://doc.rust-lang.org/book/ch10-02-traits.html#default-implementations)
- 巨集。使用巨集可以減少這個練習的樣板程式碼，並提升可讀性。例如，[巨集可以一次為多個型別實作 trait](https://stackoverflow.com/questions/39150216/implementing-a-trait-for-multiple-types-at-once)，不過直接在 Planet trait 本身實作 `years_during` 也沒問題。巨集可以同時定義結構體與它們的實作。想開始認識巨集，可以參考：

  - [《Rust 程式設計語言》的巨集章節](https://doc.rust-lang.org/stable/book/ch19-06-macros.html)
  - [舊版巨集章節，內容更實用也更詳細](https://doc.rust-lang.org/1.30.0/book/first-edition/macros.html)
  - [Rust By Example](https://doc.rust-lang.org/stable/rust-by-example/macros.html)
