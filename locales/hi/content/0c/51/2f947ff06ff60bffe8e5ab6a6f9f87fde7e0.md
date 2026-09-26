# परिचय

[ऐरे][array] Swift के तीन मुख्य कलेक्शन टाइप में से एक हैं।
ऐरे एलिमेंट की एक क्रमबद्ध सूची होता है।
ऐरे किसी भी टाइप के एलिमेंट रख सकते हैं, लेकिन एक ऐरे के सारे एलिमेंट एक ही टाइप के होने चाहिए।
जब किसी ऐरे को किसी वेरिएबल को असाइन किया जाता है, तो वह परिवर्तनशील होता है। इसका मतलब है कि ऐरे बनाने के बाद आप उसमें एलिमेंट जोड़ सकते हैं, हटा सकते हैं या बदल सकते हैं।
जब किसी ऐरे को किसी कॉन्स्टेंट को असाइन किया जाता है, तो वह अपरिवर्तनीय हो जाता है, यानी उसके अंदर के एलिमेंट बदले नहीं जा सकते।

ऐरे लिटरल को चौकोर ब्रैकेट (`[...]`) के अंदर अल्पविराम से अलग किए गए एलिमेंट की सूची के रूप में लिखा जाता है।
Swift लिटरल के अंदर मौजूद एलिमेंट से ऐरे का टाइप खुद ही अनुमान लगा लेता है।

```swift
let evenInts = [2, 4, 6, 8, 10, 12]
var oddInts = [1, 3, 5, 7, 9, 11, 13]
let greetings = ["Hello!", "Hi!", "¡Hola!"]
```

आप टाइप को स्पष्ट रूप से भी लिख सकते हैं।
ऐरे के टाइप दो तरह से लिखे जा सकते हैं: `Array<T>` या संक्षिप्त सिंटैक्स `[T]`। यहाँ `T` उस टाइप को दर्शाता है जिसके वैल्यू ऐरे में होते हैं।

```swift
let evenInts: Array<Int> = [2, 4, 6, 8, 10, 12]
var oddInts: [Int] = [1, 3, 5, 7, 9, 11, 13]
let greetings: [String] = ["Hello!", "Hi!", "¡Hola!"]
```

## ऐरे का आकार

आप ऐरे के [`count`][count] प्रॉपर्टी की मदद से उसमें मौजूद एलिमेंट की संख्या पता कर सकते हैं:

```swift
evenInts.count
// returns 6
```

## खाली ऐरे

खाली ऐरे बनाने के लिए आपको उसका टाइप बताना होगा।
यह आप ऐरे इनिशियलाइज़र सिंटैक्स या स्पष्ट टाइप एनोटेशन की मदद से कर सकते हैं:

```swift
let emptyArray = [Int]()
let emptyArray2 = Array<Int>()
let emptyArray3: [Int] = []
```

## मल्टी-डाइमेंशनल ऐरे

ऐरे को नेस्ट करके मल्टी-डाइमेंशनल ऐरे बनाए जा सकते हैं।
नेस्टेड ऐरे का टाइप स्पष्ट रूप से बताते समय एलिमेंट के टाइप को नेस्टेड ब्रैकेट में लपेटिए, जैसे `[[Int]]` या `Array<Array<Int>>`:

```swift
let multiDimArray = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
let multiDimArray2: [[Int]] = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
```

## ऐरे में एलिमेंट जोड़ना

आप [`append(_:)`][append] मेथड की मदद से किसी परिवर्तनशील ऐरे के अंत में एक एलिमेंट जोड़ सकते हैं:

```swift
var oddInts = [1, 3, 5, 7, 9, 11, 13]
oddInts.append(15)
// oddInts is now [1, 3, 5, 7, 9, 11, 13, 15]
```

## ऐरे में एलिमेंट डालना

आप [`insert(_:at:)`][insert] मेथड की मदद से किसी खास इंडेक्स पर एक एलिमेंट डाल सकते हैं।
यह मेथड दो आर्गुमेंट लेता है: डाला जाने वाला एलिमेंट, और वह इंडेक्स जहाँ उसे डालना है।

```swift
var oddInts = [1, 3, 5, 7, 9, 11, 13]
oddInts.insert(0, at: 0)
// oddInts is now [0, 1, 3, 5, 7, 9, 11, 13]
```

## ऐरे को आपस में जोड़ना

