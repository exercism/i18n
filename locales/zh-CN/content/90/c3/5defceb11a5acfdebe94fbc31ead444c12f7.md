# 关于

[索引器](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/indexers/)允许通过索引运算符`[]`获取或设置对象的值。索引器接受一个实参，可以同时包含`get`和`set`部分，也可以只包含其中之一。索引器的`set`部分有一个特殊的`value`值，也就是传递给索引器的值。

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

如果省略索引器的`set`部分，就会得到一个只读索引器。使用表达式主体可以让只读索引器的定义更简洁：

```csharp
class LapTimes
{
    private int[] times = new[] { 2, 4, 3, 8 };

    public int this[int lap] => times[lap];
}
```

索引器的形参不必是`int`，可以是任何类型：

```csharp
class LapTimes
{
    // ...
    public int this[string lap] => times[Convert.ToInt32(lap)];
}
```

索引器也可以重载：

```csharp
class LapTimes
{
    public int this[int lap] => times[lap];
    public int this[string lap] => times[Convert.ToInt32(lap)];
}
```
