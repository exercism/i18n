# はじめに

## ドキュメント

Elixirでは、ドキュメントは第一級の存在として扱われます。

コードにドキュメントを付けるためによく使われるモジュール属性が2つあります。モジュールを記述する`@moduledoc`と、その属性の直後にある関数を記述する`@doc`です。`@moduledoc`属性はたいていモジュールの最初の行に置き、`@doc`属性はたいてい関数定義の直前、型仕様があればその直前に置きます。ドキュメントは、ヒアドキュメント構文を使った複数行の文字列として書くのが一般的です。

Elixirのドキュメントは[**Markdown**][markdown]で書きます。

```elixir
defmodule String do
  @moduledoc """
  Strings in Elixir are UTF-8 encoded binaries.
  """

  @doc """
  Converts all characters in the given string to uppercase according to `mode`.

  ## Examples

      iex> String.upcase("abcd")
      "ABCD"

      iex> String.upcase("olá")
      "OLÁ"
  """
  def upcase(string, mode \\ :default)
end
```

## 型仕様

Elixirは動的型付け言語なので、コンパイル時の型チェックは行いません。それでも、型仕様はドキュメントの一種として使うことができます。

型仕様は、関数定義の直前に`@spec`モジュール属性を書くことで関数に追加できます。`@spec`の後には、関数名と、そのすべての引数の型のリストを括弧（`()`）で囲んで書きます。型はカンマで区切ります。戻り値の型は、関数の引数とコロン2つ`::`で区切ります。

```elixir
@spec longer_than?(String.t(), non_neg_integer()) :: boolean()
def longer_than?(string, length), do: String.length(string) > length
```

### 型

よく使う型には次のようなものがあります。

- 真偽値: `boolean()`
- 文字列: `String.t()`
- 数値: `integer()`、`non_neg_integer()`、`pos_integer()`、`float()`
- 配列: `list()`
- 任意の型の値: `any()`

型にパラメーターを渡すこともできます。たとえば`list(integer)`は整数の配列です。

リテラル値を型として使うこともできます。

複数の型の和集合は、パイプ`|`を使って書くことができます。たとえば`integer() | :error`は、整数かアトムリテラル`:error`のどちらかを意味します。

すべての型の一覧は、[公式ドキュメントの「型仕様」のセクション][types]にあります。

### 引数に名前を付ける

型仕様の引数には名前を付けることもできます。同じ型の引数が複数あるときに区別できて便利です。引数名の後にコロン2つを書き、その後に引数の型を書きます。

```elixir
@spec to_hex({hue :: integer, saturation :: integer, lightness :: integer}) :: String.t()
```

### カスタム型

型仕様は組み込みの型だけに限りません。カスタム型は`@type`モジュール属性を使って定義できます。カスタム型の定義は、型の名前から始まり、その後にコロン2つ、そして型そのものを書きます。

```elixir
@type color :: {hue :: integer, saturation :: integer, lightness :: integer}

@spec to_hex(color()) :: String.t()
```

カスタム型は、定義した同じモジュールからでも、別のモジュールからでも使うことができます。

[markdown]: https://docs.github.com/en/github/writing-on-github/basic-writing-and-formatting-syntax
[types]: https://hexdocs.pm/elixir/typespecs.html#types-and-their-syntax
