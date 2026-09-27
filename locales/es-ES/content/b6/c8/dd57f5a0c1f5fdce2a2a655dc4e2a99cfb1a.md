# Introducción

Los `struct` de C# están estrechamente relacionados con las `class`.
Tienen estado y comportamiento.
Tienen constructores que aceptan argumentos, y sus instancias se pueden asignar, comparar por igualdad y guardar en colecciones.

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
