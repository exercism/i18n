# संकेत

## सामान्य

- हर दिन की पक्षियों की गिनती `birdsPerDay` नाम के एक [फील्ड][fields] में संग्रहीत की जाती है।
- हर दिन की पक्षियों की गिनती एक ऐरे है जिसमें ठीक 7 पूर्णांक होते हैं।

## 1. पिछले हफ्ते की गिनतियाँ जाँचिए

- चूँकि यह मेथड मौजूदा हफ्ते की गिनती पर निर्भर _नहीं_ करता, इसे [`static` मेथड][static-members] के रूप में परिभाषित किया गया है।
- ऐरे बनाने के [कई तरीके हैं][single-dimensional-arrays]।

## 2. जाँचिए कि आज कितने पक्षी आए

- याद रखिए कि गिनतियाँ दिन के क्रम में सबसे पुराने से सबसे नए तक लगी हैं, और अंतिम एलिमेंट आज के दिन को दर्शाता है।
- अंतिम एलिमेंट तक पहुँचने के लिए या तो उसका (तय) इंडेक्स इस्तेमाल कीजिए (याद रखिए, गिनती शून्य से शुरू होती है) या [ऐरे के आकार][array-length] की मदद से उसका इंडेक्स निकालिए।

## 3. आज की गिनती बढ़ाइए

- आज की गिनती दर्शाने वाले एलिमेंट में आज की गिनती से 1 अधिक वैल्यू रखिए।

## 4. जाँचिए कि क्या कोई दिन ऐसा था जब एक भी पक्षी नहीं आया

- `Array` क्लास में एक [पहले से मौजूद मेथड][array-indexof] है जो पहला ऐसा इंडेक्स लौटाता है जहाँ वह एलिमेंट मिलता है, और अगर कोई मेल खाता एलिमेंट न मिले तो -1 लौटाता है।

## 5. पहले कुछ दिनों के लिए आने वाले पक्षियों की संख्या निकालिए

- आने वाले पक्षियों की गिनती रखने के लिए एक वेरिएबल इस्तेमाल किया जा सकता है।
- ऐरे पर [`for` लूप][for-statement] की मदद से इटरेशन किया जा सकता है।
- लूप के अंदर वेरिएबल को अपडेट किया जा सकता है।
- याद रखिए: ऐरे के इंडेक्स `0` से शुरू होते हैं।

## 6. व्यस्त दिनों की संख्या निकालिए

- व्यस्त दिनों की संख्या रखने के लिए एक वेरिएबल इस्तेमाल किया जा सकता है।
- ऐरे पर [`foreach` लूप][array-foreach] की मदद से इटरेशन किया जा सकता है।
- लूप के अंदर वेरिएबल को अपडेट किया जा सकता है।
- लूप के अंदर एक [शर्त वाला स्टेटमेंट][if-statement] इस्तेमाल किया जा सकता है।

[array-foreach]: https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/arrays/using-foreach-with-arrays
[single-dimensional-arrays]: https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/arrays/single-dimensional-arrays
[fields]: https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/fields
[static-members]: https://www.oreilly.com/library/view/programming-c/0596001177/ch04s03.html
[array-indexof]: https://docs.microsoft.com/en-us/dotnet/api/system.array.indexof
[if-statement]: https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/if-else
[array-length]: https://docs.microsoft.com/en-us/dotnet/api/system.array.length
[for-statement]: https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/for
