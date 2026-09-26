# निर्देश

इस अभ्यास में आप एक साधारण पूर्णांक कैलकुलेटर के लिए एरर संभालने की व्यवस्था बनाएँगे। काम आसान रखने के लिए जोड़, गुणा और भाग निकालने के मेथड पहले से दिए गए हैं।

लक्ष्य यह है कि आपका कैलकुलेटर काम करे और जब उसे `16`, `51` और `+` आर्गुमेंट दिए जाएँ, तो वह `16 + 51 = 67` जैसी स्ट्रिंग लौटाए।

```csharp
SimpleCalculator.Calculate(16, 51, "+"); // => returns "16 + 51 = 67"

SimpleCalculator.Calculate(32, 6, "*"); // => returns "32 * 6 = 192"

SimpleCalculator.Calculate(512, 4, "/"); // => returns "512 / 4 = 128"
```

## 1. कैलकुलेटर के ऑपरेशन लागू कीजिए

इस काम में आपको जो मुख्य मेथड लागू करना है वह (_static_) `SimpleCalculator.Calculate()` मेथड है। यह तीन आर्गुमेंट लेता है। पहले दो आर्गुमेंट पूर्णांक संख्याएँ हैं, जिन पर कोई ऑपरेशन किया जाएगा। तीसरा आर्गुमेंट स्ट्रिंग टाइप का है, और इस अभ्यास में इन ऑपरेशनों को लागू करना ज़रूरी है:

- `+` स्ट्रिंग से जोड़
- `*` स्ट्रिंग से गुणा
- `/` स्ट्रिंग से भाग

## 2. गलत ऑपरेशन संभालिए

किसी अन्य ऑपरेशन चिह्न पर `ArgumentOutOfRangeException` एक्सेप्शन फेंकना चाहिए। अगर ऑपरेशन आर्गुमेंट एक खाली स्ट्रिंग है, तो मेथड को `ArgumentException` एक्सेप्शन फेंकना चाहिए। जब ऑपरेशन आर्गुमेंट के तौर पर `null` दिया जाए, तो मेथड को `ArgumentNullException` एक्सेप्शन फेंकना चाहिए।

```csharp
SimpleCalculator.Calculate(100, 10, "-"); // => throws ArgumentOutOfRangeException

SimpleCalculator.Calculate(8, 2, ""); // => throws ArgumentException

SimpleCalculator.Calculate(58, 6, null); // => throws ArgumentNullException
```

## 3. शून्य से भाग देने पर आने वाली एरर संभालिए

जब `0` से भाग देने की कोशिश हो, तो कैलकुलेटर को `Division by zero is not allowed.` वाली स्ट्रिंग लौटानी चाहिए। `SimpleCalculator.Calculate()` मेथड को कोई अन्य एक्सेप्शन संभालना नहीं चाहिए।

```csharp
SimpleCalculator.Calculate(512, 0, "/"); // => returns "Division by zero is not allowed."
```
