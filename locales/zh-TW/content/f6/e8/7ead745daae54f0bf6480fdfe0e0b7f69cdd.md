# 說明

你對 Blorkemon™️ 卡片的懷舊之情絲毫沒有減緩的跡象，你甚至又開始重新收集它們，還拉著朋友們一起加入。

在這道練習中，你會使用`Set`介面來幫助管理你的收藏，因為當你的目標是收集所有現有的卡片時，重複的卡片並不重要。

## 1. 開始收藏

你剛找到了你舊的那批 Blorkemon™️ 卡片！
這批收藏裡有一堆重複的卡片，所以是時候透過移除重複的卡片來開始新的收藏了。

你真的很希望朋友們加入你的 Blorkemon™️ 熱潮，最好的方式就是送他們一張卡片，幫他們的收藏起步。

實作`newCollection`方法，它會把卡片陣列轉換成代表你新收藏的`Set`。

```java
GottaSnatchEmAll.newCollection(List.of("Newthree", "Newthree", "Newthree"));
// => {"Newthree"}
```

## 2. 擴充收藏

一旦有了收藏，它就會有自己的生命，必須持續成長。

實作`addCard`方法，它會接收一張新卡片和你目前收集到的卡片集合。
如果這張新卡片還不存在，方法應該把它加入收藏，並回傳一個`boolean`，表示收藏是否被更新。

```java
Set<String> collection = GottaSnatchEmAll.newCollection("Newthree");
GottaSnatchEmAll.addCard("Scientuna",collection);
// => true

collection.contains("Scientuna");
// => true
```

## 3. 開始交換

你真的很希望朋友們加入你的 Blorkemon™️ 熱潮，所以是時候開始交換了！

和朋友交換時，並不是每筆交易都值得進行，甚至有些根本無法進行。
只有當你和朋友各自都有一張對方沒有的卡片時，才應該交換。

實作`canTrade`方法，它會接收你目前的收藏和你某位朋友的收藏。
依照上面的規則，它應該回傳一個`boolean`，表示是否可以交換。

```java
Set<String> myCollection = Set.of("Newthree");
Set<String> theirCollection = Set.of("Scientuna");
GottaSnatchEmAll.canTrade(myCollection, theirCollection);
// => true
```

## 4. 找出共同卡片

你和熱愛 Blorkemon™️ 的朋友們聚在一起，想知道哪些卡片最常見。

實作`commonCards`方法，它會接收收藏的陣列，並回傳一個收藏，其中包含所有收藏都有的卡片。

```java
GottaSnatchEmAll.commonCards(List.of(Set.of("Scientuna"), Set.of("Newthree","Scientuna")));
// => {"Scientuna"}
```

## 5. 所有卡片

你和朋友們加起來，擁有全部的 Blorkemon™️ 卡片嗎？

實作`allCards`方法，它會接收收藏的陣列，並回傳一個收藏，包含所有收藏合併後的全部不同卡片。

```java
GottaSnatchEmAll.allCards(List.of(Set.of("Scientuna"), Set.of("Newthree","Scientuna")));
// => {"Newthree", "Scientuna"}
```
