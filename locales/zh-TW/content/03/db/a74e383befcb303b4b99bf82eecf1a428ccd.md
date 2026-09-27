# 簡介

當你對可列舉（陣列、位元字串、字串）進行[遞迴][exercism-recursion]時，通常會遇到兩個需要考量的問題：

- 儲存遞迴函式呼叫的軌跡需要多少記憶體
- 如何有效率地建構解法

為了處理這些問題，可以使用_累加器_。

累加器是一個會伴隨資料一起傳遞的變數。它用來把函式執行的目前狀態，從一次函式呼叫傳遞到下一次，直到抵達_基本情況_為止。在基本情況中，累加器用來回傳遞迴函式呼叫的最終值。

累加器應該由函式的作者初始化，而不是由函式的使用者初始化。為了做到這點，請宣告兩個函式：一個公開函式，只接受必要的資料作為引數，並初始化累加器；以及一個私有函式，它也接受累加器。在 Elixir 中，常見的模式是在私有函式名稱前加上 `do_`。

```elixir
# Count the length of a list without an accumulator
def count([]), do: 0
def count([_head | tail]), do: 1 + count(tail)

# Count the length of a list with an accumulator
def count(list), do: do_count(list, 0)

defp do_count([], count), do: count
defp do_count([_head | tail], count), do: do_count(tail, count + 1)
```

使用累加器讓我們能把遞迴函式轉變成_尾遞迴_函式。如果一個函式_最後_執行的事情是呼叫它自己，它就是尾遞迴。

[exercism-recursion]: https://exercism.org/tracks/elixir/concepts/recursion
