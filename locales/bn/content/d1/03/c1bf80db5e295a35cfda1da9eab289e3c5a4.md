# পরিচিতি
## সুইচ

একটি [সুইচ স্টেটমেন্ট][switch] দিয়ে আপনি একটি মানকে একাধিক সম্ভাব্য মিলে যাওয়া মানের সাথে তুলনা করতে পারেন।
এটি একাধিক `else-if` স্টেটমেন্ট ব্যবহার করার চেয়ে বেশি সংক্ষিপ্ত কোড লিখতে দেয়।
একটি সুইচ স্টেটমেন্ট শুরু হয় `switch` কিওয়ার্ড দিয়ে, তারপরে থাকে যে মানটি তুলনা করা হবে।
এরপর আপনি `case` কিওয়ার্ড আর তারপরে যে মানের সাথে তুলনা করা হবে তা দিয়ে কেসগুলো ডিফাইন করতে পারেন।
কোনো কেস মিলে না গেলে ডিফল্ট কেস ডিফাইন করতে `default` কিওয়ার্ড ব্যবহার করা হয়।
`else-if` স্টেটমেন্টের মতোই, `switch` স্টেটমেন্ট শুধু প্রথম মিলে যাওয়া কেসের সাথে যুক্ত কোড ব্লকটিই চালায়।

```swift
switch value {
case 1:
    print("One")
case 2:
    print("Two")
default:
    print("Other")
}
```

নিচের উদাহরণটি দেখুন:

```swift
if str == "apple" {
    print("Let's bake an apple crumble")
} else if str == "lemon" {
    print("Let's bake a lemon meringue pie!")
} else if str == "peach" {
    print("Let's bake a peach pie!")
} else {
    print("Let's buy ice cream.")
}
```

এটির বদলে এভাবে লেখা যেতে পারে:

```swift
switch str {
case "apple":
    print("Let's bake an apple crumble")
case "lemon":
    print("Let's bake a lemon meringue pie!")
case "peach":
    print("Let's bake a peach pie!")
default:
    print("Let's buy ice cream.")
}
```

## হোয়াইল লুপ

একটি [হোয়াইল লুপ][while-loops] হলো একটি কন্ট্রোল ফ্লো স্টেটমেন্ট, যা দিয়ে নির্দিষ্ট একটি শর্ত ট্রু থাকা পর্যন্ত কোড চালানো যায়।
Swift দুই ধরনের হোয়াইল লুপ দেয়: while আর repeat-while লুপ।
হোয়াইল লুপের শর্ত লুপ বডি চালানোর আগে যাচাই করা হয়; শর্তটি ফলস হলে লুপ বডি একেবারেই চালানো হবে না।
Swift-এ হোয়াইল লুপের গঠনটি এরকম:

```swift
while <#condition#> {
  <#code#>
}
```

এখানে count 0-এর চেয়ে বড় থাকা পর্যন্ত লুপটি চলবে এবং তাই 2, 1 আর "Liftoff!" প্রিন্ট করবে।

```swift
var count = 2
while count > 0 {
  print("\(count)…")
  count -= 1
}
print("Liftoff!")

// prints:
// 2…
// 1…
// Liftoff!
```

একটি [repeat-while লুপ][while-loops] হোয়াইল লুপের মতোই, তবে শর্তটি লুপ বডি চালানোর পরে যাচাই করা হয়।
এর মানে হলো লুপ বডি অন্তত একবার চালানো হবে, এমনকি শর্তটি ফলস হলেও।
Swift-এ repeat-while লুপের গঠনটি এরকম:

```swift
repeat {
  <#code#>
} while <#condition#>
```

এখানে শর্তটি ফলস হওয়ায় লুপটি শুধু একবারই চলবে।
যেহেতু এটি একটি repeat-while লুপ, তাই শর্ত যাচাইয়ের আগে লুপ বডি একবার চলবে।

```swift
var count = 2
repeat {
  print("\(count)…")
} while count < 0
print("Liftoff!")
```

## কন্ট্রোল ট্রান্সফার

Swift-এ কন্ট্রোল ট্রান্সফার স্টেটমেন্ট দিয়ে লুপ ও সুইচ স্টেটমেন্টের এক্সিকিউশন ফ্লো পরিবর্তন করা যায়।
`return` ছাড়াও Swift-এ আছে `continue`, `break`, লুপ লেবেল আর `fallthrough`।

### কন্টিনিউ

`continue` স্টেটমেন্ট একটি লুপকে বর্তমান ইটারেশনের কাজ বন্ধ করে সঙ্গে সঙ্গে পরের ইটারেশনে যেতে বলে।
`while` বা `repeat-while` লুপে এটি সরাসরি শর্ত যাচাইয়ের ধাপে চলে যায়।
`for-in` লুপে এটি সিকোয়েন্সের পরের এলিমেন্টে এগিয়ে যায়।

```swift
var count = 1
while count < 6 {
    count += 1
    if count == 4 {
        continue
    }
    print(count)
}

// Prints:
// 2
// 3
// 5
// 6
```

### ব্রেক

`break` স্টেটমেন্ট একটি সম্পূর্ণ লুপ বা সুইচ স্টেটমেন্ট থেকে সঙ্গে সঙ্গে বেরিয়ে আসে।
এরপর এক্সিকিউশন লুপ বা সুইচের পরে থাকা প্রথম কোড লাইন থেকে আবার শুরু হয়।

```swift
for fruit in ["banana", "grapes", "apple", "strawberry", "kiwi", "lemon"] {
    if !fruit.count.isMultiple(of: 2) {
        break
    }
    print(fruit)
}

// Prints:
// banana
// grapes
```

### লেবেলযুক্ত স্টেটমেন্ট

লুপগুলো নেস্টেড থাকলে কখনো কখনো সবচেয়ে ভেতরের লুপের বদলে বাইরের কোনো লুপে `break` বা `continue`-এর প্রভাব ফেলতে চাইতে পারেন।
লুপের আগে একটি নাম আর একটি কোলন (`labelName:`) বসিয়ে লুপটিতে লেবেল দিতে পারেন।
এরপর সেই লেবেলটি `break` বা `continue`-কে দিতে পারেন:

```swift
outerLoop: for fruit in ["banana", "grapes", "apple", "strawberry", "kiwi", "lemon"] {
    print("\n--- \(fruit) ---")
    for letter in fruit {
        guard letter != "n" else {
            break outerLoop
        }
        print(letter)
    }
}

// Prints:
// --- banana ---
// b
// a
```

[control-transfer]: https://docs.swift.org/swift-book/documentation/the-swift-programming-language/controlflow/#Control-Transfer-Statements
[fallthrough]: https://docs.swift.org/swift-book/documentation/the-swift-programming-language/controlflow/#Fallthrough
[while-loops]: https://docs.swift.org/swift-book/documentation/the-swift-programming-language/controlflow/#While-Loops
[repeat-loops]: https://docs.swift.org/swift-book/documentation/the-swift-programming-language/controlflow/#Repeat-While
[switch]: https://docs.swift.org/swift-book/documentation/the-swift-programming-language/controlflow/#Switch
