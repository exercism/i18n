# 개요

rest 연산자 `...`는 개수가 정해지지 않은 여러 인자를 다룰 때 사용해요. 함수의 마지막 인자로 넣어요.

```haxe
function f(...nums:Int) {
  for (num in nums) {
    trace(num);
  }
}

f(1, 2, 3, 4, 5); // Output is 1 2 3 4 5
```
