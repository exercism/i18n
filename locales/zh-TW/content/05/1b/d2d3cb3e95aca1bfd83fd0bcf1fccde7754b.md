# 認識 JavaScript 中的遞迴

遞迴是程式設計中一個很強大的概念，指的是函式會呼叫自己。
一開始可能有點難掌握，但只要你懂了基本觀念，它就會成為解決複雜問題的利器。
我們會用簡單易懂的範例，一起探索 JavaScript 中的遞迴。

## 什麼是遞迴？

當一個函式直接或間接呼叫自己時，就是遞迴。
它和迴圈很像，但還牽涉到把問題拆解成更小、更好處理的子問題。

### 範例 1：倒數

我們從一個簡單的例子開始：倒數函式。

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

在這個例子中：

- **基本情況**：當`num`小於或等於 0 時，函式會印出 "Blastoff!" 並停止呼叫自己。
- **遞迴情況**：函式會印出目前的`num`，並用`num - 1`再呼叫自己一次。

### 範例 2：階乘

接著來看一個經典的遞迴例子：計算一個數字的階乘。

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

在這個例子中：

- **基本情況**：當`n`是 0 或 1 時，函式回傳 1。
- **遞迴情況**：函式會把`n`乘以`n - 1`的階乘。

## 關鍵概念

### 基本情況

每個遞迴函式都至少要有一個基本情況，也就是讓函式停止呼叫自己的條件。
少了基本情況，遞迴就會無止境地繼續下去，最後導致堆疊溢位。

### 遞迴情況

遞迴情況定義了函式如何用更小、更簡單的版本來呼叫自己。

## 遞迴的優點與缺點

**優點：**

- 對某些問題來說，解法很優雅。
- 和數學歸納法的概念很像。

**缺點：**

- 效率可能不如疊代解法。
- 遞迴太深時可能造成堆疊溢位。

## 結語

遞迴是一項很有用的技巧，能把複雜的問題拆成更小、更好處理的子問題，讓問題變得更簡單。
想用 JavaScript 寫出有效的遞迴解法，理解基本情況和遞迴情況是關鍵。

**延伸閱讀：**

- [MDN：JavaScript 中的遞迴](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions#recursion)
- [Eloquent JavaScript：第 3 章「函式」](https://eloquentjavascript.net/03_functions.html)
