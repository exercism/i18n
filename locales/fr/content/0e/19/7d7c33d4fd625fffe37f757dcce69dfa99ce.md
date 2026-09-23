# À propos

Pour permettre à une seule instance d'énumération de représenter plusieurs valeurs (généralement appelées _flags_), on peut annoter l'énumération avec l'attribut `[Flags]`. En attribuant soigneusement aux membres de l'énumération des valeurs telles que certains bits soient mis à `1`, on peut utiliser les opérateurs bit à bit pour activer ou désactiver des flags.

```csharp
[Flags]
enum PhoneFeatures
{
    Call = 1,
    Text = 2
}
```

Outre l'utilisation d'entiers ordinaires pour définir les valeurs des membres d'une énumération de flags, on peut aussi utiliser [des littéraux binaires ou l'opérateur de décalage bit à bit][binary-literals].

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

La valeur d'un membre de l'énumération peut faire référence aux valeurs d'autres membres de l'énumération :

```csharp
[Flags]
enum PhoneFeatures
{
    Call = 0b00000001,
    Text = 0b00000010,
    All  = Call | Text
}
```

On peut activer un flag avec l'[opérateur OR bit à bit][or-operator] (`|`) et le désactiver avec une combinaison de l'[opérateur AND bit à bit][and-operator] (`&`) et de l'[opérateur de complément bit à bit][bitwise-complement-operator] (`~`). La présence d'un flag peut certes se vérifier avec l'opérateur AND bit à bit, mais on peut aussi utiliser la [méthode `HasFlag()`][has-flag] de l'énumération.

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

Le [tutoriel sur l'utilisation des énumérations comme indicateurs de bits][docs.microsoft.com-enumeration-types-as-bit-flags] détaille davantage la manipulation des énumérations de flags. Une autre ressource utile est la [page sur les flags d'énumération et les opérateurs bit à bit][enum-lags].

Par défaut, le type `int` est utilisé pour les valeurs des membres de l'énumération. On peut utiliser un autre type entier en précisant le type dans la déclaration de l'énumération :

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