आप `+` ऑपरेटर की मदद से दो ऐरे को मिलाकर एक ऐरे बना सकते हैं।
`+` ऑपरेटर एक नया ऐरे बनाकर लौटाता है; यह मूल ऐरे को नहीं बदलता।

```swift
var oddInts = [1, 3, 5, 7, 9, 11, 13]
let combined = oddInts + [15, 17, 19]
// combined is [1, 3, 5, 7, 9, 11, 13, 15, 17, 19]

print(oddInts)
// prints [1, 3, 5, 7, 9, 11, 13]
```

## ऐरे के एलिमेंट एक्सेस करना

ऐरे के नाम के बाद चौकोर ब्रैकेट (`[]`) में उसका इंडेक्स रखकर आप ऐरे के किसी एक एलिमेंट को एक्सेस कर सकते हैं।
ऐरे के इंडेक्स `Int` वैल्यू होती हैं जो शून्य से गिनी जाती हैं, यानी पहले एलिमेंट का इंडेक्स `0` होता है।
मान्य सीमा से बाहर का इंडेक्स एक्सेस करने पर रनटाइम एरर मिलती है और प्रोग्राम क्रैश हो जाता है।

```swift
let evenInts = [2, 4, 6, 8, 10, 12]
let oddInts = [1, 3, 5, 7, 9, 11, 13]

evenInts[2]
// returns 6

oddInts[7]
// Fatal error: Index out of range
```

## ऐरे के एलिमेंट बदलना

किसी खास इंडेक्स पर नई वैल्यू असाइन करके आप परिवर्तनशील ऐरे के किसी एलिमेंट को बदल सकते हैं।
एलिमेंट पढ़ने की तरह ही, मान्य सीमा से बाहर का इंडेक्स इस्तेमाल करने पर रनटाइम एरर मिलती है।

```swift
var evenInts = [2, 4, 6, 8, 10, 12]

evenInts[2] = 0
// evenInts is now [2, 4, 0, 8, 10, 12]
```

## ऐरे को स्ट्रिंग में और स्ट्रिंग को वापस ऐरे में बदलना

आप [`joined(separator:)`][joined] मेथड की मदद से स्ट्रिंग के ऐरे को जोड़कर एक स्ट्रिंग बना सकते हैं। यह मेथड एक सिपरेटर स्ट्रिंग लेता है:

```swift
let evenInts = ["2", "4", "6", "8", "10", "12"]
let evenIntsString = evenInts.joined(separator: ", ")
// returns "2, 4, 6, 8, 10, 12"
```

आप [`split(separator:)`][split] मेथड की मदद से एक स्ट्रिंग को सबस्ट्रिंग के ऐरे में तोड़ सकते हैं। इसमें आप डेलिमिटर अक्षर देते हैं:

```swift
let evenIntsString = "2, 4, 6, 8, 10, 12"
let evenInts = evenIntsString.split(separator: ",")
// returns ["2", " 4", " 6", " 8", " 10", " 12"]
```

## ऐरे से एलिमेंट हटाना

आप [`remove(at:)`][remove] मेथड की मदद से किसी दिए गए इंडेक्स पर मौजूद एलिमेंट हटा सकते हैं।
इंडेक्स ऐरे की मान्य सीमा के अंदर ही होना चाहिए; वरना रनटाइम एरर मिलती है।

```swift
var oddInts = [1, 3, 5, 7, 9, 11, 13]
oddInts.remove(at: 3)
// oddInts is now [1, 3, 5, 9, 11, 13]
```

ऐरे का अंतिम एलिमेंट हटाने के लिए [`removeLast()`][removeLast] मेथड इस्तेमाल कीजिए।
खाली ऐरे पर `removeLast()` कॉल करने से रनटाइम एरर मिलती है।

```swift
var oddInts = [1, 3, 5, 7, 9, 11, 13]
oddInts.removeLast()
// oddInts is now [1, 3, 5, 7, 9, 11]
```

[array]: https://developer.apple.com/documentation/swift/array
[count]: https://developer.apple.com/documentation/swift/array/count
[insert]: https://developer.apple.com/documentation/swift/array/insert(_:at:)-3erb3
[remove]: https://developer.apple.com/documentation/swift/array/remove(at:)-1p2pj
[removeLast]: https://developer.apple.com/documentation/swift/array/removelast()
[append]: https://developer.apple.com/documentation/swift/array/append(_:)-1ytnt
[joined]: https://developer.apple.com/documentation/swift/array/joined(separator:)-5do1g
[split]: https://developer.apple.com/documentation/swift/string/2894564-split
