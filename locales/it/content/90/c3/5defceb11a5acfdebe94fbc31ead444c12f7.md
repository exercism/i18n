# Informazioni

Gli [indicizzatori](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/indexers/) permettono di ottenere o impostare i valori di un oggetto tramite l'operatore di indicizzazione: `[]`. Un indicizzatore accetta un solo argomento e può avere sia una parte `get` che una parte `set`, o entrambe. La parte `set` di un indicizzatore ha un valore speciale, `value`, cioè il valore che viene passato all'indicizzatore.

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

Se ometti la parte `set` dell'indicizzatore, ottieni un indicizzatore in sola lettura. Si può usare un corpo di espressione per definire un indicizzatore in sola lettura in modo più conciso:

```csharp
class LapTimes
{
    private int[] times = new[] { 2, 4, 3, 8 };

    public int this[int lap] => times[lap];
}
```

Il parametro di un indicizzatore non deve essere per forza un `int`, può essere di qualsiasi tipo:

```csharp
class LapTimes
{
    // ...
    public int this[string lap] => times[Convert.ToInt32(lap)];
}
```

Gli indicizzatori possono anche essere sovraccaricati:

```csharp
class LapTimes
{
    public int this[int lap] => times[lap];
    public int this[string lap] => times[Convert.ToInt32(lap)];
}
```
