# Bevezetés

A C# `struct`-jai szorosan kapcsolódnak a `class`-okhoz.
Van állapotuk és viselkedésük.
Vannak olyan konstruktoraik, amelyek argumentumokat fogadnak, a példányaikat pedig értékül adhatod, tesztelheted egyenlőség szempontjából, és gyűjteményekben tárolhatod.

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
