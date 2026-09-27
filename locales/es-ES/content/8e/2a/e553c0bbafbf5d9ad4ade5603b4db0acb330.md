# Pistas

## 3. Define las constantes de emoji que representan instancias de `Clock`

Puedes convertir emoji en strings, y por tanto en Symbols, de forma programática con `using REPL.REPLCompletions: emoji_symbols`:

```julia-repl
julia> emoji_symbols["\\:clock12:"]
"🕛"
```

```julia-repl
julia> Symbol(emoji_symbols["\\:clock12:"])
:🕛
```
