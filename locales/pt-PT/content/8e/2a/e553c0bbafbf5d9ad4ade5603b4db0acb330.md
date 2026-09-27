# Dicas

## 3. Define constantes de emoji para representar instâncias de `Clock`

Podes converter emojis em strings e, assim, em Symbols, de forma programática, com `using REPL.REPLCompletions: emoji_symbols`:

```julia-repl
julia> emoji_symbols["\\:clock12:"]
"🕛"
```

```julia-repl
julia> Symbol(emoji_symbols["\\:clock12:"])
:🕛
```
