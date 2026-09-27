# ইঙ্গিত

## 3. `Clock`-এর ইনস্ট্যান্স বোঝাতে ইমোজি কনস্ট্যান্ট ডিফাইন করুন

আপনি `using REPL.REPLCompletions: emoji_symbols` দিয়ে প্রোগ্রামের মাধ্যমেই ইমোজিকে স্ট্রিংয়ে, আর তা থেকে Symbol-এ রূপান্তর করতে পারেন:

```julia-repl
julia> emoji_symbols["\\:clock12:"]
"🕛"
```

```julia-repl
julia> Symbol(emoji_symbols["\\:clock12:"])
:🕛
```
