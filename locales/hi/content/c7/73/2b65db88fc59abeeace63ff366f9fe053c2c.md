# संकेत

## सामान्य

- यहाँ पहले सीखे गए कॉन्सेप्ट [स्ट्रक्ट][structs], [मैप][maps] और [मेथड][methods] काम आते हैं।


## 1. उपस्थित लोगों को ट्रैक करना

- [टाइप डेफिनिशन][type definition] कॉन्सेप्ट समझाता है कि नया टाइप कैसे बनाया जाता है।
- नया `map` बनाने के लिए `make()` का इस्तेमाल कीजिए।
- मैप में कोई वैल्यू जोड़नी हो तो `struct{}{}` का इस्तेमाल करके खाली `struct{}` का एक इंस्टेंस बनाइए।

## 2. उपस्थित लोगों की जाँच करना

- अगर कोई एलिमेंट मैप में है, तो सेट में वह वैल्यू मौजूद है।
- यह जाँचने के लिए कि मैप में कोई आइटम है या नहीं, [टू-वैल्यू असाइनमेंट][two value assignment] का इस्तेमाल किया जा सकता है।

## 3. उपस्थित लोगों की तुलना करना

- दो सेट तब बराबर होते हैं जब एक सेट की सारी वैल्यू दूसरे सेट में मौजूद हों।
- सेट के सारे एलिमेंट जाँचने के लिए `range` का इस्तेमाल किया जा सकता है।

[maps]: https://exercism.org/tracks/go/concepts/maps
[methods]: https://exercism.org/tracks/go/concepts/methods
[structs]: https://exercism.org/tracks/go/concepts/structs
[two value assignment]: https://go.dev/tour/moretypes/22
[type definition]: https://exercism.org/tracks/go/concepts/type-definitions
