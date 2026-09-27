# Introducción

El desbordamiento aritmético se produce cuando un cálculo, como una operación aritmética o una conversión de tipo, da como resultado un valor mayor que la capacidad del tipo que lo recibe.

Las expresiones de tipo `int` y `long`, y sus equivalentes sin signo, dan la vuelta de forma silenciosa en estas circunstancias.

El comportamiento de los cálculos con números enteros se puede modificar con la palabra clave `checked`. Cuando se produce un desbordamiento dentro de un bloque `checked`, se lanza una instancia de `OverflowException`.

```csharp
int one = 1;
checked
{
    int expr = int.MaxValue + one;   // OverflowException is thrown
}

// or

int expr2 = checked(int.MaxValue + one);     // OverflowException is thrown
```

Las expresiones de tipo `float` y `double` adoptan un valor especial: infinito.

Las expresiones de tipo `decimal` lanzan una instancia de `OverflowException`.
