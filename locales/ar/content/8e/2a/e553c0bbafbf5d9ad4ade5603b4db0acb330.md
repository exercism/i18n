# تلميحات

## 3. عرّف ثوابت الإيموجي لتمثّل نسخًا من `Clock`

يمكنك برمجيًا تحويل الإيموجي إلى سلاسل نصية، ومنها إلى Symbols، باستخدام `using REPL.REPLCompletions: emoji_symbols`:

```julia-repl
julia> emoji_symbols["\\:clock12:"]
"🕛"
```

```julia-repl
julia> Symbol(emoji_symbols["\\:clock12:"])
:🕛
```
