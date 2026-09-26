# 说明

你对 Blorkemon™️ 卡牌的怀旧之情丝毫没有减弱的迹象，你甚至又开始收集它们了，还拉上朋友们一起加入。

在这个练习中，你将使用`Set`接口来管理你的收藏，因为当目标是集齐所有已存在的卡牌时，重复的卡牌并不重要。

## 1. 开始收藏

你刚找到了自己以前囤的 Blorkemon™️ 卡牌！
这堆卡牌里有很多重复的，所以是时候去掉重复的，建立一个新的收藏了。

你非常希望朋友们也加入你的 Blorkemon™️ 狂热，最好的办法就是送他们一张卡牌，帮他们开启自己的收藏。

实现`newCollection`方法：它接收一个卡牌数组，返回一个代表新收藏的`Set`。

```java
GottaSnatchEmAll.newCollection(List.of("Newthree", "Newthree", "Newthree"));
// => {"Newthree"}
```

## 2. 扩充收藏

一旦有了收藏，它就有了自己的生命，需要不断扩充。

实现`addCard`方法，它接收一张新卡牌和你当前已收集的卡牌集合。
如果这张新卡牌还不在收藏里，方法应该把它加进去，并返回一个`boolean`，表示收藏是否被更新。

```java
Set<String> collection = GottaSnatchEmAll.newCollection("Newthree");
GottaSnatchEmAll.addCard("Scientuna",collection);
// => true

collection.contains("Scientuna");
// => true
```

## 3. 开始交换

你非常希望朋友们也加入你的 Blorkemon™️ 狂热，所以是时候开始交换了！

和朋友交换时，并不是每笔交易都值得做，有些甚至根本做不成。
只有当你和朋友各自都有一张对方没有的卡牌时，才应该交换。

实现`canTrade`方法，它接收你当前的收藏和你某位朋友的收藏。
按照上面的规则，它应该返回一个`boolean`，表示是否可以进行交换。

```java
Set<String> myCollection = Set.of("Newthree");
Set<String> theirCollection = Set.of("Scientuna");
GottaSnatchEmAll.canTrade(myCollection, theirCollection);
// => true
```

## 4. 找出共同卡牌

你和热爱 Blorkemon™️ 的朋友们聚在一起，想知道哪些卡牌最常见。

实现`commonCards`方法，它接收一个收藏数组，返回一个包含所有收藏都有的卡牌的集合。

```java
GottaSnatchEmAll.commonCards(List.of(Set.of("Scientuna"), Set.of("Newthree","Scientuna")));
// => {"Scientuna"}
```

## 5. 所有的卡牌

你和朋友们加起来，拥有所有的 Blorkemon™️ 卡牌吗？

实现`allCards`方法，它接收一个收藏数组，返回一个包含所有收藏中全部不同卡牌的集合。

```java
GottaSnatchEmAll.allCards(List.of(Set.of("Scientuna"), Set.of("Newthree","Scientuna")));
// => {"Newthree", "Scientuna"}
```
