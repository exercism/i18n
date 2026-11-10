# 指示

ある研究機関は、一部の若手研究者が分析で最適とは言えない手法を使っていることに気づきました。
その手法のひとつが、さらなる計算を行う前に離散確率をすぐに浮動小数点数（つまり実数）へ変換してしまうことです。

ベテランの研究者たちは、より高い精度が得られる有理数を使って計算することを好んでおり、若手研究者のこうした良くない習慣が研究の結果に影響を与えていないか知りたがっています。

行われた研究には、次の2つの種類がありました。
- 多くのテストを実行し、それぞれが成功の離散確率を返したあと、それらの確率の平均を計算する。
- 多くの独立した事象を試し、すべての事象が起こる全体の確率を、それらを掛け合わせて計算する。

ベテランの研究者たちは、浮動小数点数を使ったことによる丸め誤差が分析にないか判断するための関数を書いてほしい、そして誤差がある場合にはその結果を正確な有理数で示してほしいと頼んでいます。

## 1. 成功数と試行数の比を求める

`rationalize(successes, trials)`関数は、`successes`と`trials`の2つの配列を受け取ります。
インデックス`i`について、`successes[i]`は、`trials[i]`回の試行のうちに起こった成功の数に対応します。
この関数は、試行数に対する成功数を表す有理数の配列を、入力の配列と同じ順序で返します。

```julia-repl
julia> rationalize([1, 2, 3], [4, 5, 6])
3-element Vector{Rational{Int64}}:
 1//4
 2//5
 1//2
```

## 2. 成功数と試行数から実数の確率を求める

同様に、`probabilities(successes, trials)`関数は、`successes`と`trials`の2つの配列を受け取ります。
試行数に対する成功数を表す浮動小数点数の配列を、入力の配列と同じ順序で返します。

```julia-repl
julia> probabilities([1, 2, 3], [4, 5, 6])
3-element Vector{Float64}:
 0.25
 0.4
 0.5
```

## 3. 確率の平均を調べる

`checkmean(successes, trials)`は、`successes`と`trials`の2つの配列を受け取ります。
実数の確率の平均と、有理数の確率の平均を比べます。
- 2つの確率が同じであれば、`checkmean`は`true`を返します。
- 2つの確率が異なれば、`checkmean`は有理数の確率を返します。

```julia-repl
julia> successes, trials = [9, 4, 7, 8, 6], [22, 22, 11, 17, 12];
julia> checkmean(successes, trials)
true

julia> successes, trials = [6, 5, 9, 8, 9], [21, 19, 13, 25, 22];
julia> checkmean(successes, trials)
1873629//4754750
```

## 4. 独立した確率を調べる

`checkprob(successes, trials)`は、`successes`と`trials`の2つの配列を受け取ります。
浮動小数点数の確率の全体の確率と、有理数の確率の全体の確率を比べます。
- 2つの確率が同じであれば、`checkprob`は`true`を返します。
- 2つの確率が異なれば、`checkprob`は有理数の確率を返します。

```julia-repl
julia> successes, trials = [2, 9, 4, 4, 5], [15, 11, 17, 19, 15];
julia> checkprob(successes, trials)
true

julia> successes, trials = [9, 8, 5, 4, 3], [22, 14, 19, 25, 18];
julia> checkprob(sucesses, trials)
12//7315
```
