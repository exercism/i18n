# परिचय

C# में ट्यूपल एक डेटा स्ट्रक्चर है जो डेटा को व्यवस्थित करता है और किसी भी टाइप के दो या अधिक फील्ड रखता है।

ट्यूपल आम तौर पर दो या अधिक एक्सप्रेशन को कॉमा से अलग करके गोल ब्रैकेट के एक जोड़े के अंदर रखकर बनाया जाता है।

```csharp
string boast = "All you need to know";
bool success = !string.IsNullOrWhiteSpace(boast);
(bool, int, string) triple = (success, 42, boast);
```

ट्यूपल का उपयोग असाइनमेंट और इनिशलाइज़ेशन में, रिटर्न वैल्यू के रूप में या मेथड आर्गुमेंट के रूप में किया जा सकता है।

फील्ड को डॉट सिंटैक्स से निकाला जाता है। अगर कोई नाम न दिया जाए, तो पहला फील्ड `Item1` होता है, दूसरा `Item2`, और इसी तरह आगे भी। इनके अलावा दूसरे नामों की चर्चा नीचे की गई है।

```csharp
// initialization
(int, int, int) vertices = (90, 45, 45);

// assignment
vertices = (60, 60, 60);

//  return value
(bool, int) GetSameOrBigger(int num1, int num2)
{
    return (num1 == num2, num1 > num2 ? num1 : num2);
}

// method argument
int Add((int, int) operands)
{
    return operands.Item1 + operands.Item2;
}
```

`Item1` जैसे फील्ड नामों से कोड पढ़ने में आसान नहीं बनता। नीचे दिए गए कोड में ट्यूपल के फील्ड को नाम देने के दो तरीके दिखाए गए हैं। साथ ही, नीचे दिए गए कोड में यह भी देखिए कि `var` का उपयोग ट्यूपल के साथ किया जा सकता है और टाइप का अनुमान भी लगाया जा सकता है। यह नाम वाले और बिना नाम वाले, दोनों तरह के ट्यूपल के लिए समान रूप से काम करता है।

```csharp
// name items in declaration
(bool success, string message) results = (true, "well done!");
bool mySuccess = results.success;
string myMessage = results.message;

// name items in creating expression
var results2 = (success: true, message: "well done!");
bool mySuccess2 = results2.success;
string myMessage2 = results2.message;
```
