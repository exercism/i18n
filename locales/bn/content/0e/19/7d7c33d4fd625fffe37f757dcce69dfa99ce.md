# পরিচিতি

একটি এনাম ইনস্ট্যান্স যাতে একাধিক মান প্রকাশ করতে পারে (সাধারণত এগুলোকে _ফ্ল্যাগ_ বলা হয়), সেজন্য এনামটির সাথে `[Flags]` অ্যাট্রিবিউট যুক্ত করা যায়। এনাম সদস্যদের মানগুলো সতর্কভাবে এমনভাবে নির্ধারণ করা যায় যাতে নির্দিষ্ট বিটগুলো `1` সেট থাকে, তাহলে বিটওয়াইজ অপারেটর দিয়ে ফ্ল্যাগ সেট বা আনসেট করা যায়।

```csharp
[Flags]
enum PhoneFeatures
{
    Call = 1,
    Text = 2
}
```

ফ্ল্যাগ এনাম সদস্যদের মান বসাতে সাধারণ ইন্টিজার ব্যবহারের পাশাপাশি [বাইনারি লিটারেল বা বিটওয়াইজ শিফট অপারেটর][binary-literals]-ও ব্যবহার করা যায়।

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

একটি এনাম সদস্যের মান অন্য এনাম সদস্যদের মান নির্দেশ করতে পারে:

```csharp
[Flags]
enum PhoneFeatures
{
    Call = 0b00000001,
    Text = 0b00000010,
    All  = Call | Text
}
```

[বিটওয়াইজ OR অপারেটর][or-operator] (`|`) দিয়ে একটি ফ্ল্যাগ সেট করা যায়, আর [বিটওয়াইজ AND অপারেটর][and-operator] (`&`) ও [বিটওয়াইজ কমপ্লিমেন্ট অপারেটর][bitwise-complement-operator] (`~`) মিলিয়ে একটি ফ্ল্যাগ আনসেট করা যায়। বিটওয়াইজ AND অপারেটর দিয়ে একটি ফ্ল্যাগ আছে কি না তাও যাচাই করা যায়, আবার এনামের [`HasFlag()` মেথড][has-flag]-ও ব্যবহার করা যায়।

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

[বিট ফ্ল্যাগ হিসেবে এনাম নিয়ে কাজ করার টিউটোরিয়াল][docs.microsoft.com-enumeration-types-as-bit-flags]-এ ফ্ল্যাগ এনাম নিয়ে কীভাবে কাজ করতে হয় তার আরও বিস্তারিত আছে। আরেকটি দারুণ রিসোর্স হলো [এনাম ফ্ল্যাগ ও বিটওয়াইজ অপারেটর পেজ][enum-lags]।

ডিফল্টভাবে এনাম সদস্যের মানের জন্য `int` টাইপ ব্যবহৃত হয়। এনাম ডিক্লারেশনে টাইপ উল্লেখ করে ভিন্ন একটি ইন্টিজার টাইপ ব্যবহার করা যায়:

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
