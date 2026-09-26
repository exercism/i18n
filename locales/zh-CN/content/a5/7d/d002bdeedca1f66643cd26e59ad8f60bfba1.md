# 提示

## 1. 判断你是否需要驾驶执照

- 使用[严格相等运算符][mdn-equality-operators]检查输入是否等于某个字符串。
- 用在布尔概念中学到的两个[逻辑运算符][mdn-logical-operators]之一，把这两个条件组合起来。
- 解决这个任务**不**需要`if`语句。你可以直接返回构建好的布尔表达式。

## 2. 在两辆候选车辆中做出选择

- 使用[关系运算符][mdn-relational-operators]判断哪个选项在字典顺序中排在前。
- 然后根据这个比较的结果，借助[`if-else`语句][mdn-if-statement]给一个辅助变量赋值。
- 最后，构造出推荐句子。为此，你可以用[加法运算符][mdn-addition]把两个字符串拼接起来。

## 3. 估算一辆二手车的价格

- 先根据车龄确定百分比，并把它存到一个辅助变量里。按说明里提到的，使用[`if-else if-else`语句][mdn-if-statement]。
- 在这两个`if`条件中，使用[关系运算符][mdn-relational-operators]把车龄和阈值进行比较。
- 要算出结果，就把这个百分比应用到原价上。比如，`30% of x`可以通过先用`30`除以`100`，再乘以`x`得到。

[mdn-equality-operators]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators#equality_operators
[mdn-logical-operators]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators#binary_logical_operators
[mdn-relational-operators]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators#relational_operators
[mdn-addition]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Addition
[mdn-if-statement]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else
