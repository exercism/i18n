# مقدمة

تمثّل القيمة `null` في JavaScript الغياب المتعمّد لقيمة كائن. وهي إحدى الأنواع الأولية في JavaScript.

```javascript
// I do not have an apple.
var apple = null;
apple; // => null

// null is treated as falsy for boolean operations, therefore
!apple; // => true
!!apple; // => false
```
