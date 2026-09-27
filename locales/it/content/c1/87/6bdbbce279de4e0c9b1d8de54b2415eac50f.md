# Introduzione

Le stringhe in Elixir sono delimitate da virgolette doppie e sono codificate in UTF-8:

```elixir
"Hi!"
```

Le stringhe si possono concatenare usando l'operatore `<>/2`:

```elixir
"Welcome to" <> " " <> "New York"
# => "Welcome to New York"
```

Le stringhe in Elixir supportano l'interpolazione con la sintassi `#{}`:

```elixir
"6 * 7 = #{6 * 7}"
# => "6 * 7 = 42"
```

Per inserire un carattere di nuova riga in una stringa, usa il codice di escape `\n`:

```elixir
"1\n2\n3\n"
```

Per lavorare comodamente con testi che contengono molte nuove righe, usa invece la sintassi heredoc con tre virgolette doppie:

```elixir
"""
1
2
3
"""
```

Elixir mette a disposizione molte funzioni per lavorare con le stringhe nel modulo `String`.
