# परिचय

`Maybe` टाइप Elm भाषा में वैकल्पिक वैल्यू के लिए समाधान है। इसलिए Elm के बहुत से मुख्य फंक्शन के टाइप सिग्नेचर में यह मौजूद रहता है। इसे समझना बहुत ज़रूरी है। `Maybe` टाइप को इस तरह परिभाषित किया गया है:

```elm
type Maybe a = Nothing | Just a
```

Elm की शब्दावली में इसे "कस्टम टाइप" की परिभाषा कहा जाता है। यह बताता है कि इस टाइप की कोई वैल्यू या तो `Nothing` हो सकती है, या `a` टाइप की कोई चीज़ `Just` के रूप में हो सकती है। `Maybe` वैल्यू बनाने के लिए इसके दो कंस्ट्रक्टर `Nothing` और `Just` में से किसी एक का उपयोग किया जाता है। `Maybe` के अंदर की सामग्री पढ़ने के लिए पैटर्न मैचिंग का उपयोग किया जाता है।

```elm
matthieu : Maybe String
matthieu = Just "Matthieu"

anon : Maybe String
anon = Nothing

sayHello : Maybe String -> String
sayHello maybeName =
    case maybeName of
        Nothing -> "Hello, World!"
        Just someName -> "Hello, " ++ someName ++ "!"

sayHello matthieu
    --> "Hello, Matthieu!"

sayHello anon
    --> "Hello, World!"
```

`Maybe` मॉड्यूल में `Maybe` टाइप पर काम करने के लिए कई उपयोगी फंक्शन भी हैं।

```elm
sayHelloAgain : Maybe String -> String
sayHelloAgain name = "Hello, " ++ Maybe.withDefault "World" name ++ "!"

capitalizeName : Maybe String -> Maybe String
capitalizeName name = Maybe.map String.toUpper name

capitalizeName matthieu
    --> Just "MATTHIEU"

capitalizeName anon
    --> Nothing
```
