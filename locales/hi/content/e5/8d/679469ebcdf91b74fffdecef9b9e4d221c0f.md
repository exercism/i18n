# परिचय

TypeScript, JavaScript ही है, बस इसमें टाइप लिखने का सिंटैक्स जुड़ा है। इसी वजह से यह एक स्ट्रॉन्गली टाइप्ड प्रोग्रामिंग भाषा है, जो ऑब्जेक्ट-ओरिएंटेड, इम्परेटिव और डिक्लेरेटिव (जैसे फंक्शनल प्रोग्रामिंग) शैलियों को साथ लेकर चलती है और किसी भी पैमाने पर आपको बेहतर टूल देती है।
इसमें कुछ [प्रिमिटिव][mdn-primitive] होते हैं, और बाकी सब कुछ ऑब्जेक्ट माना जाता है।

JavaScript भले ही वेब पेजों की स्क्रिप्टिंग भाषा के रूप में सबसे ज़्यादा जानी जाती है, लेकिन Node.js जैसे कई गैर-ब्राउज़र वातावरण भी इसका उपयोग करते हैं।
इस भाषा पर सक्रिय रूप से काम हो रहा है, और इसकी बहु-पैराडाइम प्रकृति के कारण यह प्रोग्रामिंग की कई शैलियों को संभव बनाती है।

TypeScript इसी के ऊपर बनाई गई है और इस पर भी सक्रिय रूप से काम हो रहा है।
2023 की कुछ रैंकिंग में रोज़मर्रा के उपयोग में यह JavaScript से ज़्यादा लोकप्रिय रही है।

चूँकि [JavaScript सीखे बिना TypeScript सीखी नहीं जा सकती][handbook-js-or-ts], इस ट्रैक की कुछ सामग्री JavaScript के कॉन्सेप्ट सिखाने पर केंद्रित है और कुछ कॉन्सेप्ट सिर्फ TypeScript की अपनी विशेषताओं पर।

## (पुनः) असाइनमेंट

TypeScript में नामों को वैल्यू असाइन करने के कुछ मुख्य तरीके हैं: वेरिएबल या कॉन्स्टेंट के ज़रिए।
Exercism पर वेरिएबलो को हमेशा [camelCase][wiki-camel-case] में लिखा जाता है और कॉन्स्टेंट को [SCREAMING_SNAKE_CASE][wiki-snake-case] में।
इसके लिए कोई आधिकारिक गाइड नहीं है, और अलग-अलग कंपनियों तथा संगठनों की अपनी-अपनी स्टाइल गाइड होती हैं।
_वेरिएबल आप अपनी पसंद से किसी भी तरह लिख सकते हैं_।
अभ्यास जिस तरह तैयार किए गए हैं, उसी तरह वेरिएबल लिखने का फायदा यह है कि वेब इंटरफेस और ज़्यादातर IDE में वे अलग-अलग रंग में दिखेंगे।

TypeScript में वेरिएबल [`const`][mdn-const], [`let`][mdn-let] या [`var`][mdn-var] कीवर्ड से बनाए जा सकते हैं।

`let` या `var` के साथ एक वेरिएबल अपने जीवनकाल में अलग-अलग वैल्यू ले सकता है।
उदाहरण के लिए, `myFirstVariable` को असाइनमेंट ऑपरेटर `=` की मदद से कई बार बनाया और दोबारा बनाया जा सकता है:

```typescript
let myFirstVariable = 1
myFirstVariable = 'Some string'
myFirstVariable = new SomeComplexClass()
```

इसके उलट, `const` से बने वेरिएबल को सिर्फ एक ही बार वैल्यू असाइन की जा सकती है।
TypeScript में कॉन्स्टेंट बनाने के लिए इसी का उपयोग होता है।

```typescript
const MY_FIRST_CONSTANT = 10

// Can not be re-assigned.
MY_FIRST_CONSTANT = 20
// => TypeError: Assignment to constant variable.
```

चूँकि TypeScript इसे स्टैटिक रूप से पहचान सकती है, TypeScript कंपाइलर भी एक एरर देता है:

