# Acerca de

Para permitir que una sola instancia de enum represente varios valores (a los que normalmente se les llama _banderas_), puedes anotar el enum con el atributo `[Flags]`. Si asignas con cuidado los valores de los miembros del enum de modo que determinados bits queden en `1`, puedes usar operadores bit a bit para activar o desactivar banderas.

```csharp
[Flags]
enum PhoneFeatures
{
    Call = 1,
    Text = 2
}
```

Además de usar enteros normales para asignar los valores de los miembros del enum de banderas, también puedes usar [literales binarios o el operador de desplazamiento bit a bit][binary-literals].

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

El valor de un miembro del enum puede hacer referencia a los valores de otros miembros del enum:

```csharp
[Flags]
enum PhoneFeatures
{
    Call = 0b00000001,
    Text = 0b00000010,
    All  = Call | Text
}
```

Puedes activar una bandera con el [operador OR bit a bit][or-operator] (`|`) y desactivarla con una combinación del [operador AND bit a bit][and-operator] (`&`) y el [operador de complemento bit a bit][bitwise-complement-operator] (`~`). Para comprobar si una bandera está activada puedes usar el operador AND bit a bit, pero también el [método `HasFlag()`][has-flag] del enum.

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

El [tutorial sobre cómo trabajar con enums como banderas de bits][docs.microsoft.com-enumeration-types-as-bit-flags] explica con más detalle cómo trabajar con enums de banderas. Otro gran recurso es la [página sobre banderas de enum y operadores bit a bit][enum-lags].

De forma predeterminada, para los valores de los miembros del enum se usa el tipo `int`. Puedes usar otro tipo entero si especificas el tipo en la declaración del enum:

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
