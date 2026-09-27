# Introduction

জাভাস্ক্রিপ্টে `null` মানটি একটি অবজেক্ট মানের ইচ্ছাকৃত অনুপস্থিতি বোঝায়। এটি জাভাস্ক্রিপ্টের প্রিমিটিভ টাইপগুলোর একটি।

```javascript
// I do not have an apple.
var apple = null;
apple; // => null

// null is treated as falsy for boolean operations, therefore
!apple; // => true
!!apple; // => false
```
