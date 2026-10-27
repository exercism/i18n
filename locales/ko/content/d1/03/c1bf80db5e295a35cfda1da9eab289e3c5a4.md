# 소개
## `switch`문

[`switch`문][switch]을 사용하면 하나의 값을 여러 가지 가능한 값과 비교할 수 있어요.
여러 개의 `else-if`문을 사용하는 것보다 더 간결한 코드를 작성할 수 있게 해줘요.
`switch`문은 `switch` 키워드로 시작하고, 그 뒤에 비교할 값이 와요.
그다음 `case` 키워드 뒤에 비교 대상이 될 값을 적어 각 경우를 정의할 수 있어요.
`default` 키워드는 어떤 `case`와도 일치하지 않을 때 기본 경우를 정의하는 데 사용해요.
`else-if`문과 마찬가지로, `switch`문은 가장 먼저 일치하는 `case`와 연결된 코드 블록만 실행해요.

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

다음 예시를 살펴봐요:

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

이 코드는 다음과 같이 다시 쓸 수 있어요:

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

## `while`문

[`while`문][while-loops]은 특정 조건이 참인 동안 코드를 실행할 수 있게 해 주는 제어 흐름 문이에요.
Swift는 두 가지 종류의 `while`문을 제공해요: `while`문과 `repeat-while`문이에요.
`while`문은 루프 본문이 실행되기 전에 조건을 먼저 평가해요. 조건이 거짓이면 루프 본문은 아예 실행되지 않아요.
Swift의 `while`문은 다음과 같은 구조를 가져요:

```swift
while <#condition#> {
  <#code#>
}
```

여기서 루프는 count가 0보다 큰 동안 실행되며, 그에 따라 숫자 2, 1과 "Liftoff!"가 출력돼요.

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

[`repeat-while`문][while-loops]은 `while`문과 비슷하지만, 루프 본문이 실행된 뒤에 조건을 평가해요.
즉, 조건이 거짓이더라도 루프 본문은 항상 적어도 한 번은 실행돼요.
Swift의 `repeat-while`문은 다음과 같은 구조를 가져요:

```swift
repeat {
  <#code#>
} while <#condition#>
```

여기서는 조건이 거짓이기 때문에 루프가 한 번만 실행돼요.
`repeat-while`문이기 때문에 루프 본문은 조건이 평가되기 전에 한 번 실행돼요.

```swift
var count = 2
repeat {
  print("\(count)…")
} while count < 0
print("Liftoff!")
```

## 제어 전달

Swift는 루프와 `switch`문의 실행 흐름을 바꾸는 데 사용할 수 있는 제어 전달문을 제공해요.
`return` 외에도 Swift에는 `continue`, `break`, 루프 레이블, `fallthrough`가 있어요.

### `continue`

`continue`문은 현재 반복의 실행을 멈추고 다음 반복을 바로 시작하라고 루프에 알려줘요.
`while`문이나 `repeat-while`문에서는 곧바로 조건을 확인하는 지점으로 넘어가요.
`for-in`문에서는 시퀀스의 다음 요소로 넘어가요.

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

`break`문은 루프나 `switch`문 전체를 즉시 빠져나가요.
실행은 루프나 `switch`문 다음에 오는 첫 번째 코드 줄부터 이어져요.

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

### 레이블이 붙은 문

루프가 중첩되어 있을 때는 `break`나 `continue`가 가장 안쪽 루프가 아니라 바깥쪽 루프에 적용되기를 원할 수 있어요.
루프 앞에 이름과 콜론(`labelName:`)을 붙이면 루프에 레이블을 달 수 있어요.
그런 다음 그 레이블을 `break`나 `continue`에 넘기면 돼요:

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
