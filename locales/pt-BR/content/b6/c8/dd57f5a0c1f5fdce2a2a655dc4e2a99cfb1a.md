# Introdução

Em C#, `struct`s são muito parecidas com `class`es.
Elas têm estado e comportamento.
Elas têm construtores que recebem argumentos, e instâncias podem ser atribuídas, comparadas quanto à igualdade e armazenadas em coleções.

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
