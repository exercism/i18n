# Sobre

Para permitir que uma única instância de um enum represente vários valores (normalmente designados por _flags_), podes anotar o enum com o atributo `[Flags]`. Ao atribuir cuidadosamente os valores dos membros do enum de modo a que bits específicos fiquem a `1`, podes usar operadores bit a bit para ativar ou desativar flags.

```csharp
[Flags]
enum PhoneFeatures
{
    Call = 1,
    Text = 2
}
```

Além de usares inteiros normais para definir os valores dos membros de um enum de flags, também podes usar [literais binários ou o operador de deslocamento bit a bit][binary-literals].

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

O valor de um membro do enum pode referir-se aos valores de outros membros do enum:

```csharp
[Flags]
enum PhoneFeatures
{
    Call = 0b00000001,
    Text = 0b00000010,
    All  = Call | Text
}
```

Podes ativar uma flag com o [operador OR bit a bit][or-operator] (`|`) e desativá-la com uma combinação do [operador AND bit a bit][and-operator] (`&`) e do [operador de complemento bit a bit][bitwise-complement-operator] (`~`). Embora possas verificar se uma flag está ativa com o operador AND bit a bit, também podes usar o [método `HasFlag()`][has-flag] do enum.

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

O [tutorial sobre trabalhar com enums como flags de bits][docs.microsoft.com-enumeration-types-as-bit-flags] explica com mais detalhe como trabalhar com enums de flags. Outro ótimo recurso é a [página sobre flags de enum e operadores bit a bit][enum-lags].

Por predefinição, usa-se o tipo `int` para os valores dos membros do enum. Podes usar um tipo inteiro diferente especificando o tipo na declaração do enum:

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
