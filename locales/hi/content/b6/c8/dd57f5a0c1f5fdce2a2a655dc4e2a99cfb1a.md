# परिचय

C# के `struct` और `class` में गहरा संबंध होता है।
इनमें स्थिति और व्यवहार होते हैं।
इनके कंस्ट्रक्टर आर्गुमेंट लेते हैं। इनके इंस्टेंस असाइन किए जा सकते हैं, समानता के लिए जाँचे जा सकते हैं और कलेक्शन में संग्रहीत किए जा सकते हैं।

```csharp
enum Unit
{
    Kg,
    Lb
}
struct Weight
{
    private double count;
    private Unit unit;

    public Weight(double count, Unit unit)
    {
        this.count = count;
        this.unit = unit;
    }

    public override string ToString()
    {
        return count.ToString() + unit.ToString();
    }
}

new Weight(77.5, Unit.Kg).ToString();
// => "77.6Kg"
```
