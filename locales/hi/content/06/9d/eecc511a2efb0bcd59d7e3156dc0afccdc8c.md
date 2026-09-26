# निर्देश परिशिष्ट

## संकेत

आपको `diamond` फंक्शन बनाना है, जो हीरे जैसा आकार छापता है। यह आकार `A` से
शुरू होता है और इसके सबसे चौड़े बिंदुओं पर दिया गया अक्षर आता है। अगर आपको
टाइप के बारे में शंका हो, तो दिया गया सिग्नेचर इस्तेमाल कर सकते हैं, पर उसे
अपनी रचनात्मकता सीमित करने न दें:

```haskell
diamond :: Char -> Maybe [String]
```

यह अभ्यास टेक्स्ट डेटा के साथ काम करता है। ऐतिहासिक कारणों से Haskell का
`String` टाइप `[Char]` के समान है, यानी अक्षरों का ऐरे। टेक्स्ट डेटा को और
कुशलता से संभालने के लिए `Text` टाइप इस्तेमाल किया जा सकता है।

इस अभ्यास के वैकल्पिक विस्तार के तौर पर आप यह कर सकते हैं:

- Haskell में [स्ट्रिंग टाइप](https://haskell-lang.org/tutorial/string-types) के
  बारे में पढ़िए।
- package.yaml में अपनी डिपेंडेंसी की सूची में `- text` जोड़िए।
- `Data.Text` को [इस
  तरीके से](https://hackernoon.com/4-steps-to-a-better-imports-list-in-haskell-43a3d868273c)
  इंपोर्ट कीजिए:

```haskell
import qualified Data.Text as T
import           Data.Text (Text)
```

- अब आप उदाहरण के लिए `diamond :: Char -> Maybe [Text]` लिख सकते हैं और
  `Data.Text` के कॉम्बिनेटरों को, जैसे `T.pack`, इस्तेमाल कर सकते हैं,
- [`Data.Text`](https://hackage.haskell.org/package/text/docs/Data-Text.html) का
  डॉक्युमेंटेशन देख लीजिए,
- इसके बाद Diamond.hs में `String` की सभी जगहों पर `Text` लिख सकते हैं:

```haskell
diamond :: Char -> Maybe [Text]
```

यह हिस्सा पूरी तरह वैकल्पिक है।
