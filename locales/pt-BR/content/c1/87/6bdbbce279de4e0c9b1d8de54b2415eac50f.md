# Introdução

Strings em Elixir são delimitadas por aspas duplas e são codificadas em UTF-8:

```elixir
"Hi!"
```

Strings podem ser concatenadas usando o operador `<>/2`:

```elixir
"Welcome to" <> " " <> "New York"
# => "Welcome to New York"
```

Strings em Elixir suportam interpolação usando a sintaxe `#{}`:

```elixir
"6 * 7 = #{6 * 7}"
# => "6 * 7 = 42"
```

Para colocar um caractere de nova linha em uma string, use o código de escape `\n`:

```elixir
"1\n2\n3\n"
```

Para trabalhar confortavelmente com textos com muitas quebras de linha, use a sintaxe heredoc de aspas triplas:

```elixir
"""
1
2
3
"""
```

Elixir fornece muitas funções para trabalhar com strings no módulo `String`.
