# Einführung

Die `struct`s von C# sind eng mit `class`es verwandt.
Sie haben Zustand und Verhalten.
Sie haben Konstruktoren, die Argumente entgegennehmen, Instanzen können zugewiesen, auf Gleichheit getestet und in Sammlungen gespeichert werden.

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
