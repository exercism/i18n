# Einführung

Zeichenketten in Elixir werden durch doppelte Anführungszeichen begrenzt und sind in UTF-8 kodiert:

```elixir
"Hi!"
```

Zeichenketten lassen sich mit dem Operator `<>/2` verketten:

```elixir
"Welcome to" <> " " <> "New York"
# => "Welcome to New York"
```

Zeichenketten in Elixir unterstützen Interpolation mit der Syntax `#{}`:

```elixir
"6 * 7 = #{6 * 7}"
# => "6 * 7 = 42"
```

Um ein Zeilenumbruchzeichen in eine Zeichenkette einzufügen, verwendest du die Escape-Sequenz `\n`:

```elixir
"1\n2\n3\n"
```

Um bequem mit Texten mit vielen Zeilenumbrüchen zu arbeiten, verwendest du stattdessen die Heredoc-Syntax mit drei doppelten Anführungszeichen:

```elixir
"""
1
2
3
"""
```

Elixir bietet viele Funktionen für die Arbeit mit Zeichenketten im Modul `String`.
