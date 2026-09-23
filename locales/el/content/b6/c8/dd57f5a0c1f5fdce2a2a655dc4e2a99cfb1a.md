# Εισαγωγή

Τα `struct` της C# σχετίζονται στενά με τις `class`.
Έχουν κατάσταση και συμπεριφορά.
Έχουν κατασκευαστές που δέχονται ορίσματα, τα στιγμιότυπα μπορούν να ανατεθούν, να ελεγχθούν ως προς την ισότητα και να αποθηκευτούν σε συλλογές.

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
