# مقدمه

`struct`ها در C# ارتباط نزدیکی با `class`ها دارند.
آن‌ها حالت و رفتار دارند.
سازنده‌هایی دارند که آرگومان می‌گیرند؛ می‌توان به نمونه‌ها مقدار تخصیص داد، برابری‌شان را بررسی کرد و آن‌ها را در مجموعه‌ها ذخیره کرد.

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
