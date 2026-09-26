# परिचय

JavaScript में `null` वैल्यू किसी ऑब्जेक्ट वैल्यू के जानबूझकर न होने को दर्शाती है। यह JavaScript के प्रिमिटिव टाइप में से एक है।

```javascript
// I do not have an apple.
var apple = null;
apple; // => null

// null is treated as falsy for boolean operations, therefore
!apple; // => true
!!apple; // => false
```
