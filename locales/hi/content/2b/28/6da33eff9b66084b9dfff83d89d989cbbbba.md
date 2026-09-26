# संकेत

## 1. मिलने वाले सभी स्पेस को अंडरस्कोर से बदलिए

- [यह ट्यूटोरियल][chars-tutorial] काम का है।
- `char` के लिए [रेफरेंस डॉक्युमेंटेशन][chars-docs] यहाँ है।
- आप किसी स्ट्रिंग से `char` उसी तरह निकाल सकते हैं जैसे किसी ऐरे से एलिमेंट निकालते हैं।
- आउटपुट स्ट्रिंग बनाने के लिए आपको [`StringBuilder`][string-builder] इस्तेमाल करना चाहिए।
- स्पेस पहचानने के लिए [यह मेथड][iswhitespace] देखिए। याद रखिए कि यह एक स्टैटिक मेथड है।
- `char` लिटरल सिंगल कोट्स में लिखे जाते हैं।

## 2. कंट्रोल अक्षरों को अपरकेस स्ट्रिंग "CTRL" से बदलिए

- कोई अक्षर कंट्रोल अक्षर है या नहीं, यह जाँचने के लिए [यह मेथड][iscontrol] देखिए।

## 3. kebab-case को camel-case में बदलिए

- किसी अक्षर को अपरकेस में बदलने के लिए [यह मेथड][toupper] देखिए।

## 4. ग्रीक के छोटे अक्षरों को छोड़ दीजिए

- `char` के साथ डिफॉल्ट समानता और तुलना ऑपरेटर काम करते हैं।

[chars-docs]: https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/char
[chars-tutorial]: https://csharp.net-tutorials.com/data-types/the-char-type/
[string-builder]: https://docs.microsoft.com/en-us/dotnet/api/system.text.stringbuilder
[iswhitespace]: https://docs.microsoft.com/en-us/dotnet/api/system.char.iswhitespace
[iscontrol]: https://docs.microsoft.com/en-us/dotnet/api/system.char.iscontrol
[toupper]: https://docs.microsoft.com/en-us/dotnet/api/system.char.toupper
[equality]: https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/operators/equality-operators
[comparison]: https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/operators/comparison-operators
