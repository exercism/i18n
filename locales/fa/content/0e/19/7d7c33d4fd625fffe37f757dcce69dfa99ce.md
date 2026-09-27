# درباره

برای اینکه یک نمونه‌ی enum بتواند چندین مقدار را نشان دهد (که معمولاً به آن‌ها «پرچم» می‌گویند)، می‌توان enum را با ویژگی `[Flags]` علامت‌گذاری کرد. با تخصیص دقیق مقادیر اعضای enum به‌گونه‌ای که بیت‌های مشخصی روی `1` تنظیم شوند، می‌توان از عملگرهای بیتی برای تنظیم یا لغو پرچم‌ها استفاده کرد.

```csharp
[Flags]
enum PhoneFeatures
{
    Call = 1,
    Text = 2
}
```

علاوه بر استفاده از اعداد صحیح معمولی برای تعیین مقادیر اعضای enum پرچمی، می‌توان از [لیترال‌های دودویی یا عملگر شیفت بیتی][binary-literals] هم استفاده کرد.

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

مقدار یک عضو enum می‌تواند به مقادیر اعضای دیگر enum اشاره کند:

```csharp
[Flags]
enum PhoneFeatures
{
    Call = 0b00000001,
    Text = 0b00000010,
    All  = Call | Text
}
```

یک پرچم را می‌توان از طریق [عملگر OR بیتی][or-operator] (`|`) تنظیم کرد و با ترکیبی از [عملگر AND بیتی][and-operator] (`&`) و [عملگر متمم بیتی][bitwise-complement-operator] (`~`) آن را لغو کرد. برای بررسی اینکه یک پرچم تنظیم شده است می‌توان از عملگر AND بیتی استفاده کرد و همچنین می‌توان از [متد `HasFlag()`][has-flag] خود enum هم استفاده کرد.

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

[آموزش کار با enumها به‌عنوان پرچم‌های بیتی][docs.microsoft.com-enumeration-types-as-bit-flags] با جزئیات بیشتری توضیح می‌دهد که چگونه با enumهای پرچمی کار کنید. منبع عالی دیگر هم [صفحه‌ی پرچم‌های enum و عملگرهای بیتی][enum-lags] است.

به‌طور پیش‌فرض، از نوع `int` برای مقادیر اعضای enum استفاده می‌شود. می‌توان با تعیین نوع در اعلان enum از یک نوع عدد صحیح متفاوت استفاده کرد:

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
