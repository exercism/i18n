# संकेत

## सामान्य

- [csharp.net की ओर से तारीख और समय पर ट्यूटोरियल][csharp.net-datetimes-working-with-datetimes-time]

## 1. अपॉइंटमेंट की तारीख पार्स कीजिए

- `DateTime` क्लास में कई मेथड हैं जो एक `string` को `DateTime` में [पार्स][docs.microsoft.com_parsing-date] करते हैं।

## 2. जाँचिए कि अपॉइंटमेंट बीत चुका है या नहीं

- `DateTime` ऑब्जेक्ट की तुलना डिफ़ॉल्ट [तुलना ऑपरेटर][docs.microsoft.com_datetime-operators] से की जा सकती है।
- वर्तमान तारीख और समय पाने के लिए एक [प्रॉपर्टी][docs.microsoft.com_datetime-properties] मौजूद है।

## 3. जाँचिए कि अपॉइंटमेंट दोपहर के बाद है

- `DateTime` ऑब्जेक्ट के समय वाले हिस्से तक उसकी किसी एक [प्रॉपर्टी][docs.microsoft.com_datetime-properties] से पहुँचा जा सकता है।

## 4. अपॉइंटमेंट का समय और तारीख बताइए

- टेस्ट ऐसे चल रहे हैं जैसे वे संयुक्त राज्य अमेरिका की किसी मशीन पर चल रहे हों, यानी किसी `DateTime` को `string` में बदलने पर तारीख और समय अमेरिकी प्रारूप में मिलते हैं।
- किसी `DateTime` इंस्टेंस को `string` में बदलते समय आप या तो [मानक प्रारूप स्ट्रिंग][docs.microsoft.com_standard-date-and-time-format-strings] इस्तेमाल कर सकते हैं या [कस्टम प्रारूप स्ट्रिंग][docs.microsoft.com_custom-date-and-time-format-strings]।

## 5. सालगिरह की तारीख लौटाइए

- नया `DateTime` इंस्टेंस बनाने के लिए `DateTime` के किसी एक [कंस्ट्रक्टर][constructors] का इस्तेमाल कीजिए।
- वर्तमान वर्ष पाने के लिए आप मौजूदा तारीख और समय की किसी एक [प्रॉपर्टी][docs.microsoft.com_datetime-properties] का इस्तेमाल कर सकते हैं।

[docs.microsoft.com_parsing-date]: https://docs.microsoft.com/en-us/dotnet/standard/base-types/parsing-datetime
[docs.microsoft.com_datetime-operators]: https://docs.microsoft.com/en-us/dotnet/api/system.datetime
[docs.microsoft.com_datetime-properties]: https://docs.microsoft.com/en-us/dotnet/api/system.datetime
[docs.microsoft.com_standard-date-and-time-format-strings]: https://docs.microsoft.com/en-us/dotnet/standard/base-types/standard-date-and-time-format-strings
[docs.microsoft.com_custom-date-and-time-format-strings]: https://docs.microsoft.com/en-us/dotnet/standard/base-types/custom-date-and-time-format-strings
[csharp.net-datetimes-working-with-datetimes-time]: https://csharp.net-tutorials.com/data-types/working-with-dates-time//
[constructors]: https://docs.microsoft.com/en-us/dotnet/api/system.datetime
