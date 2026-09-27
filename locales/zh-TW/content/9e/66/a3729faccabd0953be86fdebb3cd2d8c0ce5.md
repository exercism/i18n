# 關於

- Elixir 是動態型別的。
  - 變數的型別只會在執行階段檢查。
- 使用匹配`=`運算子，我們可以把任何型別的值綁定到變數名稱上：
  - 變數可以重新綁定。
  - 變數可以綁定任何型別的值。

## 模組

- [模組][modules]是 Elixir 中程式碼組織的基礎。
  - 模組對所有其他模組都可見。
  - 模組是用[`defmodule`][defmodule]定義的。

## 具名函式

- 所有[具名函式][functions]都必須定義在模組裡。

  - 具名函式是用[`def`][def]定義的。
  - 具名函式可以改用[`defp`][defp]設為私有。
  - 函式中最後一個運算式的值會被_隱式回傳_。
  - 簡短的函式也可以用單行語法來寫。

  ```elixir
  def increment(n) do
    n + 1
  end

  defp private_increment(n) do
    n + 1
  end

  def short_increment(n), do: n + 1
  ```

- 呼叫函式時，會使用模組名稱加上函式的完整名稱。
  - 如果是在自己的模組內呼叫，則可以省略模組名稱。
- 指涉具名函式時，經常會用到函式的元數。

  - 元數指的是它接受的引數數量。

  ```elixir
  # add/3, because the arity is 3
  def add(x, y, z), do: x + y + z
  ```

## 命名慣例

模組名稱應使用`PascalCase`。模組名稱必須以大寫字母`A-Z`開頭，可以包含字母`a-zA-Z`、數字`0-9`和底線`_`。

變數和函式名稱應使用`snake_case`。變數或函式名稱必須以小寫字母`a-z`或底線`_`開頭，可以包含字母`a-zA-Z`、數字`0-9`和底線`_`，並且可以以問號`?`或驚嘆號`!`結尾。

## 整數

整數值就是一或多個數字寫成的整數。你可以對它們執行[基本數學運算][operators]。

## 字串

[字串][string]實字是由雙引號包住的一連串字元。

```elixir
string = "this is a string! 1, 2, 3!"
```

## 標準函式庫

- 說明文件可以在線上取得：[hexdocs.pm/elixir][docs]。
- 大多數內建的資料型態都有對應的模組，例如`Integer`、`Float`、`String`、`Tuple`、`List`。
- `Kernel`模組是一個特殊的模組。
  - 提供建立標準函式庫其餘部分所依據的基本功能。
  - 會自動匯入。
  - 它的函式可以不用`Kernel.`前綴就能使用。

## 程式碼註解

註解可以用來為閱讀原始碼的其他開發者留下筆記。Elixir 的單行註解以`#`開頭。

[match]: https://elixirschool.com/en/lessons/basics/pattern_matching/
[operators]: https://hexdocs.pm/elixir/basic-types.html#basic-arithmetic
[modules]: https://elixirschool.com/en/lessons/basics/modules/#modules
[functions]: https://elixirschool.com/en/lessons/basics/functions/#named-functions
[def]: https://hexdocs.pm/elixir/Kernel.html#def/2
[defp]: https://hexdocs.pm/elixir/Kernel.html#defp/2
[defmodule]: https://hexdocs.pm/elixir/Kernel.html#defmodule/2
[string]: https://hexdocs.pm/elixir/basic-types.html#strings
[docs]: https://hexdocs.pm/elixir/Kernel.html#content
