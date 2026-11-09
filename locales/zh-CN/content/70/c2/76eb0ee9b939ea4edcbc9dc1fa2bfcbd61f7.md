# 提示

## 通用

- 每个任务都可以在函数体内只用一条语句解决，但这不是必须的。


## 1. 判断某张牌是否存在

- 这张牌[在][ref-match]牌堆里吗？

## 2. 找到某张牌的位置

- 这张牌在牌堆里吗？
- 如果在，它在[哪个][ref-which]位置？
- 可以保证所有牌都互不相同，这让任务简单了一些。
- 返回位置，或者`-1`。
  - 如果需要根据某个条件是`TRUE`还是`FALSE`来分支，可以看看[条件判断概念][concept-conditionals]中介绍的各种做法。
  - 如果使用[`if_else`][ref-if_else]（这是最现代的做法，但在这里并不是必需的），请注意它对两个分支必须返回相同类型的结果这一点要求很严格。你可能需要显式地返回单个元素，而不是一个可能为空的向量。
  - 要获取向量的第一个元素，只需在返回向量的表达式后面加上`[1]`即可。

## 3. 判断每张牌是否为偶数

- 求模运算符是`%%`。
- 如果`x %% 2 == 0`，那么`x`就是偶数。
- [所有][ref-all]牌都符合这个条件吗？

## 4. 检查牌堆中是否含有奇数牌

- 一张牌如果不是偶数，那就是奇数，所以可以参考上一个任务。
- [任何][ref-any]一张牌符合这个条件吗？

## 5. 从牌堆中取出第一张奇数牌

- 牌堆里有奇数牌吗？
- 如果有，返回第一张_牌_（而不是它的位置）。

## 6. 判断第一张偶数牌的位置

- 牌堆里有偶数牌吗？
- 如果有，返回第一张偶数牌的_位置_。

[ref-match]: https://www.rdocumentation.org/packages/base/versions/3.6.2/topics/match
[ref-which]: https://www.rdocumentation.org/packages/base/versions/3.3.0/topics/which
[concept-conditionals]: https://exercism.org/tracks/r/concepts/conditionals
[ref-all]: https://www.rdocumentation.org/packages/base/versions/3.3.0/topics/all
[ref-any]: https://www.rdocumentation.org/packages/base/versions/3.3.0/topics/any
[ref-if_else]: https://dplyr.tidyverse.org/reference/if_else.html
