# Bevezetés

A `null` érték a JavaScriptben egy objektumérték szándékos hiányát jelöli. Ez a JavaScript egyik primitív típusa.

```javascript
// I do not have an apple.
var apple = null;
apple; // => null

// null is treated as falsy for boolean operations, therefore
!apple; // => true
!!apple; // => false
```
