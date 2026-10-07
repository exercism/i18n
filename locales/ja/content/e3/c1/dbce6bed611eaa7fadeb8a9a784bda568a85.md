# 演習の補足

大文字と小文字の違いや、文字以外のものは無視して文字を数え、小文字からその出現回数への辞書を返します。

与えられた`items`を、純粋な`task`関数を使って処理するには、[roc-parallelプラットフォーム](https://github.com/ageron/roc-parallel)の`pf.Parallel.map!(items, { workers, task })`を使います。処理は、複数のスレッド（`workers`で指定します）にまたがって並行に実行されます。すべての`items`を処理し終えると、結果は入力と同じ順序で返されます。編集する必要があるのは`ParallelLetterFrequency.roc`だけです。

ヒント: 大文字と小文字の変換や、文字かどうかの判定には、[Unicodeライブラリ](https://github.com/roc-lang/unicode)を使うのがおすすめです。特に、`unicode.Case.to_lower`、`unicode.GeneralCategory.of_scalar`、`unicode.Scalar.iter`、`unicode.Scalar.to_str`を見てみてください。文字はUnicodeスカラー値として扱います。Unicodeの正規化は必要ありません。

注意: この演習は、他のほとんどの演習と違い、副作用のある関数を使います。現時点では、Rocの`expect`文は副作用のある関数を呼び出せないため、この演習のテストでは`expect`も`roc test`も使いません。代わりに、テストは`roc --opt=speed`で実行され、Rocのコードが返したエラーは、通常とは異なる形式でプラットフォームから報告されます。

並行処理の別の側面、つまり共有状態を安全に更新することを扱っている`bank-account`の演習も、覗いてみるとよいでしょう。
