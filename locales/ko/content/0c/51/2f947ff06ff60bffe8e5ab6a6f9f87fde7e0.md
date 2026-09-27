# 소개

[배열][array]은 Swift의 세 가지 주요 컬렉션 타입 중 하나예요.
배열은 원소를 순서대로 나열한 목록이에요.
배열은 어떤 타입의 원소든 저장할 수 있지만, 한 배열 안의 모든 원소는 같은 타입이어야 해요.
배열을 변수에 할당하면 변경할 수 있어요. 즉, 배열을 만든 뒤에도 원소를 추가하거나 제거하거나 수정할 수 있어요.
상수에 할당하면 배열은 변경할 수 없어요. 즉, 내용을 바꿀 수 없어요.

배열 리터럴은 대괄호(`[...]`)로 감싼, 쉼표로 구분된 원소 목록으로 작성해요.
Swift는 리터럴 안의 원소로부터 배열의 타입을 추론할 수 있어요.

```swift
let evenInts = [2, 4, 6, 8, 10, 12]
var oddInts = [1, 3, 5, 7, 9, 11, 13]
let greetings = ["Hello!", "Hi!", "¡Hola!"]
```

타입을 직접 지정할 수도 있어요.
배열 타입은 두 가지 방식으로 작성할 수 있어요. `Array<T>` 또는 축약 문법 `[T]`이고, 여기서 `T`는 배열이 담는 값의 타입이에요.

```swift
let evenInts: Array<Int> = [2, 4, 6, 8, 10, 12]
var oddInts: [Int] = [1, 3, 5, 7, 9, 11, 13]
let greetings: [String] = ["Hello!", "Hi!", "¡Hola!"]
```

## 배열의 크기

[`count`][count] 속성을 사용하면 배열의 원소 개수를 알 수 있어요.

```swift
evenInts.count
// returns 6
```

## 빈 배열

빈 배열을 만들려면 타입을 지정해야 해요.
배열 초기화 구문이나 명시적 타입 주석을 사용하면 된답니다.

```swift
let emptyArray = [Int]()
let emptyArray2 = Array<Int>()
let emptyArray3: [Int] = []
```

## 다차원 배열

배열을 중첩하면 다차원 배열을 만들 수 있어요.
중첩된 배열의 타입을 명시적으로 지정할 때는 `[[Int]]`나 `Array<Array<Int>>`처럼 원소 타입을 중첩된 대괄호로 감싸요.

```swift
let multiDimArray = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
let multiDimArray2: [[Int]] = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
```

## 배열에 원소 덧붙이기

[`append(_:)`][append] 메서드를 사용하면 변경 가능한 배열의 끝에 원소를 추가할 수 있어요.

```swift
var oddInts = [1, 3, 5, 7, 9, 11, 13]
oddInts.append(15)
// oddInts is now [1, 3, 5, 7, 9, 11, 13, 15]
```

## 배열에 원소 삽입하기

[`insert(_:at:)`][insert] 메서드를 사용하면 특정 인덱스에 원소를 삽입할 수 있어요.
이 메서드는 두 개의 인자를 받아요. 삽입할 원소와 삽입할 인덱스예요.

```swift
var oddInts = [1, 3, 5, 7, 9, 11, 13]
oddInts.insert(0, at: 0)
// oddInts is now [0, 1, 3, 5, 7, 9, 11, 13]
```

## 배열끼리 더하기

`+` 연산자를 사용하면 두 배열을 하나의 배열로 합칠 수 있어요.
`+` 연산자는 새로운 배열을 만들어 반환해요. 원래 배열은 수정하지 않아요.

```swift
var oddInts = [1, 3, 5, 7, 9, 11, 13]
let combined = oddInts + [15, 17, 19]
// combined is [1, 3, 5, 7, 9, 11, 13, 15, 17, 19]

print(oddInts)
// prints [1, 3, 5, 7, 9, 11, 13]
```

## 배열의 원소에 접근하기

배열 이름 뒤에 대괄호(`[]`)로 인덱스를 넣으면 배열의 개별 원소에 접근할 수 있어요.
배열 인덱스는 0부터 시작하는 `Int` 값이고, 첫 번째 원소가 `0`이에요.
유효 범위를 벗어난 인덱스에 접근하면 런타임 오류가 발생하고 프로그램이 충돌해요.

```swift
let evenInts = [2, 4, 6, 8, 10, 12]
let oddInts = [1, 3, 5, 7, 9, 11, 13]

evenInts[2]
// returns 6

oddInts[7]
// Fatal error: Index out of range
```

## 배열의 원소 수정하기

변경 가능한 배열의 원소는 특정 인덱스에 새 값을 할당해서 바꿀 수 있어요.
원소를 읽을 때와 마찬가지로, 유효 범위를 벗어난 인덱스를 사용하면 런타임 오류가 발생해요.

```swift
var evenInts = [2, 4, 6, 8, 10, 12]

evenInts[2] = 0
// evenInts is now [2, 4, 0, 8, 10, 12]
```

## 배열을 문자열로, 다시 배열로 변환하기

[`joined(separator:)`][joined] 메서드를 사용하면 문자열 배열을 하나의 문자열로 합칠 수 있어요. 이 메서드는 구분자 문자열을 받아요.

```swift
let evenInts = ["2", "4", "6", "8", "10", "12"]
let evenIntsString = evenInts.joined(separator: ", ")
// returns "2, 4, 6, 8, 10, 12"
```

[`split(separator:)`][split] 메서드에 구분 문자를 전달하면 문자열을 부분 문자열의 배열로 나눌 수 있어요.

```swift
let evenIntsString = "2, 4, 6, 8, 10, 12"
let evenInts = evenIntsString.split(separator: ",")
// returns ["2", " 4", " 6", " 8", " 10", " 12"]
```

## 배열에서 원소 제거하기

[`remove(at:)`][remove] 메서드를 사용하면 주어진 인덱스의 원소를 제거할 수 있어요.
인덱스는 배열의 유효 범위 안에 있어야 해요. 그렇지 않으면 런타임 오류가 발생해요.

```swift
var oddInts = [1, 3, 5, 7, 9, 11, 13]
oddInts.remove(at: 3)
// oddInts is now [1, 3, 5, 9, 11, 13]
```

배열의 마지막 원소를 제거하려면 [`removeLast()`][removeLast] 메서드를 사용해요.
빈 배열에 `removeLast()`를 호출하면 런타임 오류가 발생해요.

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
