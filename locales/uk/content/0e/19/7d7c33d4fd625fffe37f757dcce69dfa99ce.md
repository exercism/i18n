# Докладніше

Щоб один екземпляр enum міг представляти кілька значень (зазвичай їх називають _прапорцями_), enum можна позначити атрибутом `[Flags]`. Якщо ретельно дібрати значення членів enum так, щоб конкретні біти були встановлені в `1`, тоді для встановлення чи зняття прапорців можна використовувати побітові оператори.

```csharp
[Flags]
enum PhoneFeatures
{
    Call = 1,
    Text = 2
}
```

Окрім звичайних цілих чисел для задання значень членів enum, можна також скористатися [двійковими літералами або оператором побітового зсуву][binary-literals].

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

Значення члена enum може посилатися на значення інших членів enum:

```csharp
[Flags]
enum PhoneFeatures
{
    Call = 0b00000001,
    Text = 0b00000010,
    All  = Call | Text
}
```

Щоб встановити прапорець, можна скористатися [побітовим оператором АБО][or-operator] (`|`), а щоб зняти його, поєднати [побітовий оператор І][and-operator] (`&`) та [оператор побітового доповнення][bitwise-complement-operator] (`~`). Перевірити наявність прапорця можна побітовим оператором І, а можна й методом [`HasFlag()`][has-flag] enum.

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

[Посібник із роботи з enum як бітовими прапорцями][docs.microsoft.com-enumeration-types-as-bit-flags] докладніше розповідає, як працювати з прапорцями enum. Ще одне чудове джерело - [сторінка про прапорці enum і побітові оператори][enum-lags].

Типово для значень членів enum використовується тип `int`. Можна використати інший цілочисельний тип, указавши його в оголошенні enum:

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
