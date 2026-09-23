# Σχετικά

Οι [ευρετηριαστές](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/indexers/) επιτρέπουν να λάβεις ή να ορίσεις τις τιμές ενός αντικειμένου μέσω του τελεστή ευρετηρίασης: `[]`. Ένας ευρετηριαστής δέχεται ένα μόνο όρισμα και μπορεί να έχει ένα μέρος `get` ή/και `set`. Το μέρος `set` ενός ευρετηριαστή έχει μια ειδική τιμή, το `value`, που είναι η τιμή που δέχεται ο ευρετηριαστής.

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

Αν παραλείψεις το μέρος `set` του ευρετηριαστή, παίρνεις έναν ευρετηριαστή μόνο για ανάγνωση. Με ένα σώμα έκφρασης, ο ορισμός ενός ευρετηριαστή μόνο για ανάγνωση γίνεται πιο συνοπτικός:

```csharp
class LapTimes
{
    private int[] times = new[] { 2, 4, 3, 8 };

    public int this[int lap] => times[lap];
}
```

Η παράμετρος ενός ευρετηριαστή δεν χρειάζεται να είναι `int`· μπορεί να είναι οποιουδήποτε τύπου:

```csharp
class LapTimes
{
    // ...
    public int this[string lap] => times[Convert.ToInt32(lap)];
}
```

Οι ευρετηριαστές μπορούν επίσης να υπερφορτωθούν:

```csharp
class LapTimes
{
    public int this[int lap] => times[lap];
    public int this[string lap] => times[Convert.ToInt32(lap)];
}
```
