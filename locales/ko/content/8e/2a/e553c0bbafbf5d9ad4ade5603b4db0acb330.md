# 힌트

## 3. `Clock` 인스턴스를 나타내는 이모지 상수 정의하기

- `using REPL.REPLCompletions: emoji_symbols` 구문을 사용하면 이모지를 문자열로, 나아가 Symbol로 프로그래밍 방식으로 변환할 수 있어요:

```julia-repl
julia> emoji_symbols["\\:clock12:"]
"🕛"
```

```julia-repl
julia> Symbol(emoji_symbols["\\:clock12:"])
:🕛
```
