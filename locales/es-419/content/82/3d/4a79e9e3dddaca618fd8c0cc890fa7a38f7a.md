# Introducción

## Sobrecarga de métodos

La _sobrecarga de métodos_ permite que varios métodos de la misma clase tengan el mismo nombre. Los métodos sobrecargados deben diferenciarse entre sí por:

- La cantidad de parámetros
- El tipo de los parámetros

No existe la sobrecarga de métodos basada en el tipo de retorno.

El compilador infiere automáticamente cuál de los métodos sobrecargados llamar, según la cantidad de parámetros y su tipo.

## Argumentos con nombre

Hasta ahora hemos visto que los argumentos que se pasan a un método se hacen coincidir con los parámetros declarados del método según su posición. Como alternativa, sobre todo cuando una rutina recibe una gran cantidad de argumentos, quien llama puede hacer coincidir los argumentos especificando el identificador del parámetro declarado.

Lo siguiente ilustra la sintaxis:

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

Un parámetro de un método puede volverse opcional si se le asigna un valor predeterminado. Al llamar a un método con parámetros opcionales, no es obligatorio pasarles un valor. Si no se pasa un valor para un parámetro opcional, se usa su valor predeterminado.

Los parámetros opcionales _deben_ ir al final de la lista de parámetros; no pueden ir seguidos de parámetros no opcionales.

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
