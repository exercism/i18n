# 介绍

## Access Behaviour

Elixir 用代码中的_Behaviour_来提供通用的接口，同时让实现它的每个模块都能有自己的具体实现。其中常见的例子就是 _Access Behaviour_。

_Access Behaviour_为从基于键的数据结构中取值提供了一套通用的接口。映射和关键字列表都实现了 _Access Behaviour_，不过我们先看看它在映射上的用法，找找感觉。_Access Behaviour_规定，当你有一个映射时，可以在它后面加上_方括号_，然后用键取出与该键关联的值。

```elixir
# Suppose we have these two maps defined (note the difference in the key type)
my_map = %{key: "my value"}
your_map = %{"key" => "your value"}

# Obtain the value using the Access Behaviour
my_map[:key] == "my value"
your_map[:key] == nil
your_map["key"] == "your value"
```

如果数据结构中不存在这个键，就会返回 `nil`。这可能会导致意料之外的行为，因为它不会抛出错误。注意，`nil`本身就实现了 Access Behaviour，对任何键都返回 `nil`。
