# परिचय

[इंडेक्सर](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/indexers/) की मदद से किसी ऑब्जेक्ट की वैल्यू को इंडेक्सिंग ऑपरेटर `[]` के ज़रिए पढ़ा या बदला जा सकता है। एक इंडेक्सर एक ही आर्गुमेंट लेता है, और उसमें `get` तथा/या `set` दोनों हिस्से हो सकते हैं। इंडेक्सर के `set` हिस्से में एक खास `value` वैल्यू होती है, यानी वही वैल्यू जो इंडेक्सर को दी जाती है।

```csharp
class LapTimes
{
    private int[] times = new[] { 2, 4, 3, 8 };

    public int this[int lap]
    {
        get { return times[lap]; }
        set { times[lap] = value; }
    }
}

var lapTimes = new LapTimes();

// Use the getter
Console.WriteLine(lapTimes[1]); // => 4

// Use the setter
lapTimes[2] = 5;
Console.WriteLine(lapTimes[2]); // => 5
```

अगर आप इंडेक्सर का `set` हिस्सा छोड़ दें, तो यह केवल पढ़ने योग्य इंडेक्सर बन जाता है। ऐसे इंडेक्सर को और संक्षेप में बनाने के लिए एक्सप्रेशन बॉडी इस्तेमाल की जा सकती है:

```csharp
class LapTimes
{
    private int[] times = new[] { 2, 4, 3, 8 };

    public int this[int lap] => times[lap];
}
```

इंडेक्सर का पैरामीटर `int` ही होना ज़रूरी नहीं है, वह किसी भी टाइप का हो सकता है:

```csharp
class LapTimes
{
    // ...
    public int this[string lap] => times[Convert.ToInt32(lap)];
}
```

इंडेक्सर को ओवरलोड भी किया जा सकता है:

```csharp
class LapTimes
{
    public int this[int lap] => times[lap];
    public int this[string lap] => times[Convert.ToInt32(lap)];
}
```
