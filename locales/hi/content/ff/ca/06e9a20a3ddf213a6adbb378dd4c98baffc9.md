# परिचय

जब किसी कस्टम टाइप के वेरिएंट में डेटा रखा जाता है, तो उसे रिकॉर्ड कहते हैं, और उसके अंदर रखी हर वैल्यू एक _फील्ड_ में रहती है।

```gleam
pub type Rectangle {
  Rectangle(
    Float, // The first field
    Float, // The second field
  )
}
```

पढ़ने में आसानी के लिए Gleam में फील्ड पर नाम का लेबल लगाया जा सकता है।

```gleam
pub type Rectangle {
  Rectangle(
    width: Float,
    height: Float,
  )
}
```

रिकॉर्ड के कंस्ट्रक्टर को आर्गुमेंट किसी भी क्रम में देने के लिए लेबल का उपयोग किया जा सकता है।

```gleam
let a = Rectangle(height: 10.0, width: 20.0)
let b = Rectangle(width: 20.0, height: 10.0)

a == b
// -> True
```

जब किसी कस्टम टाइप में सिर्फ एक ही वेरिएंट हो, तो रिकॉर्ड की फील्ड पाने के लिए `.label` एक्सेसर सिंटैक्स का उपयोग किया जा सकता है।

```gleam
let rect = Rectangle(height: 10.0, width: 20.0)

rect.height // -> 10.0
rect.width  // -> 20.0
```

जब किसी कस्टम टाइप में एक ही वेरिएंट हो, तो रिकॉर्ड अपडेट सिंटैक्स की मदद से किसी मौजूदा रिकॉर्ड से नया रिकॉर्ड बनाया जा सकता है। इसमें कुछ फील्ड को नई वैल्यू से बदल दिया जाता है।

```gleam
let rect = Rectangle(height: 10.0, width: 20.0)
let tall_rect = Rectangle(..rect, height: 50.0)

tall_rect.height // -> 50.0
tall_rect.width  // -> 20.0
```

रिकॉर्ड से वैल्यू निकालने के लिए पैटर्न मैचिंग करते समय भी लेबल का उपयोग किया जा सकता है।

```gleam
pub fn is_tall(rect: Rectangle) {
  case rect {
    Rectangle(height: h, width: _) if h > 20.0 -> True
    _ -> False
  }
}
```

अगर हमें सिर्फ कुछ फील्ड का मिलान करना हो, तो बाकी बची फील्ड को अनदेखा करने के लिए स्प्रेड ऑपरेटर `..` का उपयोग कर सकते हैं।

```gleam
pub fn is_tall(rect: Rectangle) {
  case rect {
    Rectangle(height: h, ..) if h > 20.0 -> True
    _ -> False
  }
}
```
