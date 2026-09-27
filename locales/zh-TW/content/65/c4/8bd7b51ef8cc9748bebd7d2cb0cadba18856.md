# 簡介

## Access 行為

Elixir 使用 _行為_ 這種程式碼機制來提供通用介面，並讓每個實作該行為的模組能有各自的特定實作。其中一個常見例子就是 _Access 行為_。

_Access 行為_ 提供一個通用介面，可從以鍵為基礎的資料結構中取出資料。_Access 行為_ 已為 map 和關鍵字清單實作，但我們先來看看它在 map 上的用法，感受一下。_Access 行為_ 規定：當你有一個 map 時，可以在後面加上 _方括號_，然後用鍵取出與該鍵相關的值。

```elixir
# Suppose we have these two maps defined (note the difference in the key type)
my_map = %{key: "my value"}
your_map = %{"key" => "your value"}

# Obtain the value using the Access Behaviour
my_map[:key] == "my value"
your_map[:key] == nil
your_map["key"] == "your value"
```

如果資料結構中沒有這個鍵，就會回傳`nil`。這可能導致非預期的行為，因為它不會引發錯誤。請注意，`nil`本身也實作了 Access 行為，而且對任何鍵都會回傳`nil`。
