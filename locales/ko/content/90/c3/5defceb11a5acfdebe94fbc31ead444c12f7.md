# 자세히 알아보기

[인덱서](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/indexers/)를 사용하면 인덱싱 연산자 `[]`를 통해 객체의 값을 가져오거나 설정할 수 있어요. 인덱서는 인자 하나를 받고, `get`과 `set` 부분을 둘 다 가질 수도 있고 둘 중 하나만 가질 수도 있어요. 인덱서의 `set` 부분에는 특별한 `value` 값이 있는데, 이 값이 인덱서에 전달되는 값이에요.

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

인덱서에서 `set` 부분을 생략하면 읽기 전용 인덱서가 돼요. 식 본문을 사용하면 읽기 전용 인덱서를 더 간결하게 정의할 수 있어요.

```csharp
class LapTimes
{
    private int[] times = new[] { 2, 4, 3, 8 };

    public int this[int lap] => times[lap];
}
```

인덱서의 매개변수는 `int`일 필요가 없고, 어떤 타입이든 될 수 있어요.

```csharp
class LapTimes
{
    // ...
    public int this[string lap] => times[Convert.ToInt32(lap)];
}
```

인덱서는 오버로드할 수도 있어요.

```csharp
class LapTimes
{
    public int this[int lap] => times[lap];
    public int this[string lap] => times[Convert.ToInt32(lap)];
}
```
