# परिचय

लैम्ब्डा बिना नाम के फंक्शन होते हैं। ये मूल रूप से फंक्शन लिखने का एक छोटा तरीका हैं।

लैम्ब्डा एक्सप्रेशन लैम्ब्डा या स्टेटमेंट लैम्ब्डा, दोनों में से कोई भी हो सकते हैं:

```
(input_parameters) => expression
(input_parameters) => { <statements> }
```

## लैम्ब्डा घोषित करना

जो लैम्ब्डा कोई वैल्यू नहीं लौटाते (`void`), उन्हें `Action<T>` डेलीगेट टाइप में बदला जा सकता है।

```csharp
// Statement lambda
Action = () =>
{
    Console.WriteLine("No parameters");
    Console.WriteLine("Still nice, right?");
}

// Expression lambda
Action<int> = (x) => Console.WriteLine(x);
```

जो लैम्ब्डा `void` के अलावा कोई वैल्यू लौटाते हैं, उन्हें `Func<T>` डेलीगेट टाइप में बदला जा सकता है।

```csharp
// Expression lambda
Func<int, int> = (x) => x * x;

// Statement lambda
Func<string, string, bool> = (left, right) =>
{
    var equal = left == right;
    return equal;
}
```

अगर किसी लैम्ब्डा में सिर्फ एक ही पैरामीटर हो, तो पैरामीटर के चारों ओर लगे ब्रैकेट हटाए जा सकते हैं:

```csharp
// Equivalent definitions
Action<int> = (x) => Console.WriteLine(x);
Action<int> = x => Console.WriteLine(x);
```

## लैम्ब्डा आर्गुमेंट

लैम्ब्डा का मुख्य उपयोग इन्हें दूसरे मेथड को आर्गुमेंट के रूप में भेजने में होता है, जैसे कि LINQ के अधिकांश मेथड:

```csharp
var numbers = new[] { 1, 2, 3, 4 };
var doubled = numbers.Select(n => n * 2);
foreach (var number in doubled)
{
    Console.Write(number)
}
// => 2468
```