```typescript
// ^? Cannot assign to 'MY_FIRST_CONSTANT' because it is a constant.(2588)
```

इसका मतलब है कि `TypeError` पकड़ने के लिए आपको कोड चलाने की ज़रूरत नहीं है।

<!--prettier-ignore -->
~~~~exercism/note
💡 बाद के किसी अभ्यास में _कॉन्स्टेंट_ असाइनमेंट / बाइंडिंग और _कॉन्स्टेंट_ वैल्यू के बीच के अंतर को खोलकर समझाया जाएगा।
~~~~

## टाइप इन्फरेंस

[टाइप इन्फरेंस][handbook-type-inference] के विषय में बहुत गहरे उतरे बिना इतना जान लीजिए कि जिस वेरिएबल को वैल्यू दी जाती है, उसका एक अनुमानित टाइप आम तौर पर होता ही है, भले ही कोई टाइप एनोटेशन न लिखा गया हो।

```typescript
const MY_FIRST_CONSTANT = 10
// ^? const MY_FIRST_CONSTANT: number
```

इसके बाद यह टाइप पूरे कोड में लागू रहता है।
इसका यह भी मतलब है कि जहाँ नीचे दिया गया कोड मान्य JavaScript है:

```javascript
let myFirstVariable = 1
myFirstVariable = 'Some string'
```

वहीं TypeScript में वही कोड एरर देता है:

```typescript
let myFirstVariable = 1
myFirstVariable = 'Some string'
// ^? Type 'string' is not assignable to type 'number'.(2322)
```

यह फीचर तब भी टाइप-सुरक्षा सुनिश्चित करता है जब टाइप एनोटेशन लिखे ही न गए हों।

### कॉन्स्टेंट असाइनमेंट

`const` कीवर्ड का ज़िक्र वेरिएबल और कॉन्स्टेंट, _दोनों_ के लिए होता है।
कॉन्स्टेंट के आसपास अक्सर जिस दूसरे कॉन्सेप्ट की बात आती है, वह है [(अ)परिवर्तनीयता][wiki-mutability]।

`const` कीवर्ड सिर्फ _बाइंडिंग_ को अपरिवर्तनीय बनाता है, यानी `const` वेरिएबल को आप एक ही बार वैल्यू असाइन कर सकते हैं।
TypeScript में सिर्फ [प्रिमिटिव][mdn-primitive] वैल्यू ही अपरिवर्तनीय होती हैं।
लेकिन [गैर-प्रिमिटिव][mdn-primitive] वैल्यू को फिर भी बदला जा सकता है।

```typescript
const MY_MUTABLE_VALUE_CONSTANT = { food: 'apple' }

// This is possible
MY_MUTABLE_VALUE_CONSTANT.food = 'pear'

MY_MUTABLE_VALUE_CONSTANT
// => { food: "pear" }
```

### कॉन्स्टेंट वैल्यू (अपरिवर्तनीयता)

Exercism पर, और कई दूसरे संगठनों तथा प्रोजेक्ट स्टाइल गाइड में, यह नियम है कि `const SCREAMING_SNAKE_CASE` जैसी दिखने वाली वैल्यू को न बदलें।
तकनीकी रूप से इन वैल्यू को बदला _जा सकता_ है, लेकिन स्पष्टता और अपेक्षाओं को सही रखने के लिए Exercism पर ऐसा करने से रोका जाता है।
जब इसे _ज़रूर_ लागू करना पड़े, तो [`Object.freeze(value)`][mdn-object-freeze] का उपयोग कीजिए।

जहाँ संभव हो, अपरिवर्तनीयता को स्टैटिक रूप से लागू करने के लिए TypeScript का `readonly` कीवर्ड, `as const`, या `Readonly<T>` जेनेरिक टाइप इस्तेमाल किया जा सकता है।
इस विषय के बारे में आप आगे और सीखेंगे।

```typescript
const MY_VALUE_CONSTANT = Object.freeze({ food: 'apple' })

MY_VALUE_CONSTANT.food = 'pear'
// ^? Cannot assign to 'food' because it is a read-only property.(2540)

MY_VALUE_CONSTANT
// => { food: "apple" }
```

