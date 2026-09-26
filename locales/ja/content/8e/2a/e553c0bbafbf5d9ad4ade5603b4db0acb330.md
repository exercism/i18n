# ヒント

## 3. `Clock`のインスタンスを表す絵文字の定数を定義する

`using REPL.REPLCompletions: emoji_symbols`とすると、絵文字をプログラムから文字列に、ひいてはSymbolに変換できます。

```julia-repl
julia> emoji_symbols["\\:clock12:"]
"🕛"
```

```julia-repl
julia> Symbol(emoji_symbols["\\:clock12:"])
:🕛
```
