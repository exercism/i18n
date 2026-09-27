# 簡介

迴圈基本上分成兩種：

1. 迴圈直到條件成立為止。
2. 逐一走訪集合中的每個元素。

這兩種在 Julia 裡都做得到，不過第二種可能更常見。

## `while` 迴圈

對於事先無法確定要重複幾次的開放式問題，Julia 提供了`while`迴圈。

基本形式相當簡單：

```julia
while condition
    do_something()
end
```

在這種情況下，程式會一直繞著迴圈跑，直到`condition`不再是`true`為止。

有兩種方法可以提早離開迴圈：

- `break`會讓迴圈結束，程式接著從迴圈`end`之後的下一行繼續執行。
- `return x`會停止目前函式的執行，並把回傳值`x`交回給呼叫方。

有了這些選項，有時候很方便的做法是先用`while true ... end`建立一個「無限」迴圈，再靠著在迴圈主體裡找到停止條件來觸發`break`或`return`。

## 走訪集合

最簡單的例子就是走訪一個範圍。

如果我們想把某件事做 10 次：

```julia
for n in 1:10
    do_something(n)
end
```

如果目前的疊代不符合某個條件，可以用`continue`直接跳到下一次疊代：

```julia
for n in 1:10
    if is_useless(n)
        continue
    end
    
    # we decided this iteration could be useful
    do_something_slow(n)
end
```

寫得更精簡一點，`if`區塊也可以換成`is_useless(n) && continue`。

許多其他集合型別也能逐一走訪：陣列裡的元素、字串裡的字元、字典裡的鍵⋯⋯

到目前為止的例子都是走訪範圍`1:10`，其中的值同時也是迴圈索引。

更一般來說，我們需要的可能不只是值，還有索引。
這時會使用`eachindex()`函式，例如`for i in eachindex(my_array) ... end`。

## 推導式

在 Julia 裡，明確寫出迴圈的情形通常比許多傳統語言少，因為有很多更簡潔的寫法。

一個特別常見的情況，是需要從某個集合（向量、字串、集合⋯⋯可能性很多）的元素建立一個新的向量。

喜歡 Python 陣列推導式的人會很開心，因為 Julia 也能使用類似的語法。

它的精髓，就是在向量裡放進一個非常精簡的迴圈。

最簡單的語法長這樣：`result = [f(x) for x in some_collection]`。

如果用傳統迴圈來寫，可能會寫成：

```julia
result = []
for x in some_collection
    push!(result, f(x))
end
```

也可以在最後加上條件，只挑出集合中符合條件的元素：

```julia-repl
# multiples of 3
julia> [n^2 for n in 1:10 if n%3 == 0]
3-element Vector{Int64}:
  9
 36
 81
```
