# Acerca de

Para permitir que una única instancia de enumeración represente varios valores (a los que normalmente se hace referencia como _flags_), se puede anotar la enumeración con el atributo `[Flags]`. Si se asignan con cuidado los valores de los miembros de la enumeración de manera que determinados bits se pongan a `1`, se pueden usar operadores bit a bit para activar o desactivar flags.

```csharp
[Flags]
enum PhoneFeatures
{
    Call = 1,
    Text = 2
}
```

Además de usar números enteros normales para establecer los valores de los miembros de la enumeración de flags, también se pueden usar [literales binarios o el operador de desplazamiento bit a bit][binary-literals].

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

El valor de un miembro de la enumeración puede hacer referencia a los valores de otros miembros de la enumeración:

```csharp
[Flags]
enum PhoneFeatures
{
    Call = 0b00000001,
    Text = 0b00000010,
    All  = Call | Text
}
```

Activar un flag se puede hacer con el [operador OR bit a bit][or-operator] (`|`), y desactivarlo con una combinación del [operador AND bit a bit][and-operator] (`&`) y el [operador de complemento bit a bit][bitwise-complement-operator] (`~`). Aunque comprobar si un flag está activo se puede hacer con el operador AND bit a bit, también se puede usar el [método `HasFlag()`][has-flag] de la enumeración.

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

El [tutorial sobre cómo trabajar con enumeraciones como flags de bits][docs.microsoft.com-enumeration-types-as-bit-flags] explica con más detalle cómo trabajar con enumeraciones de flags. Otro gran recurso es la [página sobre flags de enumeración y operadores bit a bit][enum-lags].

De forma predeterminada, se usa el tipo `int` para los valores de los miembros de la enumeración. Se puede usar otro tipo de entero especificando el tipo en la declaración de la enumeración:

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
