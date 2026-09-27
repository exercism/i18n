# 關於

若要讓單一列舉執行個體代表多個值（通常稱為_旗標_），可以用`[Flags]`屬性標註列舉。只要仔細指派列舉成員的值，讓特定的位元設為`1`，就能用位元運算子設定或清除旗標。

```csharp
[Flags]
enum PhoneFeatures
{
    Call = 1,
    Text = 2
}
```

除了用一般的整數來設定旗標列舉成員的值之外，也可以使用[二進位常值或位元移位運算子][binary-literals]。

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

列舉成員的值可以參照其他列舉成員的值：

```csharp
[Flags]
enum PhoneFeatures
{
    Call = 0b00000001,
    Text = 0b00000010,
    All  = Call | Text
}
```

設定旗標可以用[位元 OR 運算子][or-operator]（`|`），清除旗標則要結合[位元 AND 運算子][and-operator]（`&`）和[位元補數運算子][bitwise-complement-operator]（`~`）。檢查是否設有某個旗標可以用位元 AND 運算子，也可以使用列舉的[`HasFlag()`方法][has-flag]。

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

[以位元旗標方式使用列舉的教學][docs.microsoft.com-enumeration-types-as-bit-flags]有更詳細的說明，介紹如何使用旗標列舉。另一個很棒的資源是[列舉旗標與位元運算子頁面][enum-lags]喔。

預設情況下，列舉成員的值會使用`int`型別。只要在列舉宣告中指定型別，就能改用不同的整數型別：

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
