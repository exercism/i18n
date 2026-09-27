# مقدمه

[آرایه][array] یکی از سه نوع مجموعه‌ی اصلی Swift است.
آرایه فهرستی مرتب از عناصر است.
آرایه‌ها می‌توانند عناصری از هر نوعی را ذخیره کنند، اما همه‌ی عناصر یک آرایه‌ی معین باید از یک نوع باشند.
وقتی آرایه به یک متغیر نسبت داده می‌شود، تغییرپذیر است؛ یعنی می‌توانید پس از ساخت آرایه، عناصر را اضافه، حذف یا تغییر دهید.
وقتی به یک ثابت نسبت داده شود، آرایه تغییرناپذیر است؛ یعنی محتوای آن قابل تغییر نیست.

«لیترال‌های آرایه» به‌صورت فهرستی از عناصر جدا شده با کاما نوشته می‌شوند که داخل کروشه (`[...]`) قرار می‌گیرند.
Swift می‌تواند نوع آرایه را از روی عناصر داخل لیترال استنتاج کند.

```swift
let evenInts = [2, 4, 6, 8, 10, 12]
var oddInts = [1, 3, 5, 7, 9, 11, 13]
let greetings = ["Hello!", "Hi!", "¡Hola!"]
```

می‌توانید نوع را به‌صورت صریح هم مشخص کنید.
نوع آرایه را می‌توان به دو شکل نوشت: `Array<T>` یا شکل کوتاه `[T]`؛ در اینجا `T` نوع مقادیری است که آرایه در خود نگه می‌دارد.

```swift
let evenInts: Array<Int> = [2, 4, 6, 8, 10, 12]
var oddInts: [Int] = [1, 3, 5, 7, 9, 11, 13]
let greetings: [String] = ["Hello!", "Hi!", "¡Hola!"]
```

## اندازه‌ی آرایه

می‌توانید تعداد عناصر یک آرایه را با ویژگی [`count`][count] آن پیدا کنید:

```swift
evenInts.count
// returns 6
```

## آرایه‌های خالی

برای ساختن یک آرایه‌ی خالی، باید نوع آن را مشخص کنید.
می‌توانید این کار را با سازنده‌ی آرایه یا با ذکر صریح نوع انجام دهید:

```swift
let emptyArray = [Int]()
let emptyArray2 = Array<Int>()
let emptyArray3: [Int] = []
```

## آرایه‌های چندبعدی

آرایه‌ها را می‌توان تودرتو کرد تا آرایه‌های چندبعدی ساخت.
وقتی نوع یک آرایه‌ی تودرتو را به‌صورت صریح مشخص می‌کنید، نوع عنصر را در کروشه‌های تودرتو قرار دهید، مانند `[[Int]]` یا `Array<Array<Int>>`:

```swift
let multiDimArray = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
let multiDimArray2: [[Int]] = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
```

## افزودن به انتهای آرایه

می‌توانید با متد [`append(_:)`][append] یک عنصر به انتهای یک آرایه‌ی تغییرپذیر اضافه کنید:

```swift
var oddInts = [1, 3, 5, 7, 9, 11, 13]
oddInts.append(15)
// oddInts is now [1, 3, 5, 7, 9, 11, 13, 15]
```

## درج در آرایه

می‌توانید با متد [`insert(_:at:)`][insert] یک عنصر را در اندیس مشخصی درج کنید.
این متد دو ورودی می‌گیرد: عنصری که باید درج شود و اندیسی که باید در آن درج شود.

```swift
var oddInts = [1, 3, 5, 7, 9, 11, 13]
oddInts.insert(0, at: 0)
// oddInts is now [0, 1, 3, 5, 7, 9, 11, 13]
```

## جمع کردن آرایه‌ها با هم

می‌توانید دو آرایه را با عملگر `+` در یک آرایه‌ی واحد ترکیب کنید.
عملگر `+` یک آرایه‌ی جدید می‌سازد و برمی‌گرداند؛ آرایه‌های اصلی را تغییر نمی‌دهد.

