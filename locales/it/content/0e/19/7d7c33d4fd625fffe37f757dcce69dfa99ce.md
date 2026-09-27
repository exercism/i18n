# Informazioni

Per permettere a una singola istanza di un enum di rappresentare più valori (solitamente chiamati _flag_), si può annotare l'enum con l'attributo `[Flags]`. Assegnando con cura i valori dei membri dell'enum in modo che bit specifici siano impostati a `1`, si possono usare gli operatori bit per bit per impostare o rimuovere i flag.

```csharp
[Flags]
enum PhoneFeatures
{
    Call = 1,
    Text = 2
}
```

Oltre a usare normali numeri interi per impostare i valori dei membri di un enum di flag, si possono usare anche [i letterali binari o l'operatore di spostamento bit per bit][binary-literals].

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

Il valore di un membro di un enum può fare riferimento ai valori di altri membri dell'enum:

```csharp
[Flags]
enum PhoneFeatures
{
    Call = 0b00000001,
    Text = 0b00000010,
    All  = Call | Text
}
```

Impostare un flag si può fare con l'[operatore OR bit per bit][or-operator] (`|`), mentre per rimuoverlo si usa una combinazione dell'[operatore AND bit per bit][and-operator] (`&`) e dell'[operatore di complemento bit per bit][bitwise-complement-operator] (`~`). Per controllare un flag si può usare l'operatore AND bit per bit, ma si può anche usare il [metodo `HasFlag()`][has-flag] dell'enum.

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

Il [tutorial su come lavorare con gli enum come flag bit per bit][docs.microsoft.com-enumeration-types-as-bit-flags] spiega più in dettaglio come lavorare con gli enum di flag. Un'altra valida risorsa è la pagina [Flag degli enum e operatori bit per bit][enum-lags].

Per impostazione predefinita, per i valori dei membri di un enum si usa il tipo `int`. Si può usare un tipo intero diverso specificando il tipo nella dichiarazione dell'enum:

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
