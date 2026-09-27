# Einführung

Ein arithmetischer Überlauf tritt auf, wenn eine Berechnung wie eine arithmetische Operation oder eine Typkonvertierung einen Wert ergibt, der größer ist als die Kapazität des aufnehmenden Typs.

Ausdrücke vom Typ `int` und `long` sowie ihre vorzeichenlosen Gegenstücke laufen unter diesen Umständen stillschweigend über.

Das Verhalten von Ganzzahlberechnungen lässt sich mit dem Schlüsselwort `checked` ändern. Tritt innerhalb eines `checked`-Blocks ein Überlauf auf, wird eine Instanz von `OverflowException` ausgelöst.

```csharp
int one = 1;
checked
{
    int expr = int.MaxValue + one;   // OverflowException is thrown
}

// or

int expr2 = checked(int.MaxValue + one);     // OverflowException is thrown
```

Ausdrücke vom Typ `float` und `double` nehmen einen speziellen Unendlichkeitswert an.

Ausdrücke vom Typ `decimal` lösen eine Instanz von `OverflowException` aus.
