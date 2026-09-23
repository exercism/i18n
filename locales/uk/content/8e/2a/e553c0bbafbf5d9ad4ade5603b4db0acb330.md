# Підказки

## 3. Визначте константи-емодзі для представлення екземплярів `Clock`

Можна програмно перетворювати емодзі на рядки, а отже, й на Symbol, за допомогою `using REPL.REPLCompletions: emoji_symbols`:

```julia-repl
julia> emoji_symbols["\\:clock12:"]
"🕛"
```

```julia-repl
julia> Symbol(emoji_symbols["\\:clock12:"])
:🕛
```
