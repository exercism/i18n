# 소개

JavaScript에서 `null` 값은 객체 값이 의도적으로 없음을 나타내요. `null`은 JavaScript의 원시 타입 중 하나예요.

```javascript
// I do not have an apple.
var apple = null;
apple; // => null

// null is treated as falsy for boolean operations, therefore
!apple; // => true
!!apple; // => false
```
