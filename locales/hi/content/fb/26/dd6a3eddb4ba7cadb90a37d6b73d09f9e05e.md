# निर्देशों का परिशिष्ट

## Arturo के निर्देश

इस अभ्यास में आपको `stringify` वर्ड को कॉल करने के दो अलग-अलग तरीकों का समर्थन करना होगा:

1. `roman` एट्रिब्यूट के साथ (जैसे `stringify.roman 3999`)
2. `roman` एट्रिब्यूट के बिना (जैसे `stringify 3999`)

अधिक जानकारी के लिए [attributes][attributes] डॉक्यूमेंटेशन और [`attr`][attr] डॉक्यूमेंटेशन देखिए।

~~~~exercism/caution
`attr` के अलावा `attrs` फंक्शन भी काम का है: यह फंक्शन कॉल के सारे एट्रिब्यूट एक डिक्शनरी के रूप में लौटाता है।

ध्यान रखिए कि ये दोनों फंक्शन डेस्ट्रक्टिव हैं!

Arturo का इम्प्लीमेंटेशन एक ["attributes table"][createAttrsStack] इस्तेमाल करता है।

* `attrs` एट्रिब्यूट निकालने के बाद [टेबल को जान-बूझकर खाली कर देता है][getAttrsDict]।
* `attr` [टेबल से एट्रिब्यूट को हटा देता है ("पॉप" कर देता है)][builtinAttr]।

एक उदाहरण:

```arturo
showAttributes: function [x][
    print attr 'question
    print attrs
    print attrs
]

showAttributes .question:"6 * 9" .answer:42 'arg
```
इसका आउटपुट यह है:
```
6 * 9
[answer:42]
[]
```

हर कदम पर हम देखते हैं कि एट्रिब्यूट डिक्शनरी छोटी होती जाती है।

**निष्कर्ष**: ध्यान रखिए कि आप एट्रिब्यूट सिर्फ एक बार ही निकाल सकते हैं।
अगर आपको एट्रिब्यूट दोबारा देखने की ज़रूरत पड़े, तो उन्हें अपने फंक्शन के शुरू में ही सुरक्षित रख लीजिए।

[getAttrsDict]: https://github.com/arturo-lang/arturo/blob/2ef0081570feb6ab752404c32bbf85132df379fb/src/vm/stack.nim#L187
[builtinAttr]: https://github.com/arturo-lang/arturo/blob/2ef0081570feb6ab752404c32bbf85132df379fb/src/library/Reflection.nim#L85
[createAttrsStack]: https://github.com/arturo-lang/arturo/blob/2ef0081570feb6ab752404c32bbf85132df379fb/src/vm/stack.nim#L136
~~~~

[attributes]: https://arturo-lang.io/documentation/language/#attributes
[attr]: https://arturo-lang.io/documentation/library/reflection/attr/
