# À propos

Les [indexeurs](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/indexers/) permettent de lire ou de définir les valeurs d'un objet au moyen de l'opérateur d'indexation : `[]`. Un indexeur prend un seul argument et peut comporter une partie `get`, une partie `set`, ou les deux. La partie `set` d'un indexeur dispose d'une valeur spéciale `value`, qui est la valeur transmise à l'indexeur.

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

Si on omet la partie `set` de l'indexeur, on obtient un indexeur en lecture seule. Un corps d'expression permet de définir un indexeur en lecture seule de manière plus concise :

```csharp
class LapTimes
{
    private int[] times = new[] { 2, 4, 3, 8 };

    public int this[int lap] => times[lap];
}
```

Le paramètre d'un indexeur n'est pas forcément un `int`, il peut être de n'importe quel type :

```csharp
class LapTimes
{
    // ...
    public int this[string lap] => times[Convert.ToInt32(lap)];
}
```

Les indexeurs peuvent aussi être surchargés :

```csharp
class LapTimes
{
    public int this[int lap] => times[lap];
    public int this[string lap] => times[Convert.ToInt32(lap)];
}
```
