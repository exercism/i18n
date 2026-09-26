# はじめに

C#の`struct`は`class`と密接に関係しています。
状態と振る舞いを持っています。
引数を受け取るコンストラクターがあり、インスタンスは代入したり、等価性を調べたり、コレクションに格納したりできます。

```csharp
enum Unit
{
    Kg,
    Lb
}
struct Weight
{
    private double count;
    private Unit unit;

    public Weight(double count, Unit unit)
    {
        this.count = count;
        this.unit = unit;
    }

    public override string ToString()
    {
        return count.ToString() + unit.ToString();
    }
}

new Weight(77.5, Unit.Kg).ToString();
// => "77.6Kg"
```
