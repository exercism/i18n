# 理解 JavaScript 中的递归

递归是编程中一个强大的概念，它指的是函数调用自身。
一开始可能有点难理解，但一旦掌握了基本原理，它就会成为解决复杂问题的有力工具。
我们将通过通俗易懂的例子，来探索 JavaScript 中的递归。

## 什么是递归？

递归是指函数直接或间接地调用自身。
它类似于循环，但可能会把问题拆解成更小、更容易处理的子问题。

### 示例 1：倒计时

我们先从一个简单的例子开始：一个倒计时函数。

```javascript
function countdown(num) {
  // Base case
  if (num <= 0) {
    console.log('Blastoff!');
    return;
  }

  // Recursive case
  console.log(num);
  countdown(num - 1);
}

// Call the function
countdown(5);
```

在这个例子中：

- **基本情况**：当`num`小于或等于 0 时，函数会打印出“Blastoff!”并停止调用自身。
- **递归情况**：函数会打印当前的`num`，并用`num - 1`调用自身。

### 示例 2：阶乘

接下来，我们看一个递归的经典例子：计算一个数的阶乘。

```javascript
function factorial(n) {
  // Base case
  if (n === 0 || n === 1) {
    return 1;
  }

  // Recursive case
  return n * factorial(n - 1);
}

// Test the function
console.log(factorial(5)); // Output: 120
```

在这个例子中：

- **基本情况**：当`n`为 0 或 1 时，函数返回 1。
- **递归情况**：函数将`n`乘以`n - 1`的阶乘。

## 关键概念

### 基本情况

每个递归函数都至少要有一个基本情况，也就是函数停止调用自身的条件。
如果没有基本情况，递归会无限进行下去，最终导致栈溢出。

### 递归情况

递归情况定义的是函数如何用一个更小或更简单的问题版本来调用自身。

## 递归的优缺点

**优点：**

- 对某些问题来说，解法优雅。
- 与数学归纳法的思想相似。

**缺点：**

- 可能比迭代解法效率低。
- 递归太深时可能导致栈溢出。

## 总结

递归是一种很有价值的技术，它把复杂问题拆解成更小、更容易处理的子问题，从而简化问题。
理解基本情况和递归情况，对于在 JavaScript 中写出有效的递归解法至关重要。

**了解更多：**

- [MDN：JavaScript 中的递归](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions#recursion)
- [Eloquent JavaScript：第 3 章：函数](https://eloquentjavascript.net/03_functions.html)
