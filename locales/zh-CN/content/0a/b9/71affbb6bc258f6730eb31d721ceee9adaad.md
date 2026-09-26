# 简介

JavaScript 中的`null`值表示有意让某个对象值缺失，它是 JavaScript 的原始类型之一。

```javascript
// I do not have an apple.
var apple = null;
apple; // => null

// null is treated as falsy for boolean operations, therefore
!apple; // => true
!!apple; // => false
```
