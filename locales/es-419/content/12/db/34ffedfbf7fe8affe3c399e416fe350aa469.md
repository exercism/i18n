# Instrucciones

En este ejercicio vas a implementar el manejo de errores para una calculadora de números enteros sencilla. Para simplificar las cosas, se proporcionan los métodos para calcular la suma, la multiplicación y la división.

El objetivo es tener una calculadora funcional que devuelva un string con el siguiente patrón: `16 + 51 = 67`, cuando se le pasan los argumentos `16`, `51` y `+`.

```csharp
SimpleCalculator.Calculate(16, 51, "+"); // => returns "16 + 51 = 67"

SimpleCalculator.Calculate(32, 6, "*"); // => returns "32 * 6 = 192"

SimpleCalculator.Calculate(512, 4, "/"); // => returns "512 / 4 = 128"
```

## 1. Implementa las operaciones de la calculadora

El método principal que implementarás en esta tarea será el método (_static_) `SimpleCalculator.Calculate()`. Recibe tres argumentos. Los dos primeros son números enteros sobre los que se va a realizar una operación. El tercero es de tipo string y para este ejercicio es necesario implementar las siguientes operaciones:

- la suma usando el string `+`
- la multiplicación usando el string `*`
- la división usando el string `/`

## 2. Maneja las operaciones ilegales

Cualquier otro símbolo de operación debería lanzar la excepción `ArgumentOutOfRangeException`. Si el argumento de operación es un string vacío, entonces el método debería lanzar la excepción `ArgumentException`. Cuando se proporciona `null` como argumento de operación, entonces el método debería lanzar la excepción `ArgumentNullException`.

```csharp
SimpleCalculator.Calculate(100, 10, "-"); // => throws ArgumentOutOfRangeException

SimpleCalculator.Calculate(8, 2, ""); // => throws ArgumentException

SimpleCalculator.Calculate(58, 6, null); // => throws ArgumentNullException
```

## 3. Maneja los errores al dividir entre cero

Cuando se intente dividir entre `0`, la calculadora debería devolver un string con el contenido `Division by zero is not allowed.`. Ninguna otra excepción debería ser manejada por el método `SimpleCalculator.Calculate()`.

```csharp
SimpleCalculator.Calculate(512, 0, "/"); // => returns "Division by zero is not allowed."
```
