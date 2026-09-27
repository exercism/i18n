# مقدمة

عندما تقبل دالة دالةً أخرى (أو إغلاقًا) كمعامل، يُسمّى ذلك الإغلاق المُمرَّر *غير هارب* افتراضيًا.
ويُقال إن الإغلاق *يهرب* من الدالة عندما يُستدعى بعد أن تكون الدالة نفسها قد أرجعت بالفعل.

يحدث هذا الموقف عادةً عندما:

- يُخزَّن الإغلاق في متغير خارجي أو خاصية.
- يُنفَّذ الإغلاق بشكل غير متزامن بعد اكتمال عملية.
- يُرجَع الإغلاق من الدالة ليُستدعى لاحقًا.

لنلقِ نظرة على المثال التالي:

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

في هذا الكود، تقبل `prepare` دالةً تُسمّى `kitchen`، وتبني دالة جديدة هي `newKitchen` تستدعي `kitchen`، وتُرجع `newKitchen`.
ومحاولة تصريف هذا الكود تُنتج خطأً: `Escaping local function captures non-escaping parameter 'kitchen'`.

ولأن `newKitchen` تبقى حية بعد انتهاء `prepare`، فإن إغلاق `kitchen` يهرب.
وللسماح بذلك، علّم نوع المعامل بالسمة `@escaping`.

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

تُخبر السمة `@escaping` مصرّف Swift بأن الإغلاق سيبقى حيًا بعد استدعاء الدالة الفوري، ما يتيح لـ Swift إدارة الذاكرة والمراجع الملتقطة على النحو الصحيح.

[escaping]: https://docs.swift.org/swift-book/LanguageGuide/Closures.html#ID546
