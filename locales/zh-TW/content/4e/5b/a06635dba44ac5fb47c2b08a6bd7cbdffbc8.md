# 簡介

處理陣列時，有時你會想對陣列中的每個值執行程式碼。這個過程稱為疊代，也就是對陣列執行迴圈。

這裡要看的是過程中不需要修改陣列的情況。如果你要轉換陣列，請參考[陣列轉換][concept-array-transformations]。

## `for`迴圈

對陣列進行疊代最基本的方式，就是使用`for`迴圈，請參考[`for`迴圈][concept-for-loops]。

```javascript
const numbers = [6.0221515, 10, 23];

for (let i = 0; i < numbers.length; i++) {
  console.log(numbers[i]);
}
// => 6.0221515
// => 10
// => 23
```

## `for...of`迴圈

如果你想在每次疊代中直接處理值，完全不需要索引，就可以使用`for...of`迴圈。

`for...of`的運作方式和上面最基本的`for`迴圈一樣，但你不需要在迴圈裡用變數處理_索引_，而是直接取得_值_。

```javascript
const numbers = [6.0221515, 10, 23];

// Because re-assigning number inside the loop will be very
// confusing, disallowing that via const is preferable.
for (const number of numbers) {
  console.log(number);
}
// => 6.0221515
// => 10
// => 23
```

就像一般的`for`迴圈一樣，你可以用`continue`停止當前的疊代，用`break`完全停止迴圈的執行。

## `forEach`方法

每個陣列都有`forEach`方法，可以用來走訪陣列中的元素。

`forEach`接受一個[回呼][concept-callbacks]做為參數。
這個回呼函式會對陣列中的每個元素呼叫一次。
當前元素、它的索引，以及整個陣列，都會做為引數傳給回呼。
通常只會用到當前元素或索引。

```javascript
const numbers = [6.0221515, 10, 23];

numbers.forEach((number, index) => console.log(number, index));
// => 6.0221515 0
// => 10 1
// => 23 2
```

一旦`forEach`迴圈開始執行，就沒有辦法停止疊代。`break`和`continue`這兩個敘述在這個情境中並不存在。

[concept-array-transformations]: /tracks/javascript/concepts/array-transformations
[concept-for-loops]: /tracks/javascript/concepts/for-loops
[concept-callbacks]: /tracks/javascript/concepts/callbacks
