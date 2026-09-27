# ভূমিকা

যখন কোনো ফাংশন প্যারামিটার হিসেবে আরেকটি ফাংশন (বা ক্লোজার) গ্রহণ করে, তখন সেই পাস করা ক্লোজারটিকে ডিফল্টভাবে *নন-এস্কেপিং* বলা হয়।
কোনো ক্লোজারকে তখন একটি ফাংশন থেকে *এস্কেপ* করতে বলা হয়, যখন ফাংশনটি নিজে ইতিমধ্যে রিটার্ন করার পরে সেটিকে কল করা হয়।

এই পরিস্থিতি সাধারণত ঘটে যখন:

- একটি ক্লোজার বাইরের কোনো ভ্যারিয়েবল বা প্রপার্টিতে সংরক্ষণ করা হয়।
- কোনো অপারেশন শেষ হওয়ার পর একটি ক্লোজার অ্যাসিঙ্ক্রোনাসভাবে চালানো হয়।
- পরবর্তীতে কল করার জন্য ফাংশন থেকে একটি ক্লোজার রিটার্ন করা হয়।

নিচের উদাহরণটি দেখুন:

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

এই কোডে, `prepare` ফাংশনটি `kitchen` নামের একটি ফাংশন গ্রহণ করে, `kitchen`-কে কল করে এমন একটি নতুন ফাংশন `newKitchen` তৈরি করে এবং `newKitchen` রিটার্ন করে।
এই কোডটি কম্পাইল করার চেষ্টা করলে একটি এরর দেয়: `Escaping local function captures non-escaping parameter 'kitchen'`.

যেহেতু `newKitchen` `prepare` ফাংশনের পরেও টিকে থাকে, তাই `kitchen` ক্লোজারটি এস্কেপ করে।
এটি সম্ভব করতে, প্যারামিটারের টাইপে `@escaping` অ্যাট্রিবিউট যুক্ত করুন।

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

`@escaping` অ্যাট্রিবিউটটি Swift কম্পাইলারকে জানায় যে ক্লোজারটি তাৎক্ষণিক ফাংশন কলের পরেও টিকে থাকবে, যার ফলে Swift মেমরি ও ক্যাপচার করা রেফারেন্স সঠিকভাবে ম্যানেজ করতে পারে।

[escaping]: https://docs.swift.org/swift-book/LanguageGuide/Closures.html#ID546
