# Υποδείξεις

## 3. Όρισε σταθερές emoji για να αναπαραστήσεις στιγμιότυπα του `Clock`

Μπορείς να μετατρέψεις emoji σε συμβολοσειρές, άρα και σε Symbols, προγραμματιστικά, γράφοντας `using REPL.REPLCompletions: emoji_symbols`:

```julia-repl
julia> emoji_symbols["\\:clock12:"]
"🕛"
```

```julia-repl
julia> Symbol(emoji_symbols["\\:clock12:"])
:🕛
```
