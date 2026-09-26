# はじめに

プロトコルは、データ型に応じて振る舞いを変えたいときに、Elixirでポリモーフィズムを実現するための仕組みです。

プロトコルは`defprotocol`を使って定義し、1つ以上の関数ヘッダーを含みます。

```elixir
defprotocol Reversible do
  def reverse(term)
end
```

プロトコルは`defimpl`を使って実装できます。

```elixir
defimpl Reversible, for: List do
  def reverse(term) do
    Enum.reverse(term)
  end
end
```

プロトコルは、既存のElixirのデータ型や構造体に対して実装できます。

プロトコルの関数が呼び出されると、最初の引数の型に基づいて、適切な実装が自動的に選ばれます。
