# Bevezetés

Amikor egy függvény paraméterként fogad el egy másik függvényt (vagy closure-t), az átadott closure alapértelmezésben *non-escaping*. Azt mondjuk, hogy egy closure *escape*-el egy függvényből, ha annak visszatérése után hívják meg.

Ez a helyzet leggyakrabban akkor fordul elő, amikor:

- A closure-t külső változóban vagy propertyben tárolják.
- A closure aszinkron módon fut le, miután egy művelet befejeződött.
- A closure-t a függvény adja vissza, hogy később meghívják.

Vegyük a következő példát:

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

Ebben a kódban a `prepare` egy `kitchen` nevű függvényt fogad el, létrehoz egy új `newKitchen` függvényt, amely meghívja a `kitchen` függvényt, majd visszaadja a `newKitchen` függvényt.
Ha megpróbáljuk lefordítani ezt a kódot, a következő hibát kapjuk: `Escaping local function captures non-escaping parameter 'kitchen'`.

Mivel a `newKitchen` túlélheti a `prepare` függvényt, a `kitchen` closure escapingnek számít.
Ahhoz, hogy ez engedélyezett legyen, jelöld a paraméter típusát az `@escaping` attribútummal.

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

Az `@escaping` attribútum azt jelzi a Swift-fordítónak, hogy a closure túl fogja élni a közvetlen függvényhívást, így a Swift megfelelően tudja kezelni a memóriát és a rögzített hivatkozásokat.

[escaping]: https://docs.swift.org/swift-book/LanguageGuide/Closures.html#ID546
