# 概要

[インデクサー](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/indexers/)を使うと、オブジェクトの値をインデックス演算子`[]`で取得したり設定したりできます。インデクサーは引数を1つ取り、`get`と`set`の両方、またはいずれか一方を持てます。インデクサーの`set`の部分には特別な`value`という値があり、これがインデクサーに渡された値になります。

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

インデクサーの`set`の部分を省略すると、読み取り専用のインデクサーになります。式形式の本体を使うと、読み取り専用のインデクサーをより簡潔に定義できます。

```csharp
class LapTimes
{
    private int[] times = new[] { 2, 4, 3, 8 };

    public int this[int lap] => times[lap];
}
```

インデクサーの仮引数は`int`である必要はなく、どんな型でもかまいません。

```csharp
class LapTimes
{
    // ...
    public int this[string lap] => times[Convert.ToInt32(lap)];
}
```

インデクサーはオーバーロードすることもできます。

```csharp
class LapTimes
{
    public int this[int lap] => times[lap];
    public int this[string lap] => times[Convert.ToInt32(lap)];
}
```
