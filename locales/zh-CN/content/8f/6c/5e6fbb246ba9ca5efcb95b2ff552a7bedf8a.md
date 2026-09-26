# 简介

当一个函数接受另一个函数（或闭包）作为形参时，传入的这个闭包默认是*非逃逸*的。
当一个闭包在函数本身已经返回之后才被调用时，就说它*逃逸*出了这个函数。

这种情况通常出现在以下几种场景：

- 闭包被存储在外部变量或属性中。
- 闭包在某个操作完成后被异步执行。
- 闭包从函数中返回，以便稍后调用。

来看下面这个例子：

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

在这段代码中，`prepare`接受一个名为`kitchen`的函数，构造出一个会调用`kitchen`的新函数`newKitchen`，然后返回`newKitchen`。
尝试编译这段代码会产生一个错误：`Escaping local function captures non-escaping parameter 'kitchen'`。

由于`newKitchen`的存活时间超过`prepare`，`kitchen`闭包就逃逸了。
为了允许这样做，用`@escaping`特性标记形参的类型。

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

`@escaping`特性会告知 Swift 编译器：这个闭包的生命周期将超过当前这次函数调用，从而让 Swift 能够妥善管理内存和捕获的引用。

[escaping]: https://docs.swift.org/swift-book/LanguageGuide/Closures.html#ID546
