# 说明

作为一名准魔术师，Elyse 需要练习一些基本功。
她有一摞牌想要摆弄一下。

为了让事情简单一点，她只用 1 到 10 这些牌，这样她的牌堆就可以用一个数字数组来表示。
某张牌的位置对应它在数组中的下标。
也就是说，位置 0 指第一张牌，位置 1 指第二张牌，以此类推。

~~~~exercism/note
所有函数都应该先更新这个牌堆数组，再返回修改后的数组。这是一种常见的做法，叫做 Builder 模式，它可以让你把多个函数漂亮地串联起来。
~~~~

## 1. 从牌堆中取出一张牌

要取出一张牌，就返回给定牌堆中下标为`position`的那张牌。

实现函数`getCard(at:from:)`，它接收两个参数：`at`表示牌在牌堆中的位置，`from`表示牌堆。
这个函数应该返回给定牌堆中下标为`index`的那张牌。

```swift
let index = 2
getCard(at: index, from: [1, 2, 4, 1])
// returns 4
```

## 2. 替换牌堆中的一张牌

耍个戏法，把下标为`position`的那张牌换成提供的替换牌。

实现函数`setCard(at:in:to)`，它接收三个参数：`at`表示牌在牌堆中的位置，`in`表示牌堆，`to`表示用来替换下标为`index`那张牌的新牌。
这个函数应该返回牌堆的一个副本，其中下标为`index`的那张牌被替换成新牌。
如果给定的`index`不是牌堆中的有效下标，就应该原样返回原来的牌堆，不做修改。

```swift
let index = 2
let newCard = 6
setCard(at: index, in: [1, 2, 4, 1], to: newCard)
// returns [1, 2, 6, 1]
```

## 3. 在牌堆顶部插入一张牌

通过在牌堆顶部插入一张新牌，让一张牌出现。

实现函数`insert(_:atTopOf:)`，它接收两个参数：要插入的新牌，以及牌堆。
这个函数应该返回牌堆的一个副本，把提供的新牌加到牌堆顶部。

```swift
let newCard = 8
insert(newCard, atTopOf: [5, 9, 7, 1])
// returns [5, 9, 7, 1, 8]
```

## 4. 从牌堆中移除一张牌

通过从牌堆中移除给定`position`位置的那张牌，让一张牌消失。

实现函数`removeCard(at:from:)`，它接收两个参数：`at`表示牌在牌堆中的位置，`from`表示牌堆。
这个函数应该返回牌堆的一个副本，其中下标为`index`的那张牌被移除。
如果给定的`index`不是牌堆中的有效下标，就应该原样返回原来的牌堆，不做修改。

```swift
let index = 2
removeCard(at: index, from: [3, 2, 6, 4, 8])
// returns [3, 2, 4, 8]
```

## 5. 在牌堆中插入一张牌

通过在牌堆中给定的`position`位置插入一张新牌，让一张牌出现。

实现函数`insert(_:at:from:)`，它接收三个参数：要插入的新牌、新牌应该插入的位置，以及牌堆。
这个函数应该返回牌堆的一个副本，把提供的新牌加到给定位置。
如果给定的`index`不是牌堆中的有效下标，就应该原样返回原来的牌堆，不做修改。

```swift
let newCard = 8
insert(newCard, at: 2, from: [5, 9, 7, 1])
// returns [5, 9, 8, 7, 1]
```

## 6. 检查牌堆的大小

检查牌堆的大小是否等于`stackSize`。

实现函数`checkSizeOfStack(_:_:)`，它接收两个参数：`stack`表示牌堆，`stackSize`表示牌堆的大小。
如果牌堆的大小等于`stackSize`，函数应该返回`true`，否则返回`false`。

```swift
let stackSize = 4
checkSizeOfStack([3, 2, 6, 4, 8], stackSize)
// returns false
```
