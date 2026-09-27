# 說明

Chaitana 擁有一座非常受歡迎的主題樂園。
在景觀優美的園區正中央，她只有一項遊樂設施：世界上最大的雲霄飛車（TM）。
雖然只有這一項設施，世界各地的人們仍特地前來，排上好幾個小時的隊，只為了有機會搭乘 Chaitana 的超級雲霄飛車。

這項設施有兩條隊伍，各自用一個 `list` 表示：

1. 一般隊伍
2. 快速通關隊伍（_又稱 Fast-track_），人們在這裡額外付費，取得優先搭乘的權利。

你受託撰寫一些程式碼，好更妥善地管理樂園裡的遊客。
你必須盡快實作以下函式，免得遊客（還有你的老闆 Chaitana！）開始不高興。
請務必仔細閱讀。
有些任務要求你變更或更新現有的隊伍，有些則要求你複製一份。

## 1. 把我加進隊伍

定義 `add_me_to_the_queue()` 函式，它接受 4 個參數 `<express_queue>, <normal_queue>, <ticket_type>, <person_name>`，並回傳已加入該人員姓名的對應隊伍。

1. `<ticket_type>` 是一個 `int`，1 == express_queue，0 == normal_queue。
2. `<person_name>` 是要加入對應隊伍的人員姓名（型別為 `str`）。

```python
>>> add_me_to_the_queue(express_queue=["Tony", "Bruce"], normal_queue=["RobotGuy", "WW"], ticket_type=1, person_name="RichieRich")
...
["Tony", "Bruce", "RichieRich"]

>>> add_me_to_the_queue(express_queue=["Tony", "Bruce"], normal_queue=["RobotGuy", "WW"], ticket_type=0, person_name="HawkEye")
....
["RobotGuy", "WW", "HawkEye"]
```

## 2. 我的朋友在哪裡？

有一個人比較晚到樂園，卻想加入朋友們正在排的隊伍。
但他們不知道朋友們排在哪裡，而且手機收不到訊號，沒辦法打電話給他們。

定義 `find_my_friend()` 函式，它接受 2 個參數 `queue` 和  `friend_name`，並回傳該姓名在隊伍中的位置。

1. `<queue>` 是排隊群眾的 `list`。
2. `<friend_name>` 是朋友的姓名，你需要找出他的索引（在隊伍中的位置）。

請記住： 索引從左邊算起是 0，從右邊算起是 -1。

```python
>>> find_my_friend(queue=["Natasha", "Steve", "T'challa", "Wanda", "Rocket"], friend_name="Steve")
...
1
```

## 3. 我可以加入他們嗎？

既然已經找到朋友了（在上面的任務 2），這位晚到的人想排到朋友所在的位置。
定義 `add_me_with_my_friends()` 函式，它接受 3 個參數 `queue`、`index` 和  `person_name`。

1. `<queue>` 是排隊群眾的 `list`。
2. `<index>` 是新成員要加入的位置。
3. `<person_name>` 是要加在該索引位置的人員姓名。

回傳已加入這位晚到者姓名的隊伍。

```python
>>> add_me_with_my_friends(queue=["Natasha", "Steve", "T'challa", "Wanda", "Rocket"], index=1, person_name="Bucky")
...
["Natasha", "Bucky", "Steve", "T'challa", "Wanda", "Rocket"]
```

## 4. 隊伍裡的討厭鬼

你剛從隊伍裡聽說，有個很討厭的人又推又擠、大聲叫囂，還到處惹麻煩。
你得把這個惡劣的傢伙趕出去，因為他行為不良！

定義 `remove_the_mean_person()` 函式，它接受 2 個參數 `queue` 和 `person_name`。

1. `<queue>` 是排隊群眾的 `list`。
2. `<person_name>` 是那個需要被踢出去的人之姓名。

回傳已移除這個討厭鬼姓名的隊伍。

```python
>>> remove_the_mean_person(queue=["Natasha", "Steve", "Eltran", "Wanda", "Rocket"], person_name="Eltran")
...
["Natasha", "Steve", "Wanda", "Rocket"]
```

## 5. 同名同姓

你可能沒見過兩個長得一模一樣、卻毫無血緣關係的人，但你一定見過名字完全相同、彼此毫無關係的人（_也就是同名同姓的人_）！
今天，現場似乎來了很多這樣的人。
你想知道某個名字在隊伍中出現了幾次。

定義 `how_many_namefellows()` 函式，它接受 2 個參數 `queue` 和  `person_name`。

1. `<queue>` 是排隊群眾的 `list`。
2. `<person_name>` 是你認為可能在隊伍中出現超過一次的名字。

以 `int` 回傳 `person_name` 出現的次數。

```python
>>> how_many_namefellows(queue=["Natasha", "Steve", "Eltran", "Natasha", "Rocket"], person_name="Natasha")
...
2
```

## 6. 移除最後一個人

可惜，今天樂園裡太擁擠了，你需要請一般隊伍的最後一個人離開（_你會給他一張兌換券，讓他改天再來走快速通關_）。
你必須定義 `remove_the_last_person()` 函式，它接受 1 個參數 `queue`，也就是排隊民眾的陣列。

你應該更新這個 `list`，並同時 `return` 被移除者的姓名，這樣才能開立兌換券給他。

```python
>>> remove_the_last_person(queue=["Natasha", "Steve", "Eltran", "Natasha", "Rocket"])
...
'Rocket'
```

## 7. 排序隊伍清單

為了行政作業上的需要，你得把某個隊伍裡的所有姓名依字母順序排列。

定義 `sorted_names()` 函式，它接受 1 個引數 `queue`（排隊群眾的 `list`），並回傳這個 `list` 的 `sorted` 複本。

```python
>>> sorted_names(queue=["Natasha", "Steve", "Eltran", "Natasha", "Rocket"])
...
['Eltran', 'Natasha', 'Natasha', 'Rocket', 'Steve']
```
