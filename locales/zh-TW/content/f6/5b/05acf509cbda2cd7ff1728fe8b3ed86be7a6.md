# 指令

解析並求值簡單的數學文字題，並將答案以整數回傳。

## 疊代 0：數字

沒有運算的題目，求值結果就是題目給的數字。

> What is 5?

求值結果為 5。

## 疊代 1：加法

把兩個數字相加。

> What is 5 plus 13?

求值結果為 18。

要能處理大數字和負數。

## 疊代 2：減法、乘法和除法

現在來執行另外三種運算。

> What is 7 minus 5?

2

> What is 6 multiplied by 4?

24

> What is 25 divided by 5?

5

## 疊代 3：多個運算

依序處理一連串的運算。

由於這些是口語化的文字題，請從左到右依序求值，_忽略一般慣用的運算順序。_

> What is 5 plus 13 plus 6?

24

> What is 3 plus 2 multiplied by 3?

15（也就是不是 9）

## 疊代 4：錯誤

解析器應該要拒絕：

* 不支援的運算（「What is 52 cubed?」）
* 非數學的提問（「Who is the President of the United States」）
* 語法錯誤的文字題（「What is 1 plus plus 2?」）

## 加分題：指數運算

如果你有興趣，也可以處理指數運算喔。

> What is 2 raised to the 5th power?

32
