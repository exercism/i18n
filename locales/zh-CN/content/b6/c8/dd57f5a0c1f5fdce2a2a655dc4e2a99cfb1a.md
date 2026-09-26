# 简介

C# 中的`struct`与`class`密切相关。
它们有状态和行为。
它们有接受实参的构造函数。实例可以被赋值、进行相等性测试，也可以存储在集合中。

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
