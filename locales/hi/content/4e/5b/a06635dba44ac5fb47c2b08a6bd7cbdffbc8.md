# परिचय

ऐरे के साथ काम करते समय आप अक्सर चाहते हैं कि ऐरे की हर वैल्यू के लिए कोड चले। इसे ऐरे पर इटरेशन करना या लूप करना कहते हैं।

यहाँ हम उस स्थिति को देखेंगे जिसमें आप इस दौरान ऐरे को बदलना नहीं चाहते। ऐरे में रूपांतरण करने के लिए [कॉन्सेप्ट ऐरे ट्रांसफॉर्मेशन][concept-array-transformations] देखिए।

## `for` लूप

ऐरे पर इटरेशन करने का सबसे साधारण तरीका `for` लूप का उपयोग करना है। इसके लिए [कॉन्सेप्ट `for` लूप][concept-for-loops] देखिए।

```javascript
const numbers = [6.0221515, 10, 23];

for (let i = 0; i < numbers.length; i++) {
  console.log(numbers[i]);
}
// => 6.0221515
// => 10
// => 23
```

## `for...of` लूप

जब आप हर इटरेशन में सीधे वैल्यू के साथ काम करना चाहते हैं और इंडेक्स की ज़रूरत बिल्कुल नहीं है, तो आप `for...of` लूप का उपयोग कर सकते हैं।

`for...of` ऊपर दिखाए गए साधारण `for` लूप की तरह ही काम करता है। फर्क इतना है कि इसमें लूप के अंदर _इंडेक्स_ को वेरिएबल के रूप में संभालने की ज़रूरत नहीं पड़ती, बल्कि आपको सीधे _वैल्यू_ मिल जाती है।

```javascript
const numbers = [6.0221515, 10, 23];

// Because re-assigning number inside the loop will be very
// confusing, disallowing that via const is preferable.
for (const number of numbers) {
  console.log(number);
}
// => 6.0221515
// => 10
// => 23
```

आम `for` लूप की तरह ही, आप `continue` से वर्तमान इटरेशन रोक सकते हैं और `break` से लूप का चलना पूरी तरह बंद कर सकते हैं।

## `forEach` मेथड

हर ऐरे में एक `forEach` मेथड होता है, जिसका उपयोग ऐरे के एलिमेंट पर लूप करने के लिए किया जा सकता है।

`forEach` एक पैरामीटर के रूप में [कॉलबैक][concept-callbacks] लेता है।
ऐरे के हर एलिमेंट के लिए कॉलबैक फंक्शन एक बार कॉल किया जाता है।
कॉलबैक को आर्गुमेंट के रूप में वर्तमान एलिमेंट, उसका इंडेक्स और पूरा ऐरे दिया जाता है।
अक्सर वर्तमान एलिमेंट या सिर्फ इंडेक्स इस्तेमाल किया जाता है।

```javascript
const numbers = [6.0221515, 10, 23];

numbers.forEach((number, index) => console.log(number, index));
// => 6.0221515 0
// => 10 1
// => 23 2
```

`forEach` लूप शुरू होने के बाद इटरेशन रोकने का कोई तरीका नहीं है।
इस संदर्भ में `break` और `continue` स्टेटमेंट मौजूद नहीं हैं।

[concept-array-transformations]: /tracks/javascript/concepts/array-transformations
[concept-for-loops]: /tracks/javascript/concepts/for-loops
[concept-callbacks]: /tracks/javascript/concepts/callbacks
