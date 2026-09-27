# نبذة

يُستخدم عامل rest `...` للتحكم في وسائط عددها غير محدد من العناصر، ويوضع كآخر معامل في الدالة:

```haxe
function f(...nums:Int) {
  for (num in nums) {
    trace(num);
  }
}

f(1, 2, 3, 4, 5); // Output is 1 2 3 4 5
```
