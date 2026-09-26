# 概要

- Elixirは動的型付けです。
  - 変数の型は、実行時にのみチェックされます。
- マッチ演算子[`=`][match]を使うと、どの型の値でも変数名に束縛できます：
  - 変数は再束縛できます。
  - 変数には、どの型の値でも束縛できます。

## モジュール

- [モジュール][modules]は、Elixirにおけるコード整理の基本です。
  - モジュールは、ほかのすべてのモジュールから見えます。
  - モジュールは[`defmodule`][defmodule]で定義します。

## 名前付き関数

- すべての[名前付き関数][functions]は、モジュール内で定義する必要があります。

  - 名前付き関数は[`def`][def]で定義します。
  - [`defp`][defp]を使うと、名前付き関数をプライベートにできます。
  - 関数の最後の式の値は、_暗黙的に返されます_。
  - 短い関数は、1行の構文で書くこともできます。

  ```elixir
  def increment(n) do
    n + 1
  end

  defp private_increment(n) do
    n + 1
  end

  def short_increment(n), do: n + 1
  ```

- 関数は、モジュール名を付けた完全な関数名を使って呼び出します。
  - 同じモジュールの中から呼び出す場合は、モジュール名を省略できます。
- 名前付き関数を指すときには、その関数のアリティがよく使われます。

  - アリティとは、その関数が受け取る引数の数のことです。

  ```elixir
  # add/3, because the arity is 3
  def add(x, y, z), do: x + y + z
  ```

## 命名規則

モジュール名には`PascalCase`を使います。モジュール名は大文字の`A-Z`で始まる必要があり、文字`a-zA-Z`、数字`0-9`、アンダースコア`_`を含めることができます。

変数名と関数名には`snake_case`を使います。変数名や関数名は小文字の`a-z`またはアンダースコア`_`で始まる必要があり、文字`a-zA-Z`、数字`0-9`、アンダースコア`_`を含めることができ、疑問符`?`や感嘆符`!`で終わることがあります。

## 整数

整数値は、1桁以上の数字で書かれる整数です。整数に対しては、[基本的な算術演算][operators]を行えます。

## 文字列

[文字列][string]リテラルは、二重引用符で囲まれた文字の並びです。

```elixir
string = "this is a string! 1, 2, 3!"
```

## 標準ライブラリ

- ドキュメントは[hexdocs.pm/elixir][docs]でオンラインで公開されています。
- ほとんどの組み込みデータ型には、対応するモジュールがあります（例：`Integer`、`Float`、`String`、`Tuple`、`List`）。
- `Kernel`モジュールは特別なモジュールです。
  - 標準ライブラリの残りの部分がその上に構築される、基本的な機能を提供します。
  - 自動的にインポートされます。
  - その関数は、`Kernel.`というプレフィックスなしで使えます。

## コードコメント

コメントは、ソースコードを読むほかのエンジニアに向けたメモを残すために使えます。Elixirの1行コメントは、`#`を前に付けます。

[match]: https://elixirschool.com/en/lessons/basics/pattern_matching/
[operators]: https://hexdocs.pm/elixir/basic-types.html#basic-arithmetic
[modules]: https://elixirschool.com/en/lessons/basics/modules/#modules
[functions]: https://elixirschool.com/en/lessons/basics/functions/#named-functions
[def]: https://hexdocs.pm/elixir/Kernel.html#def/2
[defp]: https://hexdocs.pm/elixir/Kernel.html#defp/2
[defmodule]: https://hexdocs.pm/elixir/Kernel.html#defmodule/2
[string]: https://hexdocs.pm/elixir/basic-types.html#strings
[docs]: https://hexdocs.pm/elixir/Kernel.html#content
