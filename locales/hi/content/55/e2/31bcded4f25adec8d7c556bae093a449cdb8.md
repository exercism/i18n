# परिचय

बाकी भाषाओं की तरह Go में भी `switch` स्टेटमेंट होता है।
स्विच स्टेटमेंट लंबे `if ... else if` स्टेटमेंट लिखने का छोटा तरीका है।
स्विच बनाने के लिए हम सबसे पहले `switch` कीवर्ड लिखते हैं और उसके बाद एक वैल्यू या एक्सप्रेशन देते हैं।
इसके बाद हम हर शर्त को `case` कीवर्ड से घोषित करते हैं।
हम एक `default` केस भी घोषित कर सकते हैं, जो तब चलता है जब पिछली `case` शर्तों में से कोई भी मेल नहीं खाती:

```go
operatingSystem := "windows"

switch operatingSystem {
case "windows":
    // do something if the operating system is windows
case "linux":
    // do something if the operating system is linux
case "macos":
    // do something if the operating system is macos
default:
    // do something if the operating system is none of the above
} 
```

स्विच स्टेटमेंट की एक दिलचस्प बात यह है कि `switch` कीवर्ड के बाद लिखी वैल्यू छोड़ी जा सकती है, और तब हम हर `case` के लिए बूलियन शर्तें रख सकते हैं:

```go
age := 21

switch {
case age > 20 && age < 30:
    // do something if age is between 20 and 30
case age == 10:
    // do something if age is equal to 10
default:
    // do something else for every other case
}
```
