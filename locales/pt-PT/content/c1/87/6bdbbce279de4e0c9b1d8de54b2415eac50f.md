# Introdução

As strings em Elixir são delimitadas por aspas duplas e estão codificadas em UTF-8:

```elixir
"Hi!"
```

As strings podem ser concatenadas com o operador `<>/2`:

```elixir
"Welcome to" <> " " <> "New York"
# => "Welcome to New York"
```

As strings em Elixir suportam interpolação com a sintaxe `#{}`:

```elixir
"6 * 7 = #{6 * 7}"
# => "6 * 7 = 42"
```

Para colocar um caráter de nova linha numa string, usa o código de escape `\n`:

```elixir
"1\n2\n3\n"
```

Para trabalhares confortavelmente com textos que têm muitos carateres de nova linha, usa antes a sintaxe heredoc com aspas triplas:

```elixir
"""
1
2
3
"""
```

O Elixir disponibiliza muitas funções para trabalhar com strings no módulo `String`.
