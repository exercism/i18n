# संकेत

## 1. स्वीकृति को परिभाषित कीजिए

- [एल्जेब्राइक डेटा टाइप][ADT] `Approval` को आवश्यक विकल्पों के कंस्ट्रक्टर के साथ परिभाषित कीजिए।

## 2. खानपान को परिभाषित कीजिए

- [एल्जेब्राइक डेटा टाइप][ADT] `Cuisine` को आवश्यक विकल्पों के कंस्ट्रक्टर के साथ परिभाषित कीजिए।

## 3. फिल्म की शैलियों को परिभाषित कीजिए

- [एल्जेब्राइक डेटा टाइप][ADT] `Genre` को आवश्यक विकल्पों के कंस्ट्रक्टर के साथ परिभाषित कीजिए।

## 4. गतिविधि को परिभाषित कीजिए

- अलग-अलग गतिविधियों को एक साथ रखने के लिए [डेटा से जुड़ा एल्जेब्राइक डेटा टाइप][ADT-with-data] परिभाषित कीजिए।

## 5. गतिविधि को रेटिंग दीजिए

- गतिविधि की वैल्यू के आधार पर कोड चलाने का सबसे अच्छा तरीका [केस एक्सप्रेशन][case-expression] का इस्तेमाल करना है।
- किसी एल्जेब्राइक डेटा टाइप के केस पर पैटर्न मैचिंग करने से उसके साथ जुड़े डेटा तक पहुँच मिलती है।
- किसी पैटर्न में एक और शर्त जोड़ने के लिए आप केस के अंदर [गार्ड][guards] का इस्तेमाल कर सकते हैं।
- अगर आप एक ही केस में बाकी सारी संभावित वैल्यू पकड़ना चाहते हैं, तो वाइल्डकार्ड पैटर्न `_` का इस्तेमाल कर सकते हैं।

[ADT]: https://www.schoolofhaskell.com/school/starting-with-haskell/introduction-to-haskell/2-algebraic-data-types#enumeration-types
[ADT-with-data]: https://www.schoolofhaskell.com/school/starting-with-haskell/introduction-to-haskell/2-algebraic-data-types#beyond-enumerations
[case-expression]: https://www.schoolofhaskell.com/school/starting-with-haskell/introduction-to-haskell/2-algebraic-data-types#case-expessions
[guards]: https://learnyouahaskell.github.io/syntax-in-functions.html#guards-guards
