# Acerca de

El operador rest `...` se usa para controlar argumentos de un número indefinido de elementos. Se coloca como último argumento de una función:

```haxe
function f(...nums:Int) {
  for (num in nums) {
    trace(num);
  }
}

f(1, 2, 3, 4, 5); // Output is 1 2 3 4 5
```
