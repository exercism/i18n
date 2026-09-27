# Informazioni

L'operatore rest `...` serve a gestire un numero indefinito di argomenti. Si mette come ultimo argomento di una funzione:

```haxe
function f(...nums:Int) {
  for (num in nums) {
    trace(num);
  }
}

f(1, 2, 3, 4, 5); // Output is 1 2 3 4 5
```