```swift
var oddInts = [1, 3, 5, 7, 9, 11, 13]
let combined = oddInts + [15, 17, 19]
// combined is [1, 3, 5, 7, 9, 11, 13, 15, 17, 19]

print(oddInts)
// prints [1, 3, 5, 7, 9, 11, 13]
```

## دسترسی به عناصر آرایه

می‌توانید به یک عنصر خاص از آرایه دسترسی پیدا کنید، به این صورت که اندیس آن را داخل کروشه (`[]`) پس از اسم آرایه بنویسید.
اندیس‌های آرایه مقادیر `Int` و از صفر شروع می‌شوند؛ اندیس عنصر اول `0` است.
دسترسی به اندیسی خارج از محدوده‌ی مجاز، خطای زمان اجرا می‌دهد و برنامه را از کار می‌اندازد.

```swift
let evenInts = [2, 4, 6, 8, 10, 12]
let oddInts = [1, 3, 5, 7, 9, 11, 13]

evenInts[2]
// returns 6

oddInts[7]
// Fatal error: Index out of range
```

## تغییر عناصر یک آرایه

می‌توانید یک عنصر را در آرایه‌ی تغییرپذیر با نسبت دادن مقدار جدیدی به اندیس مشخصی تغییر دهید.
همانند خواندن عناصر، استفاده از اندیسی خارج از محدوده‌ی مجاز هم خطای زمان اجرا می‌دهد.

```swift
var evenInts = [2, 4, 6, 8, 10, 12]

evenInts[2] = 0
// evenInts is now [2, 4, 0, 8, 10, 12]
```

## تبدیل آرایه به رشته و برگرداندن آن

می‌توانید با متد [`joined(separator:)`][joined] آرایه‌ای از رشته‌ها را به یک رشته‌ی واحد به هم بچسبانید؛ این متد یک رشته‌ی جداکننده می‌گیرد:

```swift
let evenInts = ["2", "4", "6", "8", "10", "12"]
let evenIntsString = evenInts.joined(separator: ", ")
// returns "2, 4, 6, 8, 10, 12"
```

می‌توانید با متد [`split(separator:)`][split] یک رشته را به آرایه‌ای از زیررشته‌ها تقسیم کنید و نویسه‌ی جداکننده را به آن بدهید:

```swift
let evenIntsString = "2, 4, 6, 8, 10, 12"
let evenInts = evenIntsString.split(separator: ",")
// returns ["2", " 4", " 6", " 8", " 10", " 12"]
```

## حذف عناصر از یک آرایه

می‌توانید با متد [`remove(at:)`][remove] عنصری را در اندیس معینی حذف کنید.
اندیس باید داخل محدوده‌ی مجاز آرایه باشد؛ در غیر این صورت، خطای زمان اجرا رخ می‌دهد.

```swift
var oddInts = [1, 3, 5, 7, 9, 11, 13]
oddInts.remove(at: 3)
// oddInts is now [1, 3, 5, 9, 11, 13]
```

برای حذف آخرین عنصر آرایه، از متد [`removeLast()`][removeLast] استفاده کنید.
فراخوانی `removeLast()` روی یک آرایه‌ی خالی، خطای زمان اجرا می‌دهد.

```swift
var oddInts = [1, 3, 5, 7, 9, 11, 13]
oddInts.removeLast()
// oddInts is now [1, 3, 5, 7, 9, 11]
```

[array]: https://developer.apple.com/documentation/swift/array
[count]: https://developer.apple.com/documentation/swift/array/count
[insert]: https://developer.apple.com/documentation/swift/array/insert(_:at:)-3erb3
[remove]: https://developer.apple.com/documentation/swift/array/remove(at:)-1p2pj
[removeLast]: https://developer.apple.com/documentation/swift/array/removelast()
[append]: https://developer.apple.com/documentation/swift/array/append(_:)-1ytnt
[joined]: https://developer.apple.com/documentation/swift/array/joined(separator:)-5do1g
[split]: https://developer.apple.com/documentation/swift/string/2894564-split
