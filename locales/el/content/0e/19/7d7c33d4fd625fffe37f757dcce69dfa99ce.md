# Σχετικά

Για να μπορεί ένα μεμονωμένο στιγμιότυπο enum να αναπαριστά πολλαπλές τιμές (που συνήθως αναφέρονται ως _flags_), μπορείς να επισημάνεις το enum με το χαρακτηριστικό `[Flags]`. Ορίζοντας προσεκτικά τις τιμές των μελών του enum έτσι ώστε συγκεκριμένα bit να είναι `1`, μπορείς να χρησιμοποιήσεις τελεστές bitwise για να ενεργοποιήσεις ή να απενεργοποιήσεις flags.

```csharp
[Flags]
enum PhoneFeatures
{
    Call = 1,
    Text = 2
}
```

Εκτός από τη χρήση συνηθισμένων ακεραίων για τον ορισμό των τιμών των μελών ενός flag enum, μπορείς επίσης να χρησιμοποιήσεις [δυαδικά κυριολεκτικά ή τον τελεστή bitwise ολίσθησης][binary-literals].

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

Η τιμή ενός μέλους enum μπορεί να αναφέρεται σε τιμές άλλων μελών enum:

```csharp
[Flags]
enum PhoneFeatures
{
    Call = 0b00000001,
    Text = 0b00000010,
    All  = Call | Text
}
```

Την ενεργοποίηση ενός flag μπορείς να την κάνεις με τον [τελεστή bitwise OR][or-operator] (`|`) και την απενεργοποίηση ενός flag με συνδυασμό του [τελεστή bitwise AND][and-operator] (`&`) και του [τελεστή bitwise συμπληρώματος][bitwise-complement-operator] (`~`). Ενώ τον έλεγχο για ένα flag μπορείς να τον κάνεις με τον τελεστή bitwise AND, μπορείς επίσης να χρησιμοποιήσεις τη [μέθοδο `HasFlag()`][has-flag] του enum.

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

Ο [οδηγός για την εργασία με enums ως bit flags][docs.microsoft.com-enumeration-types-as-bit-flags] μπαίνει σε περισσότερες λεπτομέρειες για το πώς να δουλεύεις με flag enums. Άλλος ένας εξαιρετικός πόρος είναι η [σελίδα για flag enums και τελεστές bitwise][enum-lags].

Από προεπιλογή, για τις τιμές των μελών enum χρησιμοποιείται ο τύπος `int`. Μπορείς να χρησιμοποιήσεις έναν διαφορετικό ακέραιο τύπο καθορίζοντας τον τύπο στη δήλωση του enum:

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
