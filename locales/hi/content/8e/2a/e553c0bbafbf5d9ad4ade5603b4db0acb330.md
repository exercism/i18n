# संकेत

## 3. `Clock` के इंस्टेंस दर्शाने के लिए इमोजी कॉन्स्टेंट बनाइए

`using REPL.REPLCompletions: emoji_symbols` इस्तेमाल करके आप इमोजी को स्ट्रिंग में, और इस तरह सिंबल में, बदल सकते हैं:

```julia-repl
julia> emoji_symbols["\\:clock12:"]
"🕛"
```

```julia-repl
julia> Symbol(emoji_symbols["\\:clock12:"])
:🕛
```
