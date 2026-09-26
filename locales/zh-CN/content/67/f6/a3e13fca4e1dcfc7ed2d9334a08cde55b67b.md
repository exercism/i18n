# 简介

## 文档

在 Elixir 中，文档是一等公民。

有两个模块属性常用于为代码编写文档：`@moduledoc` 用于为模块编写文档，`@doc` 用于为紧随该属性的函数编写文档。`@moduledoc` 属性通常出现在模块的第一行，`@doc` 属性通常出现在函数定义之前，如果函数有类型规格，则出现在类型规格之前。文档通常使用 heredoc 语法写成多行字符串。

Elixir 文档使用[**Markdown**][markdown]编写。

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

## 类型规格

Elixir 是一种动态类型语言，这意味着它不提供编译时的类型检查。不过，类型规格仍可作为一种文档形式使用。

可以使用`@spec`模块属性把类型规格添加到函数上，放在函数定义之前。`@spec`后面跟着函数名，以及用括号括起来、以逗号分隔的所有参数类型的列表。返回值的类型与函数的参数之间用双冒号`::`分隔。

```elixir
@spec longer_than?(String.t(), non_neg_integer()) :: boolean()
def longer_than?(string, length), do: String.length(string) > length
```

### 类型

最常用的类型包括：

- 布尔值：`boolean()`
- 字符串：`String.t()`
- 数字：`integer()`、`non_neg_integer()`、`pos_integer()`、`float()`
- 列表：`list()`
- 任意类型的值：`any()`

有些类型还可以带参数，例如`list(integer)`是整数的列表。

字面量值也可以用作类型。

类型的联合可以使用管道符`|`来书写。例如，`integer() | :error`表示要么是整数，要么是原子字面量`:error`。

所有类型的完整列表可以在[官方文档的“Typespecs”部分][types]中找到。

### 为参数命名

类型规格中的参数也可以命名，这对区分多个同类型的参数很有用。参数名后面跟双冒号，放在参数的类型之前。

```elixir
@spec to_hex({hue :: integer, saturation :: integer, lightness :: integer}) :: String.t()
```

### 自定义类型

类型规格并不限于内置类型。可以使用`@type`模块属性定义自定义类型。自定义类型的定义以类型名开头，后面跟双冒号，然后是类型本身。

```elixir
@type color :: {hue :: integer, saturation :: integer, lightness :: integer}

@spec to_hex(color()) :: String.t()
```

自定义类型可以在定义它的同一个模块中使用，也可以在其他模块中使用。

[markdown]: https://docs.github.com/en/github/writing-on-github/basic-writing-and-formatting-syntax
[types]: https://hexdocs.pm/elixir/typespecs.html#types-and-their-syntax
