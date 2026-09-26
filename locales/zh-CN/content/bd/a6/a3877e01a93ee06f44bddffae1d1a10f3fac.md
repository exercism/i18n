# 提示

## 1. 定义自定义类型

抽象类型和类型继承已经在[复合类型][composite]概念中讨论过了。

## 2. 获取宠物的名字。

- 对 Dog 和 Cat 来说这很简单，但对回退方法的测试很有帮助。

## 3. 定义猫和狗相遇时会发生什么

- 猫和狗相遇有多少种组合？
- 记住，猫遇到狗和狗遇到猫的反应是不同的。
- 我们需要第一个实参的响应：`meet(a, b)` 中的 `a`。

## 4. 定义两个实体之间的一次相遇。

- 返回值是比 `meet()` 更长的字符串。
- `encounter()` 只使用一个方法。
- 在拼装返回值时，[字符串插值][interpolation]是你的好帮手。

## 5. 为宠物之间的相遇定义回退反应

- 第二个实参现在是`Cat`或`Dog`以外的`Pet`，所以添加一个 `meet` 方法。
- 声明抽象形参类型，或者通过参数化方法对它们加以约束，都是实现这一点的办法。

## 6. 定义宠物遇到自己不认识的东西时的回退方案

- 第二个实参现在可以是任何东西。

## 7. 定义通用回退

- 两个实参现在都可以是任何东西。
- 在练习结束时，你会有 7 个 `meet` 方法。

[composite]: https://exercism.org/tracks/julia/concepts/composite-types
[interpolation]: https://docs.julialang.org/en/v1/manual/strings/#string-interpolation
