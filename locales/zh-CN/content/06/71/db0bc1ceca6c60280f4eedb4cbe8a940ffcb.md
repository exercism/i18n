# 关于

二进制位最终直接对应着 CPU 或 RAM 里的晶体管，以及每个晶体管处于“开”还是“关”的状态。

底层操作（俗称“摆弄比特”）在系统级语言中尤其重要。

像 Julia 这样的高级语言通常会把这些细节大部分抽象掉。
不过，基础语言里有一整套位级运算[可用][bitwise]。

***注意：*** 要在 REPL 中看到人类可读的二进制输出，下面几乎所有示例都需要用[`bitstring()`][bitstring]函数包起来。
这在视觉上很分散注意力，因此这个函数在大多数地方都被省略了。

## 位移运算

整数类型，无论有符号还是无符号，都可以表示为一串 1 和 0。

```julia-repl
julia> bitstring(UInt8(5))
"00000101"
```

位移只是把所有内容向左或向右移动指定的位数。
对于 `UInt` 类型，一些位会从一端掉出去，另一端则补零：

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

每次左移都会让值翻倍，每次右移都会让它减半（可能会截断）。
这在十进制表示下更明显：

```julia-repl
julia> 3 << 2
12

julia> 24 >> 3
3
```

这种位移比“正规”的算术运算快得多，因此这项技术在底层编程中非常流行。

对于有符号整数，我们需要更小心一些。

左移相对简单：

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

因此，左移正的有符号整数与无符号整数完全相同。

负值以[补码][2complement]形式存储，这意味着最左边的位是 1。
左移没有问题，但右移时，最左边的位该如何填充呢？

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

`>>`运算符执行[算术移位][arithmetic]，保留符号位。

`>>>`运算符执行[逻辑移位][logical]，像无符号数那样补零。

如果还觉得不够，还有一个[`bitrotate()`][bitrotate]函数。

## 按位逻辑

我们在之前的一个概念中看到，运算符 `&&`（与）、`||`（或）和 `!`（非）用于布尔值。

还有对应的运算符 `&`（按位与）、`|`（按位或）和 `~`（波浪号，按位非），用来比较两个整数中的各个位。

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

这里的 `xor()` 是[异或][xor]，以函数形式使用（另一种写法见下文）。

顺便说一句，`&` 和 `|` 运算符也可以用于布尔值。
与 `&&` 和 `||` 不同，这时表达式的所有部分都会被求值：不会短路。


## 其他符号

Julia 热爱数学，而数学家喜欢神秘的符号，所以我们还有更多符号可以玩。

```julia-repl
julia> 0b1011 ⊻ 0b0010 # xor() in infix notation
"00001001"

julia> 0b1011 ⊼ 0b0010 # not and
"11111101"

julia> 0b1011 ⊽ 0b0010 # not or
"11110100"
```

在能识别 Julia 的编辑器中，分别输入 `\xor`、`\nand` 和 `\nor`，再按 Tab 键即可。

这些符号并不广为人知，即使是在学过大学数学的人当中也是如此（本概念的作者此前也从未见过它们）。
如果你想使用它们，请小心选择请谁来审查你的代码！


[bitwise]: https://docs.julialang.org/en/v1/manual/mathematical-operations/#Bitwise-Operators
[bitstring]: https://docs.julialang.org/en/v1/base/numbers/#Base.bitstring
[xor]: https://en.wikipedia.org/wiki/Exclusive_or
[2complement]: https://en.wikipedia.org/wiki/Two%27s_complement
[arithmetic]: https://en.wikipedia.org/wiki/Arithmetic_shift
[logical]: https://en.wikipedia.org/wiki/Logical_shift
[bitrotate]: https://docs.julialang.org/en/v1/base/math/#Base.bitrotate
