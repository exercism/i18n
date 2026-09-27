# راهنمایی‌ها

## 3. تعریف ثابت‌های ایموجی برای نمایش نمونه‌هایی از `Clock`

می‌توانید با `using REPL.REPLCompletions: emoji_symbols` ایموجی را به‌صورت برنامه‌ای به رشته‌ها و در نتیجه به `Symbol`ها تبدیل کنید:

```julia-repl
julia> emoji_symbols["\\:clock12:"]
"🕛"
```

```julia-repl
julia> Symbol(emoji_symbols["\\:clock12:"])
:🕛
```
