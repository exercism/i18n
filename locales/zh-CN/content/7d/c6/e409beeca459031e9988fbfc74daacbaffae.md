# 说明

在这个练习中，你需要把经典游戏 Pac-Man 里的一些规则翻译成 Elixir 函数。

你需要翻译四条规则，它们都与游戏状态有关。

> 不用担心这些实参是怎么来的，只要专注于把它们组合起来，返回期望的结果就好。

## 1. 定义 Pac-Man 能否吃掉幽灵

定义`Rules.eat_ghost?/2`函数，它接收两个实参（_Pac-Man 的能量豆是否处于激活状态_和_Pac-Man 是否碰到幽灵_），并返回一个布尔值，表示 Pac-Man 能否吃掉幽灵。只有当 Pac-Man 的能量豆处于激活状态并且碰到了幽灵时，这个函数才应返回 true。

```elixir
Rules.eat_ghost?(false, true)
# => false
```

## 2. 定义 Pac-Man 是否得分

定义`Rules.score?/2`函数，它接收两个实参（_Pac-Man 是否碰到能量豆_和_Pac-Man 是否碰到豆子_），并返回一个布尔值，表示 Pac-Man 是否得分。只要 Pac-Man 碰到了能量豆或豆子，这个函数就应返回 true。

```elixir
Rules.score?(true, true)
# => true
```

## 3. 定义 Pac-Man 是否输掉游戏

定义`Rules.lose?/2`函数，它接收两个实参（_Pac-Man 的能量豆是否处于激活状态_和_Pac-Man 是否碰到幽灵_），并返回一个布尔值，表示 Pac-Man 是否输掉游戏。如果 Pac-Man 碰到了幽灵，而且能量豆没有处于激活状态，这个函数就应返回 true。

```elixir
Rules.lose?(false, true)
# => true
```

## 4. 定义 Pac-Man 是否获胜

定义`Rules.win?/3`函数，它接收三个实参（_Pac-Man 是否吃掉了所有豆子_、_Pac-Man 的能量豆是否处于激活状态_和_Pac-Man 是否碰到幽灵_），并返回一个布尔值，表示 Pac-Man 是否获胜。如果 Pac-Man 吃掉了所有豆子，并且根据第 3 部分中定义的实参没有输掉游戏，这个函数就应返回 true。

```elixir
Rules.win?(false, true, false)
# => false
```
