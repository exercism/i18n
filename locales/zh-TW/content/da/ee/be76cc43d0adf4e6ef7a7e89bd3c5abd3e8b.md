# 指示

籃網球賽季結束了，由排名表決定誰能打進決賽。

程式碼骨架提供了一個`TEAM`類別。請在它下面撰寫`FINALS_LADDER`。

## 1. 誰排在誰上面？

`higher`接受兩個隊伍，回答第一個隊伍是否應該排在第二個之上。積分較高者排在前面。積分相同的隊伍則以淨勝分區分，較高者在前。

```sather
FINALS_LADDER::higher(#TEAM("Vixens", 24, 40), #TEAM("Magpies", 20, 90))
-- => true
```

## 2. 排名表

`ladder`接受任意順序的隊伍，回傳排序後的結果。傳入的陣列必須保持原樣。

```sather
FINALS_LADDER::ladder(teams)
-- => the same teams, best first
```

## 3. 讀出排名表

`names`接受一個隊伍陣列，回傳以`", "`串接起來的隊名。

```sather
FINALS_LADDER::names(FINALS_LADDER::ladder(teams))
-- => "Vixens, Magpies, Swifts"
```

## 4. 冠軍隊伍

`premiers`接受任意順序的隊伍，回傳排名第一的隊伍名稱。如果完全沒有隊伍，答案為`""`。

```sather
FINALS_LADDER::premiers(teams)
-- => "Vixens"
```

## 5. 完全不同的排序方式

`shortest_first`接受一個字串陣列，依長度排序回傳，最短的在前。長度相同的字串則依字母順序排列。

```sather
FINALS_LADDER::shortest_first(|"Magpies", "Vixens", "Swifts"|)
-- => "Swifts", "Vixens", "Magpies"
```

這個決勝規則不是裝飾。排序並不穩定，少了它，兩個長度相同的名稱可能會以任意順序出現。

這和任務 2 用的是同一個排序常式，只是傳入不同的比較規則。這正是這個練習的重點。
