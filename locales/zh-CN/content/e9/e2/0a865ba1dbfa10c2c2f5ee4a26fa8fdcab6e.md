# 简介

## 算术运算符

JavaScript 提供了 6 个不同的运算符，用于对数字进行基本算术运算。

- `+`：加法运算符用于求数字之和。
- `-`：减法运算符用于求两个数字之差。
- `*`：乘法运算符用于求两个数字之积。
- `/`：除法运算符用于将两个数字相除。

```javascript
2 - 1.5; //=> 0.5
19 / 2; //=> 9.5
```

- `%`：求余运算符用于求一次除法运算后的余数。

  ```javascript
  40 % 4; // => 0
  -11 % 4; // => -3
  ```

- `**`：幂运算符用于求一个数字的幂。

  ```javascript
  4 ** 3; // => 64
  4 ** 1 / 2; // => 2
  ```

## 运算顺序

在一行中使用多个运算符时，JavaScript 会遵循一定的优先级，如[这张优先级表][mdn-operator-precedence]所示。
在我们这里可以简化为：JavaScript 使用我们在小学数学课上学过的 PEDMAS（括号、指数、乘除、加减）规则。

<!-- prettier-ignore-start -->
```javascript
const result = 3 ** 3 + 9 * 4 / (3 - 1);
// => 3 ** 3 + 9 * 4/2
// => 27 + 9 * 4/2
// => 27 + 18
// => 45
```
<!-- prettier-ignore-end -->

## 简写赋值运算符

简写赋值运算符是一种更简短的写法，用于对变量执行算术运算，并把新值赋值给同一个变量。
例如，有两个变量`x`和`y`。
那么，`x += y`等同于`x = x + y`。
通常，这里会用一个数字来代替变量`y`。
其他 5 种运算也可以用类似的方式完成。

```javascript
let x = 5;
x += 25; // x is now 30

let y = 31;
y %= 3; // y is now 1
```

[mdn-operator-precedence]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence#table
