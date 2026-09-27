# Introducción

## Sobrecarga de métodos

_La sobrecarga de métodos_ permite que varios métodos de la misma clase tengan el mismo nombre. Los métodos sobrecargados deben diferenciarse entre sí por:

- El número de parámetros
- El tipo de los parámetros

No existe la sobrecarga de métodos basada en el tipo devuelto.

El compilador inferirá automáticamente qué método sobrecargado debe llamar en función del número de parámetros y de su tipo.

## Argumentos con nombre

Hasta ahora hemos visto que los argumentos que se pasan a un método se asignan a los parámetros declarados del método según su posición. Como alternativa, especialmente cuando una rutina recibe un número elevado de argumentos, quien llama al método puede asignar los argumentos especificando el identificador del parámetro declarado.

A continuación se ilustra la sintaxis:

```csharp
class Card
{
    static string NewYear(int year, int month, int day)
    {
        return $"Happy {year}-{month}-{day}!";
    }
}

Card.NewYear(month: 1, day: 1, year: 2020);  // => "Happy 2020-1-1!"
```

## Parámetros opcionales

Un parámetro de un método puede volverse opcional si se le asigna un valor predeterminado. Al llamar a un método con parámetros opcionales, quien llama no está obligado a pasarles un valor. Si no se pasa ningún valor a un parámetro opcional, se usará su valor predeterminado.

Los parámetros opcionales _deben_ estar al final de la lista de parámetros; no pueden ir seguidos de parámetros no opcionales.

```csharp
class Card
{
    static string NewYear(int year = 2020)
    {
        return $"Happy {year}!";
    }
}

Card.NewYear();     // => "Happy 2020!"
Card.NewYear(1999); // => "Happy 1999!"
```
