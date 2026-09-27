# 簡介

C# 的 `struct` 和 `class` 關係密切。它們有狀態和行為。它們有接受引數的建構函式，執行個體可以被指定、比較是否相等，也能儲存在集合中。

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
