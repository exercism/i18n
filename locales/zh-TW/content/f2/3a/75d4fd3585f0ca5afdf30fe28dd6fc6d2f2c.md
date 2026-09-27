# 指令

準魔法師 Elyse 需要練習一些基本功。她有一疊牌，想要好好操作一番。

為了方便一些，她只用 1 到 10 的牌，這樣她的牌堆就能用數字陣列來表示。某張牌的位置對應到陣列中的索引，也就是說，位置 0 代表第一張牌，位置 1 代表第二張牌，以此類推。

~~~~exercism/note
所有函式都應該先更新牌的陣列，再回傳修改後的陣列。這是一種常見的做法，稱為 Builder 模式，可以讓你漂亮地把函式串接在一起。
~~~~

## 1. 從牌堆取出一張牌

要挑選一張牌，請從指定的牌堆回傳索引`position`處的牌。

實作函式`getCard(at:from:)`，它接受兩個引數：`at`是牌在牌堆中的位置，`from`是牌堆。這個函式應該從指定的牌堆回傳位置`index`處的牌。

```swift
let index = 2
getCard(at: index, from: [1, 2, 4, 1])
// returns 4
```

## 2. 更換牌堆中的一張牌

施展一點手法，把索引`position`處的牌與提供的替換牌交換。

實作函式`setCard(at:in:to)`，它接受三個引數：`at`是牌在牌堆中的位置，`in`是牌堆，`to`是要替換位置`index`處那張牌的新牌。這個函式應該回傳牌堆的副本，並將位置`index`處的牌替換成新牌。如果指定的`index`不是牌堆中的有效索引，就應該回傳原本的牌堆，保持不變。

```swift
let index = 2
let newCard = 6
setCard(at: index, in: [1, 2, 4, 1], to: newCard)
// returns [1, 2, 6, 1]
```

## 3. 在牌堆頂端插入一張牌

在牌堆頂端插入一張新牌，讓一張牌憑空出現。

實作函式`insert(_:atTopOf:)`，它接受兩個引數：要插入的新牌，以及牌堆。這個函式應該回傳牌堆的副本，並將提供的新牌加到牌堆頂端。

```swift
let newCard = 8
insert(newCard, atTopOf: [5, 9, 7, 1])
// returns [5, 9, 7, 1, 8]
```

## 4. 從牌堆移除一張牌

從牌堆移除指定`position`處的牌，讓一張牌消失。

實作函式`removeCard(at:from:)`，它接受兩個引數：`at`是牌在牌堆中的位置，`from`是牌堆。這個函式應該回傳牌堆的副本，並移除位置`index`處的牌。如果指定的`index`不是牌堆中的有效索引，就應該回傳原本的牌堆，保持不變。

```swift
let index = 2
removeCard(at: index, from: [3, 2, 6, 4, 8])
// returns [3, 2, 4, 8]
```

## 5. 在牌堆中插入一張牌

在牌堆中指定的`position`處插入一張新牌，讓一張牌憑空出現。

實作函式`insert(_:at:from:)`，它接受三個引數：要插入的新牌、新牌應該插入的位置，以及牌堆。這個函式應該回傳牌堆的副本，並將提供的新牌加到指定的位置。如果指定的`index`不是牌堆中的有效索引，就應該回傳原本的牌堆，保持不變。

```swift
let newCard = 8
insert(newCard, at: 2, from: [5, 9, 7, 1])
// returns [5, 9, 8, 7, 1]
```

## 6. 檢查牌堆的大小

檢查牌堆的大小是否等於`stackSize`。

實作函式`checkSizeOfStack(_:_:)`，它接受兩個引數：`stack`是牌堆，`stackSize`是牌堆的大小。如果牌堆的大小等於`stackSize`，這個函式應該回傳`true`，否則回傳`false`。

```swift
let stackSize = 4
checkSizeOfStack([3, 2, 6, 4, 8], stackSize)
// returns false
```
