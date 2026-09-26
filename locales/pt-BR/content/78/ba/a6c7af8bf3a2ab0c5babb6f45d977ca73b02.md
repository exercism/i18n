# Sobre

O operador rest `...` é usado para controlar os argumentos de um número indefinido de elementos. Ele é colocado como o último argumento de uma função:

```haxe
function f(...nums:Int) {
  for (num in nums) {
    trace(num);
  }
}

f(1, 2, 3, 4, 5); // Output is 1 2 3 4 5
```
