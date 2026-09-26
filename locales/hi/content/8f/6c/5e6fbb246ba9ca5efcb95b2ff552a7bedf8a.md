# परिचय

जब कोई फंक्शन किसी दूसरे फंक्शन (या क्लोज़र) को पैरामीटर के रूप में लेता है, तो उस पास किए गए क्लोज़र को डिफ़ॉल्ट रूप से *नॉन-एस्केपिंग* कहा जाता है।
किसी क्लोज़र के बारे में कहा जाता है कि वह किसी फंक्शन से *एस्केप* करता है, जब उसे उस फंक्शन के लौट चुकने के बाद कॉल किया जाता है।

यह स्थिति आम तौर पर तब सामने आती है जब:

- किसी क्लोज़र को किसी बाहरी वेरिएबल या प्रॉपर्टी में संग्रहीत किया जाता है।
- किसी ऑपरेशन के पूरा होने के बाद किसी क्लोज़र को एसिंक्रोनस रूप से चलाया जाता है।
- किसी क्लोज़र को बाद में कॉल करने के लिए फंक्शन से लौटा दिया जाता है।

आइए इस उदाहरण को देखते हैं:

```swift
func emptyKitchen(_ order: String) -> String {
    "Sorry, we're all out of \(order)."
}

func prepare(order: String, kitchen: (String) -> String) -> (String) -> String {
    func newKitchen(_ newOrder: String) -> String {
        if newOrder == order {
            return "One \(order) coming up!"
        } else {
            return kitchen(newOrder)
        }
    }
    return newKitchen
}
```

इस कोड में `prepare` एक `kitchen` नाम का फंक्शन लेता है, एक नया फंक्शन `newKitchen` बनाता है जो `kitchen` को कॉल करता है, और `newKitchen` लौटाता है।
इस कोड को कंपाइल करने पर एक एरर मिलती है: `Escaping local function captures non-escaping parameter 'kitchen'`.

चूँकि `newKitchen` `prepare` के बाद भी मौजूद रहता है, इसलिए `kitchen` क्लोज़र एस्केप कर जाता है।
इसे संभव बनाने के लिए पैरामीटर के टाइप को `@escaping` एट्रिब्यूट के साथ चिह्नित कीजिए।

```swift
func prepare(order: String, kitchen: @escaping (String) -> String) -> (String) -> String {
    func newKitchen(_ newOrder: String) -> String {
        if newOrder == order {
            return "One \(order) coming up!"
        } else {
            return kitchen(newOrder)
        }
    }
    return newKitchen
}

let restaurant = prepare(
    order: "sandwich",
    kitchen: prepare(
        order: "chicken",
        kitchen: prepare(order: "steak", kitchen: emptyKitchen)
    )
)

print(restaurant("pork chop"))
// Prints "Sorry, we're all out of pork chop."

print(restaurant("chicken"))
// Prints "One chicken coming up!"
```

`@escaping` एट्रिब्यूट Swift कंपाइलर को बताता है कि यह क्लोज़र तुरंत होने वाले फंक्शन कॉल से ज़्यादा समय तक रहेगा। इससे Swift मेमोरी और कैप्चर किए गए रेफरेंस को ठीक से संभाल पाता है।

[escaping]: https://docs.swift.org/swift-book/LanguageGuide/Closures.html#ID546
