# Dicas

## 3. Defina constantes de emoji para representar instâncias de `Clock`

Você pode converter emojis em strings e, com isso, em Symbols, programaticamente com `using REPL.REPLCompletions: emoji_symbols`:

```julia-repl
julia> emoji_symbols["\\:clock12:"]
"🕛"
```

```julia-repl
julia> Symbol(emoji_symbols["\\:clock12:"])
:🕛
```
