# حول

لكي تمثّل نسخة واحدة من `enum` قيمًا متعددة (يُشار إليها عادةً باسم _العلامات_)، يمكنك وسم `enum` بالسمة `[Flags]`. وإذا أسندت قيم أعضاء `enum` بعناية بحيث تُضبط بتات معينة على `1`، أمكنك استخدام العوامل البتية لضبط العلامات أو إلغاء ضبطها.

```csharp
[Flags]
enum PhoneFeatures
{
    Call = 1,
    Text = 2
}
```

إلى جانب استخدام أعداد صحيحة عادية لإسناد قيم أعضاء `enum` الخاص بالعلامات، يمكنك أيضًا استخدام [القيم الحرفية الثنائية أو عامل الإزاحة البتية][binary-literals].

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

يمكن أن تشير قيمة عضو في `enum` إلى قيم أعضاء آخرين فيه:

```csharp
[Flags]
enum PhoneFeatures
{
    Call = 0b00000001,
    Text = 0b00000010,
    All  = Call | Text
}
```

يمكن ضبط علامة عبر [عامل OR البتّي][or-operator] (`|`)، وإلغاء ضبطها عبر الجمع بين [عامل AND البتّي][and-operator] (`&`) و[عامل المتمم البتّي][bitwise-complement-operator] (`~`). وبينما يمكن التحقق من علامة باستخدام عامل AND البتّي، يمكنك أيضًا استخدام [الطريقة `HasFlag()`][has-flag] في `enum`.

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

يقدّم [الدرس التعليمي حول التعامل مع `enum` كعلامات بتية][docs.microsoft.com-enumeration-types-as-bit-flags] تفاصيل أكثر حول كيفية التعامل مع `enum` الخاص بالعلامات. ومن المصادر الرائعة الأخرى [صفحة علامات `enum` والعوامل البتية][enum-lags].

افتراضيًا، يُستخدم النوع `int` لقيم أعضاء `enum`. ويمكنك استخدام نوع عدد صحيح مختلف بتحديد النوع في تعريف `enum`:

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
