# مقدمة

ترتبط أنواع `struct` في C# ارتباطًا وثيقًا بأنواع `class`.
فلديها حالة وسلوك.
ولديها مُنشئات تأخذ وسائط، ويمكن إسناد نسخ منها، واختبارها للمساواة وتخزينها في مجموعات.

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
