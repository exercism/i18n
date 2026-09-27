# 簡介

## 算術運算子

JavaScript 提供了 6 種不同的運算子，用來對數字進行基本的算術運算。

- `+`：加法運算子用來求數字的和。
- `-`：減法運算子用來求兩個數字的差。
- `*`：乘法運算子用來求兩個數字的乘積。
- `/`：除法運算子用來將兩個數字相除。

```javascript
2 - 1.5; //=> 0.5
19 / 2; //=> 9.5
```

- `%`：餘數運算子用來求相除後的餘數。

  ```javascript
  40 % 4; // => 0
  -11 % 4; // => -3
  ```

- `**`：指數運算子用來計算數字的次方。

  ```javascript
  4 ** 3; // => 64
  4 ** 1 / 2; // => 2
  ```

## 運算順序

在同一行使用多個運算子時，JavaScript 會依照[這個優先順序表][mdn-operator-precedence]所列的優先順序來計算。
簡單來說，就我們的情境而言，JavaScript 採用的是我們在國小數學課學過的 PEDMAS 規則（括號、指數、乘除、加減）。

<!-- prettier-ignore-start -->
```javascript
const result = 3 ** 3 + 9 * 4 / (3 - 1);
// => 3 ** 3 + 9 * 4/2
// => 27 + 9 * 4/2
// => 27 + 18
// => 45
```
<!-- prettier-ignore-end -->

## 複合指定運算子

複合指定運算子是一種更簡短的寫法，用來對變數做算術運算，並把新的值指定給同一個變數。
舉例來說，假設有兩個變數 `x` 和 `y`。
那麼，`x += y` 等同於 `x = x + y`。
通常會搭配數字使用，而不是變數 `y`。
其他 5 種運算也可以用類似的方式進行。

```javascript
let x = 5;
x += 25; // x is now 30

let y = 31;
y %= 3; // y is now 1
```

[mdn-operator-precedence]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence#table
