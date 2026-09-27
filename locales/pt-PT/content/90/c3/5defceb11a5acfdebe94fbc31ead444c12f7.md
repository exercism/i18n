# Sobre

[Indexadores](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/indexers/) permitem obter ou definir os valores de um objeto através do operador de indexação: `[]`. Um indexador recebe um único argumento e pode ter uma parte `get` e/ou `set`. A parte `set` de um indexador tem um valor especial `value`, que é o valor passado ao indexador.

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

Se omitires a parte `set` do indexador, obténs um indexador só de leitura. Podes usar um corpo de expressão para definir um indexador só de leitura de forma mais sucinta:

```csharp
class LapTimes
{
    private int[] times = new[] { 2, 4, 3, 8 };

    public int this[int lap] => times[lap];
}
```

O parâmetro de um indexador não tem de ser um `int`, pode ser de qualquer tipo:

```csharp
class LapTimes
{
    // ...
    public int this[string lap] => times[Convert.ToInt32(lap)];
}
```

Os indexadores também podem ser sobrecarregados:

```csharp
class LapTimes
{
    public int this[int lap] => times[lap];
    public int this[string lap] => times[Convert.ToInt32(lap)];
}
```
