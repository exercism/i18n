# परिचय

## इंटरफ़ेस

एक इंटरफ़ेस एक टाइप होता है जिसमें ऐसे सदस्य होते हैं जो आपस में जुड़ी कार्यक्षमता का समूह परिभाषित करते हैं।
यह क्लास के उपयोग को उसके इम्प्लीमेंटेशन से अलग करता है, जिससे कई अलग-अलग इम्प्लीमेंटेशन संभव हो जाते हैं, या फॉर्मेटिंग, तुलना या रूपांतरण जैसे किसी जेनेरिक व्यवहार का समर्थन किया जा सकता है।

एक इंटरफ़ेस का सिंटैक्स क्लास के समान होता है, सिवाय इसके कि मेथड केवल सिग्नेचर के रूप में दिखते हैं और कोई बॉडी नहीं दी जाती।

```java
public interface Language {
    String getLanguageName();
    String speak();
}

public class ItalianTraveller implements Language, Cloneable {

    // from Language interface
    public String getLanguageName() {
        return "Italiano";
    }

    // from Language interface
    public String speak() {
        return "Ciao mondo";
    }

    // from Cloneable interface
    public Object clone() {
        ItalianTraveller it = new ItalianTraveller();
        return it;
    }
}
```

इंटरफ़ेस द्वारा परिभाषित सभी ऑपरेशनों को लागू करने वाली क्लास द्वारा लागू किया जाना चाहिए।

इंटरफ़ेस में आमतौर पर इंस्टेंस मेथड होते हैं।

Java क्लास लाइब्रेरी में मिलने वाले इंटरफ़ेस का एक उदाहरण, ऊपर दिखाए गए `Cloneable` के अलावा, `Comparable<T>` है।
`Comparable<T>` इंटरफ़ेस को वहाँ लागू किया जा सकता है जहाँ कलेक्शन में डिफ़ॉल्ट जेनेरिक सॉर्ट क्रम की आवश्यकता होती है।
