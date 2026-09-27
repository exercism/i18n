# 簡介

## 使用

`use`巨集讓我們能快速用其他模組提供的功能來擴充自己的模組。當我們`use`一個模組時，那個模組可以把程式碼注入我們的模組中，例如定義函式、`import`或`alias`其他模組，或是設定模組屬性。

如果你看過這裡 Exercism 上某些 Elixir 練習的測試檔案，大概會注意到它們全都以`use ExUnit.Case`開頭。就是這一行程式碼讓`test`和`assert`這兩個巨集可以在測試模組中使用。

```elixir
defmodule LasagnaTest do
  use ExUnit.Case

  test "expected minutes in oven" do
    assert Lasagna.expected_minutes_in_oven() === 40
  end
end
```

### `__using__/1`巨集

我們`use`一個模組時到底發生什麼事，取決於那個模組的`__using__/1`巨集。它接受一個引數，也就是帶有選項的關鍵字清單，並回傳一個[引述的運算式][concept-ast]。當我們呼叫`use`時，這個引述運算式裡的程式碼會被插入我們的模組。

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

呼叫`use`時可以把選項當作第二個引數傳入，例如`use ExUnit.Case, async: true`。如果沒有明確給定，選項會預設為空清單。

## 行為

行為讓我們可以在一個_行為模組_中定義介面（一組函式和巨集），之後再由不同的_回呼模組_實作。有了共用的介面，這些回呼模組就能互換使用。

~~~~exercism/note
注意「behaviours」的英式拼法。
~~~~

### 定義行為

要定義一個行為，我們需要建立一個新模組，並指定屬於這個介面的函式清單。每個函式都必須用`@callback`模組屬性來定義。語法和[函式型別規格][concept-typespecs]（`@spec`）完全相同。我們需要指定函式名稱、引數型別的清單，以及所有可能的回傳型別。

```elixir
defmodule Countable do
  @callback count(collection :: any) :: pos_integer
end
```

### 實作行為

要把現有的行為加入我們的模組（建立回呼模組），我們使用`@behaviour`模組屬性。它的值應該是我們要加入的行為模組名稱。

接著，我們需要定義那個行為模組要求的所有函式（回呼）。如果我們實作的是別人的行為，例如 Elixir 內建的`Access`或`GenServer`行為，可以在 [hexdocs.pm][hexdocs] 的文件中找到該行為所有回呼的清單。

回呼模組不限於只實作屬於它行為的函式。單一模組也可以實作多個行為。

為了標示哪個函式來自哪個行為，我們應該在每個函式前使用模組屬性`@impl`。它的值應該是定義這個回呼的行為模組名稱。

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

### 回呼的預設實作

定義行為時，可以為回呼提供預設實作。這個實作應該定義在`__using__/1`巨集的引述運算式中。為了讓行為模組的使用者能覆寫預設實作，請在函式實作之後呼叫`defoverridable/1`巨集。它接受一個關鍵字清單，以函式名稱作為鍵、函式的引數數量作為值。

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

請注意，除了定義回呼的預設實作之外，不建議在`__using__/1`裡定義函式，但你隨時可以在另一個模組中定義函式，並在`__using__/1`巨集中匯入它們。

[concept-ast]: https://exercism.org/tracks/elixir/concepts/ast
[concept-typespecs]: https://exercism.org/tracks/elixir/concepts/typespecs
[hexdocs]: https://hexdocs.pm
