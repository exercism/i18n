# परिचय

## ऑब्जेक्ट इनिशियलाइज़र

ऑब्जेक्ट इनिशियलाइज़र कंस्ट्रक्टर का एक विकल्प हैं। इसका सिंटैक्स नीचे दिखाया गया है। आप घुंघराले ब्रैकेट के अंदर `=` से जुड़े नाम-वैल्यू जोड़ों की एक सूची देते हैं, जिसमें हर जोड़ा कॉमा से अलग किया जाता है:

```csharp
public class Person
{
    public string Name;
    public string Address;
}

var person = new Person{Name="The President", Address = "Élysée Palace"};
```

कलेक्शन भी इसी तरह इनिशियलाइज़ किए जा सकते हैं। आम तौर पर यह कॉमा से अलग की गई सूचियों की मदद से किया जाता है, जैसा यहाँ दिखाया गया है:

```csharp
IList<Person> people = new List<Person>{ new Person(), new Person{Name="Joe Shmo"}};
```

डिक्शनरी में यह सिंटैक्स इस्तेमाल होता है:

```csharp
IDictionary<int, string> numbers = new Dictionary<int, string>{ [0] = "zero", [1] = "one"...};

// or

IDictionary<int, string> numbers = new Dictionary<int, string>{ {0, "zero" }, {1,  "one"}...};
```
