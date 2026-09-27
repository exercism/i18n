# 提示

## 一般

- [集合][sets]是可變、無序、不含重複元素的集合。
- 集合可以包含任何資料型態，只要所有元素都是[可雜湊的][hashable]。
- 集合是[可迭代的][iterable]。
- 集合最常用來快速去除其他集合中的重複項目，或是用來測試成員資格。
- 集合也支援數學運算，例如`union`、`intersection`、`difference`和`symmetric difference`

## 1. 清理食材

- `set()`建構子可以接受任何[可迭代的][iterable]當作引數。[概念：陣列](/tracks/python/concepts/lists)是可迭代的。
- 記住：[概念：元組](/tracks/python/concepts/tuples)可以用`(<element_1>, <element_2>)`或透過`tuple()`建構子來建立。

## 2. 雞尾酒與無酒精雞尾酒

- 若兩個集合沒有任何共同元素，則`set`與另一個集合_不相交_。
- `set()`建構子可以接受任何[可迭代的][iterable]當作引數。[概念：陣列](/tracks/python/concepts/lists)是可迭代的。
- 在 Python 裡，[概念：字串](/tracks/python/concepts/strings)可以用`+`號串接起來。

## 3. 將菜色分類

- 在這裡，用[概念：迴圈](/tracks/python/concepts/loops)疊代可用的餐點類別可能會有幫助。
- 如果`<set_1>`的所有元素都包含在`<set_2>`裡，則`<set_1> <= <set_2>`。
- 與`<=`等效的方法是`<set>.issubset(<iterable>)`
- [概念：元組](/tracks/python/concepts/tuples)可以包含任何資料型態，包括其他元組。元組可以用`(<element_1>, <element_2>)`或透過`tuple()`建構子來建立。
- [概念：元組](/tracks/python/concepts/tuples)裡的元素可以從左邊用從 0 開始的索引編號來存取，也可以從右邊用從 -1 開始的索引編號來存取。
- `set()`建構子可以接受任何[可迭代的][iterable]當作引數。[概念：陣列](/tracks/python/concepts/lists)是可迭代的。
- [概念：字串](/tracks/python/concepts/strings)可以用`+`號串接起來。

## 4. 標示過敏原與受限食物

- 集合的_交集_是`<set_1>`與`<set_2>`之間共用的元素。
- 與`&`等效的集合方法是`<set>.intersection(<iterable>)`
- [概念：元組](/tracks/python/concepts/tuples)裡的元素可以從左邊用從 0 開始的索引編號來存取，也可以從右邊用從 -1 開始的索引編號來存取。
- `set()`建構子可以接受任何[可迭代的][iterable]當作引數。[概念：陣列](/tracks/python/concepts/lists)是可迭代的。
- [概念：元組](/tracks/python/concepts/tuples)可以用`(<element_1>, <element_2>)`或透過`tuple()`建構子來建立。

## 5. 彙整食材的「總清單」

- 集合的_聯集_是把`<set_1`>與`<set_2>`合併成單一的`set`
- 與`|`等效的集合方法是`<set>.union(<iterable>)`
- 在這裡，用[概念：迴圈](/tracks/python/concepts/loops)疊代各種菜色可能會有幫助。

## 6. 挑出前菜以便用托盤分送

- 集合的_差集_是指從`<set_1>`中移除`<set_2>`的元素，例如`<set_1> - <set_2>`。
- 與`-`等效的集合方法是`<set>.difference(<iterable>)`
- `set()`建構子可以接受任何[可迭代的][iterable]當作引數。[概念：陣列](/tracks/python/concepts/lists)是可迭代的。
- [概念：陣列](/tracks/python/concepts/lists)建構子可以接受任何[可迭代的][iterable]當作引數。集合是可迭代的。

## 7. 找出只用在一道食譜裡的食材

- 集合的_對稱差集_是指元素出現在`<set_1>`或`<set_2>`中，但不會同時出現在**_兩個_**集合裡。
- 集合的_對稱差集_等同於用`set`的_聯集_減去`set`的_交集_，例如`(<set_1> | <set_2>) - (<set_1> & <set_2>)`
- 超過兩個`sets`的_對稱差集_會包含在輸入的`sets`中重複出現超過兩次的元素。要去除這些跨集合重複的元素，必須從對稱差集中扣除各集合兩兩之間的_交集_。
- 在這裡，用[概念：迴圈](/tracks/python/concepts/loops)疊代各種菜色可能會有幫助。


[hashable]: https://docs.python.org/3.7/glossary.html#term-hashable
[iterable]: https://docs.python.org/3/glossary.html#term-iterable
[sets]: https://docs.python.org/3/tutorial/datastructures.html#sets