# 提示

## 一般

- 每一題都能只用函式主體內的一行敘述解決，但這不是必要的。


## 1. 判斷卡片是否存在

- 這張卡片[在][ref-match]牌堆裡嗎？

## 2. 找出卡片的位置

- 這張卡片在牌堆裡嗎？
- 如果是的話，在[哪個][ref-which]位置？
- 所有卡片都保證互不相同，這讓任務簡單一些。
- 回傳位置，或是`-1`。
  - 想了解當某個東西是`TRUE`或`FALSE`時可以有哪些分支寫法，請參考[條件判斷概念][concept-conditionals]。
  - 如果你使用[`if_else`][ref-if_else]（最現代的作法，不過這裡其實不一定要用），要注意它嚴格要求兩個分支回傳相同型別的結果。你可能得明確回傳單一元素，而不是一個可能為空的向量。
  - 想取得向量的第一個元素，只要在任何會回傳向量的東西後面加上`[1]`就好。

## 3. 判斷每張卡片是否為偶數

- 取餘數的運算子是`%%`。
- 如果`x %% 2 == 0`，`x`就是偶數。
- [所有][ref-all]卡片都符合這個條件嗎？

## 4. 檢查牌堆中是否含有奇數值的卡片

- 不是偶數的卡片就是奇數，所以請參考上一題。
- [任何][ref-any]一張卡片符合這個條件嗎？

## 5. 從牌堆中取出第一張奇數卡片

- 牌堆裡有奇數卡片嗎？
- 如果是的話，回傳第一張_卡片_（而不是位置）。

## 6. 判斷第一張偶數卡片的位置

- 牌堆裡有偶數卡片嗎？
- 如果是的話，回傳第一張偶數卡片的_位置_。

[ref-match]: https://www.rdocumentation.org/packages/base/versions/3.6.2/topics/match
[ref-which]: https://www.rdocumentation.org/packages/base/versions/3.3.0/topics/which
[concept-conditionals]: https://exercism.org/tracks/r/concepts/conditionals
[ref-all]: https://www.rdocumentation.org/packages/base/versions/3.3.0/topics/all
[ref-any]: https://www.rdocumentation.org/packages/base/versions/3.3.0/topics/any
[ref-if_else]: https://dplyr.tidyverse.org/reference/if_else.html
