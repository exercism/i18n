# Comprender la recursión en JavaScript

La recursión es un concepto muy potente de la programación que consiste en que una función se llame a sí misma.
Al principio puede resultar un poco difícil de entender, pero en cuanto comprendes los fundamentos se convierte en una herramienta muy útil para resolver problemas complejos.
Vamos a explorar la recursión en JavaScript con ejemplos fáciles de entender.

## ¿Qué es la recursión?

La recursión se produce cuando una función se llama a sí misma, ya sea de forma directa o indirecta.
Es parecida a un bucle, pero puede implicar dividir un problema en subproblemas más pequeños y manejables.

### Ejemplo 1: cuenta atrás

Empecemos con un ejemplo sencillo: una función de cuenta atrás.

```javascript
function countdown(num) {
  // Base case
  if (num <= 0) {
    console.log('Blastoff!');
    return;
  }

  // Recursive case
  console.log(num);
  countdown(num - 1);
}

// Call the function
countdown(5);
```

En este ejemplo:

- **Caso base**: cuando `num` es menor o igual que 0, la función imprime «Blastoff!» y deja de llamarse a sí misma.
- **Caso recursivo**: la función imprime el valor actual de `num` y se llama a sí misma con `num - 1`.

### Ejemplo 2: factorial

Ahora veamos un ejemplo clásico de recursión: calcular el factorial de un número.

```javascript
function factorial(n) {
  // Base case
  if (n === 0 || n === 1) {
    return 1;
  }

  // Recursive case
  return n * factorial(n - 1);
}

// Test the function
console.log(factorial(5)); // Output: 120
```

En este ejemplo:

- **Caso base**: cuando `n` es 0 o 1, la función devuelve 1.
- **Caso recursivo**: la función multiplica `n` por el factorial de `n - 1`.

## Conceptos clave

### Caso base

Toda función recursiva debería tener al menos un caso base, una condición en la que la función deja de llamarse a sí misma.
Sin un caso base, la recursión continuaría indefinidamente y provocaría un desbordamiento de pila.

### Caso recursivo

El caso recursivo define cómo la función se llama a sí misma con una versión más pequeña o más simple del problema.

## Ventajas e inconvenientes de la recursión

**Ventajas:**

- Una solución elegante para ciertos problemas.
- Imita el concepto de inducción matemática.

**Inconvenientes:**

- Puede ser menos eficiente que las soluciones iterativas.
- Puede provocar un desbordamiento de pila en recursiones profundas.

## Conclusión

La recursión es una técnica muy útil que simplifica los problemas complejos dividiéndolos en subproblemas más pequeños y manejables.
Comprender los casos base y los casos recursivos es fundamental para implementar soluciones recursivas eficaces en JavaScript.

**Para saber más:**

- [MDN: recursión en JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions#recursion)
- [Eloquent JavaScript: capítulo 3: funciones](https://eloquentjavascript.net/03_functions.html)
