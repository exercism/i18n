# Вступ

Коли функція приймає іншу функцію (або замикання) як параметр, таке передане замикання типово вважають *таким, що не виходить за межі*. Кажуть, що замикання *виходить за межі* функції, коли його викликають після того, як сама функція вже повернула результат.

Це трапляється, коли:

- замикання зберігають у зовнішній змінній або властивості;
- замикання виконують асинхронно після завершення операції;
- замикання повертають із функції, щоб викликати його пізніше.

Розгляньмо такий приклад:

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

У цьому коді `prepare` приймає функцію з назвою `kitchen`, створює нову функцію `newKitchen`, яка викликає `kitchen`, і повертає `newKitchen`. Спроба скомпілювати цей код призводить до помилки: `Escaping local function captures non-escaping parameter 'kitchen'`.

Оскільки `newKitchen` живе довше за `prepare`, замикання `kitchen` виходить за межі. Щоб це дозволити, позначмо тип параметра атрибутом `@escaping`.

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

Атрибут `@escaping` повідомляє компілятору Swift, що замикання житиме довше за безпосередній виклик функції, і це дає Swift змогу належно керувати памʼяттю та захопленими посиланнями.

[escaping]: https://docs.swift.org/swift-book/LanguageGuide/Closures.html#ID546
