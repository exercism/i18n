# Bevezetés

Az Elixirben a stringeket kettős idézőjelek határolják, és UTF-8-ban vannak kódolva:

```elixir
"Hi!"
```

A stringek a `<>/2` operátorral fűzhetők össze:

```elixir
"Welcome to" <> " " <> "New York"
# => "Welcome to New York"
```

Az Elixir stringjei támogatják az interpolációt a `#{}` szintaxissal:

```elixir
"6 * 7 = #{6 * 7}"
# => "6 * 7 = 42"
```

Ha sortörés karaktert szeretnél egy stringbe tenni, használd a `\n` escape-kódot:

```elixir
"1\n2\n3\n"
```

Ha sok sortörést tartalmazó szövegekkel szeretnél kényelmesen dolgozni, használd helyette a három dupla idézőjeles heredoc szintaxist:

```elixir
"""
1
2
3
"""
```

Az Elixir számos függvényt biztosít a stringekkel való munkához a `String` modulban.
