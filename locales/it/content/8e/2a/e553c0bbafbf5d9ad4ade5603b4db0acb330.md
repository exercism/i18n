# Suggerimenti

## 3. Definisci le costanti emoji per rappresentare istanze di `Clock`

Puoi convertire le emoji in stringhe, e quindi in Symbol, a livello di codice usando `using REPL.REPLCompletions: emoji_symbols`:

```julia-repl
julia> emoji_symbols["\\:clock12:"]
"🕛"
```

```julia-repl
julia> Symbol(emoji_symbols["\\:clock12:"])
:🕛
```
