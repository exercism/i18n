# 简介

## 使用

`use`宏允许我们快速用另一个模块提供的功能来扩展自己的模块。当我们`use`一个模块时，那个模块可以向我们的模块中注入代码，例如它可以定义函数、`import`或`alias`其他模块，或者设置模块属性。

如果你曾经看过 Exercism 上某些 Elixir 练习的测试文件，很可能注意到它们都以`use ExUnit.Case`开头。正是这一行代码让`test`和`assert`宏在测试模块中可用。

```elixir
defmodule LasagnaTest do
  use ExUnit.Case

  test "expected minutes in oven" do
    assert Lasagna.expected_minutes_in_oven() === 40
  end
end
```

### `__using__/1`宏

当你`use`一个模块时，究竟会发生什么，取决于该模块的`__using__/1`宏。它接收一个实参，即一个带选项的关键字列表，并返回一个[引用表达式][concept-ast]。调用`use`时，这个引用表达式中的代码会被插入到我们的模块中。

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

选项可以在调用`use`时作为第二个实参传入，例如`use ExUnit.Case, async: true`。如果没有显式给出，它们默认为空列表。

## 行为

行为允许我们在一个_行为模块_中定义接口（函数和宏的集合），之后可以由不同的_回调模块_来实现。得益于共享的接口，这些回调模块可以互换使用。

~~~~exercism/note
注意 “behaviours” 是英式拼写。
~~~~

### 定义行为

要定义一个行为，我们需要创建一个新模块，并指定该接口所包含的函数列表。每个函数都需要使用`@callback`模块属性来定义。语法与[函数类型规格][concept-typespecs]（`@spec`）完全相同。我们需要指定函数名、实参类型列表以及所有可能的返回类型。

```elixir
defmodule Countable do
  @callback count(collection :: any) :: pos_integer
end
```

### 实现行为

要为一个模块添加已有的行为（创建一个回调模块），我们使用`@behaviour`模块属性。它的值应该是我们要添加的行为模块名。

然后，我们需要定义该行为模块要求的所有函数（回调）。如果要实现别人的行为，比如 Elixir 内置的`Access`或`GenServer`行为，就可以在 [hexdocs.pm][hexdocs] 上的文档中找到该行为的全部回调列表。

回调模块并不局限于只实现其行为所包含的函数。单个模块也可以实现多个行为。

为了标明某个函数来自哪个行为，我们应该在每个函数前使用`@impl`模块属性。它的值应该是定义该回调的行为模块名。

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

### 默认回调实现

在定义行为时，可以为一个回调提供默认实现。这个实现应该定义在`__using__/1`宏的引用表达式中。为了让行为模块的使用者能够覆盖默认实现，请在函数实现之后调用`defoverridable/1`宏。它接收一个关键字列表，其中键是函数名，值是函数的参数个数。

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

注意，除了定义默认回调实现之外，不建议在`__using__/1`内部定义函数，但你始终可以在另一个模块中定义函数，然后在`__using__/1`宏中导入它们。

[concept-ast]: https://exercism.org/tracks/elixir/concepts/ast
[concept-typespecs]: https://exercism.org/tracks/elixir/concepts/typespecs
[hexdocs]: https://hexdocs.pm
