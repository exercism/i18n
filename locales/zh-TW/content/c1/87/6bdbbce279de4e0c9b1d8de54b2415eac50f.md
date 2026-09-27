# 簡介

Elixir 中的字串以雙引號界定，並且採用 UTF-8 編碼：

```elixir
"Hi!"
```

字串可以使用`<>/2`運算子串接：

```elixir
"Welcome to" <> " " <> "New York"
# => "Welcome to New York"
```

Elixir 中的字串支援使用`#{}`語法進行字串插值：

```elixir
"6 * 7 = #{6 * 7}"
# => "6 * 7 = 42"
```

若要在字串中放入換行字元，請使用`\n`跳脫序列：

```elixir
"1\n2\n3\n"
```

若想輕鬆處理含有大量換行字元的文字，請改用三個雙引號的 heredoc 語法：

```elixir
"""
1
2
3
"""
```

Elixir 在`String`模組中提供許多處理字串的函式。
