# 提示

## 3. 定义 emoji 常量来表示 `Clock` 的实例

你可以通过 `using REPL.REPLCompletions: emoji_symbols` 以编程方式把 emoji 转换成字符串，进而转换成 Symbol：

```julia-repl
julia> emoji_symbols["\\:clock12:"]
"🕛"
```

```julia-repl
julia> Symbol(emoji_symbols["\\:clock12:"])
:🕛
```
