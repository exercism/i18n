# Introduzione

Le `struct` di C# sono strettamente legate alle `class`.
Hanno stato e comportamento.
Hanno costruttori che accettano argomenti; le istanze possono essere assegnate, confrontate per uguaglianza e memorizzate in collezioni.

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
