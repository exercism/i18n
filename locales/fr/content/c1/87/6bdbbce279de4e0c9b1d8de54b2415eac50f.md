# Introduction

Les _strings_ en Elixir sont délimitées par des guillemets doubles et sont encodées en UTF-8 :

```elixir
"Hi!"
```

Les _strings_ peuvent être concaténées avec l'opérateur `<>/2` :

```elixir
"Welcome to" <> " " <> "New York"
# => "Welcome to New York"
```

Les _strings_ en Elixir prennent en charge l'interpolation avec la syntaxe `#{}` :

```elixir
"6 * 7 = #{6 * 7}"
# => "6 * 7 = 42"
```

Pour insérer un caractère de retour à la ligne dans une _string_, utilise la séquence d'échappement `\n` :

```elixir
"1\n2\n3\n"
```

Pour travailler confortablement avec des textes comportant beaucoup de retours à la ligne, utilise plutôt la syntaxe _heredoc_ à triples guillemets doubles :

```elixir
"""
1
2
3
"""
```

Elixir fournit de nombreuses fonctions pour manipuler les _strings_ dans le module `String`.
