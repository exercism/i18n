# نبذة

تسمح [المفهرسات](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/indexers/) بقراءة قيم كائن ما أو تعيينها عبر عامل الفهرسة: `[]`. يأخذ المفهرس وسيطًا واحدًا، ويمكن أن يحتوي على الجزء `get` و/أو الجزء `set`. يحتوي الجزء `set` في المفهرس على قيمة خاصة اسمها `value`، وهي القيمة التي تُمرَّر إلى المفهرس.

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

إذا حذفت الجزء `set` من المفهرس، فستحصل على مفهرس للقراءة فقط. ويمكن استخدام جسم تعبير لكتابة تعريف مفهرس للقراءة فقط بصورة أكثر إيجازًا:

```csharp
class LapTimes
{
    private int[] times = new[] { 2, 4, 3, 8 };

    public int this[int lap] => times[lap];
}
```

لا يلزم أن يكون معامل المفهرس من النوع `int`، بل يمكن أن يكون من أي نوع:

```csharp
class LapTimes
{
    // ...
    public int this[string lap] => times[Convert.ToInt32(lap)];
}
```

ويمكن أيضًا زيادة تحميل المفهرسات:

```csharp
class LapTimes
{
    public int this[int lap] => times[lap];
    public int this[string lap] => times[Convert.ToInt32(lap)];
}
```
