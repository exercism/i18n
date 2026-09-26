# 概要

rest演算子の`...`を使うと、いくつでも引数を受け取ることができます。関数の最後の引数として書きます。

```haxe
function f(...nums:Int) {
  for (num in nums) {
    trace(num);
  }
}

f(1, 2, 3, 4, 5); // Output is 1 2 3 4 5
```
