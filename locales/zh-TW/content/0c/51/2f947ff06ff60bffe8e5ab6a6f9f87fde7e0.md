# 簡介

[陣列][array] 是 Swift 三種主要集合型別的其中之一。
陣列是一種有序的元素列表。
陣列可以儲存任何型別的元素，但同一個陣列中的所有元素都必須是相同的型別。
當陣列被指定給變數時，它是可變的，這表示你可以在建立陣列之後新增、移除或修改元素。
當陣列被指定給常數時，它就是不可變的，這表示它的內容無法被改變。

陣列字面值會寫成以逗號分隔的元素列表，並用方括號（`[...]`）包住。
Swift 可以從字面值中的元素推斷出陣列的型別。

```swift
let evenInts = [2, 4, 6, 8, 10, 12]
var oddInts = [1, 3, 5, 7, 9, 11, 13]
let greetings = ["Hello!", "Hi!", "¡Hola!"]
```

你也可以明確指定型別。
陣列型別有兩種寫法：`Array<T>`或簡寫語法`[T]`，其中`T`是陣列所包含的值的型別。

```swift
let evenInts: Array<Int> = [2, 4, 6, 8, 10, 12]
var oddInts: [Int] = [1, 3, 5, 7, 9, 11, 13]
let greetings: [String] = ["Hello!", "Hi!", "¡Hola!"]
```

## 陣列的大小

你可以使用陣列的[`count`][count]屬性來取得陣列中元素的數量：

```swift
evenInts.count
// returns 6
```

## 空陣列

若要建立空陣列，就必須指定它的型別。
你可以使用陣列初始化語法，或明確的型別標註來達成：

```swift
let emptyArray = [Int]()
let emptyArray2 = Array<Int>()
let emptyArray3: [Int] = []
```

## 多維陣列

陣列可以巢狀化來建立多維陣列。
當你要明確指定巢狀陣列的型別時，請用巢狀的方括號把元素型別包起來，例如`[[Int]]`或`Array<Array<Int>>`：

```swift
let multiDimArray = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
let multiDimArray2: [[Int]] = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
```

## 在陣列尾端新增元素

你可以使用[`append(_:)`][append]方法，把元素加到可變陣列的尾端：

```swift
var oddInts = [1, 3, 5, 7, 9, 11, 13]
oddInts.append(15)
// oddInts is now [1, 3, 5, 7, 9, 11, 13, 15]
```

## 在陣列中插入元素

你可以使用[`insert(_:at:)`][insert]方法，在指定的索引插入元素。
這個方法接受兩個引數：要插入的元素，以及要插入的索引位置。

```swift
var oddInts = [1, 3, 5, 7, 9, 11, 13]
oddInts.insert(0, at: 0)
// oddInts is now [0, 1, 3, 5, 7, 9, 11, 13]
```

## 將陣列相加

你可以使用`+`運算子把兩個陣列合併成單一陣列。
`+`運算子會建立並回傳一個新陣列；它不會修改原本的陣列。

```swift
var oddInts = [1, 3, 5, 7, 9, 11, 13]
let combined = oddInts + [15, 17, 19]
// combined is [1, 3, 5, 7, 9, 11, 13, 15, 17, 19]

print(oddInts)
// prints [1, 3, 5, 7, 9, 11, 13]
```

## 存取陣列的元素

你可以把索引放在陣列名稱後面的方括號（`[]`）裡，來存取陣列中的個別元素。
陣列的索引是以零為起始的`Int`值，第一個元素從`0`開始。
存取超出有效範圍的索引會造成執行期錯誤，並使程式崩潰。

```swift
let evenInts = [2, 4, 6, 8, 10, 12]
let oddInts = [1, 3, 5, 7, 9, 11, 13]

evenInts[2]
// returns 6

oddInts[7]
// Fatal error: Index out of range
```

## 修改陣列的元素

你可以把新值指定給指定的索引，來改變可變陣列中的元素。
和讀取元素時一樣，使用超出有效範圍的索引會造成執行期錯誤。

```swift
var evenInts = [2, 4, 6, 8, 10, 12]

evenInts[2] = 0
// evenInts is now [2, 4, 0, 8, 10, 12]
```

## 將陣列轉換成字串再轉換回來

你可以使用[`joined(separator:)`][joined]方法，把字串陣列串接成單一字串，這個方法接受一個分隔字串：

```swift
let evenInts = ["2", "4", "6", "8", "10", "12"]
let evenIntsString = evenInts.joined(separator: ", ")
// returns "2, 4, 6, 8, 10, 12"
```

你可以使用[`split(separator:)`][split]方法，傳入分隔字元，把字串拆分成由子字串組成的陣列：

```swift
let evenIntsString = "2, 4, 6, 8, 10, 12"
let evenInts = evenIntsString.split(separator: ",")
// returns ["2", " 4", " 6", " 8", " 10", " 12"]
```

## 從陣列移除元素

你可以使用[`remove(at:)`][remove]方法，移除指定索引上的元素。
索引必須落在陣列的有效範圍內；否則會發生執行期錯誤。

```swift
var oddInts = [1, 3, 5, 7, 9, 11, 13]
oddInts.remove(at: 3)
// oddInts is now [1, 3, 5, 9, 11, 13]
```

若要移除陣列的最後一個元素，請使用[`removeLast()`][removeLast]方法。
對空陣列呼叫`removeLast()`會造成執行期錯誤。

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
