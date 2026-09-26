# 提示

## 概述

- 每天记录的鸟的数量存储在一个名为`birdsPerDay`的[字段][fields]中。
- 每天记录的鸟的数量是一个恰好包含 7 个整数的数组。

## 1. 查看上周的数量

- 由于这个方法_不_依赖本周的数量，因此被定义为 [`static`方法][static-members]。
- 定义数组有[多种方式][single-dimensional-arrays]。

## 2. 查看今天有多少只鸟来访

- 记住，数量按日期从最早到最新排列，最后一个元素表示今天。
- 访问最后一个元素时，既可以使用它（固定）的下标（记得从零开始数），也可以通过[数组的大小][array-length]算出它的下标。

## 3. 让今天的数量自增

- 把表示今天数量的元素设为今天的数量加 1。

## 4. 查看是否有一天没有鸟来访

- `Array`类有一个[内置方法][array-indexof]，它会返回第一个找到该元素的下标；如果没有找到匹配的元素，则返回 -1。

## 5. 计算前若干天里来访鸟的数量

- 可以用一个变量来保存来访鸟的数量。
- 可以用 [`for`循环][for-statement]遍历数组。
- 可以在循环中更新这个变量。
- 记住：数组的下标从`0`开始。

## 6. 计算繁忙日子的数量

- 可以用一个变量来保存繁忙日子的数量。
- 可以用 [`foreach`循环][array-foreach]遍历数组。
- 可以在循环中更新这个变量。
- 可以在循环中使用 [`if`语句][if-statement]。

[array-foreach]: https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/arrays/using-foreach-with-arrays
[single-dimensional-arrays]: https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/arrays/single-dimensional-arrays
[fields]: https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/fields
[static-members]: https://www.oreilly.com/library/view/programming-c/0596001177/ch04s03.html
[array-indexof]: https://docs.microsoft.com/en-us/dotnet/api/system.array.indexof
[if-statement]: https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/if-else
[array-length]: https://docs.microsoft.com/en-us/dotnet/api/system.array.length
[for-statement]: https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/for
