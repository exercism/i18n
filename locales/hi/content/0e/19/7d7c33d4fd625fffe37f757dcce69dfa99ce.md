# परिचय

एक ही एनम इंस्टेंस से कई वैल्यू दर्शाने के लिए (जिन्हें आम तौर पर _फ्लैग_ कहा जाता है) एनम पर `[Flags]` एट्रिब्यूट लगाया जा सकता है। एनम मेंबरों की वैल्यू ध्यान से ऐसे बाँटी जाती हैं कि कुछ खास बिट `1` पर रहें, और फिर बिटवाइज़ ऑपरेटरों की मदद से फ्लैग लगाए या हटाए जा सकते हैं।

```csharp
[Flags]
enum PhoneFeatures
{
    Call = 1,
    Text = 2
}
```

फ्लैग एनम के मेंबरों की वैल्यू तय करने के लिए सामान्य पूर्णांकों के अलावा [बाइनरी लिटरल या बिटवाइज़ शिफ्ट ऑपरेटर][binary-literals] का भी इस्तेमाल किया जा सकता है।

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

किसी एनम मेंबर की वैल्यू में दूसरे एनम मेंबरों की वैल्यू इस्तेमाल की जा सकती है:

```csharp
[Flags]
enum PhoneFeatures
{
    Call = 0b00000001,
    Text = 0b00000010,
    All  = Call | Text
}
```

फ्लैग लगाने के लिए [बिटवाइज़ OR ऑपरेटर][or-operator] (`|`) इस्तेमाल किया जा सकता है, और फ्लैग हटाने का काम [बिटवाइज़ AND ऑपरेटर][and-operator] (`&`) तथा [बिटवाइज़ कॉम्प्लीमेंट ऑपरेटर][bitwise-complement-operator] (`~`) को मिलाकर किया जा सकता है। यह देखने के लिए कि कोई फ्लैग लगा है या नहीं, बिटवाइज़ AND ऑपरेटर इस्तेमाल किया जा सकता है, और एनम के [`HasFlag()` मेथड][has-flag] का भी।

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

[बिट फ्लैग के रूप में एनम के साथ काम करने का ट्यूटोरियल][docs.microsoft.com-enumeration-types-as-bit-flags] में फ्लैग एनम के साथ काम करने का तरीका ज़्यादा विस्तार से बताया गया है। एक और बढ़िया स्रोत [एनम फ्लैग और बिटवाइज़ ऑपरेटर वाला पेज][enum-lags] है।

डिफ़ॉल्ट रूप से एनम मेंबरों की वैल्यू के लिए `int` टाइप इस्तेमाल होता है। एनम घोषित करते समय टाइप बताकर कोई भी दूसरा पूर्णांक टाइप इस्तेमाल किया जा सकता है:

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
