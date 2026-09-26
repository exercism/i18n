# はじめに

「統計学」は、多くの側面を持つ、大きく複雑な分野です。

その一部は、[`Randomness`][randomness]の概念でも触れました。これは別の、しかし関連する分野です。

最も単純には、統計学は、反復可能なデータの集まりを1つの値にまとめる方法を扱うことがあります。
Juliaを始めたばかりの人は、言語にデフォルトで組み込まれている関数がどれほど少ないかに驚くかもしれません。

- [`sum`][sum]は、数値を合計します。
- [`min`][min]と[`max`][max]は、与えられた引数のうちの極値を取得します。
- [`extrema`][extrema]は、反復可能なものの (min, max) タプルを取得します。
- [`length`][length]は、すべての値を数えます。
- [`count`][count]は、ある条件を満たす値だけを数えます。

```julia-repl
julia> v = collect(1:0.2:3)
11-element Vector{Float64}:
 1.0
 1.2
 ... # display truncated
 3.0

julia> mean(v)
2.0

julia> extrema(v)
(1.0, 3.0)

julia> length(v)
11

julia> min('g', 'a', 'c')
'a': ASCII/Unicode U+0061 (category Ll: Letter, lowercase)

julia> count(isodd, 1:5)  # 1, 3, and 5 are odd
3
```

この限られた関数のセットは、他の関数を次々と別のモジュールやパッケージへ移すことで、Julia本体の肥大化を最小限に抑えるための、意図的な決定です。

## `Statistics`モジュール

標準ライブラリの一部なので、[`Statistics`][statistics]はすでにインストールされている可能性が高く、プログラムの先頭に`using Statistics`を追加するだけで、名前空間に読み込むことができます。

このモジュールには、よく使われる関数の次の段階が含まれており、プログラマーの一部に広く使われていることでしょう。

`Statistics`の関数の多くは、この分野についてのある程度の予備知識を前提としています。
最も単純な例は次のとおりです。

- [`mean`][mean]は、多くの人が平均と呼ぶもの（`sum / length`と同じ結果になります）。
- [`median`][median]は、並べ替えたあとの中央の値です。
- [`std`][std]は、[標準偏差][stddev]で、値がどれだけ広く散らばっているかの度合いです。
- [`var`][var]は、分散で、`std`の2乗であり、一般に計算が速いです。

各関数にはさまざまなオプションがある傾向があり、_さらに多くの_関数があります。興味があれば、[ドキュメント][statistics]を確認してください。

## その他のパッケージ

ご想像のとおり、統計はJuliaの大きな用途であり、より専門的な作業を支えるパッケージが数多くあります。

JuliaStatsグループが、役立つ[オンラインリスト][juliastats]を管理しています。

[statistics]: https://docs.julialang.org/en/v1/stdlib/Statistics/
[randomness]: https://exercism.org/tracks/julia/concepts/randomness
[sum]: https://docs.julialang.org/en/v1/base/collections/#Base.sum
[min]: https://docs.julialang.org/en/v1/base/math/#Base.min
[max]: https://docs.julialang.org/en/v1/base/math/#Base.max
[extrema]: https://docs.julialang.org/en/v1/base/collections/#Base.extrema
[length]: https://docs.julialang.org/en/v1/base/collections/#Base.length
[count]: https://docs.julialang.org/en/v1/base/collections/#Base.count
[mean]: https://docs.julialang.org/en/v1/stdlib/Statistics/#Statistics.mean
[median]: https://docs.julialang.org/en/v1/stdlib/Statistics/#Statistics.median
[std]: https://docs.julialang.org/en/v1/stdlib/Statistics/#Statistics.std
[var]: https://docs.julialang.org/en/v1/stdlib/Statistics/#Statistics.var
[stddev]: https://en.wikipedia.org/wiki/Standard_deviation
[juliastats]: https://juliapackages.com/u/juliastats
