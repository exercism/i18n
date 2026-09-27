# 關於

其餘運算子`...`用來處理數量不確定的引數。它會放在函式的最後一個引數的位置：

```haxe
function f(...nums:Int) {
  for (num in nums) {
    trace(num);
  }
}

f(1, 2, 3, 4, 5); // Output is 1 2 3 4 5
```
