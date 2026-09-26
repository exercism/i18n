# はじめに

JavaScriptの`null`値は、オブジェクトの値が意図的に存在しないことを表します。これはJavaScriptのプリミティブ型の1つです。

```javascript
// I do not have an apple.
var apple = null;
apple; // => null

// null is treated as falsy for boolean operations, therefore
!apple; // => true
!!apple; // => false
```
