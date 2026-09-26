# 关于

如果想用一个枚举实例表示多个值（这些值通常称为*标志*），可以给枚举加上 `[Flags]` 特性。只要精心地为枚举成员赋值，让特定的位为 `1`，就能用位运算符来设置或取消标志。

```csharp
[Flags]
enum PhoneFeatures
{
    Call = 1,
    Text = 2
}
```

除了用普通整数为标志枚举的成员赋值，还可以使用[二进制字面量或位移运算符][binary-literals]。

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

枚举成员的值可以引用其他枚举成员的值：

```csharp
[Flags]
enum PhoneFeatures
{
    Call = 0b00000001,
    Text = 0b00000010,
    All  = Call | Text
}
```

设置标志可以用[按位或运算符][or-operator]（`|`），取消标志则要组合使用[按位与运算符][and-operator]（`&`）和[按位求补运算符][bitwise-complement-operator]（`~`）。检查标志可以用按位与运算符，也可以使用枚举的 [`HasFlag()` 方法][has-flag]。

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

[将枚举用作位标志的教程][docs.microsoft.com-enumeration-types-as-bit-flags]更详细地介绍了如何使用标志枚举。另一个很好的资源是[枚举标志与位运算符页面][enum-lags]。

默认情况下，枚举成员的值使用 `int` 类型。在枚举声明中指定类型，就可以改用其他整数类型：

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
