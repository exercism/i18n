# مقدمه

وقتی یک تابع، تابع دیگری (یا یک «بستار») را به‌عنوان پارامتر می‌پذیرد، آن بستارِ ورودی به‌طور پیش‌فرض «غیرفرارکننده» نامیده می‌شود.
می‌گوییم یک بستار وقتی از تابع «فرار می‌کند» که پس از بازگشتِ خودِ تابع فراخوانی شود.

این وضعیت معمولاً وقتی پیش می‌آید که:

- یک بستار در متغیر یا ویژگی بیرونی ذخیره شود.
- یک بستار پس از کامل شدن یک عملیات، به‌صورت ناهمزمان اجرا شود.
- یک بستار از تابع بازگردانده شود تا بعداً فراخوانی شود.

به این مثال توجه کنید:

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

در این کد، `prepare` تابعی به اسم `kitchen` می‌گیرد، تابع تازه‌ای به اسم `newKitchen` می‌سازد که `kitchen` را فراخوانی می‌کند و `newKitchen` را برمی‌گرداند.
تلاش برای کامپایل این کد خطایی به بار می‌آورد: `Escaping local function captures non-escaping parameter 'kitchen'`.

چون `newKitchen` بیشتر از `prepare` زنده می‌ماند، بستار `kitchen` فرار می‌کند.
برای اینکه این کار ممکن شود، نوع پارامتر را با صفت `@escaping` علامت‌گذاری کنید.

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

صفت `@escaping` به کامپایلر Swift اطلاع می‌دهد که این بستار بیشتر از فراخوانی بی‌درنگ تابع زنده می‌ماند و به این ترتیب Swift می‌تواند حافظه و ارجاع‌های گرفته‌شده را درست مدیریت کند.

[escaping]: https://docs.swift.org/swift-book/LanguageGuide/Closures.html#ID546
