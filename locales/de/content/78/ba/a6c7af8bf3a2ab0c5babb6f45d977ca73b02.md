# Über

Mit dem Rest-Operator `...` kannst du eine unbestimmte Anzahl von Argumenten verarbeiten. Er wird als letztes Argument einer Funktion angegeben:

```haxe
function f(...nums:Int) {
  for (num in nums) {
    trace(num);
  }
}

f(1, 2, 3, 4, 5); // Output is 1 2 3 4 5
```