व्यवहार में किसी कोडबेस में हर जगह `Object.freeze` दिखना आम नहीं है, लेकिन `SCREAMING_SNAKE_CASE` वैल्यू को कभी न बदलने का नियम अच्छा नियम है; इसे अक्सर लिंटर जैसे ऑटोमेटेड विश्लेषण से लागू कराया जाता है।

## फंक्शन घोषणाएँ

TypeScript में काम की इकाइयाँ _फंक्शन_ में समेटी जाती हैं। जो फंक्शन एक-दूसरे से जुड़े हों, उन्हें आम तौर पर एक ही फाइल में साथ रखा जाता है।
ये फंक्शन पैरामीटर (आर्गुमेंट) ले सकते हैं और `return` कीवर्ड की मदद से कोई वैल्यू _लौटा_ सकते हैं।
फंक्शन को `()` सिंटैक्स से कॉल किया जाता है।

```typescript
function add(num1: number, num2: number): number {
  return num1 + num2
}

add(1, 3)
// => 4
```

फंक्शन के पैरामीटर पर आम तौर पर टाइप एनोटेशन लिखा जाना चाहिए, जिसमें कोलन (`:`) के बाद टाइप आता है।
फंक्शन के रिटर्न वैल्यू पर एनोटेशन पैरामीटर की सूची बंद करने के बाद लिखा जा सकता है, जिसमें कोलन (`:`) के बाद टाइप आता है।

अगर किसी फंक्शन के रिटर्न वैल्यू पर टाइप एनोटेशन नहीं है, तो टाइप का अनुमान लगा लिया जाएगा।

```typescript
function add(num1: number, num2: number) {
  return num1 + num2
}

add(1, 3)
// ^? function add(num1: number, num2: number): number
```

यहाँ रिटर्न टाइप का अनुमान इसलिए लगा, क्योंकि TypeScript को पता रहता है कि `number + number` का परिणाम हमेशा `number` ही होगा।

<!--prettier-ignore -->
~~~~exercism/note
💡 TypeScript में फंक्शन घोषित करने के _कई_ अलग-अलग तरीके हैं।
ये दूसरे तरीके `function` कीवर्ड इस्तेमाल करने से अलग दिखते हैं।
ट्रैक कोशिश करता है कि इन्हें धीरे-धीरे पेश करे, लेकिन अगर आप इन्हें पहले से जानते हैं, तो इनमें से कोई भी इस्तेमाल कर सकते हैं।
ज़्यादातर मामलों में किसी एक का इस्तेमाल करना दूसरे से बेहतर या खराब नहीं है।
~~~~

## टाइप एनोटेशन

जैसा कि `add` की फंक्शन घोषणा में दिख रहा है, पैरामीटर पर साफ़-साफ़ टाइप एनोटेशन `: number` लिखा है।
वेरिएबल घोषणाएँ, क्लास की प्रॉपर्टी, फंक्शन घोषणाएँ और बहुत कुछ, सब टाइप एनोटेशन का समर्थन करते हैं।

साफ़ लिखे गए टाइप एनोटेशन और अनुमानित टाइप, दोनों पर टाइप चेकर नज़र रखता है।

```typescript
add('foo', 3)
// ^? Argument of type 'string' is not assignable to parameter of type 'number'.(2345)
```

अगर TypeScript को साफ़ टाइप एनोटेशन नहीं मिलता और टाइप का अनुमान भी नहीं लग पाता, तो वह `any` टाइप असाइन कर देती है, जिसका [आपको उपयोग नहीं करना चाहिए][handbook-dont-use-any]।
आगे आप `unknown` टाइप के बारे में सीखेंगे, जो इसका अच्छा विकल्प है।

## एक्सपोर्ट और इम्पोर्ट

