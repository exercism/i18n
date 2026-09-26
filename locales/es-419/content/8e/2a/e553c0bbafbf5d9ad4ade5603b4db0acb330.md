# Pistas

## 3. Define constantes de emoji para representar instancias de `Clock`

Puedes convertir emoji a strings y, por lo tanto, a Symbols, de forma programática con `using REPL.REPLCompletions: emoji_symbols`:

```julia-repl
julia> emoji_symbols["\\:clock12:"]
"🕛"
```

```julia-repl
julia> Symbol(emoji_symbols["\\:clock12:"])
:🕛
```
