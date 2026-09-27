# 簡介

Protocol 是 Elixir 中用來實現多型的一種機制，讓行為可以隨資料型態不同而有所變化。

Protocol 使用`defprotocol`定義，裡面會包含一或多個函式標頭。

```elixir
defprotocol Reversible do
  def reverse(term)
end
```

Protocol 可以用`defimpl`來實作。

```elixir
defimpl Reversible, for: List do
  def reverse(term) do
    Enum.reverse(term)
  end
end
```

Protocol 可以為任何現有的 Elixir 資料型態或 struct 實作。

呼叫 Protocol 的函式時，會根據第一個引數的型態，自動選擇合適的實作。
