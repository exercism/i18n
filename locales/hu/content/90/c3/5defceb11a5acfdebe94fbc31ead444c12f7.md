# Névjegy

Az [indexelők](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/indexers/) lehetővé teszik, hogy egy objektum értékeit az indexelő operátorral olvasd ki vagy állítsd be: `[]`. Az indexelő egyetlen argumentumot kap, és rendelkezhet `get`, illetve `set` résszel is. Az indexelő `set` részében egy különleges `value` érték áll rendelkezésre: ez az az érték, amelyet átadunk az indexelőnek.

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

Ha elhagyod az indexelő `set` részét, csak olvasható indexelőt kapsz. Egy kifejezéstörzzsel tömörebben is megadhatod a csak olvasható indexelőt:

```csharp
class LapTimes
{
    private int[] times = new[] { 2, 4, 3, 8 };

    public int this[int lap] => times[lap];
}
```

Az indexelő paramétere nem feltétlenül `int`, bármilyen típus lehet:

```csharp
class LapTimes
{
    // ...
    public int this[string lap] => times[Convert.ToInt32(lap)];
}
```

Az indexelőket túl is terhelheted:

```csharp
class LapTimes
{
    public int this[int lap] => times[lap];
    public int this[string lap] => times[Convert.ToInt32(lap)];
}
```
