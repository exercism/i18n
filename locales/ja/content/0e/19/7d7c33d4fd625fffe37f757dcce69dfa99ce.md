# 概要

1つの列挙型のインスタンスで複数の値（通常は_フラグ_と呼ばれます）を表せるようにするには、列挙型に`[Flags]`属性を付けることができます。特定のビットが`1`になるように列挙型のメンバーの値をうまく割り当てることで、ビット演算子を使ってフラグを立てたり下ろしたりできます。

```csharp
[Flags]
enum PhoneFeatures
{
    Call = 1,
    Text = 2
}
```

フラグ列挙型のメンバーの値には、通常の整数を使う以外に、[2進数リテラルやビットシフト演算子][binary-literals]を使うこともできます。

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

列挙型のメンバーの値は、他のメンバーの値を参照できます：

```csharp
[Flags]
enum PhoneFeatures
{
    Call = 0b00000001,
    Text = 0b00000010,
    All  = Call | Text
}
```

フラグを立てるには[ビットOR演算子][or-operator]（`|`）を使い、フラグを下ろすには[ビットAND演算子][and-operator]（`&`）と[ビット補数演算子][bitwise-complement-operator]（`~`）を組み合わせて使います。フラグが立っているかどうかはビットAND演算子でも確認できますが、列挙型の[`HasFlag()`メソッド][has-flag]を使うこともできます。

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

[ビットフラグとして列挙型を扱うチュートリアル][docs.microsoft.com-enumeration-types-as-bit-flags]では、フラグ列挙型の扱い方についてさらに詳しく説明されています。もう1つの優れた資料は、[列挙型のフラグとビット演算子のページ][enum-lags]です。

既定では、列挙型のメンバーの値には`int`型が使われます。列挙型の宣言で型を指定すれば、別の整数型を使うこともできます：

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
