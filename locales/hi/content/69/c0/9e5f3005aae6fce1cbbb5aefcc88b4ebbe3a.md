# परिचय

_क्लास_ का एक इंस्टेंस बनाने के लिए उसके _कंस्ट्रक्टर_ को `new` ऑपरेटर से कॉल किया जाता है। कंस्ट्रक्टर एक विशेष प्रकार का मेथड होता है जिसका उद्देश्य नए बने इंस्टेंस को शुरू करना है। कंस्ट्रक्टर सामान्य मेथड जैसे दिखते हैं, लेकिन उनमें रिटर्न टाइप नहीं होता और उनका नाम क्लास के नाम से मेल खाता है।

```java
class Library {
    private int books;

    public Library() {
        // Initialize the books field
        this.books = 10;
    }
}

// This will call the constructor
var library = new Library();
```

सामान्य मेथड की तरह, कंस्ट्रक्टर में भी पैरामीटर हो सकते हैं। कंस्ट्रक्टर के पैरामीटर आमतौर पर (private) फील्ड के रूप में रखे जाते हैं ताकि बाद में उनका इस्तेमाल किया जा सके, या फिर किसी एक बार की गणना में इस्तेमाल किए जाते हैं। कंस्ट्रक्टर को आर्गुमेंट उसी तरह दिए जा सकते हैं जैसे सामान्य मेथड को आर्गुमेंट दिए जाते हैं।

```java
class Building {
    private int numberOfStories;
    private int totalHeight;

    public Building(int numberOfStories, double storyHeight) {
        this.numberOfStories = numberOfStories;
        this.totalHeight = numberOfStories * storyHeight;
    }
}

// Call a constructor with two arguments
var largeBuilding = new Building(55, 6.2);
```
