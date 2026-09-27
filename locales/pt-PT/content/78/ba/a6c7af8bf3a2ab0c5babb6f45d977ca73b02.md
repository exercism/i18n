# Sobre

O operador rest `...` serve para controlar argumentos com um número indefinido de elementos. Coloca-se como último argumento de uma função:

```haxe
function f(...nums:Int) {
  for (num in nums) {
    trace(num);
  }
}

f(1, 2, 3, 4, 5); // Output is 1 2 3 4 5
```
