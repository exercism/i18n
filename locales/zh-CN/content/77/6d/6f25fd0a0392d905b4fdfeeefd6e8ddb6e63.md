# 提示

## 通用

- 计算器的栈就是一个 Factor 数组。一个*运算*就是一个引用`( stack -- new-stack )`。
- [`sequences`][sequences]中的`head*`返回除最后`n`个元素之外的所有内容；`last2`返回最后两个。

## 1. 实现加法

- 使用[`kernel`][kernel]中的`bi`把输入分成两个计算：“数组去掉最后两个元素”和“最后两个元素的和”。然后用`suffix`把它们拼接起来。

## 2. 实现乘法

- 和任务 1 结构相同，只是把`+`换成`*`。

## 3. 应用单个运算

- 引用的效果是`( stack -- new-stack )`。在`call`上声明这一点，这样编译器就能对它进行类型检查：`call( stack -- new-stack )`。

## 4. 求值一个程序

- [`sequences`][sequences]中的`each`会遍历一个序列，并对每个元素应用一个引用。每次迭代都能看到运行中的栈，从程序中弹出下一个运算，并应用它。

## 5. 按名称求值

- 用`at`（在[`assocs`][assocs]中）在关联数组中查找每个名称，得到它的运算，然后复用`evaluate`。
- 来自[`curry-compose-fry`][fry]的 fry 引用`'[ _ at ]`会闭包捕获关联数组，这样`map`就能在一次遍历中把每个名称换成它的运算。

## 6. 安全地做除法

- `throw`（在[`kernel`][kernel]中）会抛出错误。`zero-divisor-error`已经声明好了，所以调用就是`zero-divisor-error throw`。
- 用一个`if`保护除法路径，检查最底部的除数是否为`0`。

[sequences]: https://docs.factorcode.org/content/vocab-sequences.html
[kernel]: https://docs.factorcode.org/content/vocab-kernel.html
[assocs]: https://docs.factorcode.org/content/vocab-assocs.html
[fry]: https://docs.factorcode.org/content/vocab-fry.html
