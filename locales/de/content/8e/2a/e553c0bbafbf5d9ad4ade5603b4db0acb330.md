# Hinweise

## 3. Definiere Emoji-Konstanten, die Instanzen von `Clock` repräsentieren

Du kannst Emojis programmatisch in Strings und damit in Symbols umwandeln, indem du `using REPL.REPLCompletions: emoji_symbols` verwendest:

```julia-repl
julia> emoji_symbols["\\:clock12:"]
"🕛"
```

```julia-repl
julia> Symbol(emoji_symbols["\\:clock12:"])
:🕛
```
