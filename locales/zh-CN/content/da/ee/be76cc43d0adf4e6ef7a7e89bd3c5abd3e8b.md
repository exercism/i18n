# 说明

无板篮球赛季结束了，积分榜决定谁能进决赛。

代码骨架里已经有一个 `TEAM` 类。在它下面编写 `FINALS_LADDER`。

## 1. 谁排在谁前面？

`higher` 接收两支队伍，返回第一支是否应排在第二支前面。

积分多的排在前面。积分相同的队伍按净胜球区分，净胜球多的排在前面。

```sather
FINALS_LADDER::higher(#TEAM("Vixens", 24, 40), #TEAM("Magpies", 20, 90))
-- => true
```

## 2. 积分榜

`ladder` 接收任意顺序的队伍，返回排好名次的它们。传入的数组必须保持原样。

```sather
FINALS_LADDER::ladder(teams)
-- => the same teams, best first
```

## 3. 读出积分榜

`names` 接收一个队伍数组，返回用 `", "` 拼接起来的队名。

```sather
FINALS_LADDER::names(FINALS_LADDER::ladder(teams))
-- => "Vixens, Magpies, Swifts"
```

## 4. 冠军

`premiers` 接收任意顺序的队伍，返回排在榜首的队伍名。如果一支队伍都没有，返回 `""`。

```sather
FINALS_LADDER::premiers(teams)
-- => "Vixens"
```

## 5. 完全不同的排序

`shortest_first` 接收一个字符串数组，返回按长度排序的结果，最短的在前。长度相同的字符串按字母顺序排列。

```sather
FINALS_LADDER::shortest_first(|"Magpies", "Vixens", "Swifts"|)
-- => "Swifts", "Vixens", "Magpies"
```

这个打破平局的规则不是装饰。排序是不稳定的，如果没有它，两个长度相同的名字可能以任意顺序出现。

这和任务 2 用的是同一个排序例程，只是交给了它一条不同的规则。这正是这道练习的重点。
