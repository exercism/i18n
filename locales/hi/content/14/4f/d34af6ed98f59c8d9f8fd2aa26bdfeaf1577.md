# परिचय

## अक्षरों पर ऑपरेशन

Clojure में अक्षर `java.lang.Character` प्रिमिटिव होते हैं, और हम [Character class][java-character-class] के मेथड इस्तेमाल करते हुए [इंटरऑप][clojure-java-interop] के ज़रिए उन पर काम कर सकते हैं:

```clojure
(Character/isDigit \2)
;;=> true
```

## स्ट्रिंग यूटिलिटी

Clojure के साथ एक शक्तिशाली स्ट्रिंग प्रोसेसिंग लाइब्रेरी, [clojure.string][clojure-str], आती है। यह अक्सर इंटरऑप से ज़्यादा स्वाभाविक होती है।

[clojure-str]: https://clojuredocs.org/clojure.string
[clojure-java-interop]: https://clojure.org/reference/java_interop
[java-character-class]: https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/Character.html