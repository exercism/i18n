# ভূমিকা

C# `struct`-গুলো `class`-এর সাথে ঘনিষ্ঠভাবে সম্পর্কিত। এদের স্টেট ও বিহেভিয়ার থাকে। এদের কনস্ট্রাক্টর থাকে, যেগুলো আর্গুমেন্ট নেয়; ইনস্ট্যান্স অ্যাসাইন করা যায়, সমতা যাচাই করা যায় এবং কালেকশনে রাখা যায়।

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
