# 關於

[索引子](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/indexers/)允許透過索引運算子`[]`取得或設定物件的值。索引子接受單一引數，並且可以包含`get`和／或`set`部分。索引子的`set`部分有一個特殊的`value`值，這個值就是傳入索引子的值。

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

如果省略索引子的`set`部分，就會得到唯讀索引子。可以使用運算式主體，讓定義唯讀索引子更簡潔：

```csharp
class LapTimes
{
    private int[] times = new[] { 2, 4, 3, 8 };

    public int this[int lap] => times[lap];
}
```

索引子的參數不必是`int`，可以是任何型別：

```csharp
class LapTimes
{
    // ...
    public int this[string lap] => times[Convert.ToInt32(lap)];
}
```

索引子也可以多載：

```csharp
class LapTimes
{
    public int this[int lap] => times[lap];
    public int this[string lap] => times[Convert.ToInt32(lap)];
}
```
