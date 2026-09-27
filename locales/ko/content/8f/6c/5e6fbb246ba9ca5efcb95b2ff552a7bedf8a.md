# 소개

함수가 다른 함수(또는 클로저)를 매개변수로 받으면, 그 전달된 클로저는 기본적으로 *비이스케이프* 클로저라고 해요.
클로저가 함수를 *이스케이프*한다는 것은, 함수 자체가 이미 반환된 뒤에 그 클로저가 호출되는 경우를 말해요.

이런 상황은 주로 다음과 같을 때 발생해요:

- 클로저가 외부 변수나 프로퍼티에 저장될 때.
- 클로저가 작업이 완료된 뒤 비동기적으로 실행될 때.
- 클로저가 나중에 호출되도록 함수에서 반환될 때.

다음 예제를 살펴봐요:

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

이 코드에서 `prepare`는 `kitchen`이라는 함수를 받아서, `kitchen`을 호출하는 새 함수 `newKitchen`을 만들고, `newKitchen`을 반환해요.
이 코드를 컴파일하려고 하면 오류가 발생해요: `Escaping local function captures non-escaping parameter 'kitchen'`.

`newKitchen`의 수명이 `prepare`보다 길기 때문에, `kitchen` 클로저는 이스케이프해요.
이를 허용하려면 매개변수의 타입에 `@escaping` 속성을 붙여요.

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

`@escaping` 속성은 클로저가 해당 함수 호출보다 오래 살아남을 것임을 Swift 컴파일러에 알려 주어, Swift가 메모리와 캡처된 참조를 제대로 관리할 수 있게 해요.

[escaping]: https://docs.swift.org/swift-book/LanguageGuide/Closures.html#ID546
