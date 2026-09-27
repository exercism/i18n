# Über

[Indexer](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/indexers/) ermöglichen es, die Werte eines Objekts über den Indexoperator `[]` abzurufen oder festzulegen. Ein Indexer nimmt ein einzelnes Argument entgegen und kann sowohl einen `get`- als auch einen `set`-Teil haben. Der `set`-Teil eines Indexers hat einen speziellen `value`-Wert. Das ist der Wert, der an den Indexer übergeben wird.

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

Wenn du den `set`-Teil des Indexers weglässt, erhältst du einen schreibgeschützten Indexer. Mit einem Ausdruckskörper lässt sich ein schreibgeschützter Indexer prägnanter definieren:

```csharp
class LapTimes
{
    private int[] times = new[] { 2, 4, 3, 8 };

    public int this[int lap] => times[lap];
}
```

Der Parameter eines Indexers muss nicht `int` sein; er kann jeden beliebigen Typ haben:

```csharp
class LapTimes
{
    // ...
    public int this[string lap] => times[Convert.ToInt32(lap)];
}
```

Indexer können auch überladen werden:

```csharp
class LapTimes
{
    public int this[int lap] => times[lap];
    public int this[string lap] => times[Convert.ToInt32(lap)];
}
```
