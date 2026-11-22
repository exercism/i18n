# 簡介

`jq`程式在處理值時如果遇到問題，例如用字串去索引數字、解析無效的 JSON 文字，或呼叫函式時傳入型別錯誤的引數，就會拋出**執行期錯誤**。
執行期錯誤若沒有被捕捉，`jq`會把訊息印到_標準錯誤_，並以狀態`5`結束。

## 拋出錯誤：`error` 與 `error(message)`

- `error` 會拋出錯誤，錯誤值就是**輸入**值。
- `error(message)` 會拋出錯誤，錯誤值是 `message` 的結果。

錯誤值可以是_任何_ JSON 值，不限於字串。

```jq
42 | error("invalid value: \(.)")
# => "invalid value: 42"

42 | error
(not a string): 42
```

## 捕捉錯誤：`try` 與 `catch`

錯誤可以用 `try EXP catch HANDLER` 捕捉。
第一個運算式會先執行；如果它拋出錯誤，就會**以錯誤值作為輸入**執行 `HANDLER` 運算式。
`try catch` 的輸出，就是最後實際執行的那個運算式（`EXP` 或 `HANDLER`）的輸出。

```jq
{a: 42} | try .a catch "no index a in \(.)"
# => 42

true | try .a catch "cannot index a \(type)"
# => "cannot index a boolean"

true | try error("some exception") catch .
# => "some exception"
```

較短的寫法 `try EXP` 等於 `try EXP catch empty`：錯誤會被捨棄，不會產生任何輸出。

```jq
[{}, true, {"a": 1}] | [.[] | try .a]
# => [null, 1]
```

## 抑制錯誤：`?` 運算子

`?` 運算子寫成 `EXP?` 時，是 `try EXP` 的簡寫。它會把失敗的運算式變成單純不產生任何輸出的運算式。

```jq
["1", "invalid", "3", 4] | [.[] | tonumber?]
# => [1, 3, 4]
```

它經常接在索引運算子後面，例如 `.foo?` 和 `.[]?`。

## 中止程式：`halt_error` 與 `halt`

`halt_error` 會停止程式，把它的輸入以原始文字印到_標準錯誤_，並以指定的狀態結束，預設為`5`。
相關的 `halt` 則會無聲地停止程式，結束狀態為`0`。

```jq
"Error: something went wrong" | halt_error(1)
```
