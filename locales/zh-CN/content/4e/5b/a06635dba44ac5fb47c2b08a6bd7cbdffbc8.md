# 简介

处理数组时，你有时需要对数组中的每个值执行代码。这叫做遍历数组，或者对数组进行循环。

这里我们讨论的是不需要在过程中修改数组的情况。如果要转换数组，请参见[数组转换概念][concept-array-transformations]。

## `for`循环

遍历数组最基本的方式是使用`for`循环，参见[`for`循环概念][concept-for-loops]。

```javascript
const numbers = [6.0221515, 10, 23];

for (let i = 0; i < numbers.length; i++) {
  console.log(numbers[i]);
}
// => 6.0221515
// => 10
// => 23
```

## `for...of`循环

如果你希望在每次迭代中直接处理值，完全不需要下标，就可以使用`for...of`循环。

`for...of`的工作方式和上面介绍的基本`for`循环一样，只不过你不需要把_下标_当作循环中的变量来处理，而是直接拿到_值_。

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

和普通的`for`循环一样，你可以用`continue`结束当前这次迭代，用`break`彻底结束循环的执行。

## `forEach`方法

每个数组都带有一个`forEach`方法，可以用来遍历数组中的元素。

`forEach`接受一个[回调][concept-callbacks]作为形参。回调函数会为数组中的每个元素调用一次。当前元素、它的下标以及整个数组都会作为实参传给回调。通常只会用到当前元素或下标。

```javascript
const numbers = [6.0221515, 10, 23];

numbers.forEach((number, index) => console.log(number, index));
// => 6.0221515 0
// => 10 1
// => 23 2
```

一旦`forEach`循环开始，就无法中途停止迭代。在这个场景里不存在`break`和`continue`语句。

[concept-array-transformations]: /tracks/javascript/concepts/array-transformations
[concept-for-loops]: /tracks/javascript/concepts/for-loops
[concept-callbacks]: /tracks/javascript/concepts/callbacks
