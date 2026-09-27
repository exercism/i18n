# 簡介

代數資料型態（ADT）代表固定數量的具名案例。
ADT 的每個值都恰好對應到其中一個具名案例。

ADT 使用`data`關鍵字定義，案例之間以管線（`|`）字元分隔。
如果所有案例都沒有關聯的資料，這種 ADT 就類似於其他語言通常所稱的_列舉_（或 _enum_）。

```haskell
data Season
  = Spring
  | Summer
  | Autumn
  | Winter
```

ADT 的每個案例都可以選擇性地關聯資料，而且不同的案例可以關聯不同型態的資料。當案例有相關聯的資料時，就必須提供建構子。

```haskell
data Number
  = NInt Int      --'NInt' is the constructor for an Int Number.
  | NFloat Float  --'NFloat' is the constructor for an Float Number.
  | Invalid       --'Invalid' does not have data associated to it.
```

要建立某個特定案例的值，可以透過引用它的名稱來完成（例如`NInt 22`）。
由於案例名稱本身就是建構子函式，關聯的資料可以像一般的函式引數一樣傳入。

ADT 具有_結構相等_，意思是同一個案例、且帶有相同（選用）資料的兩個值，彼此等價。

雖然可以用`if/else`運算式來處理 ADT，但建議的做法是使用 _case_ 敘述來進行模式比對：

```haskell
add1 :: Number -> String
add1 number =
    case number of
      NInt    i -> show (i + 1)
      NFloat  f -> show (f + 1.0)
      Invalid   -> error "Invalid input"
```
