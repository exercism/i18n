# Tippek

## 3. Emoji konstansok definiálása a `Clock` példányainak reprezentálására

Az emojikat programozottan is átalakíthatod stringgé, és így Symbol-okká, a `using REPL.REPLCompletions: emoji_symbols` utasítással:

```julia-repl
julia> emoji_symbols["\\:clock12:"]
"🕛"
```

```julia-repl
julia> Symbol(emoji_symbols["\\:clock12:"])
:🕛
```
