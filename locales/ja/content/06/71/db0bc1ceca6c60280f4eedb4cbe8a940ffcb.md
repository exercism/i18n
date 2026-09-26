# 概要

2進数の各桁は、最終的にはCPUやRAMの中のトランジスター、そしてそれぞれが「オン」か「オフ」かという状態に直接対応しています。

低レベルな操作は、非公式には「bit-twiddling」と呼ばれ、システム言語では特に重要です。

Juliaのような高水準言語は、たいていこの詳細のほとんどを抽象化してくれます。しかし、ビットレベルの操作は、言語の基本機能として幅広く[利用できます][bitwise]。

***注意:*** REPLで人間が読める2進数の出力を見るには、以下のほとんどすべての例を[`bitstring()`][bitstring]関数で包む必要があります。これは見た目に煩わしいので、この関数のほとんどの出現箇所は省略してあります。

## ビットシフト演算

整数型は、符号付きでも符号なしでも、1と0の並びとして表すことができます。

```julia-repl
julia> bitstring(UInt8(5))
"00000101"
```

ビットシフトは、指定した位置の数だけ、すべてを左または右に動かすだけです。`UInt`型では、一端からいくつかのビットがはみ出して落ち、もう一端は0で埋められます。

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

左シフトするたびに値は2倍になり、右シフトするたびに半分になります（切り捨てを伴います）。これは10進数で表すとよりはっきりします。

```julia-repl
julia> 3 << 2
12

julia> 24 >> 3
3
```

このようなビットシフトは「通常の」算術よりもはるかに速く、そのためこのテクニックは低レベルなコードで非常に人気があります。

符号付き整数の場合、もう少し注意が必要です。

左シフトは比較的簡単です。

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

したがって、正の符号付き整数の左シフトは、符号なし整数の場合と同じです。

負の値は[2の補数][2complement]の形で格納され、最も左のビットは1になります。左シフトでは問題ありませんが、右シフトのとき、最も左のビットはどう埋めるのでしょうか？

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

`>>`演算子は[算術シフト][arithmetic]を行い、符号ビットを保持します。

`>>>`演算子は[論理シフト][logical]を行い、その数が符号なしであるかのように0で埋めます。

それでも物足りないなら、[`bitrotate()`][bitrotate]関数もあります。

## ビットごとの論理演算

前のコンセプトで、演算子`&&`（and）、`||`（or）、`!`（not）は真偽値に対して使われることを見ました。

2つの整数のビットを比較するための、同等の演算子`&`（ビットごとのand）、`|`（ビットごとのor）、`~`（チルダ、ビットごとのnot）があります。

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

ここで、`xor()`は[排他的論理和][xor]で、関数として使われます（別の記法については後述します）。

ちなみに、`&`と`|`の演算子は真偽値にも使えます。`&&`や`||`とは異なり、その場合は式のすべての部分が評価されます。短絡評価はありません。


## その他の記号

Juliaは数学を愛しており、数学者は難解な記号を愛しています。そのため、遊べる記号がさらにもっとあります。

```julia-repl
julia> 0b1011 ⊻ 0b0010 # xor() in infix notation
"00001001"

julia> 0b1011 ⊼ 0b0010 # not and
"11111101"

julia> 0b1011 ⊽ 0b0010 # not or
"11110100"
```

Juliaを理解するエディターでは、これらはそれぞれ`\xor`、`\nand`、`\nor`に続けてタブを押して入力します。

これらの記号は、大学で数学を履修した人々の間でもあまり知られていません（このコンセプトの著者も、以前は見たことがありませんでした）。これらを使いたい場合は、コードのレビューを誰に頼むか気をつけてください。


[bitwise]: https://docs.julialang.org/en/v1/manual/mathematical-operations/#Bitwise-Operators
[bitstring]: https://docs.julialang.org/en/v1/base/numbers/#Base.bitstring
[xor]: https://en.wikipedia.org/wiki/Exclusive_or
[2complement]: https://en.wikipedia.org/wiki/Two%27s_complement
[arithmetic]: https://en.wikipedia.org/wiki/Arithmetic_shift
[logical]: https://en.wikipedia.org/wiki/Logical_shift
[bitrotate]: https://docs.julialang.org/en/v1/base/math/#Base.bitrotate
