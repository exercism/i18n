# 关于

剩余运算符`...`用于处理数量不定的参数。它写在函数的最后一个形参位置：

```haxe
function f(...nums:Int) {
  for (num in nums) {
    trace(num);
  }
}

f(1, 2, 3, 4, 5); // Output is 1 2 3 4 5
```
