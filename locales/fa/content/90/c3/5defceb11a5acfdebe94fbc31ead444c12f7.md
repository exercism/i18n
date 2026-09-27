# درباره

[نمایه‌سازها](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/indexers/) این امکان را می‌دهند که مقادیر یک شیء با عملگر نمایه‌سازی `[]` دریافت یا تنظیم شوند. هر نمایه‌ساز یک آرگومان می‌گیرد و می‌تواند بخش `get` و/یا `set` داشته باشد. بخش `set` یک نمایه‌ساز یک مقدار ویژه‌ی `value` دارد که همان مقداری است که به نمایه‌ساز فرستاده می‌شود.

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

اگر بخش `set` نمایه‌ساز را حذف کنید، یک نمایه‌ساز فقط‌خواندنی خواهید داشت. می‌توان از بدنه‌ی عبارتی استفاده کرد تا تعریف یک نمایه‌ساز فقط‌خواندنی مختصرتر شود:

```csharp
class LapTimes
{
    private int[] times = new[] { 2, 4, 3, 8 };

    public int this[int lap] => times[lap];
}
```

پارامتر یک نمایه‌ساز لازم نیست `int` باشد؛ می‌تواند هر نوعی باشد:

```csharp
class LapTimes
{
    // ...
    public int this[string lap] => times[Convert.ToInt32(lap)];
}
```

نمایه‌سازها را نیز می‌توان سربارگذاری کرد:

```csharp
class LapTimes
{
    public int this[int lap] => times[lap];
    public int this[string lap] => times[Convert.ToInt32(lap)];
}
```
