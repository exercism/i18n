# 개요

Go에서는 모든 변수에 값이 있어요.
값을 할당하지 않고 변수를 선언하면, 그 변수는 해당 타입의 제로 값으로 설정돼요.

`bool`, 숫자 타입, `string`을 비롯한 기본 타입은 각각 고정된 제로 값을 가져요:

| 타입                   | 제로 값    |
| ---------------------- | ---------- |
| bool                   | `false`    |
| int, int8, int64, etc. | `0`        |
| float32, float64       | `0`        |
| complex64, complex128  | `0+0i`     |
| string                 | `""`       |

포인터, 함수, 인터페이스, 슬라이스, 채널, 맵처럼 내부 데이터를 참조하는 타입은 제로 값이 `nil`이에요.
하지만 배열과 구조체는 데이터를 참조가 아니라 직접 담고 있기 때문에 절대 `nil`이 되지 않아요.
배열의 각 원소와 구조체의 각 필드는 각자 타입의 제로 값으로 초기화돼요.
예를 들어 `var a [3]int`는 `[0, 0, 0]`이라는 배열을 만들어요.

## 제로 값 선언하기

`var`를 초깃값 없이 쓰면 어떤 타입이든 제로 값을 가져요:

```go
var myBool bool   // false
var mySlice []int // nil
var p Person      // Person{Name: "", Age: 0}
```

구조체라면 복합 리터럴 `T{}`를 대신 쓸 수 있어요:

```go
myPerson := Person{} // equivalent to var myPerson Person
```

`new(T)`는 어떤 타입이든 그 제로 값에 대한 포인터를 반환해요.
구조체에서 가장 많이 쓰지만, 기본 타입에도 쓸 수 있어요:

```go
p := new(Person) // *Person, pointing to Person{Name: "", Age: 0}
s := new(string) // *string, pointing to ""
i := new(int)    // *int, pointing to 0
```

## 제로 값이 중요한 이유

Go에서 제로 값은 자연스럽고 유용한 시작 상태를 나타내요.

`bool`은 기본값이 `false`라서 플래그로 쓸 수 있어요:

```go
var done bool // action not done yet
done = true   // action now done
```

정수는 기본값이 `0`이라서 카운터로 쓸 수 있어요:

```go
var count int
count++ // 1
count++ // 2
```

구조체는 각 필드가 각자 타입의 제로 값에서 시작해요.
`[]string` 필드 하나만 가진 `Stack`은 선언하는 순간 이미 동작하는 빈 스택이에요.
nil 슬라이스에 `append`를 호출하면 새로운 기반 배열을 할당하기 때문에 생성자가 필요 없어요:

```go
type Stack struct {
    items []string
}

func (s *Stack) Push(v string) {
    s.items = append(s.items, v)
}

func (s *Stack) IsEmpty() bool {
    return len(s.items) == 0
}

var s Stack
fmt.Println(s.IsEmpty()) // true
s.Push("a") // append allocates a new backing array
fmt.Println(s.IsEmpty()) // false
```

## nil 다루기

제로 값이 `nil`인 대부분의 타입은 사용하기 전에 초기화해야 하며, 그렇지 않으면 패닉이 발생해요.
`nil` 슬라이스는 예외예요. 순회할 수 있고, append로 값을 추가할 수 있고, `len`과 `cap`에 안전하게 넘길 수 있어요.

맵은 값을 저장하기 전에 초기화해야 해요:

```go
var m map[string]int
m["key"] = 1 // panic
```

맵은 보통 두 가지 방법으로 초기화해요:

```go
m1 := make(map[string]int)
m2 := map[string]int{}
m1["key"] = 1 // ok
m2["key"] = 1 // ok
```

포인터는 사용하기 전에 `nil`인지 확인해요:

```go
var p *int

if p == nil {
    fmt.Println("no value assigned")
    return
}

fmt.Println(*p) // p is not nil
```

기본 타입은 항상 구체적인 값을 담고 있기 때문에, `nil`과 비교하면 컴파일 오류가 발생해요:

```go
var myString string

if myString == nil {
    // compile error: mismatched types
}
```
