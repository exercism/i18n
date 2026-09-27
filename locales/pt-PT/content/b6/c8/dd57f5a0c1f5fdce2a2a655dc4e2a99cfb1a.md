# Introdução

As `struct`s de C# estão intimamente relacionadas com as `class`es.
Têm estado e comportamento.
Têm construtores que recebem argumentos, e as instâncias podem ser atribuídas, testadas quanto à igualdade e guardadas em coleções.

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
