# Докладніше

[Індексатори](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/indexers/) дають змогу отримувати або встановлювати значення обʼєкта за допомогою оператора індексації: `[]`. Індексатор приймає один аргумент і може мати як частину `get`, так і частину `set`. Частина `set` індексатора має спеціальне значення `value`, яке передається індексатору.

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

Якщо не вказати частину `set` індексатора, отримаємо індексатор лише для читання. Щоб описати індексатор лише для читання коротше, можна скористатися тілом-виразом:

```csharp
class LapTimes
{
    private int[] times = new[] { 2, 4, 3, 8 };

    public int this[int lap] => times[lap];
}
```

Параметр індексатора не обовʼязково має бути `int`, він може бути будь-якого типу:

```csharp
class LapTimes
{
    // ...
    public int this[string lap] => times[Convert.ToInt32(lap)];
}
```

Індексатори також можна перевантажувати:

```csharp
class LapTimes
{
    public int this[int lap] => times[lap];
    public int this[string lap] => times[Convert.ToInt32(lap)];
}
```
