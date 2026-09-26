# はじめに

列挙可能なデータ（配列、ビット列、文字列）を[再帰][exercism-recursion]でたどるとき、よく問題になることが2つあります。

- 再帰的な関数呼び出しの記録を保持するのに、どれだけメモリが必要か
- どうすれば効率よく解を組み立てられるか

こうした問題に対処するために、_アキュムレーター_を使うことがあります。

アキュムレーターとは、データに加えて受け渡される変数のことです。関数呼び出しから次の関数呼び出しへと、_基底ケース_に到達するまで、関数の実行の現在の状態を引き継ぐために使われます。基底ケースでは、アキュムレーターを使って再帰呼び出しの最終的な値を返します。

アキュムレーターは、関数の利用者ではなく、関数の作者が初期化するようにします。そのためには、関数を2つ定義します。必要なデータだけを引数に取り、アキュムレーターを初期化する公開関数と、アキュムレーターも受け取る非公開関数です。Elixirでは、非公開関数の名前の先頭に`do_`を付けるのがよくあるパターンです。

```elixir
# Count the length of a list without an accumulator
def count([]), do: 0
def count([_head | tail]), do: 1 + count(tail)

# Count the length of a list with an accumulator
def count(list), do: do_count(list, 0)

defp do_count([], count), do: count
defp do_count([_head | tail], count), do: do_count(tail, count + 1)
```

アキュムレーターを使うと、再帰関数を_末尾再帰_の関数にできます。関数が実行する_最後_の処理が自分自身の呼び出しであるとき、その関数は末尾再帰です。

[exercism-recursion]: https://exercism.org/tracks/elixir/concepts/recursion
