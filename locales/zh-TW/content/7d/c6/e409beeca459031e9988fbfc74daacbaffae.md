# 說明

在這道練習中，你需要把經典遊戲 Pac-Man 的幾條規則翻譯成 Elixir 函式。

你要翻譯的規則有四條，全都和遊戲狀態有關。

> 別擔心引數是怎麼來的，只要專心把這些引數組合起來，回傳預期的結果就好。

## 1. 定義 Pac-Man 是否吃到幽靈

定義`Rules.eat_ghost?/2`函式，它接受兩個引數（_Pac-Man 是否有能量球正在生效_ 和 _Pac-Man 是否碰到幽靈_），並回傳 Pac-Man 能否吃到幽靈的布林值。只有在 Pac-Man 有能量球正在生效且碰到幽靈時，這個函式才應該回傳 true。

```elixir
Rules.eat_ghost?(false, true)
# => false
```

## 2. 定義 Pac-Man 是否得分

定義`Rules.score?/2`函式，它接受兩個引數（_Pac-Man 是否碰到能量球_ 和 _Pac-Man 是否碰到豆子_），並回傳 Pac-Man 是否得分的布林值。只要 Pac-Man 碰到能量球或豆子，這個函式就應該回傳 true。

```elixir
Rules.score?(true, true)
# => true
```

## 3. 定義 Pac-Man 是否輸了

定義`Rules.lose?/2`函式，它接受兩個引數（_Pac-Man 是否有能量球正在生效_ 和 _Pac-Man 是否碰到幽靈_），並回傳 Pac-Man 是否輸了的布林值。如果 Pac-Man 碰到幽靈，而且沒有能量球正在生效，這個函式就應該回傳 true。

```elixir
Rules.lose?(false, true)
# => true
```

## 4. 定義 Pac-Man 是否獲勝

定義`Rules.win?/3`函式，它接受三個引數（_Pac-Man 是否已經吃掉所有豆子_、_Pac-Man 是否有能量球正在生效_ 和 _Pac-Man 是否碰到幽靈_），並回傳 Pac-Man 是否獲勝的布林值。如果 Pac-Man 已經吃掉所有豆子，而且根據第 3 部分定義的引數判斷並沒有輸，這個函式就應該回傳 true。

```elixir
Rules.win?(false, true, false)
# => false
```
