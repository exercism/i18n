# Részletesen

Ahhoz, hogy egyetlen enum példány több értéket is képviselhessen (ezeket általában _jelzőbiteknek_ nevezik), elláthatod az enumot a `[Flags]` attribútummal. Ha az enum tagjainak értékeit gondosan úgy állítod be, hogy bizonyos bitek `1`-re legyenek állítva, akkor bitenkénti operátorokkal beállíthatod vagy törölheted a jelzőbiteket.

```csharp
[Flags]
enum PhoneFeatures
{
    Call = 1,
    Text = 2
}
```

A jelzőbites enum tagjainak értékét beállíthatod hagyományos egészekkel is, de használhatsz [bináris literálokat vagy a bitenkénti eltolási operátort][binary-literals] is.

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

Egy enum tag értéke hivatkozhat az enum más tagjainak értékeire:

```csharp
[Flags]
enum PhoneFeatures
{
    Call = 0b00000001,
    Text = 0b00000010,
    All  = Call | Text
}
```

Egy jelzőbit beállításához a [bitenkénti VAGY operátort][or-operator] (`|`) használhatod, törléséhez pedig a [bitenkénti ÉS operátor][and-operator] (`&`) és a [bitenkénti komplementer operátor][bitwise-complement-operator] (`~`) kombinációját. Egy jelzőbit ellenőrzésére jó a bitenkénti ÉS operátor is, de az enum [`HasFlag()` metódusát][has-flag] is használhatod.

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

A [jelzőbites enumok használatáról szóló útmutató][docs.microsoft.com-enumeration-types-as-bit-flags] részletesebben is bemutatja, hogyan dolgozhatsz a jelzőbites enumokkal. Egy másik remek forrás az [enum jelzőbitek és bitenkénti operátorok oldal][enum-lags].

Alapértelmezés szerint az enum tagjainak értékeihez az `int` típust használja. Más egésztípust is használhatsz, ha megadod a típust az enum deklarációjában:

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
