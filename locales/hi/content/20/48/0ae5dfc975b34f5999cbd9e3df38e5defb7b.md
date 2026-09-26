# परिचय

अंकगणितीय ओवरफ्लो तब होता है जब कोई गणना ऐसी वैल्यू देती है जो प्राप्त करने वाले टाइप की क्षमता से अधिक हो। ऐसी गणना अंकगणितीय ऑपरेशन या टाइप रूपांतरण हो सकती है।

`int` और `long` टाइप के एक्सप्रेशन और उनके अनसाइनड रूप इन परिस्थितियों में चुपचाप रैप हो जाते हैं।

पूर्णांक गणनाओं का व्यवहार `checked` कीवर्ड का उपयोग करके बदला जा सकता है। जब `checked` ब्लॉक के अंदर ओवरफ्लो होता है, तो `OverflowException` का एक इंस्टेंस थ्रो किया जाता है।

```csharp
int one = 1;
checked
{
    int expr = int.MaxValue + one;   // OverflowException is thrown
}

// or

int expr2 = checked(int.MaxValue + one);     // OverflowException is thrown
```

`float` और `double` टाइप के एक्सप्रेशन अनंत नाम की एक विशेष वैल्यू ले लेंगे।

`decimal` टाइप के एक्सप्रेशन `OverflowException` का एक इंस्टेंस थ्रो करेंगे।
