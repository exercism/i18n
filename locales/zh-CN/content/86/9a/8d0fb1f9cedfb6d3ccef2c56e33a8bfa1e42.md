# 简介

协议是 Elixir 中实现多态的一种机制，当你希望行为随数据类型的不同而变化时，就可以使用它。

协议使用`defprotocol`定义，并包含一个或多个函数头。

```elixir
defprotocol Reversible do
  def reverse(term)
end
```

协议可以使用`defimpl`实现。

```elixir
defimpl Reversible, for: List do
  def reverse(term) do
    Enum.reverse(term)
  end
end
```

协议可以为任何已有的 Elixir 数据类型或结构体实现。

调用协议函数时，会根据第一个参数的类型自动选择合适的实现。
