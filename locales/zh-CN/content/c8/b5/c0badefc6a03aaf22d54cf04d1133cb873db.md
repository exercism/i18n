# 提示

## 通用

- [集合][sets]是可变的、无序的集合，不包含重复元素。
- 只要所有元素都是[可哈希][hashable]的，集合就可以包含任何数据类型。
- 集合是[可迭代][iterable]的。
- 集合最常用于快速为其他集合去重，或用于成员测试。
- 集合还支持`union`、`intersection`、`difference`和`symmetric difference`这样的数学运算。

## 1. 清理菜品原料

- `set()`构造函数可以接受任何[可迭代][iterable]对象作为实参。[概念：数组](/tracks/python/concepts/lists)是可迭代的。
- 记住：[概念：元组](/tracks/python/concepts/tuples)可以用`(<element_1>, <element_2>)`构造，也可以通过`tuple()`构造函数创建。

## 2. 鸡尾酒和无酒精鸡尾酒

- 如果两个集合没有共同的元素，那么一个`set`与另一个集合就是*不相交*的。
- `set()`构造函数可以接受任何[可迭代][iterable]对象作为实参。[概念：数组](/tracks/python/concepts/lists)是可迭代的。
- 在 Python 中，[概念：字符串](/tracks/python/concepts/strings)可以用`+`号拼接。

## 3. 对菜品分类

- 这里用[概念：循环](/tracks/python/concepts/loops)迭代可选的餐点类别可能会很有用。
- 如果`<set_1>`的所有元素都包含在`<set_2>`中，那么`<set_1> <= <set_2>`。
- `<=`对应的方法是`<set>.issubset(<iterable>)`
- [概念：元组](/tracks/python/concepts/tuples)可以包含任何数据类型，包括其他元组。元组可以用`(<element_1>, <element_2>)`构造，也可以通过`tuple()`构造函数创建。
- [概念：元组](/tracks/python/concepts/tuples)中的元素可以从左边用从 0 开始的下标访问，也可以从右边用从 -1 开始的下标访问。
- `set()`构造函数可以接受任何[可迭代][iterable]对象作为实参。[概念：数组](/tracks/python/concepts/lists)是可迭代的。
- [概念：字符串](/tracks/python/concepts/strings)可以用`+`号拼接。

## 4. 标注过敏原和限制食物

- 集合的*交集*是`<set_1>`和`<set_2>`共有的元素。
- `&`对应的集合方法是`<set>.intersection(<iterable>)`
- [概念：元组](/tracks/python/concepts/tuples)中的元素可以从左边用从 0 开始的下标访问，也可以从右边用从 -1 开始的下标访问。
- `set()`构造函数可以接受任何[可迭代][iterable]对象作为实参。[概念：数组](/tracks/python/concepts/lists)是可迭代的。
- [概念：元组](/tracks/python/concepts/tuples)可以用`(<element_1>, <element_2>)`构造，也可以通过`tuple()`构造函数创建。

## 5. 整理一份食材的“总清单”

- 集合的*并集*是把`<set_1`>`和`<set_2>`合并成一个`set`
- `|`对应的集合方法是`<set>.union(<iterable>)`
- 这里用[概念：循环](/tracks/python/concepts/loops)迭代各式各样的菜品可能会很有用。

## 6. 挑出装盘上桌的开胃菜

- 集合的*差集*是从`<set_1>`中移除`<set_2>`的元素，例如`<set_1> - <set_2>`。
- `-`对应的集合方法是`<set>.difference(<iterable>)`
- `set()`构造函数可以接受任何[可迭代][iterable]对象作为实参。[概念：数组](/tracks/python/concepts/lists)是可迭代的。
- [概念：数组](/tracks/python/concepts/lists)构造函数可以接受任何[可迭代][iterable]对象作为实参。集合是可迭代的。

## 7. 找出只在一道菜谱中用到的食材

- 集合的*对称差集*是元素出现在`<set_1>`或`<set_2>`中，但并非**_两个_**集合都有的部分。
- 集合的*对称差集*等同于从`set`的*并集*中减去`set`的*交集*，例如`(<set_1> | <set_2>) - (<set_1> & <set_2>)`
- 两个以上`sets`的*对称差集*会包含在输入`sets`中出现超过两次的元素。要去除这些跨集合重复的元素，需要从对称差集中减去各集合两两之间的*交集*。
- 这里用[概念：循环](/tracks/python/concepts/loops)迭代各式各样的菜品可能会很有用。


[hashable]: https://docs.python.org/3.7/glossary.html#term-hashable
[iterable]: https://docs.python.org/3/glossary.html#term-iterable
[sets]: https://docs.python.org/3/tutorial/datastructures.html#sets