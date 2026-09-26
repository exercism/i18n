# 说明

解析并求值简单的数学应用题，返回整数结果。

## 迭代 0：数字

没有运算的问题，直接求值为给出的数字。

> What is 5?

求值结果为 5。

## 迭代 1：加法

把两个数字相加。

> What is 5 plus 13?

求值结果为 18。

要能处理大数字和负数。

## 迭代 2：减法、乘法和除法

现在，来执行另外三种运算。

> What is 7 minus 5?

2

> What is 6 multiplied by 4?

24

> What is 25 divided by 5?

5

## 迭代 3：多个运算

按顺序处理一组运算。

由于这些是文字应用题，请从左到右对表达式求值，_忽略常规的运算顺序。_

> What is 5 plus 13 plus 6?

24

> What is 3 plus 2 multiplied by 3?

15（即不是 9）

## 迭代 4：错误

解析器应当拒绝以下内容：

* 不支持的运算（“What is 52 cubed?”）
* 非数学问题（“Who is the President of the United States”）
* 语法无效的文字应用题（“What is 1 plus plus 2?”）

## 附加题：指数运算

如果你愿意，可以处理指数运算。

> What is 2 raised to the 5th power?

32
