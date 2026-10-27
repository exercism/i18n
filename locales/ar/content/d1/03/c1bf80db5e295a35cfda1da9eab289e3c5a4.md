# مقدمة
## جملة `switch`

تتيح لك [جملة `switch`][switch] مقارنة قيمة بعدة قيم محتملة قد تطابقها.
وهي تتيح لك كتابة كود أكثر إيجازًا من استخدام عدة عبارات `else-if`.
تبدأ جملة `switch` بالكلمة المفتاحية `switch` متبوعة بالقيمة المراد مقارنتها.
ثم يمكنك تعريف الحالات باستخدام الكلمة المفتاحية `case` متبوعة بالقيمة التي ستُقارن بها.
وتُستخدم الكلمة المفتاحية `default` لتعريف الحالة الافتراضية عندما لا تطابق أي من الحالات.
ومثل عبارات `else-if`، لا تنفّذ جمل `switch` إلا كتلة الكود المرتبطة بأول حالة مطابقة.

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

تأمّل المثال التالي:

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

يمكن بدلًا من ذلك كتابته هكذا:

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

## حلقات `while`

[حلقة `while`][while-loops] عبارة تحكّم في مسار التنفيذ تتيح تنفيذ الكود ما دام شرط معيّن صحيحًا.
يوفّر Swift نوعين من حلقات `while`: حلقة `while` وحلقة `repeat-while`.
يُقيَّم شرط حلقة `while` قبل تنفيذ جسم الحلقة؛ فإذا كان الشرط خطأ، فلن يُنفَّذ جسم الحلقة إطلاقًا.
تكون بنية حلقات `while` في Swift على النحو التالي:

```swift
while <#condition#> {
  <#code#>
}
```

هنا ستستمر الحلقة في التنفيذ ما دام `count` أكبر من 0، وستطبع بذلك العددين 2 و1 ثم "Liftoff!".

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

[حلقة `repeat-while`][while-loops] تشبه حلقة `while`، لكن الشرط يُقيَّم بعد تنفيذ جسم الحلقة.
وهذا يعني أن جسم الحلقة سيُنفَّذ مرة واحدة على الأقل دائمًا، حتى لو كان الشرط خطأ.
تكون بنية حلقات `repeat-while` في Swift على النحو التالي:

```swift
repeat {
  <#code#>
} while <#condition#>
```

هنا ستُنفَّذ الحلقة مرة واحدة فقط، لأن الشرط خطأ.
ولأنها حلقة `repeat-while`، سيُنفَّذ جسم الحلقة مرة واحدة قبل تقييم الشرط.

```swift
var count = 2
repeat {
  print("\(count)…")
} while count < 0
print("Liftoff!")
```

## نقل التحكّم

يوفّر Swift عبارات نقل التحكّم لتغيير مسار تنفيذ الحلقات وجمل `switch`.
بالإضافة إلى `return`، تتضمّن Swift `continue` و`break` وتسميات الحلقات و`fallthrough`.

### `continue`

تخبر عبارة `continue` الحلقة بالتوقّف عن تنفيذ التكرار الحالي والبدء بالتكرار التالي فورًا.
في حلقة `while` أو `repeat-while`، تنتقل مباشرةً إلى فحص الشرط.
وفي حلقة `for-in`، تنتقل إلى العنصر التالي في المتتالية.

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

### `break`

تُنهي عبارة `break` حلقة كاملة أو جملة `switch` فورًا.
ويُستأنف التنفيذ من أول سطر كود يلي الحلقة أو جملة `switch`.

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

### العبارات ذات التسميات

في الحلقات المتداخلة، قد ترغب في أن يؤثّر `break` أو `continue` في حلقة خارجية بدلًا من الحلقة الداخلية الأعمق.
يمكنك تسمية حلقة بوضع اسم ونقطتين قبلها (`labelName:`).
ثم يمكنك تمرير تلك التسمية إلى `break` أو `continue`:

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
