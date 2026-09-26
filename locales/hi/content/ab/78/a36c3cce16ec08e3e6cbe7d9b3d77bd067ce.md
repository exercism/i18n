# Pyret ट्रैक पर टेस्ट चलाना

## ज़रूरी चीज़ें इंस्टॉल कीजिए

अभ्यास को डाउनलोड कर लेने के बाद, टेस्ट चलाने के लिए आपको Node.js मॉड्यूल इंस्टॉल करने होंगे:

```sh
cd /path/to/exercise
npm install
```

फिर `pyret` कमांड लाइन टूल वाली डायरेक्टरी को अपने $PATH में जोड़िए।

```sh
# bash
PATH="./node_modules/.bin:$PATH"

# zsh
path=(./node_modules/.bin $path)

# fish
fish_add_path ./node_modules/.bin
```

## शुरू कीजिए

अभ्यास डायरेक्टरी के अंदर कई फाइलें होंगी, लेकिन सबसे ज़रूरी दो हैं: आपके हल की फाइल और टेस्ट की फाइल।
नीचे दिए उदाहरण में हमने Leap अभ्यास डाउनलोड किया है।

```bash
leap/
├── leap.arr       # Solution file - your code goes here
├── leap-test.arr  # Test cases for the exercise
```

टेस्ट चलाने के लिए, अगर आपने आधिकारिक Exercism CLI डाउनलोड किया है तो `exercism test` इस्तेमाल कीजिए, वरना `pyret leap-test.arr` चलाइए।
Pyret टेस्ट सूट चलाएगा, जिसमें कई लेबल लगे `check` ब्लॉक होते हैं जो आपके हल की फाइल को निर्दिष्ट इनपुट और अपेक्षित परिणामों के साथ जाँचते हैं।
इस प्रक्रिया का एक ज़रूरी हिस्सा यह है कि आप अपने कोड के हिस्सों को साफ़-साफ़ एक्सपोर्ट करें, ताकि टेस्ट सूट उन्हें देख सके।

## provide

इस ट्रैक के टेस्ट आपकी फाइल इंपोर्ट करेंगे, जिससे आपके कोड से साफ़-साफ़ एक्सपोर्ट की गई हर चीज़ तक उनकी पहुँच हो जाएगी।

वेरिएबल एक्सपोर्ट करने के लिए आपको अपनी फाइल के शुरू में एक [provide स्टेटमेंट][provide-statement] जोड़ना होगा।

नीचे दिए गए दो स्निपेट `a`, `b` और `c` को एक्सपोर्ट करने के दो सही तरीके हैं।

```pyret
# using a list of bindings
provide a, b, c end
```

```pyret
# using an object literal
provide {
  a: a,
  b: b,
  c: c
}
end
```

तीसरा तरीका, `provide *`, सभी टॉप-लेवल बाइंडिंग को एक्सपोर्ट करने का छोटा रूप है, सिवाय कस्टम डेटा टाइप के।
लेकिन आम तौर पर इसकी सलाह नहीं दी जाती, क्योंकि Pyret [शैडोइंग][shadowing] की इजाज़त देने में सख्त है।

## provide-types

कुछ अभ्यासों में टेस्ट के लिए एक [कस्टम डेटा टाइप][data-definition] एक्सपोर्ट करना ज़रूरी होगा।
ऐसी स्थितियों में आप [provide-types स्टेटमेंट][provide-types-statement] इस्तेमाल कर सकते हैं।
चूँकि डेटा टाइप के साथ कुछ अतिरिक्त फंक्शन होते हैं जो एक्सपोर्ट नहीं हुए होंगे, इसलिए शैडोइंग की चिंता के बावजूद `provide-types *` इस्तेमाल करने की सलाह दी जाती है।

```pyret
provide-types *

data MyPoint:
  | two-dim(x, y)
  | three-dim(x, y, z)
end
```

हर अभ्यास के स्टब में `provide` या `provide-types` स्टेटमेंट आपके इस्तेमाल के लिए पहले से तैयार रहेगा।

[provide-statement]: https://pyret.org/docs/latest/Provide_Statements.html
[shadowing]: https://pyret.org/docs/latest/Bindings.html#%28part._s~3ashadowing%29
[data-definition]: https://pyret.org/docs/latest/s_declarations.html#%28elem._%28bnf-prod._%28.Pyret._data-decl%29%29%29
[provide-types-statement]: https://pyret.org/docs/latest/Provide_Statements.html
