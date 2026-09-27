# Über

Um mit einer einzelnen Enum-Instanz mehrere Werte darstellen zu können (meist als _Flags_ bezeichnet), kannst du das Enum mit dem Attribut `[Flags]` versehen. Wenn du die Werte der Enum-Member so wählst, dass bestimmte Bits auf `1` gesetzt sind, kannst du mit bitweisen Operatoren Flags setzen oder zurücksetzen.

```csharp
[Flags]
enum PhoneFeatures
{
    Call = 1,
    Text = 2
}
```

Neben normalen Ganzzahlen kannst du für die Werte der Flag-Enum-Member auch [binäre Literale oder den bitweisen Schiebeoperator][binary-literals] verwenden.

```csharp
[Flags]
enum PhoneFeaturesBinary
{
    Call = 0b00000001,
    Text = 0b00000010
}

[Flags]
enum PhoneFeaturesBitwiseShift
{
    Call = 1 << 0,
    Text = 1 << 1
}
```

Der Wert eines Enum-Members kann sich auf die Werte anderer Enum-Member beziehen:

```csharp
[Flags]
enum PhoneFeatures
{
    Call = 0b00000001,
    Text = 0b00000010,
    All  = Call | Text
}
```

Ein Flag setzt du mit dem [bitweisen OR-Operator][or-operator] (`|`) und setzt es mit einer Kombination aus dem [bitweisen AND-Operator][and-operator] (`&`) und dem [bitweisen Komplementoperator][bitwise-complement-operator] (`~`) wieder zurück. Ob ein Flag gesetzt ist, prüfst du ebenfalls mit dem bitweisen AND-Operator; außerdem kannst du die [`HasFlag()`-Methode][has-flag] des Enums verwenden.

```csharp
var features = PhoneFeatures.Call;

// Set the Text flag
features = features | PhoneFeatures.Text;

features.HasFlag(PhoneFeatures.Call); // => true
features.HasFlag(PhoneFeatures.Text); // => true

// Unset the Call flag
features = features & ~PhoneFeatures.Call;

features.HasFlag(PhoneFeatures.Call); // => false
features.HasFlag(PhoneFeatures.Text); // => true
```

Das [Tutorial zum Arbeiten mit Enums als Bit-Flags][docs.microsoft.com-enumeration-types-as-bit-flags] geht genauer darauf ein, wie du mit Flag-Enums arbeitest. Eine weitere großartige Quelle ist die [Seite zu Enum-Flags und bitweisen Operatoren][enum-lags].

Standardmäßig wird für die Werte der Enum-Member der Typ `int` verwendet. Du kannst einen anderen Ganzzahltyp verwenden, indem du den Typ in der Enum-Deklaration angibst:

```csharp
[Flags]
enum PhoneFeatures : byte
{
    Call = 0b00000001,
    Text = 0b00000010
}
```

[docs.microsoft.com-enumeration-types-as-bit-flags]: https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/enumeration-types#enumeration-types-as-bit-flags
[or-operator]: https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/operators/bitwise-and-shift-operators#logical-or-operator-
[and-operator]: https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/operators/bitwise-and-shift-operators#logical-and-operator-
[bitwise-complement-operator]: https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/operators/bitwise-and-shift-operators#bitwise-complement-operator-
[binary-literals]: https://riptutorial.com/csharp/example/6327/binary-literals
[has-flag]: https://docs.microsoft.com/en-us/dotnet/api/system.enum.hasflag
[enum-lags]: alanzucconi.com-enum-flags-and-bitwise-operators
