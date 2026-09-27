# المقدمة

[المصفوفات][array] هي أحد أنواع المجموعات الثلاثة الأساسية في Swift.
المصفوفة قائمة مرتّبة من العناصر.
يمكن للمصفوفات تخزين عناصر من أي نوع، لكن يجب أن تشترك جميع العناصر في مصفوفة معيّنة في النوع نفسه.
تكون المصفوفة قابلة للتغيير عند إسنادها إلى متغير، أي أنه يمكنك إضافة عناصر أو حذفها أو تعديلها بعد إنشاء المصفوفة.
وعند إسنادها إلى ثابت، تصبح المصفوفة غير قابلة للتغيير، أي أنه لا يمكن تغيير محتوياتها.

تُكتب القيم الحرفية للمصفوفة كقائمة من العناصر تفصل بينها فواصل وتُحاط بالأقواس المربعة (`[...]`).
يستطيع Swift استنتاج نوع المصفوفة من العناصر الموجودة داخل القيمة الحرفية.

```swift
let evenInts = [2, 4, 6, 8, 10, 12]
var oddInts = [1, 3, 5, 7, 9, 11, 13]
let greetings = ["Hello!", "Hi!", "¡Hola!"]
```

يمكنك أيضًا تحديد النوع صراحةً.
يمكن كتابة أنواع المصفوفات بطريقتين: `Array<T>` أو الصيغة المختصرة `[T]`، حيث يمثّل `T` نوع القيم التي تحتويها المصفوفة.

```swift
let evenInts: Array<Int> = [2, 4, 6, 8, 10, 12]
var oddInts: [Int] = [1, 3, 5, 7, 9, 11, 13]
let greetings: [String] = ["Hello!", "Hi!", "¡Hola!"]
```

## حجم المصفوفة

يمكنك معرفة عدد العناصر في مصفوفة باستخدام خاصيتها [`count`][count]:

```swift
evenInts.count
// returns 6
```

## المصفوفات الفارغة

لإنشاء مصفوفة فارغة، يجب تحديد نوعها.
يمكنك فعل ذلك باستخدام صيغة تهيئة المصفوفة أو بتحديد النوع صراحةً:

```swift
let emptyArray = [Int]()
let emptyArray2 = Array<Int>()
let emptyArray3: [Int] = []
```

## المصفوفات متعددة الأبعاد

يمكن تضمين المصفوفات داخل بعضها لإنشاء مصفوفات متعددة الأبعاد.
عند تحديد نوع مصفوفة متداخلة صراحةً، ضع نوع العنصر بين أقواس متداخلة، مثل `[[Int]]` أو `Array<Array<Int>>`:

```swift
let multiDimArray = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
let multiDimArray2: [[Int]] = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
```

## إضافة عنصر إلى مصفوفة

يمكنك إضافة عنصر إلى نهاية مصفوفة قابلة للتغيير باستخدام الطريقة [`append(_:)`][append]:

```swift
var oddInts = [1, 3, 5, 7, 9, 11, 13]
oddInts.append(15)
// oddInts is now [1, 3, 5, 7, 9, 11, 13, 15]
```

## الإدراج في مصفوفة

يمكنك إدراج عنصر عند فهرس محدّد باستخدام الطريقة [`insert(_:at:)`][insert].
تأخذ هذه الطريقة وسيطين: العنصر المراد إدراجه والفهرس الذي ستُدرج عنده.

```swift
var oddInts = [1, 3, 5, 7, 9, 11, 13]
oddInts.insert(0, at: 0)
// oddInts is now [0, 1, 3, 5, 7, 9, 11, 13]
```

## جمع المصفوفات معًا

يمكنك دمج مصفوفتين في مصفوفة واحدة باستخدام العامل `+`.
ينشئ العامل `+` مصفوفة جديدة ويُرجعها؛ وهو لا يعدّل المصفوفتين الأصليتين.

```swift
var oddInts = [1, 3, 5, 7, 9, 11, 13]
let combined = oddInts + [15, 17, 19]
// combined is [1, 3, 5, 7, 9, 11, 13, 15, 17, 19]

print(oddInts)
// prints [1, 3, 5, 7, 9, 11, 13]
```

## الوصول إلى عناصر المصفوفة

يمكنك الوصول إلى عنصر مفرد من مصفوفة بوضع فهرسه بين الأقواس المربعة (`[]`) بعد اسم المصفوفة.
فهارس المصفوفة هي قيم `Int` تعتمد على الصفر، إذ يبدأ العنصر الأول عند `0`.
الوصول إلى فهرس خارج النطاق الصالح يسبّب خطأ وقت التشغيل ويؤدي إلى انهيار البرنامج.

```swift
let evenInts = [2, 4, 6, 8, 10, 12]
let oddInts = [1, 3, 5, 7, 9, 11, 13]

evenInts[2]
// returns 6

oddInts[7]
// Fatal error: Index out of range
```

## تعديل عناصر المصفوفة

يمكنك تغيير عنصر في مصفوفة قابلة للتغيير بإسناد قيمة جديدة إلى فهرس محدّد.
وكما هو الحال عند قراءة العناصر، فإن استخدام فهرس خارج النطاق الصالح يسبّب خطأ وقت التشغيل.

```swift
var evenInts = [2, 4, 6, 8, 10, 12]

evenInts[2] = 0
// evenInts is now [2, 4, 0, 8, 10, 12]
```

## تحويل مصفوفة إلى سلسلة نصية والعكس

يمكنك ضمّ مصفوفة من السلاسل النصية في سلسلة نصية واحدة باستخدام الطريقة [`joined(separator:)`][joined]، التي تأخذ سلسلة نصية فاصلة:

```swift
let evenInts = ["2", "4", "6", "8", "10", "12"]
let evenIntsString = evenInts.joined(separator: ", ")
// returns "2, 4, 6, 8, 10, 12"
```

يمكنك تقسيم سلسلة نصية إلى مصفوفة من السلاسل النصية الفرعية باستخدام الطريقة [`split(separator:)`][split]، مع تمرير محرف الفصل:

```swift
let evenIntsString = "2, 4, 6, 8, 10, 12"
let evenInts = evenIntsString.split(separator: ",")
// returns ["2", " 4", " 6", " 8", " 10", " 12"]
```

## حذف عناصر من مصفوفة

يمكنك حذف عنصر عند فهرس معيّن باستخدام الطريقة [`remove(at:)`][remove].
يجب أن يكون الفهرس ضمن حدود المصفوفة الصالحة؛ وإلا فسيحدث خطأ وقت التشغيل.

```swift
var oddInts = [1, 3, 5, 7, 9, 11, 13]
oddInts.remove(at: 3)
// oddInts is now [1, 3, 5, 9, 11, 13]
```

لحذف العنصر الأخير من مصفوفة، استخدم الطريقة [`removeLast()`][removeLast].
استدعاء `removeLast()` على مصفوفة فارغة يسبّب خطأ وقت التشغيل.

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
