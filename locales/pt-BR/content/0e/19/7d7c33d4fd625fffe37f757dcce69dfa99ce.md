# Sobre

Para permitir que uma única instância de enum represente vários valores (geralmente chamados de _flags_), você pode anotar o enum com o atributo `[Flags]`. Atribuindo cuidadosamente os valores dos membros do enum de forma que bits específicos sejam definidos como `1`, você pode usar operadores bit a bit para definir ou remover flags.

```csharp
[Flags]
enum PhoneFeatures
{
    Call = 1,
    Text = 2
}
```

Além de usar inteiros comuns para definir os valores dos membros de um enum de flags, você também pode usar [literais binários ou o operador de deslocamento bit a bit][binary-literals].

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

O valor de um membro do enum pode fazer referência aos valores de outros membros do enum:

```csharp
[Flags]
enum PhoneFeatures
{
    Call = 0b00000001,
    Text = 0b00000010,
    All  = Call | Text
}
```

Você pode definir uma flag com o [operador OR bit a bit][or-operator] (`|`) e remover uma flag com uma combinação do [operador AND bit a bit][and-operator] (`&`) e do [operador de complemento bit a bit][bitwise-complement-operator] (`~`). Já para verificar se uma flag está definida, além do operador AND bit a bit, você pode usar o método [`HasFlag()`][has-flag] do enum.

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

O [tutorial de trabalho com enums como sinalizadores de bits][docs.microsoft.com-enumeration-types-as-bit-flags] traz mais detalhes sobre como trabalhar com enums de flags. Outro ótimo recurso é a [página sobre flags de enum e operadores bit a bit][enum-lags].

Por padrão, o tipo `int` é usado para os valores dos membros do enum. Você pode usar um tipo inteiro diferente especificando o tipo na declaração do enum:

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
