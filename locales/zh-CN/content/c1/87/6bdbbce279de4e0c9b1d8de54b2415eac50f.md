# 简介

Elixir 中的字符串用双引号界定，并采用 UTF-8 编码：

```elixir
"Hi!"
```

字符串可以用`<>/2`运算符拼接：

```elixir
"Welcome to" <> " " <> "New York"
# => "Welcome to New York"
```

Elixir 中的字符串支持使用`#{}`语法进行插值：

```elixir
"6 * 7 = #{6 * 7}"
# => "6 * 7 = 42"
```

要在字符串中加入换行符，请使用`\n`转义序列：

```elixir
"1\n2\n3\n"
```

要轻松处理包含大量换行的文本，可以改用三引号 heredoc 语法：

```elixir
"""
1
2
3
"""
```

Elixir 在`String`模块中提供了许多处理字符串的函数。
