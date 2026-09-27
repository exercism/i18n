# 簡介

當一個函式接受另一個函式（或閉包）作為參數時，傳入的閉包預設稱為*非逃逸*。
當一個閉包在函式本身已經回傳之後才被呼叫時，就說這個閉包*逃逸*了該函式。

這種情況通常發生在：

- 閉包被儲存在外部的變數或屬性中。
- 閉包在某個操作完成後以非同步方式執行。
- 閉包從函式回傳，以便之後再呼叫。

看看下面這個例子：

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

在這段程式碼中，`prepare`接受一個名為`kitchen`的函式，建構一個會呼叫`kitchen`的新函式`newKitchen`，並回傳`newKitchen`。
嘗試編譯這段程式碼會產生錯誤：`Escaping local function captures non-escaping parameter 'kitchen'`。

由於`newKitchen`的生命週期比`prepare`長，`kitchen`閉包會逃逸。
要允許這種情況，請為參數的型別標上`@escaping`屬性。

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

`@escaping`屬性會告訴 Swift 編譯器這個閉包的生命週期會超過當下的函式呼叫，讓 Swift 能妥善管理記憶體與捕獲的參照。

[escaping]: https://docs.swift.org/swift-book/LanguageGuide/Closures.html#ID546