`export` और `import` कीवर्ड बहुत काम के टूल हैं, जो एक साधारण TypeScript फाइल को [TypeScript मॉड्यूल][mdn-module] बना देते हैं।
ये कोड को चुनिंदा चीज़ें यानी फंक्शन, क्लास, वेरिएबल और कॉन्स्टेंट बाहर दिखाने की सुविधा देते हैं, और इसके साथ ही कई दूसरे फीचर भी चालू करते हैं, जैसे:

- [एक्सपोर्ट और इम्पोर्ट के नाम बदलना][mdn-renaming-modules], जिससे आप नामों का टकराव टाल सकते हैं,
- [डायनामिक इम्पोर्ट][mdn-dynamic-imports], जो ज़रूरत पड़ने पर कोड लोड करते हैं,
- [ट्री शेकिंग][blog-tree-shaking], जो बिना साइड इफेक्ट वाले मॉड्यूल, और यहाँ तक कि _जिन मॉड्यूल का उपयोग नहीं होता_ उनकी सामग्री तक हटाकर अंतिम कोड का आकार घटाती है,
- [_लाइव बाइंडिंग_][blog-live-bindings] एक्सपोर्ट करना, जिससे आप ऐसी वैल्यू एक्सपोर्ट कर सकते हैं जो मूल वैल्यू बदलने पर हर उस जगह बदल जाती है जहाँ वह इम्पोर्ट की गई हो।

इसका एक ठोस उदाहरण यह है कि Exercism के TypeScript ट्रैक पर टेस्ट कैसे काम करते हैं।
हर अभ्यास में कम से कम एक इम्प्लीमेंटेशन फाइल होती है, जैसे `lasagna.ts`, और हर अभ्यास में कम से कम एक टेस्ट फाइल होती है, जैसे `lasagna.test.ts`।
इम्प्लीमेंटेशन फाइल `export` से पब्लिक API बाहर दिखाती है और टेस्ट फाइल `import` से उन तक पहुँचती है, और इसी तरह वह इम्प्लीमेंटेशन के नतीजे जाँच पाती है।

```typescript
// file.js
export const MY_VALUE = 10

export function add(num1, num2) {
  return num1 + num2
}

// file.spec.js
import { MY_VALUE, add } from './file.js'

add(MY_VALUE, 5)
// => 15
```

<!--prettier-ignore -->
~~~~exercism/advanced
चूँकि TypeScript कंपाइलर इम्पोर्ट पथ _दोबारा नहीं लिखता_, इम्पोर्ट `.js` एक्सटेंशन के साथ लिखे जाने चाहिए (क्योंकि ट्रांसपाइलेशन के बाद वही रहता है)।
लेकिन `allowImportingTsExtensions` विकल्प चालू है, क्योंकि हमारे पास एक ऐसी प्रक्रिया है जो पथ दोबारा लिख देती है।
इससे `.ts` से भी इम्पोर्ट किया जा सकता है (`.js` से भी)।

पुराने कोड में आपको _बिना फाइल एक्सटेंशन_ वाले इम्पोर्ट मिलेंगे।
~~~~

[blog-live-bindings]: https://2ality.com/2015/07/es6-module-exports.html#es6-modules-export-immutable-bindings
[blog-tree-shaking]: https://bitsofco.de/what-is-tree-shaking/
[mdn-const]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const
[mdn-dynamic-imports]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#Dynamic_Imports
[mdn-let]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let
[mdn-module]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules
[mdn-object-freeze]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze
[mdn-primitive]: https://developer.mozilla.org/en-US/docs/Glossary/Primitive
[mdn-renaming-modules]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules#Renaming_imports_and_exports
[mdn-var]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/var
[handbook-dont-use-any]: https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html#any
[handbook-js-or-ts]: https://www.typescriptlang.org/docs/handbook/typescript-from-scratch.html#learning-javascript-and-typescript
[handbook-type-inference]: https://www.typescriptlang.org/docs/handbook/type-inference.html
[wiki-mutability]: https://en.wikipedia.org/wiki/Immutable_object
[wiki-camel-case]: https://en.wikipedia.org/wiki/Camel_case
[wiki-snake-case]: https://en.wikipedia.org/wiki/Snake_case
