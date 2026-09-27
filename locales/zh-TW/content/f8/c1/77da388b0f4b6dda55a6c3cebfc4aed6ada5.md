# 說明

你隸屬於一個對抗企業間諜活動的專案小組。你在 Shady Company X 有一名秘密線人，你懷疑這家公司竊取競爭對手的機密。

你的線人特務 Ex 是一位 Elixir 開發者。她把秘密訊息編碼在自己的程式碼裡。

要解碼她的秘密訊息：

- 依照定義順序，取出所有函式（公開與私有）。
- 對每個函式，從它的名稱取出前`n`個字元，其中`n`是該函式的參數個數。

## 1. 將程式碼轉換成資料

實作`TopSecret.to_ast/1`函式。它應該接受一個含有 Elixir 程式碼的字串，並回傳它的 AST。

```elixir
TopSecret.to_ast("div(4, 3)")
# => {:div, [line: 1], [4, 3]}
```

## 2. 解析單一 AST 節點

實作`TopSecret.decode_secret_message_part/2`函式。它應該接受一個 AST 節點，以及秘密訊息的累加器（一個陣列）。它應該回傳一個元組，第一個元素是未經修改的 AST 節點，第二個元素是累加器。

如果 AST 節點的操作是定義函式（`def`或`defp`），就把函式名稱（轉成字串）加到累加器的最前面。如果操作是其他東西，就回傳未經修改的累加器。

```elixir
ast_node = TopSecret.to_ast("defp cat(a, b, c), do: nil")
TopSecret.decode_secret_message_part(ast_node, ["day"])
# => {ast_node, ["cat", "day"]}

ast_node = TopSecret.to_ast("10 + 3")
TopSecret.decode_secret_message_part(ast_node, ["day"])
# => {ast_node, ["day"]}
```

這個函式不需要進行任何遞迴呼叫來檢查整棵 AST，只需要檢查給定的節點。我們會在最後一個步驟用內建工具走訪整棵 AST。

## 3. 從函式定義解碼秘密訊息片段

擴充`TopSecret.decode_secret_message_part/2`函式。如果 AST 節點中的操作是定義函式，不要回傳整個函式名稱，而是要檢查函式的參數個數，然後只回傳名稱的前`n`個字元，其中`n`是參數個數。

```elixir
ast_node = TopSecret.to_ast("defp cat(a, b), do: nil")
TopSecret.decode_secret_message_part(ast_node, ["day"])
# => {ast_node, ["ca", "day"]}

ast_node = TopSecret.to_ast("defp cat(), do: nil")
TopSecret.decode_secret_message_part(ast_node, ["day"])
# => {ast_node, ["", "day"]}
```

## 4. 修正帶有守衛的函式解碼

擴充`TopSecret.decode_secret_message_part/2`函式。針對使用守衛的函式定義，確保能正確偵測出函式名稱與參數個數。

```elixir
ast_node = TopSecret.to_ast("defp cat(a, b) when is_nil(a), do: nil")
TopSecret.decode_secret_message_part(ast_node, ["day"])
# => {ast_node, ["ca", "day"]}
```

## 5. 解碼完整的秘密訊息

實作`TopSecret.decode_secret_message/1`函式。它應該接受一個含有 Elixir 程式碼的字串，並回傳從程式碼中所有函式定義解碼出來的秘密訊息字串。務必重複使用前面步驟定義的函式。

```elixir
code = """
defmodule MyCalendar do
  def busy?(date, time) do
    Date.day_of_week(date) != 7 and
      time.hour in 10..16
  end

  def yesterday?(date) do
    Date.diff(Date.utc_today, date)
  end
end
"""

TopSecret.decode_secret_message(code)
# => "buy"
```
