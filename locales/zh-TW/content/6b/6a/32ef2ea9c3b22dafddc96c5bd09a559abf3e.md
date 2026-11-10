# 指令

某個研究機構注意到，旗下有些初階研究人員在分析時採用了不盡理想的方法。
其中一個做法，就是在做後續計算之前，直接把離散機率轉換成浮點數（也就是實數）。

資深研究人員偏好使用有理數來計算，因為這樣可能得到更高的精確度；他們也想確認初階研究人員的不良做法是否影響了研究結果。

這些研究分成兩種類型：
- 執行了多次測試，每次都會得到一個離散的成功機率，接著再計算這些機率的平均值。
- 測試了許多獨立事件，並將它們相乘，藉此算出所有事件同時發生的總機率。

資深研究人員請你撰寫一些函式，幫助他們判斷使用浮點數所做的分析是否出現捨入誤差；如果確實有誤差，也請你提供結果的精確有理數。

## 1. 提供成功次數與試驗次數的比值

`rationalize(successes, trials)`函式接收兩個陣列，`successes`和`trials`。
對索引`i`來說，`successes[i]`對應的是在`trials[i]`次試驗中成功的次數。
這個函式會回傳一個有理數陣列，代表成功次數除以試驗次數，順序與輸入陣列相同。

```julia-repl
julia> rationalize([1, 2, 3], [4, 5, 6])
3-element Vector{Rational{Int64}}:
 1//4
 2//5
 1//2
```

## 2. 求出成功次數與試驗次數對應的實際機率

同樣地，`probabilities(successes, trials)`函式接收兩個陣列，`successes`和`trials`。
它會回傳一個浮點數陣列，代表成功次數除以試驗次數，順序與輸入陣列相同。

```julia-repl
julia> probabilities([1, 2, 3], [4, 5, 6])
3-element Vector{Float64}:
 0.25
 0.4
 0.5
```

## 3. 檢查機率的平均值

`checkmean(successes, trials)`接收兩個陣列，`successes`和`trials`。
它會比較實際機率的平均值與有理數機率的平均值。
- 如果兩者相等，`checkmean`會回傳`true`。
- 如果兩者不同，`checkmean`會回傳有理數機率。

```julia-repl
julia> successes, trials = [9, 4, 7, 8, 6], [22, 22, 11, 17, 12];
julia> checkmean(successes, trials)
true

julia> successes, trials = [6, 5, 9, 8, 9], [21, 19, 13, 25, 22];
julia> checkmean(successes, trials)
1873629//4754750
```

## 4. 檢查獨立事件的機率

`checkprob(successes, trials)`接收兩個陣列，`successes`和`trials`。
它會比較浮點數機率的總機率與有理數機率的總機率。
- 如果兩者相等，`checkprob`會回傳`true`。
- 如果兩者不同，`checkprob`會回傳有理數機率。

```julia-repl
julia> successes, trials = [2, 9, 4, 4, 5], [15, 11, 17, 19, 15];
julia> checkprob(successes, trials)
true

julia> successes, trials = [9, 8, 5, 4, 3], [22, 14, 19, 25, 18];
julia> checkprob(sucesses, trials)
12//7315
```
