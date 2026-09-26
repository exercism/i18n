# 关于

- Elixir 是动态类型的。
  - 变量的类型只在运行时才会被检查。
- 使用匹配[`=`][match]运算符，我们可以把任意类型的值绑定到变量名上：
  - 变量可以被重新绑定。
  - 绑定到变量上的值可以是任意类型。

## 模块

- [模块][modules]是 Elixir 中代码组织的基础。
  - 模块对所有其他模块都是可见的。
  - 模块用[`defmodule`][defmodule]定义。

## 命名函数

- 所有[命名函数][functions]都必须定义在模块中。

  - 命名函数用[`def`][def]定义。
  - 改用[`defp`][defp]，可以把命名函数设为私有。
  - 函数中最后一个表达式的值会被_隐式返回_。
  - 简短的函数也可以用单行语法来写。

  ```elixir
  def increment(n) do
    n + 1
  end

  defp private_increment(n) do
    n + 1
  end

  def short_increment(n), do: n + 1
  ```

- 调用函数时，要使用模块名加上函数的完整名称。
  - 如果在自己的模块内部调用，可以省略模块名。
- 提到命名函数时，经常用函数的元数来称呼它。

  - 元数指的是函数接受的实参个数。

  ```elixir
  # add/3, because the arity is 3
  def add(x, y, z), do: x + y + z
  ```

## 命名约定

模块名应该使用`PascalCase`。模块名必须以大写字母 `A-Z` 开头，可以包含字母 `a-zA-Z`、数字 `0-9` 和下划线 `_`。

变量名和函数名应该使用`snake_case`。变量名或函数名必须以小写字母 `a-z` 或下划线 `_` 开头，可以包含字母 `a-zA-Z`、数字 `0-9` 和下划线 `_`，并且可以以问号 `?` 或感叹号 `!` 结尾。

## 整数

整数值由一位或多位数字组成。你可以对它们进行[基本数学运算][operators]。

## 字符串

[字符串][string]字面量是由双引号包围的字符序列。

```elixir
string = "this is a string! 1, 2, 3!"
```

## 标准库

- [hexdocs.pm/elixir][docs] 上有在线文档。
- 大多数内置数据类型都有对应的模块，例如`Integer`、`Float`、`String`、`Tuple`、`List`。
- `Kernel` 模块是一个特殊的模块。
  - 它提供了基础能力，标准库的其余部分都建立在它之上。
  - 会被自动导入。
  - 其中的函数在使用时可以省略`Kernel.`前缀。

## 代码注释

可以用注释给阅读源代码的其他开发者留下说明。Elixir 中的单行注释以`#`开头。

[match]: https://elixirschool.com/en/lessons/basics/pattern_matching/
[operators]: https://hexdocs.pm/elixir/basic-types.html#basic-arithmetic
[modules]: https://elixirschool.com/en/lessons/basics/modules/#modules
[functions]: https://elixirschool.com/en/lessons/basics/functions/#named-functions
[def]: https://hexdocs.pm/elixir/Kernel.html#def/2
[defp]: https://hexdocs.pm/elixir/Kernel.html#defp/2
[defmodule]: https://hexdocs.pm/elixir/Kernel.html#defmodule/2
[string]: https://hexdocs.pm/elixir/basic-types.html#strings
[docs]: https://hexdocs.pm/elixir/Kernel.html#content
