# Introducción

Los strings en Elixir se delimitan con comillas dobles y están codificados en UTF-8:

```elixir
"Hi!"
```

Los strings se pueden concatenar con el operador `<>/2`:

```elixir
"Welcome to" <> " " <> "New York"
# => "Welcome to New York"
```

Los strings en Elixir admiten interpolación con la sintaxis `#{}`:

```elixir
"6 * 7 = #{6 * 7}"
# => "6 * 7 = 42"
```

Para incluir un carácter de salto de línea en un string, usa el código de escape `\n`:

```elixir
"1\n2\n3\n"
```

Para trabajar cómodamente con textos que tienen muchos saltos de línea, usa mejor la sintaxis heredoc con comillas triples dobles:

```elixir
"""
1
2
3
"""
```

Elixir ofrece muchas funciones para trabajar con strings en el módulo `String`.
