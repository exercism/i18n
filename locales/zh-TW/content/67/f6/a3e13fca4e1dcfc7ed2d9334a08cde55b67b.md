# 簡介

## 文件

在 Elixir 裡，文件是一等公民。

有兩個模組屬性經常用來為程式碼撰寫文件：`@moduledoc`用來記錄模組的文件，`@doc`則用來記錄緊接在該屬性後面的函式。`@moduledoc`屬性通常會出現在模組的第一行，而`@doc`屬性通常會出現在函式定義的正前方，如果函式有型別規格的話，就放在型別規格前面。文件通常使用 heredoc 語法寫成多行字串。

Elixir 的文件是以 [**Markdown**][markdown] 撰寫的。

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

## 型別規格

Elixir 是動態型別的語言，這表示它不提供編譯期的型別檢查。不過，型別規格還是可以當作一種文件形式來使用。

你可以使用`@spec`模組屬性，把型別規格加在函式定義的正前方。`@spec`後面接著函式名稱，以及一組放在括號裡、以逗號分隔的所有引數型別。回傳值的型別和函式的引數之間，用雙冒號`::`分隔。

```elixir
@spec longer_than?(String.t(), non_neg_integer()) :: boolean()
def longer_than?(string, length), do: String.length(string) > length
```

### 型別

最常用的型別有：

- 布林值：`boolean()`
- 字串：`String.t()`
- 數字：`integer()`、`non_neg_integer()`、`pos_integer()`、`float()`
- 陣列：`list()`
- 任意型別的值：`any()`

有些型別還能參數化，例如`list(integer)`就是一個整數的陣列。

字面值也可以當作型別使用。

型別的聯集可以用垂直線`|`來表示。例如`integer() | :error`的意思是：它可能是整數，也可能是原子字面值`:error`。

完整的型別清單可以在[官方文件的「Typespecs」一節][types]中找到。

### 為引數命名

型別規格裡的引數也可以命名，這在區分多個同型別的引數時很有用。引數名稱後面接著雙冒號，放在該引數的型別前面。

```elixir
@spec to_hex({hue :: integer, saturation :: integer, lightness :: integer}) :: String.t()
```

### 自訂型別

型別規格並不限於內建型別而已。你可以使用`@type`模組屬性來定義自訂型別。自訂型別的定義以型別名稱開頭，後面接著雙冒號，然後才是型別本身。

```elixir
@type color :: {hue :: integer, saturation :: integer, lightness :: integer}

@spec to_hex(color()) :: String.t()
```

自訂型別可以在定義它的同一個模組裡使用，也可以從其他模組使用。

[markdown]: https://docs.github.com/en/github/writing-on-github/basic-writing-and-formatting-syntax
[types]: https://hexdocs.pm/elixir/typespecs.html#types-and-their-syntax
