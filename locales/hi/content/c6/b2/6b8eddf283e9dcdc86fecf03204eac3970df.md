# संकेत

## सामान्य

- Kotlin में स्ट्रिंग के साथ काम करने के लिए कई [फंक्शन][ref-strings] मौजूद हैं। `Members & Extensions` टैब ज़रूर देखिए!

## 1. लॉग लाइन से संदेश निकालिए

- दिए गए डेलिमिटर के बाद `String` का जो हिस्सा आता है, उसे निकालने के लिए एक [फंक्शन][ref-string-substringAfter] है।
- `String` से व्हाइटस्पेस हटाना [Kotlin में स्ट्रिंग से सारे व्हाइटस्पेस हटाना][tutorial-trim-white-space] में समझाया गया है।

## 2. लॉग लाइन से लॉग लेवल निकालिए

- दिए गए डेलिमिटर से _पहले_ `String` का जो हिस्सा आता है, उसे निकालने के लिए भी एक [फंक्शन][ref-string-substringBefore] है।
- `String` को छोटे अक्षरों में बदलने का एक [तरीका][ref-string-lowercase] है।

## 3. लॉग लाइन को नए रूप में लिखिए

- [स्ट्रिंग टेम्पलेट][docs-string-template] [मल्टीलाइन स्ट्रिंग][docs-string-multiline] की मदद से लिखे जा सकते हैं।

[docs-string-multiline]: https://kotlinlang.org/docs/strings.html#multiline-strings
[docs-string-template]: https://kotlinlang.org/docs/strings.html#string-templates
[ref-strings]: https://kotlinlang.org/api/core/kotlin-stdlib/kotlin/-string/
[ref-string-indexOf]: https://kotlinlang.org/api/core/kotlin-stdlib/kotlin/-string/#-537588047%2FFunctions%2F-1430298843
[ref-string-lowercase]: https://kotlinlang.org/api/core/kotlin-stdlib/kotlin/-string/#-648004414%2FFunctions%2F-956074838
[ref-string-substringAfter]: https://kotlinlang.org/api/core/kotlin-stdlib/kotlin/-string/#1564391517%2FFunctions%2F-1430298843
[tutorial-search-text-in-string]: https://javarevisited.blogspot.com/2016/10/how-to-check-if-string-contains-another-substring-in-java-indexof-example.html
[tutorial-trim-white-space]: https://www.baeldung.com/kotlin/string-remove-whitespace
