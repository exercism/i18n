# 説明

あなたは、企業スパイ活動と戦う特別チームの一員です。競合他社から秘密を盗んでいると疑われるShady Company Xに、あなたには秘密の内通者がいます。

あなたの内通者であるエージェントExは、Elixirのエンジニアです。彼女は自分のコードの中に秘密のメッセージをエンコードしています。

彼女の秘密のメッセージを解読するには、次のようにします。

- 定義されている順番に、すべての関数（publicとprivate）を取り出します。
- 各関数について、関数名の先頭から`n`文字を取り出します。ここで`n`はその関数のアリティです。

## 1. コードをデータに変換する

`TopSecret.to_ast/1`関数を実装します。この関数は、Elixirのコードを含む文字列を受け取り、そのASTを返します。

```elixir
TopSecret.to_ast("div(4, 3)")
# => {:div, [line: 1], [4, 3]}
```

## 2. 単一のASTノードを解析する

`TopSecret.decode_secret_message_part/2`関数を実装します。この関数は、ASTノードと、秘密のメッセージ用のアキュムレーター（リスト）を受け取ります。そして、変更されていないASTノードを1番目の要素、アキュムレーターを2番目の要素とするタプルを返します。

ASTノードの操作が関数の定義（`def`または`defp`）である場合は、関数名を文字列に変換してアキュムレーターの先頭に追加します。それ以外の操作の場合は、アキュムレーターを変更せずに返します。

```elixir
ast_node = TopSecret.to_ast("defp cat(a, b, c), do: nil")
TopSecret.decode_secret_message_part(ast_node, ["day"])
# => {ast_node, ["cat", "day"]}

ast_node = TopSecret.to_ast("10 + 3")
TopSecret.decode_secret_message_part(ast_node, ["day"])
# => {ast_node, ["day"]}
```

この関数は、AST全体を調べるために再帰呼び出しをする必要はありません。与えられたノードだけを扱えば十分です。AST全体の走査は、最後のステップで組み込みのツールを使って行います。

## 3. 関数定義から秘密のメッセージの断片を解読する

`TopSecret.decode_secret_message_part/2`関数を拡張します。ASTノードの操作が関数の定義である場合は、関数名全体を返しません。代わりに、その関数のアリティを調べます。そして、名前の先頭から`n`文字だけを返します。ここで`n`はアリティです。

```elixir
ast_node = TopSecret.to_ast("defp cat(a, b), do: nil")
TopSecret.decode_secret_message_part(ast_node, ["day"])
# => {ast_node, ["ca", "day"]}

ast_node = TopSecret.to_ast("defp cat(), do: nil")
TopSecret.decode_secret_message_part(ast_node, ["day"])
# => {ast_node, ["", "day"]}
```

## 4. ガード付きの関数のデコードを修正する

`TopSecret.decode_secret_message_part/2`関数を拡張します。ガードを使う関数定義でも、関数名とアリティが正しく検出されるようにします。

```elixir
ast_node = TopSecret.to_ast("defp cat(a, b) when is_nil(a), do: nil")
TopSecret.decode_secret_message_part(ast_node, ["day"])
# => {ast_node, ["ca", "day"]}
```

## 5. 秘密のメッセージ全体を解読する

`TopSecret.decode_secret_message/1`関数を実装します。この関数は、Elixirのコードを含む文字列を受け取り、そのコードの中で見つかったすべての関数定義から解読した秘密のメッセージを、文字列として返します。前のステップで定義した関数を必ず再利用しましょう。

```elixir
code = """
defmodule MyCalendar do
  def busy?(date, time) do
    Date.day_of_week(date) != 7 and
      time.hour in 10..16
  end

  def yesterday?(date) do
    Date.diff(Date.utc_today, date)
  end
end
"""

TopSecret.decode_secret_message(code)
# => "buy"
```
