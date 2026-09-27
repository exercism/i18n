# 개요

하나의 enum 인스턴스가 여러 값을 나타내게 하려면(보통 _플래그_라고 불러요), enum에 `[Flags]` 애트리뷰트를 붙이면 돼요. 특정 비트가 `1`이 되도록 enum 멤버의 값을 신중하게 지정하면, 비트 연산자로 플래그를 설정하거나 해제할 수 있어요.

```csharp
[Flags]
enum PhoneFeatures
{
    Call = 1,
    Text = 2
}
```

플래그 enum 멤버의 값을 지정할 때 일반 정수를 쓰는 것 외에도, [이진 리터럴이나 비트 시프트 연산자][binary-literals]를 사용할 수 있어요.

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

enum 멤버의 값은 다른 enum 멤버의 값을 참조할 수 있어요:

```csharp
[Flags]
enum PhoneFeatures
{
    Call = 0b00000001,
    Text = 0b00000010,
    All  = Call | Text
}
```

플래그를 설정할 때는 [비트 OR 연산자][or-operator](`|`)를 쓰고, 해제할 때는 [비트 AND 연산자][and-operator](`&`)와 [비트 보수 연산자][bitwise-complement-operator](`~`)를 조합해서 써요. 플래그가 설정되어 있는지 확인할 때도 비트 AND 연산자를 쓸 수 있지만, enum의 [`HasFlag()` 메서드][has-flag]를 사용할 수도 있어요.

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

[비트 플래그로 enum 다루기 튜토리얼][docs.microsoft.com-enumeration-types-as-bit-flags]에서 플래그 enum을 다루는 방법을 더 자세히 설명해요. 또 다른 좋은 자료는 [enum 플래그와 비트 연산자 페이지][enum-lags]예요.

기본적으로 enum 멤버의 값에는 `int` 타입이 사용돼요. enum 선언에서 타입을 지정하면 다른 정수 타입을 사용할 수 있어요:

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
