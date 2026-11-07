# 關於

二進位數字最終直接對應到你 CPU 或 RAM 中的電晶體，以及每一個是「開啟」還是「關閉」。

低階操作，俗稱「位元操作」，在系統程式語言中特別重要。

像 Julia 這類高階語言通常會把這些細節大部分抽象掉。
不過，基礎語言本身就[提供][bitwise]了一整套位元層級的操作。

***注意：*** 若想在 REPL 中看到人類可讀的二進位輸出，下面幾乎所有範例都需要用 [`bitstring()`][bitstring] 函式包起來。
這在視覺上很干擾，所以大部分出現這個函式的地方都已經被刪掉了。

## 位移運算

整數型別，無論是有號還是無號，都可以表示成一串 1 和 0。

```julia-repl
julia> bitstring(UInt8(5))
"00000101"
```

位移就是把所有的位元往左或往右移動指定的位置數。
使用 `UInt` 型別時，有些位元會從一端掉出去，另一端則補上零：

```julia-repl
julia> ux::UInt8 = 5
5

julia> bitstring(ux)
"00000101"

julia> ux << 2 # left by 2
"00010100"

julia> ux >> 1 # right by 1
"00000010"
```

每次左移都會讓值加倍，每次右移則會讓它減半（會受到截斷的影響）。
用十進位表示會更明顯：

```julia-repl
julia> 3 << 2
12

julia> 24 >> 3
3
```

這種位移比「正規」的算術快得多，因此這個技巧在低階程式設計中非常受歡迎。

對於有號整數，我們得再小心一點。

左移相對簡單：

```julia-repl
julia> sx = Int8(5)
5

julia> sx # positive integer
"00000101"

julia> sx << 2
"00010100"

julia> -sx # negative integer
"11111011"

julia> -sx << 2
"11101100"
```

因此，對正的有號整數做左移，和對無號整數做左移是一樣的。

負值是以[二補數][2complement]的形式儲存，這表示最左邊的位元是 1。
左移沒問題，但右移時，最左邊的位元要怎麼補呢？

```julia-repl
julia> sx >> 2 # simple for positive values!
"00000001"

julia> -sx # negative integer
"11111011"

julia> -sx >> 2 # pad with repeated sign bit
"11111110"

julia> -sx >>> 2 # pad with 0
"00111110"
```

`>>` 運算子執行的是[算術移位][arithmetic]，會保留符號位元。

`>>>` 運算子執行的是[邏輯移位][logical]，會補上零，就好像這個數字是無號的一樣。

如果這樣還是讓你覺得不完整，另外還有 [`bitrotate()`][bitrotate] 函式。

## 位元邏輯

我們在先前的概念中看過，運算子 `&&`（and）、`||`（or）和 `!`（not）是用在布林值上的。

有對應的運算子 `&`（位元 AND）、`|`（位元 OR）和 `~`（波浪號，位元 NOT），可以用來比較兩個整數中的位元。

```julia-repl
julia> 0b1011 & 0b0010 # bit is 1 in both numbers
"00000010"

julia> 0b1011 | 0b0010 # bit is 1 in at least one number
"00001011"

julia> ~0b1011 # flip all bits
"11110100"

julia> xor(0b1011, 0b0010) # bit is 1 in exactly one number, not both
"00001001"
```

這裡的 `xor()` 是[互斥或][xor]，以函式的形式使用（另一種寫法請見下文）。

順帶一提，`&` 和 `|` 運算子也可以用在布林值上。
和 `&&` 與 `||` 不同的是，這時運算式的每個部分都會被求值：不會有短路的情況。


## 其他符號

Julia 熱愛數學，而數學家熱愛神祕的符號，所以我們還有更多符號可以玩。

```julia-repl
julia> 0b1011 ⊻ 0b0010 # xor() in infix notation
"00001001"

julia> 0b1011 ⊼ 0b0010 # not and
"11111101"

julia> 0b1011 ⊽ 0b0010 # not or
"11110100"
```

在看得懂 Julia 的編輯器裡，這些符號分別輸入 `\xor`、`\nand` 和 `\nor`，再各按一次 tab 鍵。

這些符號並不出名，即使是學過大學數學的人也不太認識（這個概念的作者以前也從沒見過它們）。
如果你想用它們，可得小心挑選幫你審查程式碼的人！


[bitwise]: https://docs.julialang.org/en/v1/manual/mathematical-operations/#Bitwise-Operators
[bitstring]: https://docs.julialang.org/en/v1/base/numbers/#Base.bitstring
[xor]: https://en.wikipedia.org/wiki/Exclusive_or
[2complement]: https://en.wikipedia.org/wiki/Two%27s_complement
[arithmetic]: https://en.wikipedia.org/wiki/Arithmetic_shift
[logical]: https://en.wikipedia.org/wiki/Logical_shift
[bitrotate]: https://docs.julialang.org/en/v1/base/math/#Base.bitrotate
