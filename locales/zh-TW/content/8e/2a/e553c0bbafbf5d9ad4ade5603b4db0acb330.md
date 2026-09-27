# 提示

## 3. 定義代表 `Clock` 實例的 emoji 常數

你可以用 `using REPL.REPLCompletions: emoji_symbols` 以程式化的方式把 emoji 轉成字串，進而轉成 Symbols：

```julia-repl
julia> emoji_symbols["\\:clock12:"]
"🕛"
```

```julia-repl
julia> Symbol(emoji_symbols["\\:clock12:"])
:🕛
```
