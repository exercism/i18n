# 簡介

JavaScript 中的`null`值代表刻意缺少的物件值。它是 JavaScript 的原始型別之一。

```javascript
// I do not have an apple.
var apple = null;
apple; // => null

// null is treated as falsy for boolean operations, therefore
!apple; // => true
!!apple; // => false
```
