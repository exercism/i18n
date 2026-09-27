# Einführung

Wenn eine Funktion eine andere Funktion (oder ein Closure) als Parameter entgegennimmt, wird das übergebene Closure standardmäßig als *non-escaping* bezeichnet.
Man sagt, ein Closure *escape*t eine Funktion, wenn es aufgerufen wird, nachdem die Funktion selbst schon zurückgekehrt ist.

Diese Situation tritt häufig auf, wenn:

- Ein Closure in einer externen Variablen oder Eigenschaft gespeichert wird.
- Ein Closure asynchron ausgeführt wird, nachdem eine Operation abgeschlossen ist.
- Ein Closure von der Funktion zurückgegeben wird, um später aufgerufen zu werden.

Schauen wir uns das folgende Beispiel an:

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

In diesem Code nimmt `prepare` eine Funktion namens `kitchen` entgegen, erstellt eine neue Funktion `newKitchen`, die `kitchen` aufruft, und gibt `newKitchen` zurück.
Wenn du versuchst, diesen Code zu kompilieren, erhältst du einen Fehler: `Escaping local function captures non-escaping parameter 'kitchen'`.

Weil `newKitchen` `prepare` überlebt, escapet das Closure `kitchen`.
Um das zu ermöglichen, markiere den Typ des Parameters mit dem `@escaping`-Attribut.

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

Das Attribut `@escaping` teilt dem Swift-Compiler mit, dass das Closure den unmittelbaren Funktionsaufruf überlebt, sodass Swift Speicher und erfasste Referenzen korrekt verwalten kann.

[escaping]: https://docs.swift.org/swift-book/LanguageGuide/Closures.html#ID546
