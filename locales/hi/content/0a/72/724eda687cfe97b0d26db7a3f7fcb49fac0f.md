# सनकी पार्टी रोबोट

## कहानी

एक बार की बात है, एक सनकी प्रोग्रामर एक अजीब घर में रहता था, जिसकी खिड़कियों पर सलाखें लगी थीं। एक दिन उसने एक ऑनलाइन जॉब बोर्ड से पार्टी रोबोट बनाने का काम स्वीकार किया। रोबोट को लोगों का स्वागत करना था और उन्हें उनकी सीट तक पहुँचाने में मदद करनी थी। पहला जोड़ काफी तकनीकी था और उससे साफ झलकता था कि प्रोग्रामर में मानवीय बातचीत की समझ कम है। उसमें से कुछ चीज़ें अंतिम संस्करण में भी रह गईं।

## कार्य

- हर व्यक्ति का स्वागत इस तरह कीजिए:

```
Welcome to my party, <name>!
```

- जिस मेहमान का जन्मदिन आज है, उसका स्वागत इस तरह किया जाता है, ताकि रोबोट हर मेहमान के बारे में अपनी जानकारी दिखा सके:

```
Happy birthday <name>! You are now <age> years old!
Welcome to my party!
```

- जो कोई अपनी सीट पूछता है, उसे उसकी टेबल तक पहुँचने का रास्ता इस तरह बताया जाता है:

```
Welcome to my party, <name>!
You have been assigned to table <table-number-in-hex>. Your table is <direction>, exactly <distance-float> meters from here.
You will be sitting next to <neighbour-name>!
```

## कार्यान्वयन

- [Go: strings][implementation-go] (रेफरेंस कार्यान्वयन)

## संदर्भ

- [`types/string`][types-string]

[types-string]: https://github.com/exercism/v3/blob/main/reference/types/string.md
[implementation-go]: https://github.com/exercism/go/blob/main/exercises/concept/strings/.docs/instructions.md
