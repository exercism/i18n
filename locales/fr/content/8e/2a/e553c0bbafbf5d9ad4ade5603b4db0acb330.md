# Indices

## 3. Définis des constantes emoji pour représenter des instances de `Clock`

Tu peux convertir des emoji en _strings_, et donc en Symbol, par programmation, avec `using REPL.REPLCompletions: emoji_symbols` :

```julia-repl
julia> emoji_symbols["\\:clock12:"]
"🕛"
```

```julia-repl
julia> Symbol(emoji_symbols["\\:clock12:"])
:🕛
```
