# Acerca de

Los [indexadores](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/indexers/) permiten obtener o establecer los valores de un objeto mediante el operador de indexación: `[]`. Un indexador recibe un solo argumento y puede tener una parte `get`, una parte `set`, o ambas. La parte `set` de un indexador tiene un valor especial, `value`, que es el valor que se le pasa al indexador.

```csharp
class LapTimes
{
    private int[] times = new[] { 2, 4, 3, 8 };

    public int this[int lap]
    {
        get { return times[lap]; }
        set { times[lap] = value; }
    }
}

var lapTimes = new LapTimes();

// Use the getter
Console.WriteLine(lapTimes[1]); // => 4

// Use the setter
lapTimes[2] = 5;
Console.WriteLine(lapTimes[2]); // => 5
```

Si omites la parte `set` del indexador, obtienes un indexador de solo lectura. Se puede usar un cuerpo de expresión para definir un indexador de solo lectura de forma más concisa:

```csharp
class LapTimes
{
    private int[] times = new[] { 2, 4, 3, 8 };

    public int this[int lap] => times[lap];
}
```

El parámetro de un indexador no tiene que ser un `int`; puede ser de cualquier tipo:

```csharp
class LapTimes
{
    // ...
    public int this[string lap] => times[Convert.ToInt32(lap)];
}
```

Los indexadores también se pueden sobrecargar:

```csharp
class LapTimes
{
    public int this[int lap] => times[lap];
    public int this[string lap] => times[Convert.ToInt32(lap)];
}
```
