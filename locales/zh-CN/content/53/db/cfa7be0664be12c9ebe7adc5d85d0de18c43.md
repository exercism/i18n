# 简介

JavaScript 内置了一个`...`运算符，让处理不定数量的元素变得更简单。根据上下文，它被称为_剩余运算符_或_展开运算符_。

## 剩余运算符

### 剩余元素

当`...`出现在赋值的左侧时，这三个点被称为`rest`运算符。三个点合上变量名，就叫作剩余元素。它会收集零个或多个值，并把它们存进一个数组里。

```javascript
const [a, b, ...everythingElse] = [0, 1, 1, 2, 3, 5, 8];
a;
// => 0
b;
// => 1
everythingElse;
// => [1, 2, 3, 5, 8]
```

注意，和某些其他语言不同，JavaScript 中的`rest`元素不能有尾随逗号。它_必须_是解构赋值中的最后一个元素。下面的例子会抛出`SyntaxError`：

```javascript
const [...items, last] = [2, 4, 8, 16]
```

### 剩余属性

和数组类似，剩余运算符也可以用来收集一个或多个对象属性，并把它们存进一个对象里。

```javascript
const { street, ...address } = {
  street: 'Platz der Republik 1',
  postalCode: '11011',
  city: 'Berlin',
};
street;
// => 'Platz der Republik 1'
address;
// => {postalCode: '11011', city: 'Berlin'}
```

## 剩余参数

当`...`出现在函数定义中最后一个形参旁边时，这个形参被称为_剩余参数_。它让函数能够以数组的形式接收不定数量的实参。

```javascript
function concat(...strings) {
  return strings.join(' ');
}
concat('one');
// => 'one'
concat('one', 'two', 'three');
// => 'one two three'
```

## 展开

### 展开元素

当`...`出现在赋值的右侧时，它被称为`spread`运算符。它会把数组展开成一列元素。和剩余元素不同，它可以出现在数组字面量表达式中的任何位置，而且可以有多个。

```javascript
const oneToFive = [1, 2, 3, 4, 5];
const oneToTen = [...oneToFive, 6, 7, 8, 9, 10];
oneToTen;
// => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const woow = ['A', ...oneToFive, 'B', 'C', 'D', 'E', ...oneToFive, 42];
woow;
// =>  ["A", 1, 2, 3, 4, 5, "B", "C", "D", "E", 1, 2, 3, 4, 5, 42]
```

### 展开属性

和数组类似，展开运算符也可以用来把一个对象的属性复制到另一个对象里。

```javascript
let address = {
  postalCode: '11011',
  city: 'Berlin',
};
address = { ...address, country: 'Germany' };
// => {
//   postalCode: '11011',
//   city: 'Berlin',
//   country: 'Germany',
// }
```
