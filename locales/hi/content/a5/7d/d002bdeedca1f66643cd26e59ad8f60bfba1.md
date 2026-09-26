# संकेत

## 1. तय कीजिए कि आपको ड्राइविंग लाइसेंस की ज़रूरत होगी या नहीं

- यह जाँचने के लिए कि आपका इनपुट किसी खास स्ट्रिंग के बराबर है या नहीं, [स्ट्रिक्ट ईक्वल्स ऑपरेटर][mdn-equality-operators] का उपयोग कीजिए।
- दोनों शर्तों को मिलाने के लिए बूलियन कॉन्सेप्ट में सीखे गए दो [लॉजिकल ऑपरेटरों][mdn-logical-operators] में से किसी एक का उपयोग कीजिए।
- इस काम को हल करने के लिए आपको `if` स्टेटमेंट की ज़रूरत **नहीं** है। आप जो बूलियन एक्सप्रेशन बनाते हैं, उसे सीधे लौटा सकते हैं।

## 2. खरीदने के लिए दो संभावित वाहनों में से एक चुनिए

- यह तय करने के लिए कि डिक्शनरी क्रम में कौन सा विकल्प पहले आता है, [रिलेशनल ऑपरेटर][mdn-relational-operators] का उपयोग कीजिए।
- फिर उस तुलना के परिणाम के अनुसार [if-else स्टेटमेंट][mdn-if-statement] की मदद से एक हेल्पर वेरिएबल की वैल्यू असाइन कीजिए।
- अंत में, सिफारिश वाला वाक्य बनाइए। इसके लिए आप दोनों स्ट्रिंग जोड़ने के लिए [एडिशन ऑपरेटर][mdn-addition] का उपयोग कर सकते हैं।

## 3. पुराने वाहन की कीमत का अनुमान लगाइए

- सबसे पहले वाहन की उम्र के आधार पर प्रतिशत तय कीजिए। इसे एक हेल्पर वेरिएबल में रखिए। जैसा निर्देशों में बताया गया है, [if-else if-else स्टेटमेंट][mdn-if-statement] का उपयोग कीजिए।
- दोनों if शर्तों में कार की उम्र की तुलना सीमा वैल्यू से करने के लिए [रिलेशनल ऑपरेटरों][mdn-relational-operators] का उपयोग कीजिए।
- परिणाम निकालने के लिए प्रतिशत को मूल कीमत पर लगाइए। जैसे, `30% of x` निकालने के लिए `30` को `100` से भाग दीजिए और `x` से गुणा कीजिए।

[mdn-equality-operators]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators#equality_operators
[mdn-logical-operators]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators#binary_logical_operators
[mdn-relational-operators]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators#relational_operators
[mdn-addition]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Addition
[mdn-if-statement]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else
