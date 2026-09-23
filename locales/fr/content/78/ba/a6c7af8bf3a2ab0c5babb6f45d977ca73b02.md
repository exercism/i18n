# À propos

L'opérateur _rest_ `...` permet de gérer un nombre indéfini d'arguments. Il se place en dernier argument d'une fonction :

```haxe
function f(...nums:Int) {
  for (num in nums) {
    trace(num);
  }
}

f(1, 2, 3, 4, 5); // Output is 1 2 3 4 5
```
