# はじめに

## `use`

`use`マクロを使うと、別のモジュールが提供する機能で自分のモジュールを手早く拡張できます。モジュールを`use`すると、そのモジュールは自分のモジュールにコードを注入できます。たとえば、関数を定義したり、他のモジュールを`import`や`alias`したり、モジュール属性を設定したりできます。

ExercismにあるElixirの演習のテストファイルを見たことがあれば、それらがすべて`use ExUnit.Case`で始まっていることに気づいたでしょう。このたった1行のコードが、テストモジュールでマクロ`test`と`assert`を使えるようにしています。

```elixir
defmodule LasagnaTest do
  use ExUnit.Case

  test "expected minutes in oven" do
    assert Lasagna.expected_minutes_in_oven() === 40
  end
end
```

### `__using__/1`マクロ

モジュールを`use`したときに何が起こるかは、そのモジュールの`__using__/1`マクロが決めています。このマクロは、オプションをまとめたキーワードリストを1つの引数として受け取り、[クォートされた式][concept-ast]を返します。このクォートされた式のコードが、`use`を呼び出したときに自分のモジュールへ挿入されます。

```elixir
defmodule ExUnit.Case do
  defmacro __using__(opts) do
    # some real-life ExUnit code omitted here
    quote do
      import ExUnit.Assertions
      import ExUnit.Case, only: [describe: 2, test: 1, test: 2, test: 3]
    end
  end
end
```

オプションは、`use`を呼び出すときの2番目の引数として渡せます。たとえば`use ExUnit.Case, async: true`のように書きます。明示的に指定しない場合、デフォルトで空のリストになります。

## ビヘイビア

ビヘイビアを使うと、_ビヘイビアモジュール_の中にインターフェース（関数とマクロの集合）を定義し、それを後からさまざまな_コールバックモジュール_で実装できます。共通のインターフェースのおかげで、これらのコールバックモジュールは互いに置き換えて使えます。

~~~~exercism/note
"behaviours"はイギリス英語の綴りであることに注意してください。
~~~~

### ビヘイビアを定義する

ビヘイビアを定義するには、新しいモジュールを作成し、目的のインターフェースに含まれる関数のリストを指定します。各関数は、`@callback`モジュール属性を使って定義します。構文は[関数の型仕様][concept-typespecs]（`@spec`）と同じです。関数名、引数の型のリスト、そして取りうる戻り値の型をすべて指定します。

```elixir
defmodule Countable do
  @callback count(collection :: any) :: pos_integer
end
```

### ビヘイビアを実装する

既存のビヘイビアを自分のモジュールに追加する（コールバックモジュールを作成する）には、`@behaviour`モジュール属性を使います。その値には、追加するビヘイビアモジュールの名前を指定します。

次に、そのビヘイビアモジュールが要求するすべての関数（コールバック）を定義する必要があります。たとえばElixirに組み込まれている`Access`や`GenServer`のビヘイビアなど、他の誰かのビヘイビアを実装する場合は、そのビヘイビアのすべてのコールバックのリストが[hexdocs.pm][hexdocs]のドキュメントに載っています。

コールバックモジュールは、そのビヘイビアに含まれる関数だけを実装する必要はありません。1つのモジュールで複数のビヘイビアを実装することもできます。

どの関数がどのビヘイビアに由来するかを示すには、各関数の前に`@impl`モジュール属性を使います。その値には、このコールバックを定義しているビヘイビアモジュールの名前を指定します。

```elixir
defmodule BookCollection do
  @behaviour Countable

  defstruct [:list, :owner]

  @impl Countable
  def count(collection) do
    Enum.count(collection.list)
  end

  def mark_as_read(collection, book) do
    # other function unrelated to the Countable behaviour
  end
end
```

### コールバックのデフォルト実装

ビヘイビアを定義するときは、コールバックのデフォルト実装を用意できます。この実装は、`__using__/1`マクロのクォートされた式の中で定義します。ビヘイビアモジュールの利用者がデフォルト実装を上書きできるようにするには、関数の実装の後に`defoverridable/1`マクロを呼び出します。このマクロは、関数名をキー、関数のアリティを値とするキーワードリストを受け取ります。

```elixir
defmodule Countable do
  @callback count(collection :: any) :: pos_integer

  defmacro __using__(_) do
    quote do
      @behaviour Countable
      def count(collection), do: Enum.count(collection)
      defoverridable count: 1
    end
  end
end
```

`__using__/1`の中で関数を定義することは、コールバックのデフォルト実装を定義する以外の目的では推奨されません。ただし、別のモジュールで関数を定義し、それを`__using__/1`マクロの中でインポートすることはいつでもできます。

[concept-ast]: https://exercism.org/tracks/elixir/concepts/ast
[concept-typespecs]: https://exercism.org/tracks/elixir/concepts/typespecs
[hexdocs]: https://hexdocs.pm
